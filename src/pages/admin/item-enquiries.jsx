/* eslint-disable @next/next/no-img-element */
import AppLayout from "@/layouts/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import { sendInvite } from "@/redux/auth/auth.actions";
import { withAuth } from "@/components/Helpers/withAuth";
import { MdDelete } from "react-icons/md";
import { TablePagination } from "@/components/TablePagination";
import { IoMdEye } from "react-icons/io";
import { FiDownload } from "react-icons/fi";
import FeaturesRepository from "@/repositories/FeaturesRepository";
import { useState, useEffect } from "react";
import Pagination from "@/components/pagination";
import Modal from "@/components/Modal";
import ModalOverlay from "@/components/ModalOverlay";
import Image from "next/image";

const ItemEnquiries = (props) => {
  const userData = props.userData;
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const getInquiries = async (number, perPage) => {
    try {
      const { results } = await FeaturesRepository.getInquiry(number, perPage);
      setData(results);
    } catch (error) {}
  };
  useEffect(() => {
    getInquiries(currentPage, itemsPerPage);
  }, []);
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    getInquiries(pageNumber, itemsPerPage);
  };
  const perPageShow = (pageNumber) => {
    setItemsPerPage(pageNumber);
    getInquiries(currentPage, pageNumber);
  };
  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto p-4 ">
        <div className="flex items-center justify-between text-white my-8">
          <div className="basis-3/12 flex-1">
            <h1 className="text-xl font-semibold">Item Enquiries</h1>
          </div>
          <div className="basis-1/2 flex  justify-end gap-4 items-center font-medium">
            <button className="btn-danger inline-block text-sm">
              <span className="flex items-center gap-2">
                <MdDelete className="w-4 h-4 inline" />
                <span>Delete</span>
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
        <Table
          data={data}
          currentPage={currentPage}
          recordsPerPage={itemsPerPage}
        />
        <Pagination
          currentPage={currentPage}
          rowsPerPage={itemsPerPage}
          totalResults={data.totalResults}
          totalPages={data.totalPages}
          onPageChange={handleClick}
          onRowsPerPageChange={perPageShow}
        />
      </div>
    </AppLayout>
  );
};
export default withAuth(ItemEnquiries);

function Table({ data, currentPage, recordsPerPage }) {
  const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  return (
    <>
      <div className="mb-4 overflow-auto">
        <table className="min-w-full bg-[#1E1E1E] rounded divide-y table-fixed divide-gray-700">
          <thead className=" ">
            <tr className="border-b border-gray-500">
              <th scope="col" className="p-4 rounded-tl px-4">
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
              <th scope="col" className="table-head-cell px-4">
                #
              </th>
              <th scope="col" className="table-head-cell">
                FullName
              </th>
              <th scope="col" className="table-head-cell text-center">
                Email
              </th>
              <th scope="col" className="table-head-cell text-center">
                Phone
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
                  <td className="p-4 w-4 px-4">
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
                  <td className="table-body-cell px-4">
                    {i + 1 + (currentPage - 1) * recordsPerPage}
                  </td>
                  <td className="table-body-cell">{item?.Name}</td>
                  <td className="table-body-cell text-center">{item?.Email}</td>
                  <td className="table-body-cell text-center">
                    {item?.Number}
                  </td>
                  <td className="table-body-cell text-center">
                    <span className="inline-flex gap-3">
                      <button
                        type="button"
                        className="p-1 rounded-full hover:bg-gray-500"
                        onClick={() => {
                          setIsReasonModalOpen(true);
                          setSelectedItem(item);
                        }}
                      >
                        <IoMdEye className="w-4 h-4" />
                      </button>
                    </span>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
      <ViewDetailsModal
        isOpen={isReasonModalOpen}
        closeModal={() => setIsReasonModalOpen(false)}
        details={selectedItem}
      />
      <ModalOverlay isOpen={isReasonModalOpen} />
    </>
  );
}

function ViewDetailsModal({ isOpen, closeModal, details }) {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="text-white space-y-8 p-4">
        <h1 className="font-semibold text-2xl text-center">
          Enquiry Form Details
        </h1>
        <div>
          <div className="space-y-5 mb-5">
            <span className="flex justify-between border-b pb-2">
              <span>Exhibition</span>
              <span>{details?.Exhibition?.Name}</span>
            </span>
            <span className="flex justify-between border-b pb-2">
              <span>Item Name</span>
              <span>{details?.Item?.Name}</span>
            </span>
            <span className="flex justify-between border-b pb-2">
              <span>Artist Name</span>
              <span>
                {details?.Item?.User?.FirstName} {details?.Item?.User?.LastName}
              </span>
            </span>
            <span className="flex justify-between border-b pb-2">
              <span>Item Size</span>
              <span>{details?.Item?.Name}</span>
            </span>
            <span className="flex justify-between border-b pb-2">
              <span>Item Price</span>
              <span>{details?.Item?.Price}</span>
            </span>
            <span className="flex justify-between border-b pb-2">
              <span>Medium</span>
              <span>{details?.Item?.Medium}</span>
            </span>
            <span className="inline-block">Item Image</span>
            <img
              src={details?.Item?.Thumbnail}
              alt="Item Image"
              className="mx-auto mt-5 max-w-[200px] max-h-[200px]"
            />
          </div>
          <div className="flex justify-center gap-4 ">
            <button
              type="button"
              className="py-2 px-8 font-medium rounded btn-gradient"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
