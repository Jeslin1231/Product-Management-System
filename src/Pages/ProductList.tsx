import React, { useRef, useState } from 'react';
import logo from '../logo.svg';
import Button from '../Components/PrimaryButton';

const ProductList = () => {
  const totalProducts = useRef(200);
  const perPage = useRef(10);
  const maxPrefixPages = useRef(5);
  if (window.innerWidth < 768) {
    perPage.current = 3;
    maxPrefixPages.current = 3;
  }
  const products = useRef([
    { id: 1, name: 'Product 1', price: 100 },
    { id: 1, name: 'Product 1', price: 100 },
    { id: 1, name: 'Product 1', price: 100 },
    { id: 1, name: 'Product 1', price: 100 },
    { id: 1, name: 'Product 1', price: 100 },
    { id: 1, name: 'Product 1', price: 100 },
    { id: 1, name: 'Product 1', price: 100 },
    { id: 1, name: 'Product 1', price: 100 },
    { id: 1, name: 'Product 1', price: 100 },
    { id: 1, name: 'Product 1', price: 100 },
  ]);
  const pages = Math.ceil(totalProducts.current / perPage.current);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState('Last Added');
  const [detailsOpen, setDetailsOpen] = useState(false);
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
              {sortType}
            </summary>
            <ul className="shadow bg-white dropdown-content menu z-[1] w-full">
              <li>
                <button
                  onClick={() => {
                    setSortType('Last Added');
                  }}
                >
                  Last Added
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSortType('Price: High to Low');
                  }}
                >
                  Price: High to Low
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSortType('Price: Low to High');
                  }}
                >
                  Price: Low to High
                </button>
              </li>
            </ul>
          </details>
          <button className="btn btn-primary btn-sm md:btn-md">
            Add Product
          </button>
        </div>
      </header>
      <div className="flex flex-col md:grid md:grid-cols-5 flex-grow w-11/12 mt-5 bg-white rounded-md">
        {products.current.slice(0, perPage.current).map((product, index) => (
          <div key={index} className="flex flex-col border m-2 border-gray-100">
            <div className="flex-grow">image</div>
            <p className="text-gray-500 text-sm px-1 py-0.5">{product.name}</p>
            <p className="text-black text-xl font-bold px-1 py-0.5">
              ${product.price}
            </p>
            <div className="flex justify-between w-full mb-5 px-1">
              <button className="flex-1 bg-blue-700 rounded text-white text-md mr-1 py-0.5">
                Add
              </button>
              <button className="w-5/12 text-black text-md border-gray-200 border py-0.5">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
      <footer className="flex w-11/12 my-2 md:my-5 justify-end">
        <div className="join">
          <button className="join-item btn btn-sm">«</button>
          {Array.from({ length: Math.min(pages, maxPrefixPages.current) }).map(
            (_, index) => (
              <button
                key={index}
                className={`join-item btn btn-sm ${index + 1 === currentPage && 'btn-primary'}`}
              >
                {index + 1}
              </button>
            ),
          )}
          {pages > 5 && (
            <button className="join-item btn btn-disabled btn-sm">...</button>
          )}
          {pages > 5 && (
            <button className="join-item btn btn-sm">{pages}</button>
          )}
          <button className="join-item btn btn-sm">»</button>
        </div>
      </footer>
    </div>
  );
};

export default ProductList;
