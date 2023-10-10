/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from "react";
import Modal from "@/components/Modal";
import ModalOverlay from "@/components/ModalOverlay";
import AppLayout from "@/layouts/AppLayout";
import { Dialog, Tab } from "@headlessui/react";
import { Fragment } from "react";
import { RiPencilFill } from "react-icons/ri";
import { withAuth } from "@/components/Helpers/withAuth";
import { getNewsLetter } from "@/redux/features/features.actions";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "@/repositories/genericRepository";
import NewsletterCard from "@/components/NewsletterCard";
import { toast } from "react-toastify";
import Pagination from "@/components/pagination";
import moment from "moment";
import { FaCalendar, FaCalendarAlt, FaPlus } from "react-icons/fa";
import Spinner from "@/components/svgs/spinner";
import {
  getNewsletterData,
  addNewsletter,
} from "@/redux/features/features.actions";
import dynamic from "next/dynamic";
import unEscape from "@/utils/Unescape";
import { RefreshButton } from "@/components/RefreshButton";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SortDropdown from "@/components/SortDropdown";
import { SearchBar } from "@/components/SearchBar";
import { CleardataGear } from "@/components/CleardataGear";
import Repository, { getError } from "../../repositories/genericRepository";
import { logsAPI } from "@/components/LogsAPI";
const RichEditorWithNoSSR = dynamic(
  () => import("../../components/Generic/RichEditor"),
  {
    ssr: false,
  }
);

