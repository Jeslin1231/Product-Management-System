import React from 'react';
import Button from '../Components/purpleButton';

const Error = () => {
  return (
    <div>
      Error
      <div className="ml-4">
        <Button
          width="60"
          textSize="lg"
          fontWeight="medium"
          onClick={() => console.log('Another button clicked')}
        >
          Add Product
        </Button>
      </div>
    </div>
  );
};

export default Error;
