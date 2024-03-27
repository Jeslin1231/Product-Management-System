import type React from 'react';
import PrimaryButton from '../Components/PrimaryButton';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  selectUser,
  selectToken,
  selectUserCartNumber,
} from '../features/users/UserSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  decreaseProduct,
  increaseProduct,
  removeProduct,
} from '../features/users/UserThunkApi';
import { get } from '../utils/network';

const ProductDetail: React.FC = () => {
  const [product, setProduct] = useState<any>({});

  const { id } = useParams<{ id: string }>();
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);

  const dispatch = useAppDispatch();
  const itemsNumber = useAppSelector(selectUserCartNumber);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await get(
          `http://localhost:3000/product/get_product/${id}`,
        );
        if (!response.ok) {
          throw new Error('Request failed');
        }
        const data = await response.json();
        // console.log(data.product);
        setProduct(data.product);
      } catch (error) {
        console.error('Error:', error);
        throw new Error('Request failed');
      }
    };
    getProduct();
  }, [id]);

  // product.description = "Hundreds of hit games, one-of-a-kid experiences, live events, new ways to stay fit and  a growing community Hundreds of hit games, one-of-a-kid experiences, live events, new ways to stay fit and  a growing community"

  const [quant, setQuant] = useState<number>(0);

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
        let collectionID = data.map((item: any) => item.product);
        // console.log(collectionID)
        if (collectionID.includes(id)) {
          let item = data.find((item: any) => item.product === id);
          // console.log(item);
          setQuant(item.quantity);
        } else {
          setQuant(0);
        }
      } catch (error) {
        console.error('Error:', error);
        throw new Error('Request failed');
      }
    };

    if (itemsNumber > 0) {
      getCart();
    }
  }, [quant, id, token, itemsNumber]);

  const decrementQuantity = (itemId: number) => {
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

  return (
    <div className="flex flex-grow justify-center">
      <div className="flex bg-white my-10 mx-6">
        <div className="flex md:flex-row flex-col md:m-10 m-4 md:items-start items-center md:gap-24 ">
          <img
            className="md:w-[662px] w-[308px] md:h-[597px] h-[276px]"
            src={product.imgUrl}
            alt={product.name}
          />
          <div className="flex flex-col py-6 md:pr-16 md:gap-6 gap-2">
            <div className="text-gray-500 md:text-base text-sm">
              {product.category}
            </div>
            <div className="md:text-4xl text-xl font-bold md:max-w-[428px] max-w-[308px]">
              {product.name}
            </div>
            <div className="flex gap-4 items-center">
              <div className="md:text-4xl text-xl font-bold ">
                ${product.price}
              </div>

              {product.stock === 0 && (
                <div className="text-red-500 border border-red-100 h-[30px] rounded-md bg-red-100 text-xs px-2 flex items-center ">
                  Out of stock
                </div>
              )}
            </div>
            <div className="text-gray-500 md:max-w-[428px] max-w-[308px] md:text-base text-[13px]">
              {product.description}
            </div>

            {/* 2 buttons */}
            <div className="flex gap-6 text-sm">
              {quant === 0 ? (
                <PrimaryButton
                  onClick={() =>
                    dispatch(increaseProduct({ id: product._id, token: token }))
                  }
                >
                  <p className="px-3 py-2">Add To Cart</p>
                </PrimaryButton>
              ) : (
                <div className="py-3 text-white flex gap-3 w-[135px] items-center justify-around border border-gray rounded-md bg-[#5048E5]">
                  <button onClick={() => decrementQuantity(product._id)}>
                    {' '}
                    -{' '}
                  </button>
                  <span> {quant}</span>
                  <button
                    onClick={() =>
                      dispatch(
                        increaseProduct({ id: product._id, token: token }),
                      )
                    }
                  >
                    {' '}
                    +{' '}
                  </button>
                </div>
              )}

              {user.id === product.vendor && (
                <Link to={`/editProduct/${id}`}>
                  <button className="flex bg-white text-black py-3 w-[135px] rounded-md border-2 border-gray-200 hover:drop-shadow-lg justify-center font-semibold">
                    Edit
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
