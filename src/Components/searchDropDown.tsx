// components/PopupDropdown.tsx
import type React from 'react';

const SearchDropDown: React.FC = () => {
  // match search words
  const options = ['item1', 'item2', 'item3', 'item4'];

  return (
    <div>
      <div className=" absolute z-20 mt-2 md:w-[528px] w-[326px] rounded-md shadow-lg">
        <div className="rounded-md bg-white shadow-xs">
          <div className="py-1">
            {options.map((option, index) => (
              <div
                key={index}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDropDown;
