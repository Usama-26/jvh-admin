/* eslint-disable @next/next/no-img-element */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import ModalOverlay from "../ModalOverlay";

const ModalSuccess = ({ isOpen, closeModal, openModal, children, message }) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-100"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="absolute top-4 right-4"
                  >
                    <HiXMark />
                  </button>

                  <div className=" mx-auto  flex flex-col items-center justify-between mt-4">
                    <img
                      src="/desktop/success.png"
                      alt=""
                      className="w-[90px] h-[90px]"
                    />
                    <h1 className="mt-5 font-semibold font-montserrat text-[21px]">
                      {message}
                    </h1>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <ModalOverlay isOpen={isOpen} />
    </>
  );
};
export default ModalSuccess;
