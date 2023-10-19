import React, { useEffect, useState } from "react";
import { TablePagination } from "@/components/TablePagination";
import Modal from "@/components/Modal";
import { SearchBar } from "@/components/SearchBar";
import AppLayout from "@/layouts/AppLayout";
import { FaDownload, FaPlus } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import ModalOverlay from "@/components/ModalOverlay";
import Link from "next/link";
import { withAuth } from "@/components/Helpers/withAuth";
import FeaturesRepository from "@/repositories/FeaturesRepository";
import Pagination from "@/components/pagination";
import moment from "moment";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const ManageExhibitions = (props) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [exhibitions, setExhibitions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [selectedID, setSelectedID] = useState();

  const getExhibitions = async (number) => {
    try {
      const { results } = await FeaturesRepository.getExhibitions(number);
      setExhibitions(results);
    } catch (error) {}
  };

  useEffect(() => {
    getExhibitions(currentPage);
  }, []);
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    getExhibitions(pageNumber);
  };
  const perPageShow = (pageNumber) => {
    setCurrentPage(pageNumber);
    getExhibitions(pageNumber);
  };

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
        <Table
          onDelete={(id) => {
            setIsDeleteModalOpen(true);
            setSelectedID(id);
          }}
          data={exhibitions}
          currentPage={currentPage}
          recordsPerPage={recordsPerPage}
        />
        <Pagination
          currentPage={currentPage}
          totalResults={exhibitions.totalResults}
          totalPages={exhibitions.totalPages}
          onPageChange={handleClick}
          onRowsPerPageChange={perPageShow}
        />
        <DeleteModal
          isOpen={isDeleteModalOpen}
          closeModal={() => setIsDeleteModalOpen(false)}
          selectedId={selectedID}
          onClick={() => getExhibitions(currentPage)}
        />
        <ModalOverlay isOpen={isDeleteModalOpen} />
      </div>
    </AppLayout>
  );
};

export default withAuth(ManageExhibitions);

function Table({ onDelete, data, currentPage, recordsPerPage }) {
  const router = useRouter();
  const handleEdit = (item) => {
    const data = {
      ...item,
    };
    router.push(
      {
        pathname: "/admin/manage/exhibitions/edit",
        query: { data: JSON.stringify(data) },
      },
      "/admin/manage/exhibitions/edit"
    );
  };
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
            {data?.results?.map((item, i) => (
              <>
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
                  <td className="table-body-cell">
                    {i + 1 + (currentPage - 1) * recordsPerPage}
                  </td>
                  <td className="table-body-cell">{item?.Name}</td>
                  <td className="table-body-cell text-center">
                    {item?.Reference}
                  </td>
                  <td className="table-body-cell text-center">
                    {item?.Category}
                  </td>
                  <td className="table-body-cell text-center">
                    {item?.Users?.length}
                  </td>
                  <td className="table-body-cell text-center">
                    {item?.Items?.length}
                  </td>
                  <td className="table-body-cell text-center">
                    {moment(item?.StartDate).format("Do MMM YYYY")}
                  </td>
                  <td className="table-body-cell text-center">
                    {moment(item?.EndDate).format("Do MMM YYYY")}
                  </td>
                  <td className="table-body-cell text-center">
                    <span className="inline-flex gap-3">
                      <button
                        href={"/admin/manage/exhibitions/edit"}
                        className="p-1 rounded-full hover:bg-gray-500"
                        onClick={() => handleEdit(item)}
                      >
                        <MdEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(item?.id)}
                        className="p-1 rounded-full hover:bg-gray-500"
                      >
                        <MdDelete className="w-4 h-4 fill-[#EA0000]" />
                      </button>
                    </span>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function DeleteModal({ isOpen, closeModal, selectedId, onClick }) {
  const deleteExhibition = async () => {
    let id = selectedId;
    try {
      const { results } = await FeaturesRepository.deleteExhibition(id);
      toast.success("Exhibition Deleted Successfully", {});
      onClick();
      closeModal();
    } catch (error) {
      toast.error(error, {});
      closeModal();
    }
  };
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
          <button
            type="button"
            className="py-2 px-8 font-medium rounded  bg-[#EA0000]"
            onClick={() => deleteExhibition()}
          >
            Yes
          </button>
          <button
            type="button"
            className="py-2 px-8 font-medium rounded bg-[#687182]"
            onClick={closeModal}
          >
            No
          </button>
        </div>
      </div>
    </Modal>
  );
}
