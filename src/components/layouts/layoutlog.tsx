import Navbar from "../navigations/navbar";

type LayoutLogProps = {
  children: React.ReactNode;
};

export default function LogLayout({ children }: LayoutLogProps) {
  return (
    <Navbar>
      <div className="h-screen overflow-y-hidden">
        <main>{children}</main>
      </div>
    </Navbar>
  );
}
