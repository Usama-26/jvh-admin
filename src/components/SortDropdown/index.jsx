import { Listbox } from "@headlessui/react";
import { useState } from "react";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

export default function SortDropdown({ onClick }) {
  const [sortDirection, setSortDirection] = useState("newest");

  const toggleSortDirection = () => {
    const newDirection = sortDirection === "oldest" ? "newest" : "oldest";
    setSortDirection(newDirection);
    onClick(newDirection);
  };

  return (
    <div className="relative">
      <Listbox>
        <Listbox.Button className={"cursor-pointer"}>
          {/* <div className="flex flex-col">
            <IoMdArrowDropup
              className={`w-4 h-4 ${sortDirection === "newest" ? "text-blue-500" : ""}`}
              onClick={toggleSortDirection}
            />
            <IoMdArrowDropdown
              className={`w-4 h-4 ${sortDirection === "oldest" ? "text-blue-500" : ""}`}
              onClick={toggleSortDirection}
            />
          </div> */}
          <a href="#"  onClick={toggleSortDirection}>
            <svg
              class="w-4 h-4 ml-1 mt-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
            </svg>
          </a>
        </Listbox.Button>
      </Listbox>
    </div>
  );
}
