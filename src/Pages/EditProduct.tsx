import type React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import PrimaryButton from '../Components/PrimaryButton';

interface EditProductInput {
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  image: string;
}

enum Category {
  category1 = 'category1',
  category2 = 'category2',
  category3 = 'category3',
}
const EditProduct: React.FC = () => {
  const { register, handleSubmit } = useForm<EditProductInput>();
  const onSubmit: SubmitHandler<EditProductInput> = data => {
    console.log(data);
  };
  return (
    <div className="flex flex-col w-screen items-center my-10">
      {/*title*/}
      <div className="flex w-2/5 min-w-[344px] mb-6 justify-center sm:justify-start">
        <h1 className="font-sans font-bold text-2xl">Create Product</h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center w-2/5 min-w-[344px] h-[1035px] sm:h-[839px] justify-center bg-white shadow-xl"
      >
        {/*Product Name*/}
        <div className="flex w-5/6 min-w-[310px] flex-col items-center mb-6">
          <label
            htmlFor="name"
            className="font-semibold text-neutral-500 self-start"
          >
            Product Name
          </label>
          <input
            {...register('name')}
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
            {...register('description')}
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
              {...register('category')}
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
              {...register('price')}
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
              {...register('stock')}
              className="h-14 w-full border-[1px] rounded-sm px-2"
            />
          </div>
          <div className="relative w-full sm:w-2/3 ml-0 sm:ml-1 mb-6 sm:mb-0">
            <label htmlFor="image" className="font-semibold text-neutral-500">
              Add Image Link
            </label>
            <input
              {...register('image')}
              className="h-14 w-full border-[1px] rounded-sm px-2"
            />
            <div className="absolute bottom-0 right-0 mb-[0.625rem] mr-4">
              <PrimaryButton>
                <p className="py-1 px-3 text-white text-sm font-semibold">
                  Upload
                </p>
              </PrimaryButton>
            </div>
          </div>
        </div>
        {/*Image preview*/}
        <div className="w-3/5 min-w-[310px] h-[200px] border-2 border-dashed mb-6"></div>
        {/*Add btn*/}
        <div className="w-5/6 flex flex-row justify-center sm:justify-start">
          <PrimaryButton>
            <p className="py-2 px-6 text-white text-sm font-semibold">
              Add Product
            </p>
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
