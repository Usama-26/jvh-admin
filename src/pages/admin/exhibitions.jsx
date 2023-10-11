/* eslint-disable @next/next/no-img-element */
import AppLayout from "@/layouts/AppLayout";
import { withAuth } from "@/components/Helpers/withAuth";
import { AiFillCheckCircle } from "react-icons/ai";
import { StatsCard } from "@/components/StatsCard";
import { IoMdCalendar } from "react-icons/io";
import { SearchBar } from "@/components/SearchBar";
import { FaPlus, FaUserCog } from "react-icons/fa";
import Image from "next/image";
import { MdBlock } from "react-icons/md";
import Link from "next/link";

function Exhibitions() {
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
              <span className="flex items-center gap-2">
                <FaPlus className="w-4 h-4 inline" />
                <span>Add Exhibition</span>
              </span>
            </Link>
            <button className="btn-primary inline-block text-sm">
              <span className="flex items-center gap-2">
                <FaUserCog className="w-4 h-4 inline" />
                <span>Manage Exhibitions</span>
              </span>
            </button>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2 grid-cols-1">
          <ExhibitionCard />
          <ExhibitionCard />
          <ExhibitionCard />
          <ExhibitionCard />
          <ExhibitionCard />
          <ExhibitionCard />
          <ExhibitionCard />
        </div>
      </div>
    </AppLayout>
  );
}

export default Exhibitions;

function ExhibitionCard() {
  return (
    <div className="bg-[#2D2D2D] rounded text-gray-100">
      <div className="m-4">
        <img
          src={"/test-card-image.png"}
          className="w-full"
          alt="Exhibition Image"
        />
      </div>
      <hr className="border-t border-gray-600" />

      <div className="m-4 space-y-3">
        <div className="space-y-1">
          <h2 className="font-semibold">Earth Laughs in Flowers</h2>
          <h4 className="text-xs">3 Sep 2023 to 27 Sep 2023</h4>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-semibold">Submission Duration:</h3>
          <h4 className="text-xs">30 Aug 2023 to 2 Sep 2023</h4>
        </div>
        <span className="inline-flex items-center gap-2 py-1 px-4  rounded text-sm bg-[#26AA77]">
          <AiFillCheckCircle className="w-4 h-4 " />
          <span>Exhibition Period: Completed</span>
        </span>
        <span className="inline-flex items-center gap-2 py-1 px-4  rounded text-sm bg-[#EA0000]">
          <MdBlock className="w-4 h-4 " />
          <span>Submission Period: Closed</span>
        </span>
        <div className="flex justify-start items-center gap-3 text-xs font-medium">
          <span className="inline-block py-1 px-2 rounded border">
            Users: 01
          </span>
          <span className="inline-block py-1 px-2 rounded border">
            Items: 16
          </span>
          <span className="inline-block py-1 px-2 rounded border">
            Group Exhibition
          </span>
        </div>
      </div>

      <hr className="border-t border-gray-600" />
      <div className="m-4 flex justify-between text-xs font-medium">
        <button className="py-1 px-2 rounded btn-gradient">Print</button>
        <div className="space-x-4">
          <button className="py-1 px-2 rounded btn-gradient">Catalogue</button>
          <button className="py-1 px-2 rounded btn-gradient">Manage</button>
        </div>
      </div>
    </div>
  );
}
