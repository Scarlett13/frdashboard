type ButtonProps = {
  buttonname: string;
  style?: string;
  onClick?: any;
};
export default function Button({ buttonname, style, onClick }: ButtonProps) {
  return (
    <button
      className={
        "py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm mt-4" +
        " " +
        style
      }
      onClick={onClick}
    >
      {buttonname}
    </button>
  );
}
