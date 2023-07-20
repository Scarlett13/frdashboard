type InputProps = {
  title: string;
  placeholder: string;
  type: string;
};

export default function Input({ title, placeholder, type }: InputProps) {
  return (
    <div className="pt-4">
      <label htmlFor="" className="font-bold text-gray-600 block">
        {title}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded mt-1"
      />
    </div>
  );
}
