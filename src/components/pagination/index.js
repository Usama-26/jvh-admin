import React, { useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

function Pagination({
  currentPage,
  totalPages,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  totalResults,
}) {
  const pageLimit = 5;
  const halfLimit = Math.floor(pageLimit / 2);
  const startPage = Math.max(1, currentPage - halfLimit);
  const endPage = Math.min(totalPages, currentPage + halfLimit);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const handleRowsPerPageChange = (perPage) => {
    onRowsPerPageChange(perPage);
  };

  return (
    <div className="py-4 px-4 flex justify-between items-center rounded bg-[#121212] text-xs text-gray-400">
      {/* <span>
        Showing{" "}
        {`${(currentPage - 1) * 10 + 1}-${Math.min(
          currentPage * 10,
          totalResults
        )}`}{" "}
        of {totalResults}
      </span> */}
      <span>
        Showing{" "}
        {`${(currentPage - 1) * rowsPerPage + 1}-${Math.min(
          currentPage * rowsPerPage,
          totalResults
        )}`}{" "}
        of {totalResults}
      </span>
      <div className="flex items-center gap-2">
        <label htmlFor="perPage">Rows per page:</label>
        <select
          className="p-1 bg-transparent rounded border border-gray-500"
          name="perPage"
          id="perPage"
          value={rowsPerPage}
          onChange={(e) => handleRowsPerPageChange(parseInt(e.target.value))}
        >
          {[10, 20, 30, 50, 100].map((value) => (
            <option className="text-[#121212] " key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <select
          name="pageNo"
          id="pageNo"
          value={currentPage}
          onChange={(e) => handlePageChange(parseInt(e.target.value))}
          className="p-1 bg-[#2B2B2B] rounded"
        >
          {pageNumbers.slice(startPage - 1, endPage).map((page) => (
            <option className="text-[#121212] bg-white" key={page} value={page}>
              {page}
            </option>
          ))}
        </select>
        <button
          className="border border-gray-400 p-1 rounded"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <BiChevronLeft className="w-4 h-4" />
        </button>
        <button
          className="border border-gray-400 p-1 rounded"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <BiChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
