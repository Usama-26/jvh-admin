import { TablePagination } from "@/components/TablePagination";
import Modal from "@/components/Modal";
import { SearchBar } from "@/components/SearchBar";
import AppLayout from "@/layouts/AppLayout";
import { FaDownload, FaPlus } from "react-icons/fa";
import { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import ModalOverlay from "@/components/ModalOverlay";
import Link from "next/link";
import { FiDownload } from "react-icons/fi";
import { IoMdEye } from "react-icons/io";
export default function ManageArtists() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto text-white p-4">
        <div className="bg-[#171717]">
          <div className="py-4">
            <h1 className="text-2xl font-semibold">Manage Artists</h1>
          </div>
          <div className="flex items-center justify-between text-white mb-8">
            <div>
              <SearchBar placeholder={"Search by Id"} />
            </div>
            <div className="basis-1/2 flex  justify-end gap-4 items-center font-medium">
              <button
                onClick={() => setIsInviteModalOpen(true)}
                className="btn-primary inline-block text-sm"
              >
                <span className="flex items-center gap-2">
                  <FaPlus className="w-4 h-4 inline" />
                  <span>Invite User</span>
                </span>
              </button>
              <button className="btn-primary inline-block text-sm">
                <span className="flex items-center gap-2">
                  <FiDownload className="w-4 h-4 inline" />
                  <span>Download</span>
                </span>
              </button>
            </div>
          </div>
        </div>
        <Table onEdit={() => setIsEditModalOpen(true)} />
        <EditModal
          isOpen={isEditModalOpen}
          closeModal={() => setIsEditModalOpen(false)}
        />
        <InviteModal
          isOpen={isInviteModalOpen}
          closeModal={() => setIsInviteModalOpen(false)}
        />
        <ModalOverlay isOpen={isEditModalOpen || isInviteModalOpen} />
      </div>
    </AppLayout>
  );
}

function Table({ onEdit }) {
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
              <th scope="col" className="table-head-cell text-center">
                Last Name
              </th>
              <th scope="col" className="table-head-cell text-center">
                Email
              </th>
              <th scope="col" className="table-head-cell text-center">
                Status
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
                <td className="table-body-cell">Barbara</td>
                <td className="table-body-cell text-center">Toich</td>
                <td className="table-body-cell text-center">
                  batoich@yahoo.com
                </td>
                <td className="table-body-cell text-center">
                  <span className="inline-block w-5 h-5 rounded-full bg-green-500"></span>
                </td>

                <td className="table-body-cell text-center">
                  <span className="inline-flex gap-3">
                    <Link
                      href={"/admin/manage/artists/view"}
                      className="p-1 rounded-full hover:bg-gray-500"
                    >
                      <IoMdEye className="w-4 h-4 " />
                    </Link>
                    <button
                      onClick={onEdit}
                      className="p-1 rounded-full hover:bg-gray-500"
                    >
                      <MdEdit className="w-4 h-4" />
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

function EditModal({ isOpen, closeModal }) {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="text-white space-y-8 p-4">
        <h1 className="font-semibold text-2xl text-center">Artist Status</h1>
        <form className="flex justify-around">
          <span>
            <input type="radio" id="inactive" name="status" />
            <label htmlFor="inactive" className="ml-2 inline-block">
              Inactive
            </label>
          </span>
          <span>
            <input type="radio" id="active" name="status" />
            <label htmlFor="active" className="ml-2 inline-block">
              Active
            </label>
          </span>
        </form>
        <div className="flex justify-center gap-4">
          <button className="py-2 px-8 font-medium rounded  bg-[#687182]">
            Cancel
          </button>
          <button className="py-2 px-8 font-medium rounded btn-gradient ">
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}
function InviteModal({ isOpen = true, closeModal }) {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="text-white space-y-8 p-4">
        <h1 className="font-semibold text-2xl text-center">Invite Artist</h1>
        <form className="space-y-6">
          <input type="email" className="form-input" placeholder="Email" />
          <select className="form-input">
            <option value="exhibitions">Exhibitions</option>
          </select>
          <span className="inline-block">
            <input type="checkbox" id="inactive" name="invite" />
            <label htmlFor="inactive" className="ml-2 inline-block">
              Invite without exhibition
            </label>
          </span>
        </form>
        <div className="flex justify-center gap-4">
          <button className="py-2 px-8 font-medium rounded  bg-[#687182]">
            Cancel
          </button>
          <button className="py-2 px-8 font-medium rounded btn-gradient ">
            Send
          </button>
        </div>
      </div>
    </Modal>
  );
}
