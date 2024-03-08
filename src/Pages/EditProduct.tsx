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
    <div className="flex w-screen justify-center my-10 ">
      <div className="flex flex-col items-center justify-center">
        {/*title*/}
        <h1 className="text-center font-sans font-bold text-lg md:text-3xl self-start mb-5">
          Create Product
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center w-[660px] h-[839px] justify-evenly bg-white"
        >
          {/*Product Name*/}
          <div className="flex flex-col items-center">
            <label
              htmlFor="name"
              className="font-semibold text-neutral-500 self-start"
            >
              Product Name
            </label>
            <input
              {...register('name')}
              className="h-14 w-[564px] border-[1px] rounded-sm px-2"
            />
          </div>
          {/*Product Description*/}
          <div className="flex flex-col items-center">
            <label
              htmlFor="description"
              className="font-semibold text-neutral-500 self-start"
            >
              Product Description
            </label>
            <textarea
              {...register('description')}
              className="h-[135px] w-[564px] border-[1px] rounded-sm px-2"
            />
          </div>
          {/*Product Category & Price*/}
          <div className="flex flex-row w-[564px] justify-between">
            <div>
              <label
                htmlFor="category"
                className="font-semibold text-neutral-500"
              >
                Category
              </label>
              <select
                {...register('category')}
                className="h-14 w-[278px] border-[1px] rounded-sm px-3"
              >
                <option value={Category.category1}>Category 1</option>
                <option value={Category.category2}>Category 2</option>
                <option value={Category.category3}>Category 3</option>
              </select>
            </div>
            <div>
              <label htmlFor="price" className="font-semibold text-neutral-500">
                Price
              </label>
              <input
                {...register('price')}
                className="h-14 w-[278px] border-[1px] rounded-sm px-2"
              />
            </div>
          </div>
          {/*In Stock Quantity & Image Link*/}
          <div className="flex flex-row w-[564px] justify-between">
            <div>
              <label htmlFor="stock" className="font-semibold text-neutral-500">
                In Stock Quantity
              </label>
              <input
                {...register('stock')}
                className="h-14 w-[278px] border-[1px] rounded-sm px-2"
              />
            </div>
            <div>
              <label htmlFor="image" className="font-semibold text-neutral-500">
                Add Image Link
              </label>
              <input
                {...register('image')}
                className="h-14 w-[278px] border-[1px] rounded-sm px-2"
              />
            </div>
          </div>
          {/*Image preview*/}
          <div className="w-[388px] h-[200px] border-2 border-dashed"></div>
          {/*Add btn*/}
          <div className="w-[564px] flex flex-row rounded-sm">
            <PrimaryButton className="self-start">
              <p className="py-3 px-7 text-white text-sm font-semibold">
                Add Product
              </p>
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
