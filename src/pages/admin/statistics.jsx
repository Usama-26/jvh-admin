import { useState, useEffect } from "react";
import AppLayout from "@/layouts/AppLayout";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import Pagination from "@/components/pagination";
import { useDispatch, useSelector } from "react-redux";
import { getStats, getContacts } from "@/redux/features/features.actions";
const tabs = ["Total Visitors", "Submitted Forms", "Active Visitors"];
import { withAuth } from "@/components/Helpers/withAuth";
import moment from "moment";
import { RefreshButton } from "@/components/RefreshButton";
import SortDropdown from "@/components/SortDropdown";
import { SearchBar } from "@/components/SearchBar";
import { CleardataGear } from "@/components/CleardataGear";
const Statistics = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageContacts, setCurrentPageContacts] = useState(1);
  const [recordsPerPage] = useState(10);
  const dispatch = useDispatch();
  const statsData = useSelector(({ features }) => features.stats);
  const contactsData = useSelector(({ features }) => features.contacts);
  const [search, setSearch] = useState("");
  const [stats, setStats] = useState([]);

  useEffect(() => {
    getStatsData(`${currentPage}&sortBy=createdAt:desc`);
    getContactsData(`${currentPageContacts}&sortBy=createdAt:desc`);
  }, []);

  useEffect(() => {
    if (statsData) {
      setStats(statsData);
    }
  }, [statsData]);

  const getStatsData = (page) => {
    dispatch(getStats(page));
  };
  const getContactsData = (page) => {
    dispatch(getContacts("ALL", page));
  };

  const fetchNextRecords = (number) => {
    getStatsData(`${number}&sortBy=createdAt:desc`);
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchNextRecords(pageNumber);
  };
  const handleClickContacts = (pageNumber) => {
    setCurrentPageContacts(pageNumber);
    getContactsData(`${pageNumber}&sortBy=createdAt:desc`);
  };
  const handleSortStats = (value) => {
    if (value == "oldest") {
      getStatsData(currentPage);
    } else {
      getStatsData(`${currentPage}&sortBy=createdAt:desc`);
    }
  };
  const handleSortStatsActive = (value) => {
    if (value == "oldest") {
      getStatsData(`${currentPage}&isActive=true`);
    } else {
      getStatsData(`${currentPage}&sortBy=createdAt:desc&isActive=true`);
    }
  };
  const handleSortForms = (value) => {
    if (value == "oldest") {
      dispatch(getContacts("ALL", currentPage));
    } else {
      getContactsData(`${currentPageContacts}&sortBy=createdAt:desc`);
    }
  };

  const searchSub = async () => {
    getStatsData(
      `${currentPage}&sortBy=createdAt:desc&search={"ipAddress":"${search}"}`
    );
  };
  const searchSubActive = async () => {
    getStatsData(
      `${currentPage}&sortBy=createdAt:desc&isActive=true&search={"ipAddress":"${search}"}`
    );
  };
  const searchUnSub = async () => {
    getContactsData(
      `${currentPageContacts}&sortBy=createdAt:desc&search={"email":"${search}"}`
    );
  };
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
                    onClick={() => {
                      setStats([]);
                      tab === "Active Visitors"
                        ? getStatsData(
                            `${currentPage}&sortBy=createdAt:desc&isActive=true`
                          )
                        : getStatsData(`${currentPage}&sortBy=createdAt:desc`);
                    }}
                  >
                    {tab}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className={"mt-8"}>
            <Tab.Panel>
              <>
                <div className="my-2 flex justify-end gap-2">
                  <CleardataGear
                    link={`modelName=Site Visitors`}
                    clear={true}
                    callBack={() =>
                      getStatsData(`${currentPage}&sortBy=createdAt:desc`)
                    }
                  />
                  <RefreshButton
                    onClick={() =>
                      getStatsData(`${currentPage}&sortBy=createdAt:desc`)
                    }
                  />
                </div>
                <div className="flex justify-between">
                  <h1 className="font-bold text-2xl text-black mb-4">
                    Total Visitors: {stats?.totalResults}
                  </h1>
                  <div className="flex justify-between gap-4 mb-4">
                    {/* <h1 className="font-bold text-2xl text-black mb-4">
                      Total: {statsData?.totalResults || 0}
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
                    <thead className="bg-indigo-950 sticky top-0">
                      <tr>
                        {["S.No", "IP Address", "Country", "Time", "Date"].map(
                          (header) => (
                            <th key={header} className="table-header">
                              <div className="flex items-center justify-center">
                                {header}
                                {header === "Date" && (
                                  <SortDropdown onClick={handleSortStats} />
                                )}
                              </div>
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {stats?.results?.map((item, index) => (
                        <>
                          <tr>
                            <td className="table-cell">
                              {index + 1 + (currentPage - 1) * recordsPerPage}
                            </td>
                            <td className="table-cell">{item.ipAddress}</td>
                            <td className="table-cell">{item.country}</td>
                            <td className="table-cell">
                              {moment(item.createdAt).format("LT")}
                            </td>
                            <td className="table-cell">
                              {moment(item.createdAt).format("DD/MM/YYYY")}
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
                        stats?.totalResults
                      )}`}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-900">
                      {stats.totalResults}
                    </span>
                  </span>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={stats.totalPages}
                    handleClick={handleClick}
                  />
                </nav>
              </>
            </Tab.Panel>
            <Tab.Panel>
              <>
                <div className="my-2 flex justify-end gap-2">
                  <CleardataGear
                    link={`modelName=Contact US`}
                    clear={true}
                    callBack={() =>
                      getContactsData(
                        `${currentPageContacts}&sortBy=createdAt:desc`
                      )
                    }
                  />
                  <RefreshButton
                    onClick={() =>
                      getContactsData(
                        `${currentPageContacts}&sortBy=createdAt:desc`
                      )
                    }
                  />
                </div>
                <div className="flex justify-between">
                  <h1 className="font-bold text-2xl text-black mb-4">
                    Submitted Forms: {contactsData?.totalResults}
                  </h1>
                  <div className="flex justify-between gap-4 mb-4">
                    {/* <h1 className="font-bold text-2xl text-black mb-4">
                      Total: {contactsData?.totalResults || 0}
                    </h1> */}
                    <SearchBar
                      onClick={searchUnSub}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder={"Email"}
                    />
                  </div>
                </div>
                <div className="overflow-auto table-height w-full">
                  <table className="w-full min-w-max table-auto text-left border-collapse">
                    <thead className="bg-indigo-950 sticky top-0">
                      <tr>
                        {[
                          "S.No",
                          "Email",
                          "Fullname",
                          "Date",
                          "Phone",
                          "Form",
                          "Status",
                        ].map((header) => (
                          <th key={header} className="table-header">
                            <div className="flex items-center justify-center">
                              {header}
                              {header === "Date" && (
                                <SortDropdown onClick={handleSortForms} />
                              )}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {contactsData?.results?.map((item, index) => (
                        <>
                          <tr>
                            <td className="table-cell">
                              {" "}
                              {index +
                                1 +
                                (currentPageContacts - 1) * recordsPerPage}
                            </td>
                            <td className="table-cell">{item.email}</td>
                            <td className="table-cell">{item.fullName}</td>
                            <td className="table-cell">
                              {moment(item.createdAt).format("DD/MM/YYYY")}
                            </td>
                            <td className="table-cell">{item?.phoneNo}</td>
                            <td className="table-cell">{item.type}</td>
                            <td className="table-cell">
                              <span className="text-green-500 font-medium">
                                Submitted
                              </span>
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
                      {`${(currentPageContacts - 1) * 10 + 1}-${Math.min(
                        currentPageContacts * 10,
                        contactsData?.totalResults
                      )}`}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-900">
                      {contactsData.totalResults}
                    </span>
                  </span>
                  <Pagination
                    currentPage={currentPageContacts}
                    totalPages={contactsData.totalPages}
                    handleClick={handleClickContacts}
                  />
                </nav>
              </>
            </Tab.Panel>
            <Tab.Panel>
              <>
                <div className="my-2 flex justify-end gap-2">
                  {/* <CleardataGear link={"API Link"} clear={true} /> */}
                  <RefreshButton
                    onClick={() =>
                      getStatsData(
                        `${currentPage}&sortBy=createdAt:desc&isActive=true`
                      )
                    }
                  />
                </div>
                <div className="flex justify-between mb-5">
                  <h1 className="font-bold text-2xl text-black">
                    Active Vistors: {stats?.totalResults}
                  </h1>
                  {/* <h1 className="font-bold text-2xl text-black mb-4">
                    Total: {0}
                  </h1> */}
                  <SearchBar
                    onClick={searchSubActive}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={"IP Address"}
                  />
                </div>
                <div className="overflow-auto table-height w-full">
                  <table className="w-full min-w-max table-auto text-left border-collapse">
                    <thead className="bg-indigo-950 sticky top-0">
                      <tr>
                        {[
                          "S.No",
                          "IP Address",
                          "Country",
                          "Time",
                          "Date",
                          "Status",
                        ].map((header) => (
                          <th key={header} className="table-header">
                            <div className="flex items-center justify-center">
                              {header}
                              {header === "Date" && (
                                <SortDropdown onClick={handleSortStatsActive} />
                              )}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {stats?.results?.map((item, index) => (
                        <>
                          <tr>
                            <td className="table-cell">
                              {index + 1 + (currentPage - 1) * recordsPerPage}
                            </td>
                            <td className="table-cell">{item.ipAddress}</td>
                            <td className="table-cell">{item.country}</td>
                            <td className="table-cell">
                              {moment(item.createdAt).format("LT")}
                            </td>
                            <td className="table-cell">
                              {moment(item.createdAt).format("DD/MM/YYYY")}
                            </td>
                            <td className="table-cell">
                              <span
                                className={`rounded-full h-4 w-4 inline-block bg-green-500`}
                              ></span>
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
                        stats?.totalResults
                      )}`}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-900">
                      {stats.totalResults}
                    </span>
                  </span>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={stats.totalPages}
                    handleClick={handleClick}
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
export default withAuth(Statistics);
