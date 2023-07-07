type CardProps = {
  children: React.ReactNode;
};

export default function Card({ children }: CardProps) {
  return (
    <div className="min-w-full w-full mx-auto  bg-white p-8 border border-gray-300 hover:scale-110 duration-200">
      <div>{children}</div>
    </div>
  );
}
