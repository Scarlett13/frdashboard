type ButtonProps = {
  buttonname: string;
  style?: string;
  onClick?: any;
  isLoading?: boolean;
  children?: React.ReactNode;
};
export default function Button({
  buttonname,
  style,
  onClick,
  children,
  isLoading,
}: ButtonProps) {
  return (
    <button
      className={
        `py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm${
          isLoading ? "animate-pulse" : ""
        }` + ` ${style}`
      }
      onClick={isLoading ? undefined : onClick}
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : buttonname}
      {children}
    </button>
  );
}
