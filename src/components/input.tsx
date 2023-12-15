import { MutableRefObject, ChangeEvent } from "react";

type InputProps = {
  title: string;
  placeholder: string;
  type: string;
  value?: string;
  valueRef?: MutableRefObject<string>;
  name?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  title,
  placeholder,
  type,
  value,
  valueRef,
  name,
  onChange,
}: InputProps) {
  return (
    <div className="pt-4">
      <label htmlFor="" className="font-bold text-gray-600 block">
        {title}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded mt-1"
        defaultValue={value}
        onChange={(e) => {
          if (valueRef) {
            valueRef.current = e.target.value;
          }
          if (onChange) {
            onChange(e);
          }
        }}
      />
    </div>
  );
}
