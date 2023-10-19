import { Index } from "./index";
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from "react";
import AppLayout from "@/layouts/AppLayout";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { withAuth } from "@/components/Helpers/withAuth";
import Spinner from "@/components/svgs/spinner";
import { SearchBar } from "@/components/SearchBar";
import { logsAPI } from "@/components/LogsAPI";
import { StatsCard } from "@/components/StatsCard";
import { IoMdCalendar, IoMdPricetag } from "react-icons/io";
import { AiFillCheckCircle, AiOutlineCheckCircle } from "react-icons/ai";
import FeaturesRepository from "@/repositories/FeaturesRepository";
import Pagination from "@/components/pagination";

const Items = (props) => {
  // const userData = props.userData;
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const getItems = async (number, perPage) => {
    try {
      const { results } = await FeaturesRepository.getItems(number, perPage);
      setItems(results);
    } catch (error) {}
  };

  useEffect(() => {
    getItems(currentPage, itemsPerPage);
  }, []);
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    getItems(pageNumber, itemsPerPage);
  };
  const perPageShow = (pageNumber) => {
    setItemsPerPage(pageNumber);
    getItems(currentPage, pageNumber);
  };

  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto text-white p-4">
        <div className="grid gap-4 md:grid-cols-2 grid-cols-1 mb-8">
          <StatsCard
            icon={<IoMdPricetag className="w-8 h-8 fill-primary" />}
            title="Sold"
            stats={5}
          />
          <StatsCard
            icon={<AiFillCheckCircle className="w-8 h-8 fill-primary" />}
            title="Available"
            stats={15}
          />
        </div>
        <div className="flex items-center justify-between text-white mb-8">
          <div className="basis-3/12 flex-1">
            <h1 className="text-xl font-semibold">Items</h1>
          </div>
          <div className="flex gap-4">
            <button className="btn-primary inline-block text-sm">
              Transfer Items
            </button>
            <SearchBar placeholder={"Search by User Name"} />
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2 grid-cols-1">
          {items?.results?.map((item) => (
            <>
              <ItemCard data={item} onClick={() => getItems(currentPage)} />
            </>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          rowsPerPage={itemsPerPage}
          totalResults={items.totalResults}
          totalPages={items.totalPages}
          onPageChange={handleClick}
          onRowsPerPageChange={perPageShow}
        />
      </div>
    </AppLayout>
  );
};
export default withAuth(Items);

function ItemCard({ data, onClick }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const router = useRouter();

  const updateStatus = async (value, id, st) => {
    setStatus(st);
    let payload = {
      Status: value,
    };
    setLoading(true);
    try {
      const { results } = await FeaturesRepository.updateItems(payload, id);
      toast.success("Item Updated Successfully", {});
      setLoading(false);
      onClick();
    } catch (error) {
      setLoading(false);
      toast.error(error, {});
    }
  };
  return (
    <div className="bg-[#2D2D2D] rounded text-gray-100">
      <div className="relative m-4">
        <img src={data?.Thumbnail} className="w-full" alt="Exhibition Image" />
      </div>
      <hr className="border-t border-gray-600" />

      <div className="m-4 space-y-3">
        <div className="space-y-1">
          <h2 className="font-semibold">{data?.Name}</h2>
          {/* <h4 className="text-xs">{data?.Exhibition}</h4> */}
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-semibold">{data?.User}</h3>
          <h4 className="text-xs">{data?.Medium}</h4>
        </div>
        {data?.Status == 1 && (
          <span className="inline-flex items-center gap-2 py-1 px-4  rounded text-sm bg-[#26AA77]">
            <AiFillCheckCircle className="w-4 h-4 " />
            <span>Available</span>
          </span>
        )}

        {data?.Status == 3 && (
          <span className="inline-flex items-center gap-2 py-1 px-4  rounded text-sm bg-[#26AA77]">
            <AiFillCheckCircle className="w-4 h-4 " />
            <span>Sold</span>
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
          className={`py-1 px-2 rounded ${
            data.Status != 1 ? "bg-[#88888899]" : "btn-gradient"
          }`}
          onClick={() => router.push("/admin/manage/items")}
          disabled={loading || data.Status != 1}
        >
          {loading && status == "Edit" && <Spinner />}
          Edit
        </button>
        <button
          className={`py-1 px-2 rounded ${
            data.Status != 1 ? "bg-[#88888899]" : "btn-gradient"
          }`}
          disabled={loading || data.Status != 1}
          onClick={() => updateStatus(3, data.id, "Sold")}
        >
          {loading && status == "Sold" && <Spinner />}
          Make Sold
        </button>
      </div>
    </div>
  );
}
