import Navbar from "./navbar";

type LayoutLogProps = {
  children: React.ReactNode;
};

export default function LogLayout({ children }: LayoutLogProps) {
  return (
    <div className="h-screen">
      <Navbar>
        <main>{children}</main>
      </Navbar>
    </div>
  );
}
