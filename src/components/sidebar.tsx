export default function SideBar() {
  return (
    <div className="bg-gray-800 text-white w-64 h-screen flex flex-col">
      <div className="p-4">
        <h2 className="text-xl font-bold">Device</h2>
      </div>
      <nav className="flex-grow">
        <ul className="p-4">
          <li className="py-2">
            <a href="#" className="block text-white hover:underline">
              Device 1
            </a>
          </li>
          <li className="py-2">
            <a href="#" className="block text-white hover:underline">
              Device 2
            </a>
          </li>
          <li className="py-2">
            <a href="#" className="block text-white hover:underline">
              Device 3
            </a>
          </li>
          <li className="py-2">
            <a href="#" className="block text-white hover:underline">
              Device 4
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
