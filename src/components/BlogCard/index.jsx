/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Modal from "../Modal";
import { Dialog } from "@headlessui/react";
import ModalOverlay from "../ModalOverlay";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { updateBlogs, getBlogs } from "@/redux/features/features.actions";
import { baseUrl } from "@/repositories/genericRepository";
import dynamic from "next/dynamic";
import Spinner from "../svgs/spinner";
import { logsAPI } from "../LogsAPI";
const RichEditorWithNoSSR = dynamic(
  () => import("../../components/Generic/RichEditor"),
  {
    ssr: false,
  }
);
export default function BlogCard({ data, userData }) {
  const [isEditBlogModal, setIsEditBlogModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isViewModal, setIsViewModal] = useState(false);
  const [defaultEditorDesc, setDefaultEditorDesc] = useState(data?.description);
  const [data1, setData] = useState({});
  const [imgLoading, setImgLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editorText, setEditorText] = useState();

  const [payloaddata, setPayloadData] = useState({
    name: data.name,
    description: data.description,
    logo: data.logo,
  });
  const [url, updateUrl] = useState(data.logo);
  const fileInputRef = useRef(null);

  const handleData = (key, value) => {
    setPayloadData({ ...payloaddata, [key]: value });
  };

  const router = useRouter();
  const dispatch = useDispatch();

  function openEditBlogModal() {
    setIsEditBlogModal(true);
    setDefaultEditorDesc(data?.description);
  }
  function closeEditBlogModal() {
    setIsEditBlogModal(false);
  }
  function openDeleteModal() {
    setIsDeleteModal(true);
  }
  function closeDeleteModal() {
    setIsDeleteModal(false);
  }
  const handleLoading = () => {
    setLoading(false);
    closeEditBlogModal();
    dispatch(getBlogs());
    // updateUrl();
    // let defaultValue = {
    //   name: "",
    //   description: "",
    //   logo: "",
    // };
    // setPayloadData(defaultValue);
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
    formData.append("upload_preset", "mrrobotdev"); // replace with your upload preset
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
        setImgLoading(false);
        // console.error("Upload error:", error);
        toast.error("Icon upload error, try again!!!", {});
      });
  }

  const handleButtonClick = () => {
    fileInputRef.current.click();
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
    dispatch(updateBlogs(payload, data.id, handleLoading));
    logsAPI("updated blog.", userData);
  };

  const deleteBlog = async () => {
    const id = data.id;
    try {
      const { data } = await axios.delete(`${baseUrl}/blogs/${id}`);
      // console.log(data);
      toast.success("Blog Deleted Successfully", {});
      dispatch(getBlogs());
      closeDeleteModal();
      logsAPI("deleted a blog.", userData);
    } catch (e) {
      toast.error("An error occured!!!", {});
    }
  };

  return (
    <>
      <div
        className="relative cursor-pointer"
        onClick={() => setIsViewModal(true)}
      >
        <div className="shadow-[0px_0px_10px_10px_#00000011] rounded-lg p-6 h-[500px]">
          <img
            src={data?.logo}
            width={500}
            height={500}
            className="h-40 w-40 mx-auto"
            alt="Blog Image"
          />
          <h1 className="text-center text-xl font-bold my-4 h-24">
            {data?.name}
          </h1>
          <div
            className="text-center font-montserrat overflow-hidden line-clamp-3 h-[75px]"
            dangerouslySetInnerHTML={{ __html: data?.description }}
          ></div>
          <div className=" mx-auto w-56 flex justify-between mt-4">
            {(userData.role === "admin" ||
              userData?.group?.permissions?.find(
                (permission) => permission.route === "Blog Management Screen"
              )?.update) && (
              <button
                onClick={openEditBlogModal}
                className="text-white inline-block bg-[#00AD45] font-medium px-8 py-2 rounded-full"
              >
                Edit
              </button>
            )}

            {(userData.role === "admin" ||
              userData?.group?.permissions?.find(
                (permission) => permission.route === "Blog Management Screen"
              )?.delete) && (
              <button
                onClick={openDeleteModal}
                className="text-white inline-block bg-[#D32A3D] font-medium px-6 py-2 rounded-full"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
      {/* View Modal */}
      <Modal
        isOpen={isViewModal}
        openModal={() => setIsViewModal(true)}
        closeModal={() => setIsViewModal(false)}
      >
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-black text-center mb-4"
        >
          View Blog
        </Dialog.Title>
        <form action="" onSubmit={(e) => handleDataSubmit(e)}>
          <label htmlFor="blog_heading" className="mb-2 block font-bold">
            Blog Heading
          </label>
          <input
            type="text"
            id="blog_heading"
            className="w-full px-4 py-2 rounded-full border border-gray-500 mb-4"
            value={payloaddata.name}
          />
          <label htmlFor="blog_heading" className="mb-2 block font-bold">
            Blog Content
          </label>

          <RichEditorWithNoSSR
            isReadOnly={true}
            setEditorDesc={setEditorText}
            editorDesc={defaultEditorDesc}
          />

          {url && (
            <div className="mt-4 flex justify-center mb-4 border border-gray-500 border-dashed p-4 rounded-xl">
              <img src={url} alt="" className="w-[100px] h-[80px]" />
            </div>
          )}
          <button
            onClick={() => setIsViewModal(false)}
            className="bg-[#D32A3D] text-white px-10 py-2 rounded-full text-xl font-semibold block mx-auto"
          >
            Close
          </button>
        </form>
      </Modal>
      {/* Edit Modal */}
      <Modal
        isOpen={isEditBlogModal}
        openModal={openEditBlogModal}
        closeModal={closeEditBlogModal}
      >
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-black text-center mb-4"
        >
          Edit Blog
        </Dialog.Title>
        <form action="" onSubmit={(e) => handleDataSubmit(e)}>
          <label htmlFor="blog_heading" className="mb-2 block font-bold">
            Blog Heading
          </label>
          <input
            type="text"
            id="blog_heading"
            placeholder="Enter blog heading here"
            className="w-full px-4 py-2 rounded-full border border-gray-500 mb-4"
            value={payloaddata.name}
            onChange={(e) => handleData("name", e.target.value)}
            required
          />
          <label htmlFor="blog_heading" className="mb-2 block font-bold">
            Blog Content
          </label>
          {/* <textarea
            placeholder="Enter text here"
            className="border border-gray-500 rounded-lg p-4 mb-4 w-full h-48 resize-none"
            value={payloaddata.description}
            onChange={(e) => handleData("description", e.target.value)}
            required
          ></textarea> */}
          <RichEditorWithNoSSR
            setEditorDesc={setEditorText}
            editorDesc={defaultEditorDesc}
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
          <button
            type="submit"
            className="bg-[#D32A3D] text-white px-10 py-2 rounded-full text-xl font-semibold flex items-center mx-auto"
            disabled={loading}
          >
            {loading && <Spinner />}
            Edit and save
          </button>
        </form>
      </Modal>
      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModal}
        openModal={openDeleteModal}
        closeModal={closeDeleteModal}
      >
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-black text-center mb-4"
        >
          Are you sure want to delete this blog?
        </Dialog.Title>
        <div className=" mx-auto w-56 flex justify-between mt-4">
          <button
            onClick={() => deleteBlog()}
            className="text-white inline-block bg-[#D32A3D] font-medium px-6 py-2 rounded-full"
          >
            Yes
          </button>
          <button
            onClick={() => closeDeleteModal()}
            className="text-white inline-block bg-black font-medium px-6 py-2 rounded-full"
          >
            No
          </button>
        </div>
      </Modal>
      <ModalOverlay isOpen={isEditBlogModal || isDeleteModal} />
    </>
  );
}
