import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "@/layouts/AppLayout";
import { withAuth } from "@/components/Helpers/withAuth";
import { getCaptcha } from "@/redux/features/features.actions";
import Pagination from "@/components/pagination";
import { RefreshButton } from "@/components/RefreshButton";
import SortDropdown from "@/components/SortDropdown";
import MesssageModal from "@/components/MessageModal";
import { Fragment } from "react";
import { Tab } from "@headlessui/react";
import ModalOverlay from "@/components/ModalOverlay";
import { SearchBar } from "@/components/SearchBar";
import { CleardataGear } from "@/components/CleardataGear";
import moment from "moment";
import Repository, { getError } from "../../repositories/genericRepository";
import { baseUrl } from "../../repositories/genericRepository";
const Security = () => {
  const dispatch = useDispatch();
  const captchaData = useSelector(({ features }) => features.captcha);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageLogs, setCurrentPageLogs] = useState(1);
  const [recordsPerPage] = useState(10);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [logs, setLogs] = useState();
  const [message, setMessage] = useState("");

  const getLogs = async (data) => {
    try {
      const response = await Repository.get(`${baseUrl}/logs?${data}`);
      setLogs(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    dispatch(getCaptcha(`${currentPage}&sortBy=createdAt:desc`));
    getLogs(`${currentPageLogs}&sortBy=createdAt:desc`);
  }, []);

  const fetchNextRecords = (number) => {
    dispatch(getCaptcha(number));
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchNextRecords(`${pageNumber}&sortBy=createdAt:desc`);
  };
  const handleClickLogs = (pageNumber) => {
    setCurrentPageLogs(pageNumber);
    getLogs(`${pageNumber}&sortBy=createdAt:desc`);
  };

  const handleSortStats = (value) => {
    if (value == "oldest") {
      dispatch(getCaptcha(currentPage));
    } else {
      dispatch(getCaptcha(`${currentPage}&sortBy=createdAt:desc`));
    }
  };
  const handleSortLogs = (value) => {
    if (value == "oldest") {
      getLogs(`${currentPageLogs}`);
    } else {
      getLogs(`${currentPageLogs}&sortBy=createdAt:desc`);
    }
  };

  const searchSub = async () => {
    dispatch(
      getCaptcha(
        `${currentPage}&sortBy=createdAt:desc&search={"ipAddress":"${search}"}`
      )
    );
  };
  const searchSubLogs = async () => {
    getLogs(
      `${currentPageLogs}&sortBy=createdAt:desc&search={"email":"${search}"}`
    );
  };
  const tabs = ["Captcha", "Activity Logs"];
  const TABLE_HEAD = [
    "Sr.No",
    "Staff Name",
    "Email",
    "User Group",
    "Log",
    "Timestamp",
  ];

  function showMessage(e) {
    setMessage(e.target.dataset.message);
    setIsMessageVisible(true);
  }
  function hideMessage() {
    setIsMessageVisible(false);
  }
  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto  p-4">
        <Tab.Group defaultIndex={0}>
          <Tab.List className={"flex flex-wrap"}>
            {tabs.map((tab) => (
              <Tab key={tab} as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`lg:px-10 lg:py-3 px-5 py-2 rounded-full mr-4 mb-4 lg:mb-0 text-white lg:text-base text-sm font-medium hover:bg-[#D32A3D] focus:outline-none ${
                      selected ? "bg-[#D32A3D]" : "bg-slate-300"
                    }`}
                    onClick={() => setSearch("")}
                  >
                    {tab}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className={"mt-8"}>
            <Tab.Panel>
              {" "}
              <div className="my-2 flex justify-end gap-2">
                <CleardataGear
                  link={`modelName=Captcha Results`}
                  clear={true}
                  callBack={() =>
                    dispatch(getCaptcha(`${currentPage}&sortBy=createdAt:desc`))
                  }
                />
                <RefreshButton
                  onClick={() =>
                    dispatch(getCaptcha(`${currentPage}&sortBy=createdAt:desc`))
                  }
                />
              </div>
              <div className="flex justify-between">
                <h1 className="font-bold text-2xl text-black mb-4">
                  Captcha: {captchaData?.totalResults}
                </h1>
                <div className="flex justify-between gap-4 mb-4">
                  {/* <h1 className="font-bold text-2xl text-black mb-4">
              Total: {captchaData?.totalResults || 0}
            </h1> */}
                  <SearchBar
                    onClick={searchSub}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={"IP Address"}
                  />
                </div>
              </div>
              <div className="overflow-auto table-height w-full">
                <table className="w-full min-w-max table-auto text-left border-collapse">
                  <thead className="bg-indigo-950  sticky top-0">
                    <tr>
                      <th className="table-header">S.No</th>
                      <th className="table-header">User Classification</th>
                      <th className="table-header">IP Address</th>
                      <th className="table-header">Country</th>
                      <th className="table-header">
                        <div className="flex items-center justify-center">
                          Date
                          <SortDropdown onClick={handleSortStats} />
                        </div>
                      </th>

                      <th className="table-header">Results</th>
                    </tr>
                  </thead>
                  <tbody>
                    {captchaData?.results?.map((item, index) => (
                      <>
                        {" "}
                        <tr className="even:bg-slate-100 odd:bg-white">
                          <td className="table-cell">
                            {" "}
                            {index + 1 + (currentPage - 1) * recordsPerPage}
                          </td>
                          <td className="table-cell">
                            {item?.userClassification}
                          </td>
                          <td className="table-cell">{item?.ipAddress}</td>
                          <td className="table-cell">{item?.country}</td>
                          <td className="table-cell">
                            {moment(item.createdAt).format("DD/MM/YYYY")}
                          </td>
                          <td className="table-cell">
                            {item?.result === "Success" ? (
                              <span className="text-green-500 font-medium">
                                Successful
                              </span>
                            ) : (
                              <span className="text-red-500 font-medium">
                                Failed
                              </span>
                            )}
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
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
                      captchaData?.totalResults
                    )}`}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-900">
                    {captchaData?.totalResults}
                  </span>
                </span>
                <Pagination
                  currentPage={currentPage}
                  totalPages={captchaData.totalPages}
                  handleClick={handleClick}
                />
              </nav>
            </Tab.Panel>
            <Tab.Panel>
              {" "}
              <>
                <div className="my-2 flex justify-end gap-2">
                  {/* <NotificationGear /> */}
                  <CleardataGear
                    link={`modelName=Logs`}
                    clear={true}
                    callBack={() =>
                      getLogs(`${currentPageLogs}&sortBy=createdAt:desc`)
                    }
                    // manageEmails={true}
                  />
                  <RefreshButton
                    onClick={() =>
                      getLogs(`${currentPageLogs}&sortBy=createdAt:desc`)
                    }
                  />
                </div>
                <div className="flex justify-between">
                  <h1 className="font-bold text-2xl text-black mb-4">
                    Activity Logs: {logs?.totalResults}
                  </h1>
                  <div className="flex justify-between gap-4 mb-4">
                    {/* <h1 className="font-bold text-2xl text-black mb-4">
            Total: {contactsData?.results?.length || 0}
          </h1> */}
                    <SearchBar
                      onClick={searchSubLogs}
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
                              {header === "Timestamp" && (
                                <SortDropdown onClick={handleSortLogs} />
                              )}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {logs?.results?.map((item, index) => (
                        <>
                          <tr
                            key={index}
                            className="even:bg-slate-100 odd:bg-white"
                          >
                            <td className="table-cell">
                              {index + 1 + (currentPage - 1) * recordsPerPage}
                            </td>
                            <td className="table-cell">{item?.name}</td>
                            <td className="table-cell"> {item?.email}</td>
                            <td className="table-cell">{item?.group}</td>
                            <td className="table-cell">
                              <button
                                onClick={showMessage}
                                data-message={item?.log}
                                className="bg-black text-white px-6 py-2 rounded-full"
                              >
                                View Log
                              </button>
                            </td>
                            <td className="table-cell">
                              {moment(item?.createdAt).format(
                                "DD/MM/YYYY HH:mm"
                              )}
                            </td>
                          </tr>
                        </>
                      ))}
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
                      {`${(currentPageLogs - 1) * 10 + 1}-${Math.min(
                        currentPageLogs * 10,
                        logs?.totalResults
                      )}`}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-900">
                      {logs?.totalResults}
                    </span>
                  </span>
                  <Pagination
                    currentPage={currentPageLogs}
                    totalPages={logs?.totalPages}
                    handleClick={handleClickLogs}
                  />
                </nav>
              </>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </AppLayout>
  );
};
export default withAuth(Security);
