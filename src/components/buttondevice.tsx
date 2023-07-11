type ButtonDeviceProps = {
  buttonname: string;
  onClick?: any;
  children?: React.ReactNode;
};

export default function ButtonDevice({
  onClick,
  buttonname,
  children,
}: ButtonDeviceProps) {
  return (
    <button
      className={
        "py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm mt-4"
      }
      onClick={onClick}
    >
      <div>
        {buttonname}
        {children}
      </div>
    </button>
  );
}
