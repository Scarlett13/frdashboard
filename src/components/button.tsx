type ButtonProps = {
  buttonname: string;
  style?: string;
  onClick?: any;
  children?: React.ReactNode;
};
export default function Button({
  buttonname,
  style,
  onClick,
  children,
}: ButtonProps) {
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
      {children}
    </button>
  );
}
