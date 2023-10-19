/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import AppLayout from "@/layouts/AppLayout";
import { AiFillCheckCircle } from "react-icons/ai";
import { StatsCard } from "@/components/StatsCard";
import { IoMdCalendar } from "react-icons/io";
import { SearchBar } from "@/components/SearchBar";
import { FaPlus, FaUserCog } from "react-icons/fa";
import Image from "next/image";
import { MdBlock } from "react-icons/md";
import Link from "next/link";
import { withAuth } from "@/components/Helpers/withAuth";
import FeaturesRepository from "@/repositories/FeaturesRepository";
import Pagination from "@/components/pagination";
import moment from "moment";
import { useRouter } from "next/router";
const RichEditorWithNoSSR = dynamic(
  () => import("../../components/Generic/RichEditor"),
  {
    ssr: false,
  }
);
function Exhibitions() {
  const [exhibitions, setExhibitions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editorText, setEditorText] = useState();

  const getExhibitions = async (number) => {
    try {
      const { results } = await FeaturesRepository.getExhibitions(number);
      setExhibitions(results);
    } catch (error) {}
  };

  useEffect(() => {
    getExhibitions(currentPage);
  }, []);
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    getExhibitions(pageNumber);
  };
  const perPageShow = (pageNumber) => {
    setCurrentPage(pageNumber);
    getExhibitions(pageNumber);
  };
  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto text-white p-4">
        <div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2 grid-cols-1 mb-8">
          <StatsCard
            icon={<IoMdCalendar className="w-8 h-8 fill-primary" />}
            title="Upcoming Exhibitions"
            stats={0}
          />
          <StatsCard
            icon={<IoMdCalendar className="w-8 h-8 fill-primary" />}
            title="Completed Exhibitions"
            stats={10}
          />
          <StatsCard
            icon={<IoMdCalendar className="w-8 h-8 fill-primary" />}
            title="Next Exhibition"
            stats={"None"}
          />
        </div>
        <div className="flex items-center justify-between text-white mb-8">
          <div className="basis-3/12 flex-1">
            <h1 className="text-xl font-semibold">Exhibitions</h1>
          </div>

          <div className="basis-1/2 flex  justify-end gap-4 items-center font-medium">
            <div>
              <SearchBar placeholder={"Search Exhibitions"} />
            </div>
            <Link
              href={"/admin/manage/exhibitions/add"}
              className="btn-primary inline-block text-sm"
            >
              <div className="flex items-center gap-2 w-36">
                <FaPlus className="w-4 h-4 inline" />
                <span>Add Exhibition</span>
              </div>
            </Link>
            <button className="btn-primary inline-block text-sm">
              <div className="flex items-center gap-2 w-44">
                <FaUserCog className="w-4 h-4 inline" />
                <span>Manage Exhibitions</span>
              </div>
            </button>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2 grid-cols-1">
          {exhibitions?.results?.map((item) => (
            <>
              <ExhibitionCard data={item} />
            </>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalResults={exhibitions.totalResults}
          totalPages={exhibitions.totalPages}
          onPageChange={handleClick}
          onRowsPerPageChange={perPageShow}
        />
      </div>
    </AppLayout>
  );
}

export default withAuth(Exhibitions);

function ExhibitionCard(props) {
  const router = useRouter();
  const data = props.data;
  const isStarted = new Date(data?.EndDate) > new Date();
  const isOpen = new Date(data?.SubmissionEndDate) > new Date();
  return (
    <div className="bg-[#2D2D2D] rounded text-gray-100">
      <div className="m-4">
        <img src={data?.Thumbnail} className="w-full" alt="Exhibition Image" />
      </div>
      <hr className="border-t border-gray-600" />

      <div className="m-4 space-y-3">
        <div className="space-y-1">
          <h2 className="font-semibold">{data?.Name}</h2>
          <h4 className="text-xs">
            {moment(data?.StartDate).format("Do MMM YYYY")} to{" "}
            {moment(data?.EndDate).format("Do MMM YYYY")}
          </h4>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-semibold">Submission Duration:</h3>
          <h4 className="text-xs">
            {moment(data?.SubmissionStartDate).format("Do MMM YYYY")} to{" "}
            {moment(data?.SubmissionEndDate).format("Do MMM YYYY")}
          </h4>
        </div>
        <span
          className={`inline-flex items-center gap-2 py-1 px-4  rounded text-sm ${
            isStarted ? "bg-[#26AA77]" : "bg-[#848484]"
          }`}
        >
          <AiFillCheckCircle className="w-4 h-4 " />
          <span>Exhibition Period: {isStarted ? "Started" : "Completed"}</span>
        </span>
        <span
          className={`inline-flex items-center gap-2 py-1 px-4  rounded text-sm ${
            isOpen ? "bg-[#26AA77]" : "bg-[#EA0000]"
          } `}
        >
          {!isOpen && <MdBlock className="w-4 h-4 " />}
          <span>Submission Period: {isOpen ? "Open" : "Closed"}</span>
        </span>
        <div className="flex justify-start items-center gap-3 text-xs font-medium">
          <span className="inline-block py-1 px-2 rounded border">
            Users: {data?.Users?.length}
          </span>
          <span className="inline-block py-1 px-2 rounded border">
            Items: {data?.Items?.length}
          </span>
          <span className="inline-block py-1 px-2 rounded border">
            {data?.Category}
          </span>
        </div>
      </div>

      <hr className="border-t border-gray-600" />
      <div className="m-4 flex justify-between text-xs font-medium">
        <button className="py-1 px-2 rounded btn-gradient">Print</button>
        <div className="space-x-4">
          <button className="py-1 px-2 rounded btn-gradient">Catalogue</button>
          <button
            type="button"
            className="py-1 px-2 rounded btn-gradient"
            onClick={() => router.push("/admin/manage/exhibitions")}
          >
            Manage
          </button>
        </div>
      </div>
    </div>
  );
}
