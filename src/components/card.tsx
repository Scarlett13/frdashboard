type CardProps = {
  children: React.ReactNode;
  style?: string;
};

export default function Card({ children, style }: CardProps) {
  return (
    <div className={`w-full bg-slate-50 ${style}`}>
      <div>{children}</div>
    </div>
  );
}
