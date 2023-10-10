import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";

export function SearchBar({ onClick, onChange, placeholder }) {
  return (
    <div className="relative">
      <input
        type="text"
        className="lg:w-80 sm:w-72 w-60 py-2 px-4 pr-8 rounded-full bg-[#F2F2F2] border-gray-300 border outline-gray-400 bg-transparent placeholder:text-sm text-sm z-0"
        placeholder={placeholder || "Search"}
        // value={search}
        onChange={onChange}
      />
      <button
        type="button"
        className="absolute top-1 right-1 z-20 hover:bg-slate-700 p-1.5 rounded-full"
        onClick={onClick}
      >
        <RiSearchLine className="w-4 h-4 fill-gray-300 " />
      </button>
    </div>
  );
}
