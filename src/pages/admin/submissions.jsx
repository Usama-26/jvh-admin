import { Index } from "./index";
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from "react";
import AppLayout from "@/layouts/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import { FaHandHoldingMedical, FaPlus, FaUserCog } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { withAuth } from "@/components/Helpers/withAuth";
import Spinner from "@/components/svgs/spinner";
import { SearchBar } from "@/components/SearchBar";
import { logsAPI } from "@/components/LogsAPI";
import { StatsCard } from "@/components/StatsCard";
import Link from "next/link";
import FeaturesRepository from "@/repositories/FeaturesRepository";
import Pagination from "@/components/pagination";
import {
  AiFillCheckCircle,
  AiOutlineCheckCircle,
  AiFillCloseCircle,
} from "react-icons/ai";
import { MdBlock, MdEdit } from "react-icons/md";
import Modal from "@/components/Modal";
import ModalOverlay from "@/components/ModalOverlay";
function Submissions(props) {
  // const userData = props.userData;
  const [search, setSearch] = useState("");
  const [submissions, setSubmissions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();

  const getSubmissions = async (number) => {
    try {
      const { results } = await FeaturesRepository.getSubmissions(number);
      setSubmissions(results);
    } catch (error) {}
  };

  useEffect(() => {
    getSubmissions(currentPage);
  }, []);
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    getSubmissions(pageNumber);
  };
  const perPageShow = (pageNumber) => {
    setCurrentPage(pageNumber);
    getSubmissions(pageNumber);
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
          {submissions?.results?.map((item) => (
            <>
              <SubmissionCard
                data={item}
                onClick={() => getSubmissions(currentPage)}
              />
            </>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalResults={submissions.totalResults}
          totalPages={submissions.totalPages}
          onPageChange={handleClick}
          onRowsPerPageChange={perPageShow}
        />
      </div>
    </AppLayout>
  );
}

export default withAuth(Submissions);

function SubmissionCard({ data, onClick }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [reason, setReason] = useState("");
  const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);

  const updateStatus = async (value, id, st) => {
    setStatus(st);
    let payload = {};
    if (st == "Approve") {
      payload = {
        Status: value,
      };
    } else {
      payload = {
        Status: value,
        reason: reason,
      };
    }

    setLoading(true);
    try {
      const { results } = await FeaturesRepository.updateSubmissions(
        payload,
        id
      );
      toast.success("Submission Updated Successfully", {});
      setLoading(false);
      onClick();
      setIsReasonModalOpen(false);
    } catch (error) {
      setLoading(false);
      toast.error(error, {});
    }
  };
  return (
    <div className="bg-[#2D2D2D] rounded text-gray-100">
      <div className="relative m-4">
        <img src={data?.Thumbnail} className="w-full" alt="Submission Image" />
        <button className="absolute top-2 right-2 p-1.5 rounded-full bg-[#2D2D2D]">
          <MdEdit />
        </button>
      </div>
      <hr className="border-t border-gray-600" />

      <div className="m-4 space-y-3">
        <div className="space-y-1">
          <h2 className="font-semibold">{data?.Name}</h2>
          <h4 className="text-xs">{data?.Exhibition?.Name}</h4>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-semibold">
            {data?.User?.FirstName} {data?.User?.LastName}
          </h3>
          <h4 className="text-xs">{data?.Medium}</h4>
        </div>

        {data?.Status == 1 && (
          <span className="inline-flex items-center gap-2 py-1 px-4  rounded text-sm bg-[#26AA77]">
            <AiFillCheckCircle className="w-4 h-4 " />
            <span>Pending</span>
          </span>
        )}
        {data?.Status == 2 && (
          <span className="inline-flex items-center gap-2 py-1 px-4  rounded text-sm bg-[#26AA77]">
            <AiFillCheckCircle className="w-4 h-4 " />
            <span>Approved</span>
          </span>
        )}
        {data?.Status == 3 && (
          <span className="inline-flex items-center gap-2 py-1 px-4  rounded text-sm bg-[#DD2C00]">
            <AiFillCloseCircle className="w-4 h-4 " />
            <span>Declined</span>
          </span>
        )}

        <div className="flex justify-start items-center flex-wrap gap-3 text-xs font-medium">
          <span className="inline-block py-1 px-2 rounded border">
            Price: {data?.Price}
          </span>
          <span className="inline-block py-1 px-2 rounded border">
            Size: {data?.Size}
          </span>
          <span className="inline-block py-1 px-2 rounded border">
            Medium: {data?.Medium}
          </span>
        </div>
      </div>

      <hr className="border-t border-gray-600" />
      <div className="m-4 flex justify-between text-xs font-medium">
        <button
          type="button"
          className={`py-1 px-2 rounded ${
            data.Status != 1 ? "bg-[#88888899]" : "btn-danger"
          }`}
          onClick={() => {
            setIsReasonModalOpen(true);
          }}
          disabled={loading || data.Status != 1}
        >
          {loading && status == "Decline" && <Spinner />}
          Decline
        </button>
        <button
          type="button"
          className={`py-1 px-2 rounded ${
            data.Status != 1 ? "bg-[#88888899]" : "btn-gradient"
          }`}
          onClick={() => updateStatus(2, data.id, "Approve")}
          disabled={loading || data.Status != 1}
        >
          {loading && status == "Approve" && <Spinner />}
          Approve
        </button>
      </div>
      <DeclineReasonModal
        isOpen={isReasonModalOpen}
        closeModal={() => setIsReasonModalOpen(false)}
        onChange={(e) => setReason(e.target.value)}
        submitForm={() => updateStatus(3, data.id, "Decline")}
      />
      <ModalOverlay isOpen={isReasonModalOpen} />
    </div>
  );
}
function DeclineReasonModal({ isOpen, closeModal, onChange, submitForm }) {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="text-white space-y-8 p-4">
        <h1 className="font-semibold text-2xl text-center">
          Reason of Decline Submission
        </h1>
        <form>
          <textarea
            className="w-full resize-none rounded-lg bg-[#444444] mb-8 p-2"
            placeholder="Enter Decline Reason..."
            rows={4}
            onChange={onChange}
          />
          <div className="flex justify-center gap-4">
            <button
              type="button"
              className="py-2 px-8 font-medium rounded btn-gradient"
              onClick={submitForm}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
