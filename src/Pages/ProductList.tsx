import React, { useEffect, useMemo, useRef, useState } from 'react';
import logo from '../logo.svg';
import { useAppSelector } from '../app/hooks';
import { selectUser } from '../features/users/UserSlice';
import { useNavigate } from 'react-router-dom';
import { get } from '../utils/network';

interface Product {
  id: string;
  vendor: string;
  name: string;
  price: number;
  imgUrl: string;
}

interface ProductListState {
  products: Product[];
  count: number;
}

const Order = ['Last Added', 'Price: High to Low', 'Price: Low to High'];

const ProductList = () => {
  const perPage = useRef(10);
  const maxPrefixPages = useRef(5);
  if (window.innerWidth < 768) {
    perPage.current = 3;
    maxPrefixPages.current = 3;
  }

  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const [productList, setProductList] = useState<ProductListState>({
    products: [],
    count: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const loading = useMemo(
    () => (productList.count === 0 ? 'pedding' : 'done'),
    [productList],
  );

  const handleAddProduct = () => {
    navigate('/createProduct');
  };

  const handleEditProduct = (id: string) => () => {
    navigate(`/editProduct/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      let count = 0;
      if (!user.logged || (user.logged && user.role === 'customer')) {
        try {
          const res = await get(
            'http://localhost:3000/product/get_products_count',
          );
          if (res.ok) {
            const data = await res.json();
            count = data.count;
          } else {
            navigate('/error');
          }
        } catch (error) {
          navigate('/error');
        }

        try {
          const res = await get(
            `http://localhost:3000/product/get_products?page=${currentPage}&limit=${perPage.current}&sort=${sortType}`,
          );
          if (res.ok) {
            const data = await res.json();
            setProductList({
              products: data.results,
              count,
            });
          } else {
            navigate('/error');
          }
        } catch (error) {
          navigate('/error');
        }
      } else if (user.logged && user.role === 'vendor') {
        try {
          const res = await get(
            'http://localhost:3000/product/get_vendor_products_count',
            {
              headers: {
                'x-auth-token': user.token,
              },
            },
          );
          if (res.ok) {
            const data = await res.json();
            count = data.count;
          } else if (res.status === 401) {
            navigate('/login');
          } else {
            navigate('/error');
          }
        } catch (error) {
          navigate('/error');
        }
        try {
          const res = await get(
            `http://localhost:3000/product/get_vendor_products/?page=${currentPage}&limit=${perPage.current}&sort=${sortType}`,
            {
              headers: {
                'x-auth-token': user.token,
              },
            },
          );
          if (res.ok) {
            const data = await res.json();
            setProductList({
              products: data.results,
              count,
            });
          } else if (res.status === 401) {
            navigate('/login');
          } else {
            navigate('/error');
          }
        } catch (error) {
          navigate('/error');
        }
      }
    };

    fetchData();
  }, [user, navigate, currentPage, sortType]);

  if (loading === 'pedding') {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-black text-2xl font-bold">Loading...</p>
      </div>
    );
  }

  const pages = Math.ceil(productList.count / perPage.current);

  return (
    <div className="flex flex-col flex-grow w-full items-center">
      <header className="flex flex-col md:flex-row w-11/12 mt-2 md:mt-10">
        <p className="text-center md:text-start text-black text-xl md:text-2xl md:w-2/3 font-bold">
          Products
        </p>
        <div className="flex md:w-1/3 justify-center md:justify-end">
          <details
            open={detailsOpen}
            onClick={e => {
              e.preventDefault();
              setDetailsOpen(!detailsOpen);
            }}
            className="dropdown mr-2 w-1/2"
          >
            <summary className="btn btn-sm md:btn-md w-full">
              {Order[sortType]}
            </summary>
            <ul className="shadow bg-white dropdown-content menu z-[1] w-full">
              {Order.map((order, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      setSortType(index);
                    }}
                  >
                    {order}
                  </button>
                </li>
              ))}
            </ul>
          </details>
          {user.logged && user.role === 'vendor' && (
            <button
              className="btn btn-primary btn-sm md:btn-md"
              onClick={handleAddProduct}
            >
              Add Product
            </button>
          )}
        </div>
      </header>
      <div className="flex flex-col md:grid md:grid-cols-5 flex-grow w-11/12 mt-5 bg-white rounded-md">
        {productList.products.map((product, index) => (
          <div
            key={index}
            className="flex flex-col min-h-60 border m-2 border-gray-100"
          >
            <img
              src={product.imgUrl}
              alt={product.name}
              className="flex-grow"
            />
            <p className="text-gray-500 text-sm px-1 py-0.5">{product.name}</p>
            <p className="text-black text-xl font-bold px-1 py-0.5">
              ${product.price}
            </p>
            <div className="flex justify-between w-full mb-5 px-1">
              <button className="flex-1 bg-blue-700 rounded text-white text-md mr-1 py-0.5">
                Add
              </button>
              {user.logged &&
                user.role === 'vendor' &&
                user.id === product.vendor && (
                  <button
                    className="w-5/12 text-black text-md border-gray-200 border py-0.5"
                    onClick={handleEditProduct(product._id)}
                  >
                    Edit
                  </button>
                )}
            </div>
          </div>
        ))}
      </div>
      <footer className="flex w-11/12 my-2 md:my-5 justify-end">
        <div className="join">
          <button
            className="join-item btn btn-sm"
            onClick={() => {
              if (currentPage === 1) return;
              setCurrentPage(prev => prev - 1);
            }}
          >
            «
          </button>
          {Array.from({ length: Math.min(pages, maxPrefixPages.current) }).map(
            (_, index) => (
              <button
                key={index}
                className={`join-item btn btn-sm ${index + 1 === currentPage && 'btn-primary'}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ),
          )}
          {pages > 5 && (
            <>
              <button className="join-item btn btn-disabled btn-sm">...</button>
              <button
                className="join-item btn btn-sm"
                onClick={() => setCurrentPage(pages)}
              >
                {pages}
              </button>
            </>
          )}
          <button
            className="join-item btn btn-sm"
            onClick={() => {
              if (currentPage === pages) return;
              setCurrentPage(prev => prev + 1);
            }}
          >
            »
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ProductList;
