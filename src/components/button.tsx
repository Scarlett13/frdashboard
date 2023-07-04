type ButtonProps = {
  buttonname: string;
};
export default function Button({ buttonname }: ButtonProps) {
  return (
    <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm mt-4">
      {buttonname}
    </button>
  );
}
