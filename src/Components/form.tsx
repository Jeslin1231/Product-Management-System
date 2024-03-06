import type React from 'react';
import { Link } from 'react-router-dom';

interface FormProps {
  title?: string;
  children?: React.ReactNode;
}

const Form: React.FC<FormProps> = props => {
  return (
    <div className="flex flex-col bg-white rounded-xl w-11/12 md:w-4/5 lg:w-3/5 xl:w-2/5 h-5/6 md:h-3/4 m-auto items-center shadow-lg">
      <div className="self-end pt-2 pr-4">
        <Link to="/" className="font-bold text-sm md:text-xl">
          &#x2715;
        </Link>
      </div>
      {props.title && (
        <h1 className="font-sans font-bold text-lg md:text-3xl text-center pt-0 md:pt-2 pb-1.5 md:pb-5">
          {props.title}
        </h1>
      )}
      {props.children}
    </div>
  );
};

export default Form;
