import { useEffect, useMemo, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  selectUser,
  selectToken,
  selectUserCartNumber,
} from '../features/users/UserSlice';
import { useNavigate } from 'react-router-dom';
import { get } from '../utils/network';
import {
  decreaseProduct,
  increaseProduct,
  removeProduct,
} from '../features/users/UserThunkApi';

interface Product {
  _id: any;
  vendor: string;
  name: string;
  price: number;
  imgUrl: string;
  number: number; // used for items in loggedin user's cart
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
  const dispatch = useAppDispatch();
  const [productList, setProductList] = useState<ProductListState>({
    products: [],
    count: 0,
  });

  const [productLogInList, setProductLogInList] = useState<ProductListState>({
    products: [],
    count: 0,
  });
  let List;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const loading = useMemo(
    () => (productList.count === 0 ? 'pending' : 'done'),
    [productList],
  );

  const itemsNumber = useAppSelector(selectUserCartNumber);
  const token = useAppSelector(selectToken);

  const handleAddProduct = () => {
    navigate('/createProduct');
  };

  const handleEditProduct = (id: string) => () => {
    navigate(`/editProduct/${id}`);
  };

  const decrementQuantity = (itemId: number, quant: number) => {
    if (quant === 1) {
      // console.log('r');
      dispatch(removeProduct({ id: itemId, token: token }));
    } else if (quant > 1) {
      // console.log('d');
      dispatch(decreaseProduct({ id: itemId, token: token }));
    } else {
      alert('Error');
    }
  };

  const increaseQuantity = (itemId: number) => {
    if (user.logged) {
      dispatch(increaseProduct({ id: itemId, token: token }));
    } else {
      alert('Please log in to add to cart');
    }
  };

  const modifyList = (prevProductList: ProductListState, collection: any) => ({
    ...prevProductList,
    products: prevProductList.products.map(product => {
      const matchedProduct = collection.find(
        (item: any) => item.product === product._id,
      );
      if (matchedProduct) {
        return {
          ...product,
          number: matchedProduct.quantity, // Add number property to product
        };
      }
      return product;
    }),
  });

  useEffect(() => {
    const fetchData = async () => {
      let count = 0;
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
    };

    fetchData();
  }, [user, navigate, currentPage, sortType]);

  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await get(
          'http://localhost:3000/user/get_cart_basic',
          {
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token,
            },
          },
        );
        if (!response.ok) {
          throw new Error('Request failed');
        }
        const data = await response.json();
        // console.log(data);
        const collection = data.map((item: any) => ({
          product: item.product,
          quantity: item.quantity,
        }));
        setProductLogInList(modifyList(productList, collection));
      } catch (error) {
        console.error('Error:', error);
        throw new Error('Request failed');
      }
    };

    if (user.logged && itemsNumber > 0) {
      getCart();
    }
  }, [token, itemsNumber, productList, user.logged]);

  if (user.logged && itemsNumber > 0) {
    List = productLogInList;
  } else {
    List = productList;
  }

  if (loading === 'pending') {
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
        {List.products.map((product, index) => (
          <div
            key={index}
            className="flex flex-col min-h-60 border m-2 border-gray-100"
          >
            <img
              src={product.imgUrl}
              alt={product.name}
              className="flex-grow cursor-pointer"
              onClick={() => navigate(`/productDetail/${product._id}`)}
            />
            <p className="text-gray-500 text-sm px-1 py-0.5">{product.name}</p>
            <p className="text-black text-xl font-bold px-1 py-0.5">
              ${product.price}
            </p>
            <div className="flex justify-between w-full mb-5 px-1">
              {!product.number ? (
                <button
                  className="flex-1 bg-[#5048E5] rounded text-white text-md mr-1 py-0.5 hover:shadow-lg "
                  onClick={() => increaseQuantity(product._id)}
                >
                  Add
                </button>
              ) : (
                <div className="mr-1 py-0.5 text-white flex flex-1 gap-3 items-center justify-around rounded bg-[#5048E5]">
                  <button
                    onClick={() =>
                      decrementQuantity(product._id, product.number)
                    }
                  >
                    {' '}
                    -{' '}
                  </button>
                  <span> {product.number}</span>
                  <button onClick={() => increaseQuantity(product._id)}>
                    {' '}
                    +{' '}
                  </button>
                </div>
              )}
              {user.logged &&
                user.role === 'vendor' &&
                user.id === product.vendor && (
                  <button
                    className="w-5/12 text-black text-md border-gray-200 border py-0.5 hover:shadow-lg rounded"
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
