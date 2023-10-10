import React from "react";

function Pagination({ currentPage, totalPages, handleClick }) {
  const pageLimit = 5;
  const halfLimit = Math.floor(pageLimit / 2);
  const startPage = Math.max(1, currentPage - halfLimit);
  const endPage = Math.min(totalPages, currentPage + halfLimit);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className="flex justify-center mt-4">
      {currentPage > 1 && (
        <li>
          <a
            href="#"
            className="py-2 px-3 leading-tight text-[8px] md:text-[16px] text-gray-800"
            onClick={(e) => {
              e.preventDefault();
              handleClick(currentPage - 1);
            }}
          >
            Previous
          </a>
        </li>
      )}

      {startPage > 2 && (
        <li>
          <span className="py-2 px-3 text-[8px] md:text-[16px] leading-tight text-gray-800">
            ...
          </span>
        </li>
      )}

      {pageNumbers.slice(startPage - 1, endPage).map((pageNumber) => (
        <li key={pageNumber}>
          <a
            href="#"
            className={`py-2 px-3 leading-tight text-[8px] md:text-[16px]  ${
              pageNumber === currentPage ? "text-blue-800 " : "text-gray-800 "
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleClick(pageNumber);
            }}
          >
            {pageNumber}
          </a>
        </li>
      ))}

      {endPage < totalPages - 1 && (
        <li>
          <span className="py-2 px-3 text-[8px] md:text-[16px] leading-tight text-gray-800">
            ...
          </span>
        </li>
      )}

      {currentPage < totalPages && (
        <li>
          <a
            href="#"
            className="py-2 px-3 leading-tight text-[8px] md:text-[16px] text-gray-800"
            onClick={(e) => {
              e.preventDefault();
              handleClick(currentPage + 1);
            }}
          >
            Next
          </a>
        </li>
      )}

      {currentPage > 1 && (
        <li>
          <a
            href="#"
            className="py-2 px-3 leading-tight text-[8px] md:text-[16px] text-gray-800"
            onClick={(e) => {
              e.preventDefault();
              handleClick(1);
            }}
          >
            First
          </a>
        </li>
      )}

      {currentPage < totalPages && (
        <li>
          <a
            href="#"
            className="py-2 px-3 leading-tight text-[8px] md:text-[16px] text-gray-800"
            onClick={(e) => {
              e.preventDefault();
              handleClick(totalPages);
            }}
          >
            Last
          </a>
        </li>
      )}
    </ul>
  );
}

export default Pagination;
