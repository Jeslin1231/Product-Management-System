// components/PopupDropdown.tsx
import type React from 'react';
// import { debounce } from '../utils/function-utils';
import { get } from '../utils/network';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface SearchProps {
  searchTerm: string;
  // add other props here
}

interface Item {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  // add other properties here
}

const transformDataToItem = (data: any): Item => {
  return {
    id: data._id,
    name: data.name,
    image: data.imgUrl,
    price: data.price,
    description: data.description,
  };
};

const SearchDropDown: React.FC<SearchProps> = ({ searchTerm }) => {
  const [searchResults, setSearchResults] = useState<Item[]>([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/user/search_products?query=${searchTerm}`,
        );
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }
        const data = await response.json();
        const items = data.products.map(transformDataToItem);
        setSearchResults(items);
        // console.log(searchResults)
      } catch (error) {
        console.error('Error:', error as Error);
      }
    };

    if (searchTerm) {
      fetchSearchResults();
    }
  }, [searchTerm]);

  return (
    <div>
      <div className=" absolute z-20 mt-2 md:w-[528px] w-[326px] rounded-md shadow-lg">
        <div className="rounded-md bg-white shadow-xs">
          <div className="py-1">
            {searchResults.map(item => (
              <Link key={item.id} to={`/productDetail/${item.id}`}>
                <div className="flex gap-4 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
                  <img
                    className="h-[40px] w-[40px]"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="flex-col">
                    <p className="text-black font-bold">{item.name}</p>
                    <p>des: {item.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDropDown;
