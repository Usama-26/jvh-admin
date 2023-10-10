import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { HiXMark } from "react-icons/hi2";

export default function SelectedCategoriesModal({
  isOpen,
  closeModal,
  openModal,
  data,
}) {
  const d = data;

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4"
                  >
                    <HiXMark />
                  </button>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-black text-center"
                  >
                    App pricing form details
                  </Dialog.Title>
                  <div className="mt-2 rounded-lg p-4 border">
                    <div className="flex font-bold justify-between underline underline-offset-4">
                      <h5>Selection</h5>
                      <h5>Estimated Cost</h5>
                    </div>
                    <div className="rounded-lg border border-zinc-400 mt-2">
                      <div className="h-14 overflow-y-auto">
                        <h5 className="sticky top-0 font-semibold rounded-t-lg bg-slate-200 px-2">
                          Build
                        </h5>
                        {d?.service?.map((item) => (
                          <>
                            <div className="flex justify-between px-2">
                              <h5>{item.name}</h5>
                              <h5>{item.price}</h5>
                            </div>
                          </>
                        ))}
                      </div>
                      <div className=" scrollbar-thin h-24 overflow-y-auto">
                        <h5 className=" sticky top-0 font-semibold bg-slate-200 px-2">
                          Device Features
                        </h5>
                        {d?.devices?.map((item) => (
                          <div
                            key={item.name}
                            className="flex justify-between px-2"
                          >
                            <h5>{item.name}</h5>
                            <h5>{item.price}</h5>
                          </div>
                        ))}
                      </div>

                      <div className="scrollbar-thin h-24 overflow-y-auto">
                        <h5 className=" sticky top-0 font-semibold bg-slate-200 px-2">
                          Functionalities
                        </h5>
                        {d?.functionalities?.map((functionality) => (
                          <div
                            key={functionality.name}
                            className="flex justify-between px-2"
                          >
                            <h5>{functionality.name}</h5>
                            <h5>{functionality.price}</h5>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex font-bold justify-between">
                      <h5>Total</h5>
                      <h5>R {d?.total}</h5>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
