import type React from 'react';

interface InputGroupProps {
  for: string;
  label: string;
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  valid: boolean;
  show?: React.ReactNode;
}

const InputGroup: React.FC<InputGroupProps> = props => {
  let borderColor = 'border-gray-300';
  let hint;
  if (!props.valid) {
    borderColor = 'border-red-500';
    hint = <p className="text-red-500 text-sm">Invalid {props.for} input!</p>;
  }
  return (
    <div>
      <label
        htmlFor={props.for}
        className="text-sm md:text-lg text-gray-500 pb-1.5"
      >
        {props.label}
      </label>
      <div className="relative">
        <input
          type={props.type}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          className={`border ${borderColor} h-10 md:h-12 w-full rounded-sm focus:border-blue-600 block p-1 md:p-2.5 text-gray-700`}
          placeholder={props.placeholder}
        />
        {props.show}
      </div>
      {hint}
    </div>
  );
};

export default InputGroup;
