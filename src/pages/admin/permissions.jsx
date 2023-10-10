import PermissionsTable from "@/components/PermissionsTable";
import AppLayout from "@/layouts/AppLayout";
import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendInvite } from "@/redux/auth/auth.actions";
import { withAuth } from "@/components/Helpers/withAuth";

const tabs = ["Staff"];

const Permissions = (props) => {
  const userData = props.userData;
  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto p-4">
        <PermissionsTable
          headers={["S No.", "Group", "Note", "Action"]}
          userData={userData}
        />
      </div>
    </AppLayout>
  );
};
export default withAuth(Permissions);
