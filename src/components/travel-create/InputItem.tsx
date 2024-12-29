import { forwardRef } from 'react';
import { Input } from '../common/Input';

type InputItemProps = {
  required?: boolean;
  margin?: string;
  type: string;
  name: string;
  placeholder?: string;
  title: string;
};

export const InputItem = forwardRef<HTMLInputElement, InputItemProps>(
  ({ required, type, margin, name, placeholder, title }, ref) => {
    return (
      <div className={margin}>
        <h1 className="mt-4 mb-2.5 text-primary-100 text-lg">{title}</h1>
        <Input
          ref={ref}
          required={required}
          type={type}
          name={name}
          bgColor="bg-white"
          borderColor="border-primary-200 focus:border-secondary-300"
          placeholder={placeholder}
        />
      </div>
    );
  }
);