import { useState, useEffect } from "react";
import MesssageModal from "../MessageModal";
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "@/redux/features/features.actions";
import { useRouter } from "next/router";
import Pagination from "../pagination";
import moment from "moment";
import { RefreshButton } from "@/components/RefreshButton";
import SortDropdown from "@/components/SortDropdown";
import { SearchBar } from "../SearchBar";
import { NotificationGear } from "../NotificationGear";
import { CleardataGear } from "../CleardataGear";
const TABLE_HEAD = [
  "Sr.No",
  "Firstname",
  "Surname",
  "Email",
  "Phone",
  "Subject",
  "Date",
  "Message",
];
export default function LiveChatFormTable() {
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [message, setMessage] = useState("");
  const contactsData = useSelector(({ features }) => features.contacts);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    getcontacts(`${currentPage}&sortBy=createdAt:desc`);
  }, []);

  const getcontacts = (number) => {
    let filter = "Live chat";
    dispatch(getContacts(filter, number));
  };

  function hideMessage() {
    setIsMessageVisible(false);
  }

  function showMessage(e) {
    setMessage(e.target.dataset.message);
    setIsMessageVisible(true);
  }

  const fetchNextRecords = (number) => {
    let filter = "Live chat";
    dispatch(getContacts(filter, number));
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchNextRecords(`${pageNumber}&sortBy=createdAt:desc`);
  };

  const handleSortStats = (value) => {
    if (value == "oldest") {
      getcontacts(currentPage);
    } else {
      getcontacts(`${currentPage}&sortBy=createdAt:desc`);
    }
  };

  const searchSub = async () => {
    getcontacts(
      `${currentPage}&sortBy=createdAt:desc&search={"email":"${search}"}`
    );
  };

  return (
    <>
      <div className="my-2 flex justify-end gap-4">
        {/* <NotificationGear /> */}
        <CleardataGear
          link={`modelName=Contact US&attributes={"type":"Live chat"}`}
          clear={true}
          manageEmails={true}
          callBack={() => getcontacts(`${currentPage}&sortBy=createdAt:desc`)}
        />
        <RefreshButton
          onClick={() => getcontacts(`${currentPage}&sortBy=createdAt:desc`)}
        />
      </div>
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl text-black mb-4">
          Live Chat: {contactsData?.totalResults}
        </h1>
        <div className="flex justify-between gap-4 mb-4">
          {/* <h1 className="font-bold text-2xl text-black mb-4">
            Total: {contactsData?.results?.length || 0}
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
              {TABLE_HEAD.map((header) => (
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
            {contactsData?.results?.map((item, index) => {
              return (
                <tr key={index} className="even:bg-slate-100 odd:bg-white">
                  <td className="table-cell">
                    {" "}
                    {index + 1 + (currentPage - 1) * recordsPerPage}
                  </td>
                  <td className="table-cell">
                    {item?.fullName?.split(" ")[0]}
                  </td>
                  <td className="table-cell">
                    {item?.fullName?.split(" ")[1]}
                  </td>
                  <td className="table-cell">{item?.email}</td>
                  <td className="table-cell"> {item?.phoneNo}</td>
                  <td className="table-cell"> {item?.subject}</td>
                  <td className="table-cell">
                    {moment(item?.createdAt).format("DD/MM/YYYY")}
                  </td>
                  <td className="table-cell">
                    <button
                      onClick={showMessage}
                      data-message={item?.message}
                      className="bg-black text-white px-6 py-2 rounded-full"
                    >
                      View Message
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <MesssageModal
          message={message}
          isOpen={isMessageVisible}
          openModal={showMessage}
          closeModal={hideMessage}
        />
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
              contactsData?.totalResults
            )}`}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900">
            {contactsData.totalResults}
          </span>
        </span>
        <Pagination
          currentPage={currentPage}
          totalPages={contactsData.totalPages}
          handleClick={handleClick}
        />
      </nav>
    </>
  );
}
