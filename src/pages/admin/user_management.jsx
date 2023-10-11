import UserManagementTable from "@/components/UserManagementTable";
import AppLayout from "@/layouts/AppLayout";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendInvite } from "@/redux/auth/auth.actions";
import { withAuth } from "@/components/Helpers/withAuth";
import { RefreshButton } from "@/components/RefreshButton";

const tabs = ["Staff", "Clients "];

const UserManagement = (props) => {
  const userData = props.userData;
  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto p-4">
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
              <UserManagementTable
                heading={"Staff View"}
                headers={[
                  "S No.",
                  "Display Name",
                  "Email",
                  "Phone",
                  "Title",
                  "Date",
                  "Active/Inactive",
                  "Added on",
                  "Signedup By",
                  "Action",
                ]}
                member={"staff"}
                userData={userData}
              />
            </Tab.Panel>
            <Tab.Panel>
              <UserManagementTable
                heading={"Client View"}
                headers={[
                  "S No.",
                  "Full Name",
                  "Email",
                  "Phone",
                  "Date",
                  "Company Name",
                  "Added on",
                  "Member Since",
                  "Active/Inactive",
                  "Action",
                ]}
                member={"user"}
                userData={userData}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </AppLayout>
  );
};
export default UserManagement;
