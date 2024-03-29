// components/PopupDropdown.tsx
import type React from 'react';
import Button from './PrimaryButton';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  selectToken,
  selectUserCartNumber,
  selectUserTotalCost,
} from '../features/users/UserSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { get } from '../utils/network';
import {
  decreaseProduct,
  increaseProduct,
  removeProduct,
} from '../features/users/UserThunkApi';

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

const transformDataToItem = (data: any): Item => {
  return {
    id: data.product._id,
    name: data.product.name,
    image: data.product.imgUrl,
    quantity: data.quantity,
    price: data.product.price,
  };
};

const Cart: React.FC<CartProps> = ({ onClose }) => {
  // match search words
  const [items, setItems] = useState<Item[]>([]);

  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

  const itemsNumber = useAppSelector(selectUserCartNumber);

  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await get('http://localhost:3000/user/get_cart', {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        });
        if (!response.ok) {
          throw new Error('Request failed');
        }
        const data = await response.json();
        const items = data.map(transformDataToItem);
        // console.log(data);
        setItems(items);
      } catch (error) {
        console.error('Error:', error);
        throw new Error('Request failed');
      }
    };

    if (itemsNumber > 0) {
      getCart();
    }
  }, [setItems, token, itemsNumber]);

  // console.log(items[2])

  const decrementQuantity = (itemId: number) => {
    dispatch(decreaseProduct({ id: itemId, token: token }));
  };

  const incrementQuantity = (itemId: number) => {
    dispatch(increaseProduct({ id: itemId, token: token }));
  };

  const removeItem = (itemId: number) => {
    dispatch(removeProduct({ id: itemId, token: token }));
  };

  // cart summary variable
  const total = useAppSelector(selectUserTotalCost);
  const totalDisplay = total.toFixed(2);
  const [discount, setdiscount] = useState<number>(0);
  const discountDisplay = discount.toFixed(2);
  const tax = total * 0.0775;
  const taxDisplay = tax.toFixed(2);
  const estimatedTotal = (total - discount + tax).toFixed(2);

  const [discountCode, setDiscountCode] = useState<string>('');
  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountCode(e.target.value);
  };

  const hanldeDiscountApply = () => {
    const digits = discountCode.match(/\d+/g);

    if (digits) {
      const number = parseInt(digits.join(''), 10);
      if (number > total) {
        alert('Discount code cannot be greater than total price');
        return;
      } else {
        setdiscount(number);
      }
    } else {
      alert('Invalid discount code');
    }
  };

  return (
    <div className="flex flex-col sm:max-h-[80vh] max-h-[70vh] sm:absolute z-40 sm:top-0 sm:right-0 sm:mt-0 mt-2 sm:w-[544px] w-full  bg-white ">
      <div className="sm:px-8 px-4 flex items-center justify-between bg-[#5048E5] sm:h-[81px] py-5">
        <div className="flex gap-2 items-center">
          <div className="sm:text-[32px] text-[24px] font-bold">Cart</div>
          <div className="sm:text-lg text-[14px]"> ({itemsNumber})</div>
        </div>
        <button className="sm:text-[24px] font-semibold" onClick={onClose}>
          &#x2715;{' '}
        </button>
      </div>

      <div className="sm:px-8 px-4 sm:py-8 py-4 flex-col overflow-scroll text-black">
        {itemsNumber === 0 ? (
          <div className="text-[16px] font-[600]">
            Your cart is empty, choose something you like ^_^
          </div>
        ) : (
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
                    <div className="text-[#5048E5] font-[600]">
                      ${item.price}
                    </div>
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
        )}

        {/* coupon */}
        <div className="text-gray-400 text-[14px] font-[600]">
          <div>Apply Discount Code</div>

          <div className="flex gap-8 mt-2">
            <input
              className="w-full border border-gray rounded-md h-[48px] p-2"
              type="text"
              placeholder="20 OFF"
              onChange={handleDiscountChange}
              value={discountCode}
            />
            <Button onClick={hanldeDiscountApply}>
              <p className="py-1 px-3 text-white text-sm font-semibold">
                Apply
              </p>
            </Button>
          </div>
        </div>

        <div className="divider"></div>

        {/* cart summary */}
        <div className="flex-col gap-4 w-full text-black text-[16px] font-[600]">
          <div className="flex mb-2">
            <div className="w-11/12">Subtotal</div>
            <div>${totalDisplay}</div>
          </div>
          <div className="flex mb-2">
            <div className="w-11/12">Tax</div>
            <div>${taxDisplay}</div>
          </div>
          <div className="flex mb-2">
            <div className="w-11/12">Discount</div>
            <div>-${discountDisplay}</div>
          </div>
          <div className="flex mb-2">
            <div className="w-11/12">Estimated total</div>
            <div>${estimatedTotal}</div>
          </div>

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
  );
};

export default Cart;
