import type React from 'react';

interface InputGroupProps {
  for: string;
  label: string;
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const InputGroup: React.FC<InputGroupProps> = props => {
  return (
    <div>
      <label htmlFor={props.for} className="text-lg text-gray-500 pb-1.5">
        {props.label}
      </label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        className="border border-gray-300 h-12 w-full rounded-sm focus:border-blue-600 block p-2.5 text-gray-700"
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default InputGroup;
