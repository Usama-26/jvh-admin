import { RiEyeFill } from "react-icons/ri";
import Modal from "../Modal";
import { Dialog } from "@headlessui/react";
import ModalOverlay from "../ModalOverlay";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { updateUser } from "@/redux/auth/auth.actions";
import { getUsers } from "@/redux/auth/auth.actions";
import Pagination from "../pagination";
import moment from "moment";
import { RefreshButton } from "@/components/RefreshButton";
import SortDropdown from "@/components/SortDropdown";
import { SearchBar } from "../SearchBar";
import { CleardataGear } from "../CleardataGear";

export default function ApprovedTable({ headers, heading, role, userData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState();
  const usersData = useSelector(({ auth }) => auth.users);
  const user = useSelector(({ auth }) => auth.user);
  const [reason, setReason] = useState("");
  console.log("Users Data", usersData);
  const router = useRouter();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [recordsPerPage] = useState(10);

  useEffect(() => {
    getUsers1(`${currentPage}&sortBy=createdAt:desc`);
  }, []);

  const getUsers1 = (page) => {
    dispatch(getUsers(page, role));
  };
  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
    setModalData();
    setReason("");
  }

  const handleCallBack = () => {
    getUsers1(`${currentPage}&sortBy=createdAt:desc`);
    closeModal();
  };

  const handleDisApprove = () => {
    let id = modalData;
    const payload = {
      isApproved: false,
      bio: reason,
    };

    dispatch(updateUser(payload, id, handleCallBack));
  };

  const fetchNextRecords = (number) => {
    getUsers1(number);
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchNextRecords(`${pageNumber}&sortBy=createdAt:desc`);
  };

  const handleSortStats = (value) => {
    if (value == "oldest") {
      getUsers1(currentPage);
    } else {
      getUsers1(`${currentPage}&sortBy=createdAt:desc`);
    }
  };

  const searchSub = async () => {
    getUsers1(
      `${currentPage}&sortBy=createdAt:desc&search={"email":"${search}"}`
    );
  };

  return (
    <>
      <div className="my-2 flex justify-end gap-3">
        <CleardataGear />
        <RefreshButton
          onClick={() => getUsers1(`${currentPage}&sortBy=createdAt:desc`)}
        />
      </div>
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl text-black mb-4">
          {heading}: {usersData?.totalResults}
        </h1>
        <div className="flex justify-between gap-4 mb-4">
          {/* <h1 className="font-bold text-2xl text-black mb-4">
            Total: {usersData?.totalResults || 0}
          </h1> */}
          <SearchBar
            onClick={searchSub}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={"Email"}
          />
        </div>
      </div>
      <div className="overflow-auto table-height w-full">
        <table className="w-full min-w-max table-auto text-left border-collapse">
          <thead className="bg-indigo-950  sticky top-0">
            <tr>
              {headers.map((header) => (
                <th key={header} className="table-header">
                  <div className="flex items-center justify-center">
                    {header}
                    {header === "Date" && (
                      <SortDropdown onClick={handleSortStats} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {usersData?.results?.map((item, index) => (
              <>
                {((item.isActive && item.isApproved) ||
                  (!item.isActive && !item.isApproved)) && (
                  <tr key={index} className="even:bg-slate-100 odd:bg-white">
                    <td className="table-cell">
                      {" "}
                      {index + 1 + (currentPage - 1) * recordsPerPage}
                    </td>
                    <td className="table-cell">{item.firstName}</td>
                    <td className="table-cell"> {item.surName}</td>
                    <td className="table-cell"> {item.email}</td>
                    <td className="table-cell"> {item.phoneNo}</td>
                    <td className="table-cell">{item?.country}</td>
                    <td className="table-cell">
                      {(userData.role === "admin" ||
                        userData?.group?.permissions?.find(
                          (permission) =>
                            permission.route === "Signup Approvals"
                        )?.update) && (
                        <>
                          {!item.isApproved && (
                            <button
                              onClick={() => {
                                openModal();
                                setModalData(item.id);
                                setReason(item.bio);
                              }}
                              className=" p-1 rounded-lg"
                            >
                              <RiEyeFill className="w-6 h-6 fill-black" />
                            </button>
                          )}
                        </>
                      )}
                    </td>
                    <td className="table-cell">
                      {moment(item?.createdAt).format("DD/MM/YYYY")}
                    </td>
                    <td className="table-cell">{item?.signedUpBy}</td>
                    <td className="table-cell">
                      {item.isApproved && (
                        <>
                          <button
                            className="bg-green-500 text-white rounded-full py-2 px-5"
                            disabled
                          >
                            Approved
                          </button>
                        </>
                      )}
                      {!item.isApproved && (
                        <>
                          <button
                            className="bg-red-500 text-white rounded-full py-2 px-5"
                            disabled
                          >
                            Declined
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
        <Modal
          isOpen={isModalOpen}
          openModal={openModal}
          closeModal={closeModal}
          data={modalData}
        >
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-black text-center"
          >
            Reason of Inactive
          </Dialog.Title>
          {/* <div className="my-4">
            <h5>Choose Status:</h5>
            <div className="flex mt-2 items-center">
              <input type="radio" name="status" id="active" checked />
              <label htmlFor="active" className="ml-4">
                Disapprove
              </label>
            </div>
          </div> */}
          <textarea
            className="border border-gray-900 rounded-lg my-8 p-4 w-full h-48 resize-none"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          ></textarea>
          <button
            type="button"
            onClick={() => handleDisApprove()}
            className="bg-red-600 text-white px-10 py-2 rounded-full text-xl font-semibold block mx-auto"
          >
            Save
          </button>
        </Modal>
        <ModalOverlay isOpen={isModalOpen} />
      </div>
      <nav
        className="flex md:flex-row flex-col justify-between items-center pt-4 mx-5 mb-5 mt-5"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 ">
          Showing{" "}
          <span className="font-semibold text-gray-900">
            {`${(currentPage - 1) * 10 + 1}-${Math.min(
              currentPage * 10,
              usersData?.totalResults
            )}`}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900">
            {usersData.totalResults}
          </span>
        </span>
        <Pagination
          currentPage={currentPage}
          totalPages={usersData.totalPages}
          handleClick={handleClick}
        />
      </nav>
    </>
  );
}
