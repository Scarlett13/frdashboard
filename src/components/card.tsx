type CardProps = {
  children: React.ReactNode;
};

export default function Card({ children }: CardProps) {
  return (
    <div className="min-w-full w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
      <div>{children}</div>
    </div>
  );
}
