type PaginationProps = {
  currentPage: any;
  totalPages: any;
  onPageChange: any;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  return (
    <div className="flex justify-center mt-4">
      <nav className="block">
        <ul className="flex pl-0 list-none rounded my-2">
          {pageNumbers.map((number) => (
            <li key={number}>
              <a
                href="#"
                className={`text-sm px-4 py-2 leading-tight ${
                  currentPage === number ? "text-blue-500" : "text-gray-500"
                }`}
                onClick={() => onPageChange(number)}
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
