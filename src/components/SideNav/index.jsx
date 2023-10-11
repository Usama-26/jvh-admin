import Image from "next/image";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { FaListCheck } from "react-icons/fa6";
import { FaUser, FaUserCog } from "react-icons/fa";
import { IoMdCalendar } from "react-icons/io";
import { withAuth } from "../Helpers/withAuth";
import { useEffect, useRef, useState } from "react";
import socket from "../../../socket";
import { getUsers, logOutRequest } from "@/redux/auth/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  BiChevronDown,
  BiChevronRight,
  BiCog,
  BiSolidBarChartSquare,
} from "react-icons/bi";
import { BsTelephoneFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { Menu } from "@headlessui/react";

const SideNav = (props) => {
  const user = useSelector(({ auth }) => auth.user);
  const chatsCount = useRef(0);
  const [contactCount, setContactCount] = useState(0);
  const usersData = useSelector(({ auth }) => auth.users);
  const dispatch = useDispatch();
  const router = useRouter();
  const userStatus = useSelector(({ auth }) => auth.userStatus);

  const styles = {
    "list-item":
      "menu-list-item block px-10 py-3 text-sm hover:bg-[#21DDB855] font-medium ",
    "list-item__icon": "w-5 h-5 inline stroke-white mr-2",
  };
  const getUsers1 = (page) => {
    let status = "isApproved";
    let value = false;
    let status2 = "isActive";
    let value2 = true;
    dispatch(getUsers(page, "staff", status, value, status2, value2));
  };
  socket.on("new-conversation", () => {
    chatsCount.current += 1;
  });
  socket.on("signup-approval", () => {
    getUsers1(1);
  });

  socket.off("contactFormData").on("contactFormData", () => {
    const count = localStorage.getItem("contactCount");
    if (count === null) {
      localStorage.setItem("contactCount", 1);
      setContactCount(1);
    } else {
      localStorage.setItem("contactCount", Number(count) + 1);
      setContactCount(count + 1);
    }
  });

  useEffect(() => {
    if (router.asPath === "/admin/notifications") {
      setContactCount(0);
      localStorage.setItem("contactCount", 0);
    } else {
      const count = localStorage.getItem("contactCount");
      count === null ? setContactCount(0) : setContactCount(count);
    }
  });

  useEffect(() => {
    getUsers1(1);
  }, []);
  useEffect(() => {
    if (usersData?.results?.length > 0) {
      if (
        usersData?.results[0] &&
        !usersData?.results[0]?.isApproved &&
        usersData?.results[0]?.isActive
      ) {
        setSignUpApprovals(usersData?.results?.length);
      }
    }
  }, [usersData]);

  useEffect(() => {
    const status = localStorage.getItem("userStatus");
    if (status == "Online") {
      socket.emit("new-staff-add", user?.id);
    } else {
      socket.emit("forceDisconnect", user?.id);
    }
  }, [userStatus]);

  const handleLogout = () => {
    dispatch(logOutRequest(user?.id, () => {}));
  };

  useEffect(() => {
    socket.once("user_inacive_by_admin", () => {
      handleLogout();
    });
    return () => {
      // Clean up the event listener when the component unmounts
      socket.off("user_inacive_by_admin", handleLogout);
    };
  }, []);

  return (
    <div className="sidenav fixed top-0 left-0 h-screen md:block hidden sidenav-width  bg-[#1E1E1E] overflow-auto">
      <Image
        src="/jvh-logo@2x.png"
        width={125}
        height={105}
        alt="Company Logo"
        className="w-24 mx-auto mb-4 md:mb-6"
      />

      <ul className="my-4 text-white">
        <li>
          <Link
            href="/admin"
            className={`${styles["list-item"]} ${
              router.pathname === "/admin" ? "bg-[#21DDB8]" : ""
            }`}
          >
            <MdDashboard className={styles["list-item__icon"]} />
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            href="/admin/exhibitions"
            className={`${styles["list-item"]} ${
              router.pathname === "/admin/exhibitions" ? "bg-[#21DDB8]" : ""
            }`}
          >
            <IoMdCalendar className={styles["list-item__icon"]} />
            Exhibitions
          </Link>
        </li>

        <li>
          <Link
            href="/admin/submissions"
            className={`${styles["list-item"]} ${
              router.pathname === "/admin/submissions" ? "bg-[#21DDB8]" : ""
            }`}
          >
            <FaListCheck className={styles["list-item__icon"]} />
            Submissions
          </Link>
        </li>
        <li>
          <Link
            href="/admin/sales"
            className={`${styles["list-item"]} ${
              router.pathname === "/admin/sales" ? "bg-[#21DDB8]" : ""
            }`}
          >
            <BiSolidBarChartSquare className={styles["list-item__icon"]} />
            Sales
          </Link>
        </li>

        <li>
          <Link
            href="/admin/item-enquiries"
            className={`${styles["list-item"]} ${
              router.pathname === "/admin/item-enquiries" ? "bg-[#21DDB8]" : ""
            }`}
          >
            <div className="relative inline-flex items-center justify-center">
              <BsTelephoneFill className={styles["list-item__icon"]} />
              <span
                className={`w-5 h-5 text-center rounded-full absolute top-3 right-0 font-bold bg-[#21DDB8] `}
              >
                {contactCount}
              </span>
            </div>
            Item Enquiries
          </Link>
        </li>

        <li>
          <Menu>
            <Menu.Button className={`${styles["list-item"]} w-full text-left`}>
              {({ open }) => (
                <span className="flex justify-between items-center">
                  <span>
                    <FaUserCog className={styles["list-item__icon"]} />
                    <span>Manage</span>
                  </span>
                  <BiChevronRight
                    className={`w-5 h-5 fill-primary transition-all duration-200 ${
                      open ? "rotate-90" : "rotate-0"
                    }`}
                  />
                </span>
              )}
            </Menu.Button>
            <Menu.Items as="ul" className={("border-l-2", "ml-10")}>
              <Menu.Item as={"li"}>
                <Link
                  className="block px-10 py-2  ml-2  text-sm hover:bg-[#21DDB855] font-medium border-l-2"
                  href={"/admin/manage/artists"}
                >
                  Artists
                </Link>
              </Menu.Item>
              <Menu.Item as={"li"}>
                <Link
                  className="block px-10 py-2  ml-2  text-sm hover:bg-[#21DDB855] font-medium border-l-2"
                  href={"/admin/manage/exhibitions"}
                >
                  Exhibitions
                </Link>
              </Menu.Item>
              <Menu.Item as={"li"}>
                <Link
                  className="block px-10 py-2  ml-2  text-sm hover:bg-[#21DDB855] font-medium border-l-2"
                  href={"/admin/manage/items"}
                >
                  Items
                </Link>
              </Menu.Item>
              <Menu.Item as={"li"}>
                <Link
                  className="block px-10 py-2  ml-2  text-sm hover:bg-[#21DDB855] font-medium border-l-2"
                  href={"/admin/manage/submission"}
                >
                  Submissions
                </Link>
              </Menu.Item>
              <Menu.Item as={"li"}>
                <Link
                  className="block px-10 py-2  ml-2  text-sm hover:bg-[#21DDB855] font-medium border-l-2"
                  href={"/admin/manage/exhibition-categories"}
                >
                  Exhibition Categories
                </Link>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </li>
        <li>
          <Link
            href="/admin/admin_management"
            className={`${styles["list-item"]} ${
              router.pathname === "/admin/admin_management"
                ? "bg-[#21DDB8]"
                : ""
            }`}
          >
            <FaUser className={styles["list-item__icon"]} />
            Admin Management
          </Link>
        </li>
        <li>
          <Link
            href="/admin/settings"
            className={`${styles["list-item"]} ${
              router.pathname === "/admin/settings" ? "bg-[#21DDB8]" : ""
            }`}
          >
            <div className="relative inline-flex items-center justify-center">
              <BiCog className={styles["list-item__icon"]} />
              Settings
            </div>
          </Link>
        </li>
      </ul>
      <div className="border-t bg-[#1E1E1E] border-gray-700 sticky bottom-0 text-white">
        <Link
          href="/admin/logout"
          className={`block px-10 py-3 text-sm text-[#21DDB8] hover:bg-gray-700`}
        >
          <FiLogOut className={"w-5 h-5 inline stroke-[#21DDB8] mr-2"} />
          Logout
        </Link>
      </div>
    </div>
  );
};
export default withAuth(SideNav);
