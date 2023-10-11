import { StatsCard } from "@/components/StatsCard";
import AppLayout from "@/layouts/AppLayout";
import dynamic from "next/dynamic";
import { withAuth } from "@/components/Helpers/withAuth";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  getNewsLetter,
  getStats,
  getContacts,
} from "@/redux/features/features.actions";
import {
  baseUrl,
  getStorageDetails,
} from "../../repositories/genericRepository";
import { toast } from "react-toastify";
import { IoMdCalendar, IoMdPricetag } from "react-icons/io";
import axios from "axios";
import { FaCheck, FaClock, FaUsers } from "react-icons/fa";
import { MdInsertPhoto } from "react-icons/md";
import { BiSolidBarChartSquare, BiTrendingUp } from "react-icons/bi";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Admin = () => {
  const newsLetterData = useSelector(({ features }) => features.newsLetter);
  const statsData = useSelector(({ features }) => features.stats);
  const contactsData = useSelector(({ features }) => features.contacts);
  const [storageDetails, setStroageDetails] = useState();
  const [chartData, setChartData] = useState({
    freeSpace: 0,
    usedPercentage: 100,
  });
  const [storage, setStorage] = useState(0);
  const dispatch = useDispatch();
  const [monthCounts, setMonthCounts] = useState({});
  const getStorageDetail = async () => {
    try {
      const data = await getStorageDetails();
      setStroageDetails(data.result);
      setStorage(data?.result?.totalSize);
      const usedPercentage =
        (Number(data?.result?.usedStorage?.split(" ")[0]) * 100) /
        Number(data?.result?.totalSize);
      // const usedPercentage = data?.result?.usedStorage?.split(" ")[0];
      console.log("Used", usedPercentage);
      const freeSpace = 100 - Number(usedPercentage);
      setChartData({
        freeSpace,
        usedPercentage,
      });
      console.log(data.result.usedStorage, data.result.totalSize);
    } catch (error) {
      toast.error(error, {});
    }
  };
  useEffect(() => {
    dispatch(getNewsLetter("subscribed", 1));
    dispatch(getStats(1));
    dispatch(getContacts("ALL", 1));
    getStorageDetail();
  }, []);

  const updateStorage = async (e) => {
    e.preventDefault();
    let payload = {
      storageSize: Number(storage),
      storageUnit: "GB",
    };
    try {
      const result = await axios.put(
        `${baseUrl}/generic/storage/64ca573b412bea79dcc69bb9`,
        payload
      );
      toast.success("Storage Updated Successfully", {});
      setIsStorageModalOpen(false);
      getStorageDetail();
    } catch (error) {
      toast.error(error, {});
    }
  };

  return (
    <AppLayout>
      <div className="p-4 max-w-screen-2xl mx-auto ">
        <div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2 grid-cols-1 grid-rows-2">
          <StatsCard
            icon2={<FaClock className="w-3 h-3 fill-primary" />}
            icon={<FaUsers className="w-8 h-8 fill-primary" />}
            title="Users"
            stats={452}
            activity={"Last user login 3 hrs ago"}
          />
          <StatsCard
            icon2={<FaClock className="w-3 h-3 fill-primary" />}
            icon={<MdInsertPhoto className="w-8 h-8 fill-primary" />}
            title="Items"
            stats={1232}
            activity={"Last Submission 5 minutes ago"}
          />
          <StatsCard
            icon2={<FaClock className="w-3 h-3 fill-primary" />}
            icon={<IoMdCalendar className="w-8 h-8 fill-primary" />}
            title="Upcoming Exhibitions"
            stats={58}
            activity={"Last Exhibition added 2 hrs ago"}
          />
          <StatsCard
            icon2={<FaCheck className="w-3 h-3 fill-primary" />}
            icon={<IoMdCalendar className="w-8 h-8 fill-primary" />}
            title="Exhibitions Completed"
            stats={110}
            activity={"2 Exhibitions are completed!"}
          />
          <StatsCard
            icon2={<FaClock className="w-3 h-3 fill-primary" />}
            icon={<IoMdPricetag className="w-8 h-8 fill-primary" />}
            title="Total Items Sold"
            stats={1101}
            activity={"Last item sold 2 min ago"}
          />
          <StatsCard
            icon2={<BiTrendingUp className="w-3 h-3 fill-primary" />}
            icon={<BiSolidBarChartSquare className="w-8 h-8 fill-primary" />}
            title="Total Revenue (YTD)"
            stats={`$ 20,141`}
            activity={"25% increased from previous month"}
          />
        </div>

        {/* <div className="flex gap-4">
          <div className="basis-1/2 my-4 bg-[#2D2D2D] rounded-lg p-2">
            <Chart
              series={[
                {
                  name: "Visited Users",
                  data: [
                    50, 110, 120, 140, 130, 210, 220, 300, 290, 310, 340, 400,
                  ],
                },
              ]}
              type="area"
              options={{
                title: {
                  text: "Total Revenue",
                  style: {
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#FFFFFF",
                  },
                },
                chart: {
                  id: "users-visited",
                  background: "#2D2D2D",
                  toolbar: {
                    show: false,
                  },
                },
                colors: ["#21DDB8"],
                plotOptions: {
                  bar: { columnWidth: "50%" },
                },
                dataLabels: {
                  enabled: false,
                },
                xaxis: {
                  categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ],
                },
              }}
            />
          </div>
          <div className="basis-1/2 my-4 bg-[#2D2D2D] rounded-lg p-2">
            <Chart
              series={[
                {
                  name: "Subscribed Users",
                  data: [
                    50, 110, 120, 140, 130, 210, 220, 300, 290, 310, 340, 400,
                  ],
                },
              ]}
              type="bar"
              options={{
                title: {
                  text: "Total Revenue",
                  style: {
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#FFFFFF",
                  },
                },
                chart: {
                  id: "subscribed-users",
                  background: "#2D2D2D",
                  toolbar: {
                    show: false,
                  },
                },
                colors: ["#21DDB8"],
                plotOptions: {
                  bar: { columnWidth: "50%" },
                },
                dataLabels: {
                  enabled: false,
                },

                xaxis: {
                  categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ],
                },
              }}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="my-4 p-4 bg-[#2D2D2D] rounded-lg w-full">
            <Chart
              series={[
                {
                  name: "Submitted Forms",
                  data: [
                    50, 110, 120, 140, 130, 210, 220, 300, 290, 310, 340, 400,
                  ],
                },
              ]}
              height={400}
              type="line"
              options={{
                title: {
                  text: "Total Submitted Forms",
                  style: {
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#FFFFFF",
                  },
                },
                stroke: {
                  curve: "smooth",
                },
                chart: {
                  id: "submitted-forms",
                  background: "#2D2D2D",
                  dropShadow: {
                    enabled: true,
                    color: "#000",
                    top: 18,
                    left: 7,
                    blur: 10,
                    opacity: 0.2,
                  },
                  toolbar: {
                    show: true,
                  },
                },
                colors: ["#21DDB8"],
                plotOptions: {
                  bar: { columnWidth: "50%" },
                },
                dataLabels: {
                  enabled: true,
                  background: {
                    enabled: true,
                    borderRadius: 5,
                    borderWidth: 0,
                    padding: 5,
                  },
                },
                xaxis: {
                  categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ],
                },
              }}
            />
          </div>
          <div className="my-4 p-4 bg-[#2D2D2D] rounded-lg w-full">
            <Chart
              series={[chartData.usedPercentage, chartData.freeSpace]}
              height={400}
              type="pie"
              options={{
                title: {
                  text: "Database",
                  style: {
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#FFFFFF",
                  },
                },
                stroke: {
                  curve: "smooth",
                },
                chart: {
                  id: "database",
                  background: "#2D2D2D",
                  toolbar: {
                    show: true,
                  },
                },
                colors: ["#21DDB8", "#000000"],
                labels: ["Used Storage", "Free Storage"],
              }}
            />
          </div>
        </div> */}
      </div>
    </AppLayout>
  );
};
export default Admin;
