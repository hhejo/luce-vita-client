import { forwardRef } from 'react';
import { Input } from '../common/Input';

type InputItemProps = {
  required?: boolean;
  margins?: string;
  type: string;
  name: string;
  title: string;
};

export const InputItem = forwardRef<HTMLInputElement, InputItemProps>(
  ({ required, margins, type, name, title }, ref) => {
    return (
      <div className={margins}>
        <h1 className="my-2 text-primary-100 text-lg">{title}</h1>
        <Input
          ref={ref}
          required={required}
          type={type}
          name={name}
          bgColor="bg-white"
          borderColor="border-primary-200 focus:border-secondary-300"
        />
      </div>
    );
  }
);
