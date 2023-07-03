type BacgroundProps = {
  children: React.ReactNode;
  title: String;
};

export default function Bacground({ children, title }: BacgroundProps) {
  return (
    <div className="page">
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="text-3xl font-bold text-gray-900 mt-2 mb-9 text-center">
            <h1>{title}</h1>

            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
