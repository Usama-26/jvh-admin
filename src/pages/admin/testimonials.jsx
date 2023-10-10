/* eslint-disable @next/next/no-img-element */
import Modal from "@/components/Modal";
import { RefreshButton } from "@/components/RefreshButton";
import dynamic from "next/dynamic";
import Spinner from "@/components/svgs/spinner";
import AppLayout from "@/layouts/AppLayout";
import { Dialog, Tab } from "@headlessui/react";
import { HiTrash } from "react-icons/hi2";
import { RiPencilFill } from "react-icons/ri";
import MesssageModal from "@/components/MessageModal";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs, addBlogs } from "@/redux/features/features.actions";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { withAuth } from "@/components/Helpers/withAuth";
import ModalOverlay from "@/components/ModalOverlay";
import { CleardataGear } from "@/components/CleardataGear";
import { logsAPI } from "@/components/LogsAPI";
import Repository, {
  baseUrl,
  getError,
} from "@/repositories/genericRepository";

const RichEditorWithNoSSR = dynamic(
  () => import("../../components/Generic/RichEditor"),
  {
    ssr: false,
  }
);
const Testimonials = (props) => {
  const userData = props.userData;
  const [isAddTestimonialModal, setIsAddTestimonialModal] = useState(false);
  const [isDeleteTestimonial, setIsDeleteTestimonial] = useState(false);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [message, setMessage] = useState("");

  function openAddTestimonial() {
    setIsAddTestimonialModal(true);
  }
  function closeAddTestimonial() {
    setIsAddTestimonialModal(false);
    setSelectedItem();
    setPayloadData({
      name: "",
      profession: "",
      companyName: "",
      websiteURL: "",
      rating: 0,
      review: "",
      logo: "",
    });
  }
  const [imgLoading, setImgLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [testimonials, setTestiMonials] = useState([]);
  const [editorText, setEditorText] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const [payloaddata, setPayloadData] = useState({
    name: "",
    profession: "",
    companyName: "",
    websiteURL: "",
    rating: 0,
    review: "",
    logo: "",
  });
  const [url, updateUrl] = useState();
  const fileInputRef = useRef(null);

  const handleData = (key, value) => {
    setPayloadData({ ...payloaddata, [key]: value });
  };

  const router = useRouter();
  const dispatch = useDispatch();

  const setUpdateData = (item) => {
    let newData = {
      name: item.name,
      profession: item.profession,
      companyName: item.companyName,
      websiteURL: item.websiteURL,
      rating: item.rating,
      review: item.review,
      logo: item.logo,
    };
    setPayloadData(newData);
    setIsAddTestimonialModal(true);
  };

  useEffect(() => {
    getTestimonials();
  }, []);

  const getTestimonials = async () => {
    try {
      const request = await Repository.get(`${baseUrl}/testimonials`);
      const { data } = request;
      setTestiMonials(data);
    } catch (error) {
      // toast.error("An error occured", {});
      // throw getError(error);
    }
  };
  const deleteTestimonials = async () => {
    try {
      const request = await Repository.delete(
        `${baseUrl}/testimonials/${selectedItem.id}`
      );
      toast.success("Testimonial Deleted Successfully", {});
      logsAPI("deleted a testimonial.", userData);
      getTestimonials();
      setIsDeleteTestimonial(false);
    } catch (error) {
      toast.error("An error occured", {});
      setIsDeleteTestimonial(false);
      // toast.error("An error occured", {});
      // throw getError(error);
    }
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

  const handleLoading = () => {
    setLoading(false);
    closeAddTestimonial();
    // dispatch(getBlogs());
    updateUrl("");
    let defaultValue = {
      name: "",
      profession: "",
      companyName: "",
      websiteURL: "",
      rating: 0,
      review: "",
      logo: "",
    };
    setPayloadData(defaultValue);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleDataSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const request = await Repository.post(
        `${baseUrl}/testimonials`,
        payloaddata
      );
      setLoading(false);
      toast.success("Testimonial Added Successfully", {});
      logsAPI("added a testimonial.", userData);
      getTestimonials();
      handleLoading();
    } catch (error) {
      setLoading(false);
      toast.error("An error occured", {});
      // throw getError(error);
    }
  };
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const request = await Repository.put(
        `${baseUrl}/testimonials/${selectedItem.id}`,
        payloaddata
      );
      setLoading(false);
      toast.success("Testimonial Updated Successfully", {});
      logsAPI("updated a testimonial.", userData);
      getTestimonials();
      handleLoading();
    } catch (error) {
      setLoading(false);
      toast.error("An error occured", {});
      // throw getError(error);
    }
  };

  function hideMessage() {
    setIsMessageVisible(false);
  }

  function showMessage(e) {
    setMessage(e.target.dataset.message);
    setIsMessageVisible(true);
  }

  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto  p-4">
        <div className=" p-4">
          <div className="flex justify-end">
            {/* <RefreshButton /> */}
            {(userData.role === "admin" ||
              userData?.group?.permissions?.find(
                (permission) => permission.route === "Testimonials"
              )?.create) && (
              <button
                onClick={openAddTestimonial}
                className="lg:px-10 lg:py-3 px-5 py-2 rounded-full mr-4 mb-4 lg:mb-0 text-white lg:text-base text-sm font-medium bg-[#D32A3D] ml-5"
              >
                Add New Testimonial
              </button>
            )}
          </div>
        </div>
        <div className="flex justify-between ">
          <h1 className="font-bold text-2xl text-black mb-4">
            Testimonials: {testimonials?.length}
          </h1>
          <div className="flex gap-3 items-center">
            <CleardataGear link={"API Link"} />
            <RefreshButton onClick={() => getTestimonials()} />
          </div>
        </div>
        <div className="overflow-auto table-height w-full">
          <table className="w-full min-w-max table-auto text-left border-collapse">
            <thead className="bg-indigo-950  sticky top-0">
              <tr>
                <th className="table-header">S.No</th>
                <th className="table-header">Client Name</th>
                <th className="table-header">Profession</th>
                <th className="table-header">Company</th>
                <th className="table-header">Rating</th>
                <th className="table-header">Message</th>
                <th className="table-header">Action</th>
              </tr>
            </thead>
            <tbody>
              {testimonials?.map((item, index) => (
                <>
                  <tr className="even:bg-slate-100 odd:bg-white">
                    <td className="table-cell">{index + 1}</td>
                    <td className="table-cell">{item?.name}</td>
                    <td className="table-cell">{item?.profession}</td>
                    <td className="table-cell">{item?.companyName}</td>
                    <td className="table-cell">{item?.rating}</td>
                    <td className="table-cell">
                      <button
                        className="bg-black text-white px-6 py-2 rounded-full"
                        onClick={showMessage}
                        data-message={item?.review}
                      >
                        View Details
                      </button>
                    </td>
                    <td className="table-cell ">
                      {(userData.role === "admin" ||
                        userData?.group?.permissions?.find(
                          (permission) => permission.route === "Testimonials"
                        )?.update) && (
                        <button
                          className="bg-black p-1 rounded-lg mr-2"
                          onClick={() => {
                            setUpdateData(item), setSelectedItem(item);
                          }}
                        >
                          <RiPencilFill className="w-6 h-6 fill-white" />
                        </button>
                      )}

                      {(userData.role === "admin" ||
                        userData?.group?.permissions?.find(
                          (permission) => permission.route === "Testimonials"
                        )?.delete) && (
                        <button
                          onClick={() => {
                            setIsDeleteTestimonial(true), setSelectedItem(item);
                          }}
                          className="bg-[#D32A3D] p-1 rounded-lg"
                        >
                          <HiTrash className="w-6 h-6 fill-white" />
                        </button>
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
          {/* <nav
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
          </nav> */}
        </div>
        {/* Add Testimonial Modal */}
        <Modal
          isOpen={isAddTestimonialModal}
          closeModal={closeAddTestimonial}
          // data={selectedItem}
        >
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-black text-center mb-4"
          >
            Add Testimonial
          </Dialog.Title>
          <form
            action=""
            onSubmit={(e) => {
              selectedItem ? handleSubmitUpdate(e) : handleDataSubmit(e);
            }}
          >
            <label htmlFor="client-name" className="mb-2 block font-bold">
              Client Name
            </label>
            <input
              type="text"
              id="client-name"
              className="w-full px-4 py-2 rounded-full border border-gray-500 mb-4"
              required
              value={payloaddata.name}
              onChange={(e) => handleData("name", e.target.value)}
            />
            <label htmlFor="client-profession" className="mb-2 block font-bold">
              Profession
            </label>
            <input
              type="text"
              id="client-profession"
              className="w-full px-4 py-2 rounded-full border border-gray-500 mb-4"
              required
              value={payloaddata.profession}
              onChange={(e) => handleData("profession", e.target.value)}
            />
            <label htmlFor="client-company" className="mb-2 block font-bold">
              Company Name
            </label>
            <input
              type="text"
              id="client-company"
              className="w-full px-4 py-2 rounded-full border border-gray-500 mb-4"
              required
              value={payloaddata.companyName}
              onChange={(e) => handleData("companyName", e.target.value)}
            />
            <label htmlFor="client-company" className="mb-2 block font-bold">
              Website URL
            </label>
            <input
              type="text"
              id="client-website"
              className="w-full px-4 py-2 rounded-full border border-gray-500 mb-4"
              required
              value={payloaddata.websiteURL}
              onChange={(e) => handleData("websiteURL", e.target.value)}
            />
            <label htmlFor="blog_heading" className="mb-2 block font-bold">
              Rating
            </label>
            {/* <RichEditorWithNoSSR /> */}
            <input
              type="number"
              id="client-company"
              className="w-full px-4 py-2 rounded-full border border-gray-500 mb-4"
              required
              value={payloaddata.rating}
              onChange={(e) => handleData("rating", e.target.value)}
            />
            <label htmlFor="blog_heading" className="mb-2 block font-bold">
              Review
            </label>
            <textarea
              type="text"
              rows={4}
              id="client-company"
              className="w-full px-4 py-2 rounded-xl border border-gray-500 mb-4"
              required
              value={payloaddata.review}
              onChange={(e) => handleData("review", e.target.value)}
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
            {selectedItem && !url && (
              <div className="mt-4 flex justify-center mb-4">
                <img
                  src={selectedItem?.logo}
                  alt=""
                  className="w-[100px] h-[80px]"
                />
              </div>
            )}

            <button
              type="submit"
              className="bg-[#D32A3D] text-white px-10 py-2 rounded-full text-xl font-semibold flex items-center mx-auto"
              disabled={loading}
            >
              {loading && <Spinner />}
              {selectedItem ? "Save" : "Add"}
            </button>
          </form>
        </Modal>

        {/* Delete Testimonial */}
        <Modal
          isOpen={isDeleteTestimonial}
          closeModal={() => setIsDeleteTestimonial(false)}
        >
          <Dialog.Title
            as="h3"
            className="text-xl font-bold leading-6 text-black text-center mb-4"
          >
            Delete Testimonial
          </Dialog.Title>
          <p className="text-center font-medium text-lg my-10">
            Are you sure want to delete this Testimonial?
          </p>
          <div className="flex items-center justify-center gap-10 text-lg font-medium">
            <button
              className="px-14 py-2 rounded-full text-white bg-[#D32A3D]"
              onClick={deleteTestimonials}
            >
              Yes
            </button>
            <button
              className="px-14 py-2 rounded-full text-white bg-black"
              onClick={() => setIsDeleteTestimonial(false)}
            >
              No
            </button>
          </div>
        </Modal>
        <ModalOverlay isOpen={isAddTestimonialModal || isDeleteTestimonial} />
      </div>
    </AppLayout>
  );
};
export default withAuth(Testimonials);
