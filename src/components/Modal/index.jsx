import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { HiXMark } from "react-icons/hi2";

export default function Modal({ isOpen, closeModal, children }) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#1E1E1E] p-6 text-left align-middle shadow-xl transition-all">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="absolute top-4 right-4 rounded-full p-1 hover:bg-black/10"
                  >
                    <HiXMark className="w-5 h-5 stroke-1 stroke-white" />
                  </button>

                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
