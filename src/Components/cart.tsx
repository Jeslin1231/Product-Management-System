// components/PopupDropdown.tsx
import type React from 'react';
import Button from './PrimaryButton';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface CartProps {
  onClose: () => void; // Define the type of onClose prop
}

interface Item {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

const Cart: React.FC<CartProps> = ({ onClose }) => {
  // match search words
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      name: 'Product 1',
      image: 'https://avatars.githubusercontent.com/u/1?v=4',
      quantity: 2,
      price: 10.99,
    },
    {
      id: 2,
      name: 'Product 2',
      image: 'https://avatars.githubusercontent.com/u/2?v=4',
      quantity: 1,
      price: 19.99,
    },
    {
      id: 3,
      name: 'Product 3',
      image: 'https://avatars.githubusercontent.com/u/6?v=4',
      quantity: 3,
      price: 7.5,
    },
    {
      id: 4,
      name: 'Product 4',
      image: 'https://avatars.githubusercontent.com/u/6?v=4',
      quantity: 3,
      price: 7.5,
    },
    {
      id: 5,
      name: 'Product 5',
      image: 'https://avatars.githubusercontent.com/u/6?v=4',
      quantity: 3,
      price: 7.5,
    },
  ]);

  const itemsNumber = items.reduce((total, item) => total + item.quantity, 0);

  const decrementQuantity = (itemId: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item,
      ),
    );
  };

  const incrementQuantity = (itemId: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const removeItem = (itemId: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const summary = [
    {
      name: 'Subtotal',
      num: 120,
    },
    {
      name: 'Discount',
      num: -20,
    },
    {
      name: 'Tax',
      num: 10,
    },
    {
      name: 'Estimated Total',
      num: 110,
    },
  ];

  return (
    // <div>
    <div className="flex flex-col sm:max-h-[80vh] max-h-[calc(100vh-121px-152px)] sm:absolute z-40 sm:top-0 sm:right-0 sm:mt-0 mt-2 sm:w-[544px] w-full  bg-white ">
      <div className="sm:px-8 px-4 flex items-center justify-between bg-[#5048E5] sm:h-[81px] py-5">
        <div className="flex gap-2 items-center">
          <div className="sm:text-[32px] text-[24px] font-bold">Cart</div>
          <div className="sm:text-lg text-[14px]"> ({itemsNumber})</div>
        </div>
        <button className="sm:text-[24px] font-semibold" onClick={onClose}>
          &#x2715;{' '}
        </button>
      </div>

      <div className="sm:px-8 px-4 sm:py-8 py-4 flex-col overflow-scroll">
        <div>
          {items.map(item => (
            <div key={item.id} className="flex gap-8 sm:mb-10 mb-6 ">
              <img
                className="h-[120px] w-[112px]"
                src={item.image}
                alt={item.name}
              />

              {/* RIGHT PART */}
              <div className="flex-col w-full h-[120px]">
                {/* NAME AND PRICE */}
                <div className="flex h-4/5 sm:flex-row flex-col sm:justify-between sm:text-[20px] text-[16px]">
                  {/* name */}
                  <div className=" text-black font-bold " onClick={onClose}>
                    <Link to={`/productDetail/${item.id}`}>{item.name}</Link>
                  </div>

                  {/* price */}
                  <div className="text-[#5048E5] font-[600]">${item.price}</div>
                </div>

                {/* QUANTITY CONTROL */}
                <div className="flex justify-between text-gray-500 ">
                  <div className="border border-gray rounded-md">
                    <button
                      className="px-2 border-r "
                      onClick={() => decrementQuantity(item.id)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span className="px-2 text-black">{item.quantity}</span>
                    <button
                      className="px-2 border-l "
                      onClick={() => incrementQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="underline"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* coupon */}
        <div className="text-gray-400 text-[14px] font-[600]">
          <div>Apply Discount Code</div>

          <div className="flex gap-8 mt-2">
            <input
              className="w-full border border-gray rounded-md h-[48px] p-2"
              type="text"
              placeholder="20 OFF"
            />
            <Button>
              <p className="py-1 px-3 text-white text-sm font-semibold">
                Apply
              </p>
            </Button>
          </div>
        </div>

        <div className="divider"></div>

        {/* cart summary */}
        <div className="flex-col gap-4 w-full text-black text-[16px] font-[600]">
          {summary.map(item => (
            <div>
              <div className="flex mb-2">
                <div className="w-11/12">{item.name}</div>
                <div>${item.num}</div>
              </div>
            </div>
          ))}

          <div className="mt-4 w-full">
            <Button width="full">
              <p className="py-2 px-3  text-white text-sm font-semibold">
                Countine to Checkout
              </p>
            </Button>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Cart;
