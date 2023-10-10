/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { IoMdSettings } from "react-icons/io";
import { IoMdTrash, IoIosNotifications } from "react-icons/io";
import Modal from "@/components/Modal";
import Spinner from "../svgs/spinner";
import ModalOverlay from "../ModalOverlay";
import { Dialog, Tab } from "@headlessui/react";
import Repository, {
  baseUrl,
  getError,
} from "@/repositories/genericRepository";
import { toast } from "react-toastify";
import { NotificationGear } from "../NotificationGear";

export function CleardataGear({ link, clear, manageEmails, callBack }) {
  const [isAddBlogModal, setIsAddBlogModal] = useState(false);
  const [isOptionsModal, setIsOptionsModal] = useState(false);
  const [isNotificationsModal, setIsNotificationsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState([]);
  function openAddBlogModal() {
    setIsAddBlogModal(true);
  }
  function closeAddBlogModal() {
    setIsAddBlogModal(false);
  }
  function openIsOptionsModal() {
    setIsOptionsModal(true);
  }
  function closeIsOptionsModal() {
    setIsOptionsModal(false);
  }
  function openIsNotificationsModal() {
    setIsNotificationsModal(true);
  }
  function closeIsNotificationsModal() {
    setIsNotificationsModal(false);
  }

  const clearTableData = async () => {
    setLoading(true);
    try {
      const response = await Repository.delete(
        `${baseUrl}/generic/delete-table?${link}`
      );
      toast.success("Data cleared successfully", {});
      closeAddBlogModal();
      setLoading(false);
      callBack();
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error?.response?.data?.message, {});
      closeAddBlogModal();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOptionsModal(true)}
        className="bg-[#D32A3D] p-1 rounded-full"
      >
        <IoMdSettings className="stroke-white w-6 h-6" color="white" />
      </button>
      {(clear || manageEmails) && (
        <>
          {" "}
          <Modal
            isOpen={isOptionsModal}
            openModal={openIsOptionsModal}
            closeModal={closeIsOptionsModal}
          >
            <Dialog.Title
              as="h3"
              className="text-lg font-bold leading-6 text-black text-center mb-4"
            >
              Setting
            </Dialog.Title>

            <div className="flex flex-col items-center justify-between border p-2 mt-2 rounded-lg ">
              {clear && (
                <button
                  className="flex items-center gap-1 w-full hover:bg-slate-200 rounded-lg p-2 "
                  onClick={() => {
                    setIsAddBlogModal(true);
                    setIsOptionsModal(false);
                  }}
                >
                  <IoMdTrash className="stroke-white w-6 h-6" color="#D32A3D" />
                  Clear table data
                </button>
              )}
              {manageEmails && (
                <button
                  className="flex items-center gap-1 w-full hover:bg-slate-200 rounded-lg p-2 "
                  onClick={() => {
                    setIsOptionsModal(false);
                    setIsNotificationsModal(true);
                  }}
                >
                  <IoIosNotifications
                    className="stroke-white w-6 h-6"
                    color="#D32A3D"
                  />
                  Manage notification emails
                </button>
              )}
            </div>
          </Modal>
          <ModalOverlay
            isOpen={isAddBlogModal || isOptionsModal || isNotificationsModal}
          />
        </>
      )}

      <Modal
        isOpen={isAddBlogModal}
        openModal={openAddBlogModal}
        closeModal={closeAddBlogModal}
      >
        <Dialog.Title
          as="h3"
          className="text-lg font-bold leading-6 text-black text-center mb-4"
        >
          Clear Data
        </Dialog.Title>

        <span>
          Are you sure you want to clear this page data? This action can not be
          undo.
        </span>
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            type="button"
            className="bg-[#D32A3D] text-white px-8 py-1.5 rounded-full text-xl font-semibold flex items-center"
            disabled={loading}
            onClick={() => clearTableData()}
          >
            {loading && <Spinner />}
            Yes
          </button>
          <button
            type="button"
            className="bg-black text-white px-8 py-1.5 rounded-full text-xl font-semibold "
            onClick={closeAddBlogModal}
          >
            No
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={isNotificationsModal}
        openModal={openIsNotificationsModal}
        closeModal={closeIsNotificationsModal}
      >
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-black text-center mb-4"
        >
          Manage notification send emails
        </Dialog.Title>
        <NotificationGear />
        {/* <span className="text-[#D32A3D] cursor-pointer">Clear data!!</span> */}
      </Modal>
    </>
  );
}
