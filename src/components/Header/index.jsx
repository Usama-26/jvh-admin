/* eslint-disable @next/next/no-img-element */
import { Menu, Transition } from "@headlessui/react";
import { logOutRequest } from "@/redux/auth/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";
import { RiUserFill, RiLogoutBoxRFill } from "react-icons/ri";
import { MdOutgoingMail, MdSettings } from "react-icons/md";
import Link from "next/link";
import { withAuth } from "../Helpers/withAuth";
const Header = (props) => {
  const userData = props.userData;
  const user = useSelector(({ auth }) => auth.userbyID);

  const styles = {
    "menu-item": "hover:bg-gray-200 w-full p-2 rounded-md",
    "menu-item__icon": "w-5 h-5 inline mr-2 fill-[#FF001D]",
  };
  const dispatch = useDispatch();
  const handleCallBack = () => {};
  const handleLogout = () => {
    dispatch(logOutRequest(user?.id, handleCallBack));
  };
  return (
    <div className="w-full sticky top-0 p-4 shadow-md flex justify-between items-center bg-[#272727] z-30">
      <div>
        <h1 className=" text-white">
          Welcome, <br />{" "}
          <span className="font-semibold">Predrag Meintjes</span>
        </h1>
      </div>
      <div className="relative">
        <Menu>
          <Menu.Button className={"focus:outline-none"}>
            <div className="flex gap-2 items-center text-white">
              <span className="w-10 h-10 justify-center  inline-flex">
                <img src="/sample-user.jpg" className="rounded-full" alt="" />
              </span>
              <div className="text-left text-sm">
                <h6 className=" !font-light">Admin</h6>
                <h6 className=" !font-light">predragmeintjes@gmail.com</h6>
              </div>
            </div>
          </Menu.Button>
          {/* <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 py-4  px-2 rounded-md bg-white z-50 shadow-custom w-40 text-sm">
              <ul className="list-none">
                <Menu.Item as={"li"} className={styles["menu-item"]}>
                  <Link href="/admin/settings">
                    <RiUserFill className={styles["menu-item__icon"]} />
                    Account
                  </Link>
                </Menu.Item>
                <Menu.Item as={"li"} className={styles["menu-item"]}>
                  <Link href="/admin/chat">
                    <MdOutgoingMail className={styles["menu-item__icon"]} />
                    Inbox
                  </Link>
                </Menu.Item>
                <Menu.Item as={"li"} className={styles["menu-item"]}>
                  <Link href="/admin/settings">
                    <MdSettings className={styles["menu-item__icon"]} />
                    Settings
                  </Link>
                </Menu.Item>
                <Menu.Item as={"li"} className={styles["menu-item"]}>
                  <li className="cursor-pointer" onClick={() => handleLogout()}>
                    <RiLogoutBoxRFill className={styles["menu-item__icon"]} />
                    Logout
                  </li>
                </Menu.Item>
              </ul>
            </Menu.Items>
          </Transition> */}
        </Menu>
      </div>
    </div>
  );
};
export default Header;
