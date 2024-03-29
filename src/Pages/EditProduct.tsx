import type React from 'react';
import { useState, useEffect } from 'react';
import PrimaryButton from '../Components/PrimaryButton';
import { useAppSelector } from '../app/hooks';
import { selectUser } from '../features/users/UserSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { get, post } from '../utils/network';

enum Category {
  category1 = 'Category 1',
  category2 = 'Category 2',
  category3 = 'Category 3',
}
const EditProduct: React.FC = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const param = useParams();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: Category.category1,
    price: '',
    stock: '',
    imgUrl: '',
  });
  if (!user.logged) {
    navigate('/login');
  }

  if (user.role === 'customer') {
    navigate('/');
  }

  useEffect(() => {
    const fetchData = async () => {
      if (param.id) {
        try {
          const response = await get(
            `http://localhost:3000/product/get_product/${param.id}`,
          );
          if (response.ok) {
            const data = await response.json();
            if (data.product.vendor !== user.id) {
              navigate('/');
            }
            setProduct(data.product);
          } else {
            navigate('/error');
          }
        } catch (error) {
          navigate('/error');
        }
      }
    };

    fetchData();
  }, [navigate, user, param]);

  const [image, setImage] = useState('');

  return (
    <div className="flex flex-col w-screen items-center my-10">
      {/*title*/}
      <div className="flex w-1/2 min-w-[344px] mb-6 justify-center sm:justify-start">
        <h1 className="font-sans font-bold text-2xl">
          {product._id ? 'Edit Product' : 'Create Product'}
        </h1>
      </div>
      <form className="flex flex-col items-center w-1/2 min-w-[344px] h-[1035px] sm:h-[839px] justify-center bg-white shadow-xl">
        {/*Product Name*/}
        <div className="flex w-5/6 min-w-[310px] flex-col items-center mb-6">
          <label
            htmlFor="name"
            className="font-semibold text-neutral-500 self-start"
          >
            Product Name
          </label>
          <input
            name="name"
            value={product.name}
            onChange={e => setProduct({ ...product, name: e.target.value })}
            className="h-14 w-full border-[1px] rounded-sm px-2"
          />
        </div>
        {/*Product Description*/}
        <div className="flex w-5/6 min-w-[310px] flex-col items-center mb-6">
          <label
            htmlFor="description"
            className="font-semibold text-neutral-500 self-start"
          >
            Product Description
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={e =>
              setProduct({ ...product, description: e.target.value })
            }
            className="h-[135px] w-full border-[1px] rounded-sm px-2"
          />
        </div>
        {/*Product Category & Price*/}
        <div className="flex flex-col sm:flex-row w-5/6 min-w-[310px] justify-between mb-0 sm:mb-6">
          <div className="w-full sm:w-1/2 mr-0 sm:mr-1 mb-6 sm:mb-0">
            <label
              htmlFor="category"
              className="font-semibold text-neutral-500"
            >
              Category
            </label>
            <select
              name="category"
              value={product.category}
              onChange={e =>
                setProduct({ ...product, category: e.target.value })
              }
              className="h-14 w-full border-[1px] rounded-sm px-3"
            >
              <option value={Category.category1}>Category 1</option>
              <option value={Category.category2}>Category 2</option>
              <option value={Category.category3}>Category 3</option>
            </select>
          </div>
          <div className="w-full sm:w-1/2 ml-0 sm:ml-1 mb-6 sm:mb-0">
            <label htmlFor="price" className="font-semibold text-neutral-500">
              Price
            </label>
            <input
              name="price"
              value={product.price}
              onChange={e => setProduct({ ...product, price: e.target.value })}
              className="h-14 w-full border-[1px] rounded-sm px-2"
            />
          </div>
        </div>
        {/*In Stock Quantity & Image Link*/}
        <div className="flex flex-col sm:flex-row w-5/6 min-w-[310px] justify-between mb-0 sm:mb-6">
          <div className="w-full sm:w-1/3 mr-0 sm:mr-1 mb-6 sm:mb-0">
            <label htmlFor="stock" className="font-semibold text-neutral-500">
              In Stock Quantity
            </label>
            <input
              name="stock"
              value={product.stock}
              onChange={e => setProduct({ ...product, stock: e.target.value })}
              className="h-14 w-full border-[1px] rounded-sm px-2"
            />
          </div>
          <div className="relative w-full sm:w-2/3 ml-0 sm:ml-1 mb-6 sm:mb-0">
            <label htmlFor="imgUrl" className="font-semibold text-neutral-500">
              Add Image Link
            </label>
            <input
              name="imgUrl"
              value={product.imgUrl}
              onChange={e => setProduct({ ...product, imgUrl: e.target.value })}
              className="h-14 w-full border-[1px] rounded-sm px-2"
            />
            <div className="absolute bottom-0 right-0 mb-[0.625rem] mr-4">
              <PrimaryButton
                onClick={() => {
                  setImage(product.imgUrl);
                }}
              >
                <p className="py-1 px-3 text-white text-sm font-semibold">
                  Upload
                </p>
              </PrimaryButton>
            </div>
          </div>
        </div>
        {/*Image preview*/}
        <div className="flex flex-col w-3/5 min-w-[310px] h-[200px] border-2 border-dashed mb-6 justify-center items-center">
          {image === '' ? (
            <>
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.255 17.5C16.7475 17.5 17.2351 17.403 17.6901 17.2145C18.145 17.0261 18.5584 16.7499 18.9067 16.4017C19.2549 16.0534 19.5311 15.64 19.7196 15.1851C19.908 14.7301 20.005 14.2425 20.005 13.75C20.005 13.2575 19.908 12.7699 19.7196 12.3149C19.5311 11.86 19.2549 11.4466 18.9067 11.0983C18.5584 10.7501 18.145 10.4739 17.6901 10.2855C17.2351 10.097 16.7475 10 16.255 10C15.2604 10 14.3066 10.3951 13.6034 11.0983C12.9001 11.8016 12.505 12.7554 12.505 13.75C12.505 14.7446 12.9001 15.6984 13.6034 16.4017C14.3066 17.1049 15.2604 17.5 16.255 17.5Z"
                  fill="#E5E5E5"
                />
                <path
                  d="M35 35C35 36.3261 34.4732 37.5979 33.5355 38.5355C32.5979 39.4732 31.3261 40 30 40H10C8.67392 40 7.40215 39.4732 6.46447 38.5355C5.52678 37.5979 5 36.3261 5 35V5C5 3.67392 5.52678 2.40215 6.46447 1.46447C7.40215 0.526784 8.67392 0 10 0L23.75 0L35 11.25V35ZM10 2.5C9.33696 2.5 8.70107 2.76339 8.23223 3.23223C7.76339 3.70107 7.5 4.33696 7.5 5V30L13.06 24.44C13.257 24.2434 13.514 24.1182 13.7903 24.0843C14.0665 24.0503 14.3462 24.1095 14.585 24.2525L20 27.5L25.3925 19.95C25.498 19.8024 25.6344 19.6796 25.7921 19.59C25.9499 19.5005 26.1252 19.4463 26.306 19.4313C26.4868 19.4164 26.6687 19.4409 26.839 19.5033C27.0094 19.5656 27.1641 19.6643 27.2925 19.7925L32.5 25V11.25H27.5C26.5054 11.25 25.5516 10.8549 24.8483 10.1517C24.1451 9.44839 23.75 8.49456 23.75 7.5V2.5H10Z"
                  fill="#E5E5E5"
                />
              </svg>
              <p className="text-neutral-500 text-sm text-center">
                image preview
              </p>
            </>
          ) : (
            <img src={image} alt="product" className="h-full" />
          )}
        </div>
        {/*Add btn*/}
        <div className="w-5/6 flex flex-row justify-center sm:justify-start">
          <PrimaryButton
            onClick={async () => {
              try {
                if (product._id) {
                  console.log(product);
                  const response = await post(
                    'http://localhost:3000/product/update_product',
                    {
                      headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': user.token,
                      },
                      body: JSON.stringify(product),
                    },
                  );
                  if (response.ok) {
                    navigate('/');
                  } else {
                    navigate('/error');
                  }
                } else {
                  console.log(product);
                  const response = await post(
                    'http://localhost:3000/product/create_product',
                    {
                      headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': user.token,
                      },
                      body: JSON.stringify(product),
                    },
                  );
                  if (response.ok) {
                    navigate('/');
                  } else {
                    navigate('/error');
                  }
                }
              } catch (error) {
                navigate('/error');
              }
            }}
          >
            <p className="py-2 px-6 text-white text-sm font-semibold">
              {product._id ? 'Update Product' : 'Add Product'}
            </p>
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
