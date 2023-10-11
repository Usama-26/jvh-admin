import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export function TablePagination() {
  return (
    <div className="py-2 px-4 flex justify-between items-center rounded bg-[#121212] text-xs text-gray-400">
      <span>Showing 1 - 10 of 97</span>
      <div className="flex items-center gap-2">
        <label htmlFor="perPage">Rows per page:</label>
        <select
          className="p-1 bg-transparent rounded border border-gray-500"
          name="perPage"
          id="perPage"
        >
          {Array.from(
            {
              length: 10,
            },
            (_, index) => (
              <option
                className="text-[#121212] "
                key={index}
                value={(index + 1) * 10}
              >
                {(index + 1) * 10}
              </option>
            )
          )}
        </select>
        <select name="pageNo" id="pageNo" className="p-1 bg-[#2B2B2B] rounded ">
          {Array.from(
            {
              length: 10,
            },
            (_, index) => (
              <option
                className="text-[#121212] bg-white"
                key={index}
                value={index + 1}
              >
                {index + 1}
              </option>
            )
          )}
        </select>
        <button className="border border-gray-400 p-1 rounded">
          <BiChevronLeft className="w-4 h-4" />
        </button>
        <button className="border border-gray-400 p-1 rounded">
          <BiChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
