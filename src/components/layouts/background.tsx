import logo from "@Images/logo.png";
import Image from "next/image";
type BacgroundProps = {
  children: React.ReactNode;
  title: String;
};

export default function Bacground({ children, title }: BacgroundProps) {
  return (
    <div className="page">
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
        <div className="max-w-md w-full mx-auto">
          <div className="font-bold text-gray-900 mt-2 mb-9 text-center flex flex-col justify-center items-center">
            <Image alt="alt text." src={logo} width={120} height={100} />
            <h1 className="text-3xl">{title}</h1>

            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}