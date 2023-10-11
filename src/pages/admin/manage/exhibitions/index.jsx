import { TablePagination } from "@/components/TablePagination";
import Modal from "@/components/Modal";
import { SearchBar } from "@/components/SearchBar";
import AppLayout from "@/layouts/AppLayout";
import { FaDownload, FaPlus } from "react-icons/fa";
import { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import ModalOverlay from "@/components/ModalOverlay";
import Link from "next/link";
export default function ManageExhibitions() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto text-white p-4">
        <div className="bg-[#171717]">
          <div className="py-4">
            <h1 className="text-2xl font-semibold">Manage Exhibitions</h1>
          </div>
          <div className="flex items-center justify-between text-white mb-8">
            <div>
              <SearchBar placeholder={"Search by Exhibition Name"} />
            </div>
            <div className="basis-1/2 flex  justify-end gap-4 items-center font-medium">
              <button className="btn-danger inline-block text-sm">
                <span className="flex items-center gap-2">
                  <MdDelete className="w-4 h-4 inline" />
                  <span>Delete</span>
                </span>
              </button>
              <Link
                href={"/admin/manage/exhibitions/add"}
                className="btn-primary inline-block text-sm"
              >
                <span className="flex items-center gap-2">
                  <FaPlus className="w-4 h-4 inline" />
                  <span>Add Exhibition</span>
                </span>
              </Link>
              <button className="btn-primary inline-block text-sm">
                <span className="flex items-center gap-2">
                  <FaDownload className="w-4 h-4 inline" />
                  <span>Download</span>
                </span>
              </button>
            </div>
          </div>
        </div>
        <Table onDelete={() => setIsDeleteModalOpen(true)} />
        <DeleteModal
          isOpen={isDeleteModalOpen}
          closeModal={() => setIsDeleteModalOpen(false)}
        />
        <ModalOverlay isOpen={isDeleteModalOpen} />
      </div>
    </AppLayout>
  );
}

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
                Name
              </th>
              <th scope="col" className="table-head-cell text-center">
                Reference
              </th>
              <th scope="col" className="table-head-cell text-center">
                Category Group
              </th>
              <th scope="col" className="table-head-cell text-center">
                Users
              </th>
              <th scope="col" className="table-head-cell text-center">
                Items
              </th>
              <th scope="col" className="table-head-cell text-center">
                Starts
              </th>
              <th scope="col" className="table-head-cell text-center">
                Ends
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
                <td className="table-body-cell">100</td>
                <td className="table-body-cell">Alex Shabalala Ceramics</td>
                <td className="table-body-cell text-center">May 2023</td>
                <td className="table-body-cell text-center">Solo Exhibition</td>
                <td className="table-body-cell text-center">2</td>
                <td className="table-body-cell text-center">1</td>
                <td className="table-body-cell text-center">07 May 2023</td>
                <td className="table-body-cell text-center">07 May 2023</td>
                <td className="table-body-cell text-center">
                  <span className="inline-flex gap-3">
                    <Link
                      href={"/admin/manage/exhibitions/edit"}
                      className="p-1 rounded-full hover:bg-gray-500"
                    >
                      <MdEdit className="w-4 h-4" />
                    </Link>
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
        <h1 className="font-semibold text-2xl text-center">
          Delete Exhibition
        </h1>
        <p className="text-center">
          Are you sure you want to delete this exhibition? All linked
          submissions will also be deleted.
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
