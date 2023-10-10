import { useState, useEffect } from "react";
import ContactUsTable from "@/components/ContactUsTable";
import AppLayout from "@/layouts/AppLayout";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import { getPricingItems } from "@/redux/features/features.actions";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { withAuth } from "@/components/Helpers/withAuth";

import PricingTable from "@/components/PricingTable";
import { RefreshButton } from "@/components/RefreshButton";
const tabs = ["Services", "Devices", "Functionalities"];

const Pricing = (props) => {
  const userData = props.userData;
  const pricingItems = useSelector(({ features }) => features.pricingItems);
  console.log("PricingItems", pricingItems);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    getPricingitems();
  }, []);

  const getPricingitems = () => {
    dispatch(getPricingItems());
  };

  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto p-4 relative">
        <Tab.Group defaultIndex={0}>
          <Tab.List className={"flex flex-wrap"}>
            {tabs.map((tab) => (
              <Tab key={tab} as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`lg:px-10 lg:py-3 px-5 py-2 rounded-full mr-4 mb-4 lg:mb-0 text-white lg:text-base text-sm font-medium hover:bg-[#D32A3D] focus:outline-none ${
                      selected ? "bg-[#D32A3D]" : "bg-slate-300"
                    }`}
                  >
                    {tab}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className={"mt-8"}>
            <Tab.Panel>
              <PricingTable
                headers={["S No.", "Service", "Price", "Action"]}
                dataItems={pricingItems?.Service}
                userData={userData}
              />
            </Tab.Panel>
            <Tab.Panel>
              <PricingTable
                headers={["S No.", "Device", "Price", "Action"]}
                dataItems={pricingItems?.Device}
                userData={userData}
              />
            </Tab.Panel>
            <Tab.Panel>
              <PricingTable
                headers={["S No.", "Functionality", "Price", "Action"]}
                dataItems={pricingItems?.Functionality}
                userData={userData}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </AppLayout>
  );
};

export default withAuth(Pricing);