const Newsletter = (props) => {
  const userData = props.userData;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState();
  const [modalDataUnsub, setModalDataUnSub] = useState();
  const [editorText, setEditorText] = useState();
  const newsLetterdata = useSelector(({ features }) => features.newsLetter);
  const [newsLetterData, setNewsLetterData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageUnsub, setCurrentPageUnsub] = useState(1);
  const [recordsPerPage] = useState(10);
  const [tab, selectedTab] = useState("subscribed");
  const [isAddBlogModal, setIsAddBlogModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");
  const fileInputRef = useRef(null);
  const [imgLoading, setImgLoading] = useState(false);
  const [url, updateUrl] = useState();
  const dispatch = useDispatch();
  const blogs = useSelector(({ features }) => features.newsletterData);
  const [search, setSearch] = useState("");

  const [payloaddata, setPayloadData] = useState({
    name: "",
    description: "",
    logo: "",
  });

  const handleData = (key, value) => {
    setPayloadData({ ...payloaddata, [key]: value });
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (newsLetterdata) {
      setNewsLetterData(newsLetterdata);
    }
  }, [newsLetterdata]);

  useEffect(() => {
    getnewsletterdata();
  }, []);

  const getnewsletterdata = () => {
    dispatch(getNewsletterData());
  };

  function openAddBlogModal() {
    setIsAddBlogModal(true);
  }
  function closeAddBlogModal() {
    setIsAddBlogModal(false);
  }

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
    setModalData();
    setModalDataUnSub();
    setReason("");
  }

  useEffect(() => {
    getnewsletter("subscribed&sortBy=createdAt:desc", currentPage);
  }, []);

  const getnewsletter = (value, page) => {
    dispatch(getNewsLetter(value, page));
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Handle the selected file here
    console.log(file);
    handleUpload(file);
  };
  function handleUpload(d) {
    const file = d;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mrrobotdev");
    setImgLoading(true);
    axios
      .post("https://api.cloudinary.com/v1_1/mrrobotdev/image/upload", formData)
      .then((response) => {
        console.log("Upload success:", response.data.secure_url);
        updateUrl(response.data.secure_url);
        handleData("logo", response.data.secure_url);
        setImgLoading(false);
        // handle the successful upload, e.g. store the URL in state
      })
      .catch((error) => {
        // console.error("Upload error:", error);
        toast.error("Icon upload error, try again!!!", {});
        setImgLoading(false);
      });
  }
  const updateData = async (e) => {
    e.preventDefault();
    const payload = {
      status: "unsubscribed",
      reason: reason,
      unsubscribedBy: userData.firstName,
    };
    if (reason == "") {
      toast.error("Please enter reason!!", {});
    } else {
      setLoading(true);
      try {
        const response = await Repository.put(
          `${baseUrl}/users/newsletterusers/${modalData.id}`,
          payload
        );
        setLoading(false);
        getnewsletter("subscribed&sortBy=createdAt:desc", currentPage);
        toast.success("User unsubscribed successfully", {});
        logsAPI("unsubscribed a user.", userData);
        setModalData();
        setReason("");
        closeModal();
      } catch (error) {
        setLoading(false);
        toast.error(error, {});
      }
    }
  };

  const fetchNextRecords = (value, number) => {
    dispatch(getNewsLetter(value, number));
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchNextRecords("subscribed&sortBy=createdAt:desc", pageNumber);
  };

  const handleClickUnsub = (pageNumber) => {
    setCurrentPageUnsub(pageNumber);
    fetchNextRecords("unsubscribed&sortBy=createdAt:desc", pageNumber);
  };

  const handleLoading = () => {
    setLoading(false);
    closeAddBlogModal();
    dispatch(getNewsletterData());
    let defaultValue = {
      name: "",
      description: "",
    };
    setPayloadData(defaultValue);
  };

  const handleDataSubmit = (e) => {
    e.preventDefault();
    const htmlDesc = editorText.toString("html");
    setLoading(true);
    const payload = {
      name: payloaddata.name,
      description: `${htmlDesc}`,
      logo: payloaddata.logo,
    };
    dispatch(addNewsletter(payload, handleLoading));
  };

  const handleSort = (value) => {
    if (value == "oldest") {
      getnewsletter("subscribed", currentPage);
    } else {
      getnewsletter("subscribed&sortBy=createdAt:desc", currentPage);
    }
  };
  const handleSortUnsub = (value) => {
    if (value == "oldest") {
      getnewsletter("unsubscribed", currentPage);
    } else {
      getnewsletter("unsubscribed&sortBy=createdAt:desc", currentPage);
    }
  };

  const searchSub = async () => {
    getnewsletter(
      `subscribed&sortBy=createdAt:desc&search={"email":"${search}"}`,
      currentPage
    );
  };
  const searchUnSub = async () => {
    getnewsletter(
      `unsubscribed&sortBy=createdAt:desc&search={"email":"${search}"}`,
      currentPage
    );
  };

  const resubscribeUser = async (id) => {
    const payload = {
      status: "subscribed",
    };
    setLoading(true);
    try {
      const response = await Repository.put(
        `${baseUrl}/users/newsletterusers/${id}`,
        payload
      );
      setLoading(false);
      getnewsletter("unsubscribed&sortBy=createdAt:desc", currentPageUnsub);
      toast.success("User Resubscribed successfully", {});
      logsAPI("ReSubscribed a user.", userData);
    } catch (error) {
      setLoading(false);
      toast.error(error, {});
    }
  };

  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto  p-4">
        <Tab.Group defaultIndex={0}>
          <Tab.List className={"flex flex-wrap"}>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`lg:px-10 lg:py-3 px-5 py-2 rounded-full mr-4 mb-4 lg:mb-0 text-white lg:text-base text-sm font-medium hover:bg-[#D32A3D] focus:outline-none ${
                    selected ? "bg-[#D32A3D]" : "bg-slate-300"
                  }`}
                  onClick={() => {
                    setNewsLetterData({ results: [] });
                    getnewsletter(
                      "subscribed&sortBy=createdAt:desc",
                      currentPage
                    ),
                      setCurrentPageUnsub(1);
                    setSearch("");
                  }}
                >
                  Subscribed
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`lg:px-10 lg:py-3 px-5 py-2 rounded-full mr-4 mb-4 lg:mb-0 text-white lg:text-base text-sm font-medium hover:bg-[#D32A3D] focus:outline-none ${
                    selected ? "bg-[#D32A3D]" : "bg-slate-300"
                  }`}
                  onClick={() => {
                    setNewsLetterData({ results: [] });
                    getnewsletter(
                      "unsubscribed&sortBy=createdAt:desc",
                      currentPageUnsub
                    ),
                      setCurrentPage(1);
                    setSearch("");
                  }}
                >
                  Unsubscribed
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`lg:px-10 lg:py-3 px-5 py-2 rounded-full mr-4 mb-4 lg:mb-0 text-white lg:text-base text-sm font-medium hover:bg-[#D32A3D] focus:outline-none ${
                    selected ? "bg-[#D32A3D]" : "bg-slate-300"
                  }`}
                  // onClick={() => {
                  //   getnewsletter("unsubscribed", currentPageUnsub),
                  //     setCurrentPage(1);
                  // }}
                >
                  Manage Newsletter
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels className={"mt-8"}>
            <Tab.Panel>
              <>
                <div className="my-2 flex justify-end gap-2">
                  <CleardataGear
                    link={`modelName=NewsLetter Users&attributes={"status":"subscribed"}`}
                    clear={true}
                    callBack={() =>
                      getnewsletter(
                        "subscribed&sortBy=createdAt:desc",
                        currentPage
                      )
                    }
                  />
                  <RefreshButton
                    onClick={() =>
                      getnewsletter(
                        "subscribed&sortBy=createdAt:desc",
                        currentPage
                      )
                    }
                  />
                </div>
                <div className="flex justify-between">
                  <h1 className="font-bold text-2xl text-black mb-4">
                    Subscribed Users: {newsLetterData?.totalResults}
                  </h1>
                  <div className="gap-4 flex justify-between items-center mb-4">
                    {/* <h1 className="font-bold text-2xl text-black ">
                      Total: {newsLetterData?.totalResults}
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
                    <thead className="bg-indigo-950 sticky top-0">
                      <tr>
                        {["S.No", "Email", "Date", "Action", "Status"].map(
                          (header) => (
                            <th key={header} className="table-header">
                              <div className="flex items-center justify-center">
                                {header}
                                {header === "Date" && (
                                  <SortDropdown onClick={handleSort} />
                                )}
                              </div>
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {newsLetterData?.results?.map((item, index) => (
                        <>
                          <tr
                            key={index}
                            className="even:bg-slate-100 odd:bg-white"
                          >
                            <td className="table-cell">
                              {" "}
                              {index + 1 + (currentPage - 1) * recordsPerPage}
                            </td>
                            <td className="table-cell"> {item.email}</td>
                            <td className="table-cell">
                              {moment(item.createdAt).format("DD/MM/YYYY")}
                            </td>
                            <td className="table-cell">
                              {(userData.role === "admin" ||
                                userData?.group?.permissions?.find(
                                  (permission) =>
                                    permission.route === "Newsletter Screen"
                                )?.update) && (
                                <button
                                  onClick={() => {
                                    openModal(), setModalData(item);
                                  }}
                                  className="bg-black p-1 rounded-lg"
                                >
                                  <RiPencilFill className="w-6 h-6 fill-white" />
                                </button>
                              )}
                            </td>
                            <td className="table-cell">
                              <span
                                className={`font-medium capitalize text-green-500
                                }`}
                              >
                                {item.status}
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
                      {`${(currentPage - 1) * 10 + 1}-${Math.min(
                        currentPage * 10,
                        newsLetterData?.totalResults
                      )}`}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-900">
                      {newsLetterData.totalResults}
                    </span>
                  </span>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={newsLetterData.totalPages}
                    handleClick={handleClick}
                  />
                </nav>
              </>
            </Tab.Panel>
            <Tab.Panel>
              <>
                <div className="my-2 flex justify-end gap-2">
                  <CleardataGear
                    link={`modelName=NewsLetter Users&attributes={"status":"unsubscribed"}`}
                    clear={true}
                    callBack={() =>
                      getnewsletter(
                        "unsubscribed&sortBy=createdAt:desc",
                        currentPageUnsub
                      )
                    }
                  />
                  <RefreshButton
                    onClick={() =>
                      getnewsletter(
                        "unsubscribed&sortBy=createdAt:desc",
                        currentPageUnsub
                      )
                    }
                  />
                </div>
                <div className="flex justify-between">
                  <h1 className="font-bold text-2xl text-black mb-4">
                    Unsubscribed Users: {newsLetterData?.totalResults}
                  </h1>
                  <div className="gap-4 flex justify-between items-center mb-4">
                    {/* <h1 className="font-bold text-2xl text-black">
                      Total: {newsLetterData?.totalResults}
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
                    <thead className="bg-indigo-950  sticky top-0">
                      <tr>
                        {[
                          "S.No",
                          "Email",
                          "Date",
                          "Unsubscribed by",
                          "Action",
                          "Note",
                        ].map((header) => (
                          <th key={header} className="table-header">
                            <div className="flex items-center justify-center">
                              {header}
                              {header === "Date" && (
                                <SortDropdown onClick={handleSortUnsub} />
                              )}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {newsLetterData?.results?.map((item, index) => (
                        <>
                          <tr
                            key={index}
                            className="even:bg-slate-100 odd:bg-white"
                          >
                            <td className="table-cell">
                              {" "}
                              {index +
                                1 +
                                (currentPageUnsub - 1) * recordsPerPage}
                            </td>
                            <td className="table-cell"> {item.email}</td>
                            <td className="table-cell">
                              {moment(item.createdAt).format("DD/MM/YYYY")}
                            </td>
                            <td className="table-cell">
                              {item?.unsubscribedBy}
                            </td>
                            <td className="table-cell">
                              {(userData.role === "admin" ||
                                userData?.group?.permissions?.find(
                                  (permission) =>
                                    permission.route === "Newsletter Screen"
                                )?.update) && (
                                <button
                                  onClick={() => {
                                    resubscribeUser(item.id);
                                  }}
                                  className="bg-[#D32A3D] text-white px-5 py-1.5 rounded-3xl"
                                >
                                  Resubscribe
                                </button>
                              )}
                            </td>
                            <td className="table-cell">
                              {(userData.role === "admin" ||
                                userData?.group?.permissions?.find(
                                  (permission) =>
                                    permission.route === "Newsletter Screen"
                                )?.update) && (
                                <button
                                  onClick={() => {
                                    openModal(),
                                      setModalDataUnSub(item),
                                      setReason(item?.reason);
                                  }}
                                  className="py-2 px-8 rounded-full text-white bg-black"
                                >
                                  View Details
                                </button>
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
                      {`${(currentPageUnsub - 1) * 10 + 1}-${Math.min(
                        currentPageUnsub * 10,
                        newsLetterData?.totalResults
                      )}`}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-900">
                      {newsLetterData.totalResults}
                    </span>
                  </span>
                  <Pagination
                    currentPage={currentPageUnsub}
                    totalPages={newsLetterData.totalPages}
                    handleClick={handleClickUnsub}
                  />
                </nav>
              </>
            </Tab.Panel>
            <Tab.Panel>
              <div className="my-2 flex justify-end gap-2">
                <CleardataGear link={"API Link"} />
                <RefreshButton onClick={getnewsletterdata} />
              </div>
              <div className="max-w-screen-2xl mx-auto  p-4">
                <div className="flex justify-between items-center mb-6 ">
                  <h1 className="font-bold text-2xl text-black mb-4">
                    Manage Newsletters: {blogs?.totalResults}
                  </h1>
                  {(userData.role === "admin" ||
                    userData?.group?.permissions?.find(
                      (permission) => permission.route === "Newsletter Screen"
                    )?.create) && (
                    <button
                      onClick={openAddBlogModal}
                      className={`lg:px-8 lg:py-3 px-5 py-2 rounded-full mr-4 mb-4 lg:mb-0 text-white lg:text-base text-sm font-medium bg-[#D32A3D] focus:outline-none float-right clear-both`}
                    >
                      <FaPlus className="inline w-4 h-4 mr-2 " />
                      Add Newsletter
                    </button>
                  )}
                </div>
                <div className="grid 2xl:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-8 ">
                  {blogs?.results?.map((blog) => (
                    <>
                      <NewsletterCard data={blog} userData={userData} />
                    </>
                  ))}
                </div>
              </div>
              <Modal
                isOpen={isAddBlogModal}
                openModal={openAddBlogModal}
                closeModal={closeAddBlogModal}
              >
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-black text-center mb-4"
                >
                  Add New Newsletter
                </Dialog.Title>
                <form action="" onSubmit={(e) => handleDataSubmit(e)}>
                  <label
                    htmlFor="blog_heading"
                    className="mb-2 block font-bold"
                  >
                    Newsletter Heading
                  </label>
                  <input
                    type="text"
                    id="blog_heading"
                    placeholder="Enter newsletter heading here"
                    className="w-full px-4 py-2 rounded-full border border-gray-500 mb-4"
                    value={payloaddata.name}
                    onChange={(e) => handleData("name", e.target.value)}
                    required
                  />
                  <label
                    htmlFor="blog_heading"
                    className="mb-2 block font-bold"
                  >
                    Newsletter Content
                  </label>

                  <RichEditorWithNoSSR
                    setEditorDesc={setEditorText}
                    editorDesc={payloaddata?.description}
                  />
                  <div className="border border-dashed border-gray-500 rounded-xl p-8 mb-4">
                    <button
                      type="button"
                      onClick={handleButtonClick}
                      className="bg-black text-white px-10 py-2 rounded-full font-semibold flex items-center mx-auto"
                      disabled={imgLoading}
                    >
                      {imgLoading && <Spinner />}
                      Choose image to Upload
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                  </div>
                  {url && (
                    <div className="mt-4 flex justify-center mb-4">
                      <img src={url} alt="" className="w-[100px] h-[80px]" />
                    </div>
                  )}
                  {/* <div className="mb-2 flex justify-between items-center">
                    <span className="border border-gray-500 rounded-xl p-2 inline-block basis-full mr-4">
                      <FaCalendarAlt className="inline fill-gray-800 mr-3" />
                      <ReactDatePicker
                        className="inline-block"
                        placeholderText="Select Date and Time"
                        selected={payloaddata.date}
                        onChange={(date) => handleData("date", date)}
                      />
                    </span>
                    <button className="p-1 rounded-full bg-[#D32A3D]">
                      <HiOutlineRefresh className="w-6 h-6 stroke-white stroke-2" />
                    </button>
                  </div> */}
                  <button
                    type="submit"
                    className="bg-[#D32A3D] text-white px-10 py-2 rounded-full text-xl font-semibold block mx-auto"
                  >
                    Save
                  </button>
                </form>
              </Modal>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      <Modal isOpen={isModalOpen} openModal={openModal} closeModal={closeModal}>
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-black text-center"
        >
          Reason of Unsubscribe
        </Dialog.Title>
        <textarea
          value={reason}
          className="border border-gray-900 rounded-lg my-8 p-4 w-full h-48 resize-none"
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter reason..."
        ></textarea>
        <div className="my-0 flex justify-center">
          {modalData && (
            <button
              className="bg-red-500 px-4 py-2 flex items-center rounded-full text-white"
              onClick={(e) => updateData(e)}
              disabled={loading}
            >
              {loading && <Spinner />}
              Unsubscribe
            </button>
          )}
        </div>
      </Modal>
      <ModalOverlay isOpen={isModalOpen || isAddBlogModal} />
    </AppLayout>
  );
};
export default withAuth(Newsletter);
