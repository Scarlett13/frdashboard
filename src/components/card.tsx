type CardProps = {
  children: React.ReactNode;
  style?: string;
};

export default function Card({ children, style }: CardProps) {
  return (
    <div className={`bg-black w-full ${style}`}>
      <div>{children}</div>
    </div>
  );
}
