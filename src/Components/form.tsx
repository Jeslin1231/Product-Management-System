import type React from 'react';
import { Link } from 'react-router-dom';

interface FormProps {
  title: string;
  children?: React.ReactNode;
}

const Form: React.FC<FormProps> = props => {
  return (
    <div className="flex flex-col bg-white rounded-xl w-2/5 h-3/4 m-auto items-center">
      <div className="self-end pt-2 pr-4">
        <Link to="/" className="font-bold text-xl">
          &#x2715;
        </Link>
      </div>
      <h1 className="font-sans font-bold text-3xl text-center pt-2 pb-5">
        {props.title}
      </h1>
      {props.children}
    </div>
  );
};

export default Form;
