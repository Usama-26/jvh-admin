import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { IoMdArrowDropdown } from "react-icons/io";

const status = [{ name: "Online" }, { name: "Offline" }];

export default function OnlineOfflineDropdown({ onClick }) {
  const [selected, setSelected] = useState();

  const updateStatus = (e) => {
    setSelected(e);
    onClick(e.name);
  };
  useEffect(() => {
    setSelected(
      localStorage.getItem("userStatus") == "Online" ? status[0] : status[1]
    );
  }, []);

  return (
    <div className="mr-5">
      <Listbox value={selected} onChange={updateStatus}>
        <div className="relative mt-1">
          <Listbox.Button className="flex items-center border border-gray-300 cursor-pointer rounded-full bg-white py-1 px-3 text-left  focus:outline-none">
            <span className="block truncate">{selected?.name}</span>
            <IoMdArrowDropdown />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 rounded-xl w-24 bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {status.map((status, statusIdx) => (
                <Listbox.Option
                  key={statusIdx}
                  className={({ active }) =>
                    `relative cursor-pointer select-none p-2  ${
                      active ? "bg-red-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={status}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {status.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
