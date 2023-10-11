import { Index } from "./index";
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from "react";
import BlogCard from "@/components/BlogCard";
import Modal from "@/components/Modal";
import ModalOverlay from "@/components/ModalOverlay";
import AppLayout from "@/layouts/AppLayout";
import { Dialog, Tab } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { FaHandHoldingMedical, FaPlus, FaUserCog } from "react-icons/fa";
import { HiOutlineRefresh } from "react-icons/hi";
import { getBlogs, addBlogs } from "@/redux/features/features.actions";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { withAuth } from "@/components/Helpers/withAuth";
import Spinner from "@/components/svgs/spinner";
import dynamic from "next/dynamic";
import { RefreshButton } from "@/components/RefreshButton";
import { SearchBar } from "@/components/SearchBar";
import { logsAPI } from "@/components/LogsAPI";
import { CleardataGear } from "@/components/CleardataGear";
import { StatsCard } from "@/components/StatsCard";
import { IoMdCalendar } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import { AiFillCheckCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { MdBlock, MdEdit } from "react-icons/md";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
const RichEditorWithNoSSR = dynamic(
  () => import("../../components/Generic/RichEditor"),
  {
    ssr: false,
  }
);
function Submissions(props) {
  // const userData = props.userData;
  const [isAddBlogModal, setIsAddBlogModal] = useState(false);
  const [modalData, setModalData] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const blogs = useSelector(({ features }) => features.blogs);
  const [editorText, setEditorText] = useState();
  const [search, setSearch] = useState("");
  const [payloaddata, setPayloadData] = useState({
    name: "",
    description: "",
    logo: "",
  });
  const [url, updateUrl] = useState();
  const fileInputRef = useRef(null);

  const handleData = (key, value) => {
    setPayloadData({ ...payloaddata, [key]: value });
  };
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    getblogs();
  }, []);

  const getblogs = () => {
    dispatch(getBlogs());
  };
  function openAddBlogModal() {
    setIsAddBlogModal(true);
  }
  function closeAddBlogModal() {
    setIsAddBlogModal(false);
  }

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
    closeAddBlogModal();
    dispatch(getBlogs());
    updateUrl();
    let defaultValue = {
      name: "",
      description: "",
      logo: "",
    };
    setPayloadData(defaultValue);
  };

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
    dispatch(addBlogs(payload, handleLoading));
    logsAPI("added new blog.", userData);
  };

  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto text-white p-4">
        <div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2 grid-cols-1 mb-8">
          <StatsCard
            icon={<FaHandHoldingMedical className="w-8 h-8 fill-primary" />}
            title="New Submissions"
            stats={0}
          />
          <StatsCard
            icon={<AiOutlineCheckCircle className="w-8 h-8 fill-primary" />}
            title="Accepted Submissions"
            stats={10}
          />
          <StatsCard
            icon={<MdBlock className="w-8 h-8 fill-primary" />}
            title="Declined Submissions "
            stats={"None"}
          />
        </div>
        <div className="flex items-center justify-between text-white mb-8">
          <div className="basis-3/12 flex-1">
            <h1 className="text-xl font-semibold">Submissions</h1>
          </div>
          <div>
            <SearchBar placeholder={"Search by User Name"} />
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2 grid-cols-1">
          <SubmissionCard />
          <SubmissionCard />
          <SubmissionCard />
          <SubmissionCard />
          <SubmissionCard />
          <SubmissionCard />
        </div>
        <Pagination />
      </div>
    </AppLayout>
  );
}

export default Submissions;

function SubmissionCard() {
  return (
    <div className="bg-[#2D2D2D] rounded text-gray-100">
      <div className="relative m-4">
        <img
          src={"/test-card-image.png"}
          className="w-full"
          alt="Exhibition Image"
        />
        <button className="absolute top-2 right-2 p-1.5 rounded-full bg-[#2D2D2D]">
          <MdEdit />
        </button>
      </div>
      <hr className="border-t border-gray-600" />

      <div className="m-4 space-y-3">
        <div className="space-y-1">
          <h2 className="font-semibold"></h2>
          <h4 className="text-xs">Ons Karoo - Suzanne & Isak Troskie</h4>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-semibold">Artist Name</h3>
          <h4 className="text-xs">Isak and Suzanne Artworks Troskie</h4>
        </div>
        <span className="inline-flex items-center gap-2 py-1 px-4  rounded text-sm bg-[#26AA77]">
          <AiFillCheckCircle className="w-4 h-4 " />
          <span>Approved</span>
        </span>
        <div className="flex justify-start items-center flex-wrap gap-3 text-xs font-medium">
          <span className="inline-block py-1 px-2 rounded border">
            Price: 7000
          </span>
          <span className="inline-block py-1 px-2 rounded border">
            Size: 585MM x 585MM
          </span>
          <span className="inline-block py-1 px-2 rounded border">
            Medium: Oil on Canvas
          </span>
        </div>
      </div>

      <hr className="border-t border-gray-600" />
      <div className="m-4 flex justify-between text-xs font-medium">
        <button className="py-1 px-2 rounded btn-danger">Decline</button>
        <button className="py-1 px-2 rounded btn-gradient">Approve</button>
      </div>
    </div>
  );
}

function Pagination() {
  return (
    <div className="py-2 px-4 flex justify-between items-center rounded bg-[#121212] text-xs text-gray-400">
      <span>Showing 1 - 10 of 97</span>
      <div className="flex items-center gap-2">
        <select name="pageNo" id="pageNo" className="p-1 bg-[#2B2B2B] rounded ">
          {Array.from(
            {
              length: 10,
            },
            (_, index) => (
              <option
                className="text-[#121212] bg-white"
                key={index}
                value={index + 1}
              >
                {index + 1}
              </option>
            )
          )}
        </select>
        <button className=" btn-gradient p-1 rounded">
          <BiChevronLeft className="w-4 h-4 fill-gray-700" />
        </button>
        <button className=" btn-gradient p-1 rounded">
          <BiChevronRight className="w-4 h-4 fill-gray-700" />
        </button>
      </div>
    </div>
  );
}
