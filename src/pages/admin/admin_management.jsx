import AppLayout from "@/layouts/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import { sendInvite } from "@/redux/auth/auth.actions";
import { withAuth } from "@/components/Helpers/withAuth";
import { MdDelete } from "react-icons/md";
import { TablePagination } from "@/components/TablePagination";
import { FaPlus } from "react-icons/fa";
import { SearchBar } from "@/components/SearchBar";
import Modal from "@/components/Modal";
import { useState } from "react";
import ModalOverlay from "@/components/ModalOverlay";

function AdminManagement() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isInviteModal, setIsInviteModal] = useState(false);
  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto p-4 text-white">
        <div className="basis-3/12 flex-1">
          <h1 className="text-xl font-semibold">Admin Management</h1>
        </div>
        <div className="flex items-center justify-between  my-8">
          <SearchBar placeholder={"Search Admin"} />
          <div className=" flex  justify-end gap-4 items-center font-medium">
            <button
              onClick={() => setIsInviteModal(true)}
              className="btn-primary inline-block text-sm"
            >
              <span className="flex items-center gap-2">
                <FaPlus className="w-4 h-4 inline" />
                <span>Invite User</span>
              </span>
            </button>
            <button className="btn-primary inline-block text-sm">
              <span className="flex items-center gap-2">
                <span>Pending Invites</span>
              </span>
            </button>
          </div>
        </div>
        <Table onDelete={() => setIsDeleteModalOpen(true)} />
        <DeleteModal
          isOpen={isDeleteModalOpen}
          closeModal={() => setIsDeleteModalOpen(false)}
        />
        <InviteModal
          isOpen={isInviteModal}
          closeModal={() => setIsInviteModal(false)}
        />
        <ModalOverlay isOpen={isDeleteModalOpen || isInviteModal} />
      </div>
    </AppLayout>
  );
}
export default AdminManagement;

function Table({ onDelete }) {
  return (
    <>
      <div className="mb-4 overflow-auto">
        <table className="min-w-full bg-[#1E1E1E] rounded divide-y table-fixed divide-gray-700">
          <thead className=" ">
            <tr className="border-b border-gray-500">
              <th scope="col" className="p-4 rounded-tl">
                <div className="flex items-center">
                  <input
                    id="checkbox-all"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="checkbox-all" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="table-head-cell">
                #
              </th>
              <th scope="col" className="table-head-cell">
                First Name
              </th>
              <th scope="col" className="table-head-cell">
                Last Name
              </th>
              <th scope="col" className="table-head-cell text-center">
                Email
              </th>
              <th
                scope="col"
                className="table-head-cell text-center rounded-tr"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="rounded-b">
            {Array.from({ length: 10 }, (_, i) => (
              <tr
                key={i}
                className=" odd:bg-[#121212] even:bg-[#2B2B2B] last:rounded-b"
              >
                <td className="p-4 w-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-1"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-table-1" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <td className="table-body-cell">{i + 1}</td>
                <td className="table-body-cell">Arslan </td>
                <td className="table-body-cell">Ahmad</td>
                <td className="table-body-cell text-center">
                  arslanahmad@gmail.com
                </td>

                <td className="table-body-cell text-center">
                  <span className="inline-flex gap-3">
                    <button
                      onClick={onDelete}
                      className="p-1 rounded-full hover:bg-gray-500"
                    >
                      <MdDelete className="w-4 h-4 fill-[#EA0000]" />
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination />
    </>
  );
}
function DeleteModal({ isOpen, closeModal }) {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="text-white space-y-8 p-4">
        <h1 className="font-semibold text-2xl text-center">Delete User</h1>
        <p className="text-center">
          Are you sure you want to delete Michael Fredrik?
        </p>
        <div className="flex justify-center gap-4">
          <button className="py-2 px-8 font-medium rounded  bg-[#EA0000]">
            Yes
          </button>
          <button className="py-2 px-8 font-medium rounded bg-[#687182]">
            No
          </button>
        </div>
      </div>
    </Modal>
  );
}
function InviteModal({ isOpen, closeModal }) {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="text-white space-y-8 p-4">
        <h1 className="font-semibold text-2xl text-center">Invite User</h1>
        <form>
          <input
            type="email"
            className="form-input  mb-8"
            placeholder="Email"
          />
          <div className="flex justify-center gap-4">
            <button className="py-2 px-8 font-medium rounded bg-[#687182]">
              Cancel
            </button>
            <button className="py-2 px-8 font-medium rounded  btn-gradient">
              Send
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
