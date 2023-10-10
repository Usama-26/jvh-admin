import { useState, useEffect } from "react";
import { Dialog, Listbox } from "@headlessui/react";
import Modal from "../Modal";
import PermissionsModal from "../Permissions Modal";
import ModalOverlay from "../ModalOverlay";
import { Fragment } from "react";
import { RiPencilFill } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaChevronDown, FaPlus } from "react-icons/fa";
import { sendInvite } from "@/redux/auth/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { getUsers } from "@/redux/auth/auth.actions";
import { updateUser } from "@/redux/auth/auth.actions";
import { baseUrl } from "@/repositories/genericRepository";
import { addGroup, getGroup } from "@/redux/features/features.actions";
import { RefreshButton } from "@/components/RefreshButton";
import Pagination from "@/components/pagination";
import axios from "axios";
import { CleardataGear } from "../CleardataGear";
import { logsAPI } from "@/components/LogsAPI";

const groups = ["Staff", "Technical", "Marketing Executive", "Manager"];
const headersPermissions = ["Page", "View", "Modify", "Add", "Delete"];
const permissionsData = [
  {
    route: "Dashboard Screen",
    create: false,
    delete: false,
    update: false,
    view: true,
  },
  {
    route: "App Pricing Screen",
    create: false,
    delete: false,
    update: false,
    view: false,
  },
  {
    route: "Newsletter Screen",
    create: false,
    delete: false,
    update: false,
    view: false,
  },
  {
    route: "Statistics Screen",
    create: false,
    delete: false,
    update: false,
    view: false,
  },
  {
    route: "Blog Management Screen",
    create: false,
    delete: false,
    update: false,
    view: false,
  },
  {
    route: "Notifications Screen",
    create: false,
    delete: false,
    update: false,
    view: false,
  },
  {
    route: "Permissions Screen",
    create: false,
    delete: false,
    update: false,
    view: false,
  },
  {
    route: "Live Chat Screen",
    create: false,
    delete: false,
    update: false,
    view: false,
  },

  {
    route: "User Management",
    create: false,
    delete: false,
    update: false,
    view: false,
  },
  {
    route: "Signup Approvals",
    create: false,
    delete: false,
    update: false,
    view: false,
  },
  {
    route: "Security",
    create: false,
    delete: false,
    update: false,
    view: false,
  },
  {
    route: "Settings",
    create: false,
    delete: false,
    update: false,
    view: false,
  },
  {
    route: "Testimonials",
    create: false,
    delete: false,
    update: false,
    view: false,
  },
  {
    route: "Company Statistics",
    create: false,
    delete: false,
    update: false,
    view: false,
  },
];
export default function PermissionsTable({ headers, userData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isGroupUsersOpen, setIsGroupUsersOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState();
  const usersData = useSelector(({ features }) => features.groups);
  const [selectedGroup, setSelectedGroup] = useState();
  const [selectedGroupCopy, setSelectedGroupCopy] = useState();
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [group, setGroup] = useState("");
  const [usersAccess, setUsersAccess] = useState(permissionsData);
  const [updatedAccess, setUpdatedAccess] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [groupUsers, setGroupUsers] = useState([]);

  const handleData = (key, value) => {
    setModalData({ ...modalData, [key]: value });
  };

  useEffect(() => {
    getgroup(currentPage);
  }, []);

  useEffect(() => {
    if (selectedGroupCopy) {
      setUsersAccess(selectedGroupCopy.permissions);
    }
  }, [selectedGroupCopy]);

  const getgroup = (page) => {
    dispatch(getGroup(page));
  };

  const fetchNextRecords = (number) => {
    dispatch(getGroup(number));
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchNextRecords(pageNumber);
  };

  const handleLoading = () => {
    setLoading(false);
    setIsAddStaffOpen(false);
    setEmail("");
    closeModal();
    getgroup();
    setUsersAccess(permissionsData);
    setModalData();
    logsAPI("added a group in permissions.", userData);
  };
  function openAddStaffModal() {
    setIsAddStaffOpen(true);
  }
  function closeAddStaffModal() {
    setIsAddStaffOpen(false);
    setEmail("");
    setSelectedGroup(groups[0]);
    setModalData();
    setUsersAccess(permissionsData);
  }
  function openModal() {
    if (email === "") {
      toast.error("Please enter group name!!", {});
    } else {
      setIsModalOpen(true);
      setIsAddStaffOpen(false);
    }
  }
  function closeModal() {
    setIsModalOpen(false);
    setModalData();
    setUsersAccess(permissionsData);
    setEmail("");
  }
  function openDeleteModal(item) {
    setIsDeleteOpen(true);
    setSelectedGroup(item);
  }
  function closeDeleteModal() {
    setIsDeleteOpen(false);
  }

  function openGroupUsersModal() {
    setIsGroupUsersOpen(true);
  }
  function closeGroupUsersModal() {
    setIsGroupUsersOpen(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      groupName: email,
      permissions: [...usersAccess],
    };
    dispatch(addGroup(payload, handleLoading));
  };

  const handleCheckboxChange = (e, index, accessType, type) => {
    const { checked } = e.target;

    // Create a new object for the updated item
    const updatedItem = {
      route: accessType,
      create:
        type === "create"
          ? checked
          : usersAccess[index]?.create == undefined
          ? false
          : usersAccess[index]?.create,
      delete:
        type === "delete"
          ? checked
          : usersAccess[index]?.delete == undefined
          ? false
          : usersAccess[index]?.delete,
      update:
        type === "update"
          ? checked
          : usersAccess[index]?.update == undefined
          ? false
          : usersAccess[index]?.update,
      view:
        type === "view"
          ? checked
          : usersAccess[index]?.view == undefined
          ? false
          : usersAccess[index]?.view,
    };

    const updatedAccessList = [...usersAccess];
    updatedAccessList[index] = updatedItem;
    setUsersAccess(updatedAccessList);

    // updateAccess(updatedAccessList);
  };

  const updateAccess = async (data) => {
    const filteredAccessList = data.filter((item) => item !== undefined);
    console.log("Data", filteredAccessList);
    try {
      const response = await axios.put(
        `${baseUrl}/users/accesses`,
        filteredAccessList
      );
      toast.success("Status Updated", {});
      getAccessByID(selectedUser);
    } catch (e) {
      toast.error(e?.response?.data?.message, {});
      console.log("Error Post", e);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const id = selectedGroup.id;
    try {
      const { data } = await axios.delete(`${baseUrl}/permissions/${id}`);
      // console.log(data);
      toast.success("Group Deleted Successfully", {});
      logsAPI("deleted a group in permissions.", userData);
      dispatch(getGroup());
      closeDeleteModal();
    } catch (e) {
      toast.error("An error occured!!", {});
      console.log("Error", e);
    }
  };

  const mapUpdateData = (item) => {
    console.log("Map Item", item);
    const updatedPermissions = item.permissions.map((permission) => {
      const { _id, ...rest } = permission;
      return rest;
    });
    setEmail(item.groupName);
    setUsersAccess(updatedPermissions);
    setModalData(item);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const payload = {
      groupName: email,
      permissions: [...usersAccess],
    };

    setLoading(true);
    const id = modalData.id;
    try {
      const { data } = await axios.put(`${baseUrl}/permissions/${id}`, payload);
      // console.log(data);
      toast.success("Group Updated Successfully", {});
      logsAPI("updated a group in permissions.", userData);
      dispatch(getGroup());
      handleLoading();
    } catch (e) {
      toast.error("An error occured!!", {});
      console.log("Error", e);
    }
  };

  const getGroupUsers = async (id) => {
    openGroupUsersModal();
    try {
      const { data } = await axios.get(`${baseUrl}/permissions/users/${id}`);
      setGroupUsers(data);
    } catch (e) {
      console.log("Error", e);
    }
  };

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl text-black mb-4">
          Users Permissions: {usersData?.totalResults}
        </h1>
        {(userData.role === "admin" ||
          userData?.group?.permissions?.find(
            (permission) => permission.route === "Permissions Screen"
          )?.create) && (
          <>
            <button
              onClick={openAddStaffModal}
              className={`lg:px-8 lg:py-3 px-5 py-2 rounded-full mr-4 mb-4 lg:mb-0 text-white lg:text-base text-sm font-medium bg-[#D32A3D] focus:outline-none float-right clear-both lg:-mt-5`}
            >
              <FaPlus className="inline w-4 h-4 mr-2 " />
              Add User Group
            </button>
          </>
        )}
      </div>
      <div className="flex justify-end mb-2 mx-4 gap-3">
        <CleardataGear />
        <RefreshButton onClick={() => getgroup(currentPage)} />
      </div>
      <div className="overflow-auto table-height w-full">
        <table className="w-full min-w-max table-auto text-left border-collapse">
          <thead className="bg-indigo-950  sticky top-0">
            <tr>
              {headers.map((header) => (
                <th key={header} className="table-header">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {usersData?.results?.map((item, index) => (
              <tr key={index} className="even:bg-slate-100 odd:bg-white">
                <td className="table-cell">
                  {" "}
                  {index + 1 + (currentPage - 1) * recordsPerPage}
                </td>
                <td className="table-cell">{item?.groupName}</td>
                <td className="table-cell">
                  <button
                    className="bg-black rounded-full px-2.5 py-1.5 text-white"
                    onClick={() => getGroupUsers(item.id)}
                  >
                    View Details
                  </button>
                </td>
                <td className="table-cell">
                  {(userData.role === "admin" ||
                    userData?.group?.permissions?.find(
                      (permission) => permission.route === "Permissions Screen"
                    )?.update) && (
                    <button
                      onClick={() => {
                        openAddStaffModal(), mapUpdateData(item);
                      }}
                      className="bg-black p-1 rounded-lg"
                    >
                      <RiPencilFill className="w-6 h-6 fill-white" />
                    </button>
                  )}

                  {(userData.role === "admin" ||
                    userData?.group?.permissions?.find(
                      (permission) => permission.route === "Permissions Screen"
                    )?.delete) && (
                    <button
                      onClick={() => {
                        openDeleteModal(item);
                      }}
                      className="bg-red-600 p-1 rounded-lg ml-2"
                    >
                      <RiDeleteBin6Line className="w-6 h-6 fill-white" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <PermissionsModal
          isOpen={isModalOpen}
          openModal={openModal}
          closeModal={closeModal}
          data={modalData}
        >
          <div>
            <Dialog.Title
              as="h3"
              className="text-2xl font-bold leading-6 text-black text-center"
            >
              Permissions
            </Dialog.Title>

            <div>
              <div className="p-4">
                <table className="w-full min-w-max table-auto text-left border-collapse">
                  <thead className="bg-indigo-950  sticky top-0">
                    <tr>
                      {headersPermissions.map((header) => (
                        <th key={header} className="table-header">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {usersAccess?.map((item, index) => (
                      <>
                        {item.route !== "Dashboard Screen" && (
                          <tr
                            key={index}
                            className="even:bg-slate-100 odd:bg-white"
                          >
                            <td className="table-cell">{item.route}</td>
                            <td className="table-cell">
                              {" "}
                              <div>
                                <input
                                  checked={item.view}
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      e,
                                      index,
                                      item.route,
                                      "view"
                                    )
                                  }
                                  id={`checkbox-table-search-1-${index}`}
                                  type="checkbox"
                                  class="w-4 h-4 rounded bg-gray-700 border-gray-600 accent-black"
                                />
                                <label
                                  for="checkbox-table-search-1"
                                  class="sr-only"
                                >
                                  checkbox
                                </label>
                              </div>
                            </td>
                            <td className="table-cell">
                              {" "}
                              <div>
                                <input
                                  checked={item.update}
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      e,
                                      index,
                                      item.route,
                                      "update"
                                    )
                                  }
                                  id={`checkbox-table-search-1-${index}`}
                                  type="checkbox"
                                  class="w-4 h-4 rounded bg-gray-700 border-gray-600 accent-black"
                                />
                                <label
                                  for="checkbox-table-search-1"
                                  class="sr-only"
                                >
                                  checkbox
                                </label>
                              </div>
                            </td>
                            <td className="table-cell">
                              {" "}
                              <div>
                                <input
                                  checked={item.create}
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      e,
                                      index,
                                      item.route,
                                      "create"
                                    )
                                  }
                                  id={`checkbox-table-search-1-${index}`}
                                  type="checkbox"
                                  class="w-4 h-4 rounded bg-gray-700 border-gray-600 accent-black"
                                />
                                <label
                                  for="checkbox-table-search-1"
                                  class="sr-only"
                                >
                                  checkbox
                                </label>
                              </div>
                            </td>
                            <td className="table-cell">
                              {" "}
                              <div>
                                <input
                                  checked={item.delete}
                                  onChange={(e) =>
                                    handleCheckboxChange(
                                      e,
                                      index,
                                      item.route,
                                      "delete"
                                    )
                                  }
                                  id={`checkbox-table-search-1-${index}`}
                                  type="checkbox"
                                  class="w-4 h-4 rounded bg-gray-700 border-gray-600 accent-black"
                                />
                                <label
                                  for="checkbox-table-search-1"
                                  class="sr-only"
                                >
                                  checkbox
                                </label>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-center mx-10 mt-5">
                <button
                  type="button"
                  onClick={(e) =>
                    modalData ? handleUpdate(e) : handleSubmit(e)
                  }
                  className="bg-[#D32A3D] text-white px-10 py-2 rounded-full text-lg font-semibold inline-block "
                >
                  {modalData ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </PermissionsModal>
        <Modal
          isOpen={isAddStaffOpen}
          openModal={openAddStaffModal}
          closeModal={closeAddStaffModal}
        >
          <Dialog.Title
            as="h3"
            className="text-2xl font-bold leading-6 text-black text-center"
          >
            {modalData ? " Edit Group" : " Add New Group"}
          </Dialog.Title>
          <div className="p-8">
            <label htmlFor="display_name" className="mb-2 block">
              Group Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-full border border-gray-500 mb-4"
              placeholder="Enter your group name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {!modalData && (
              <>
                <Listbox
                  value={selectedGroupCopy}
                  onChange={setSelectedGroupCopy}
                >
                  <Listbox.Button
                    className={
                      "border border-gray-500 rounded-full w-full inline-flex justify-between items-center text-left py-2 px-4"
                    }
                  >
                    {selectedGroupCopy?.groupName || "Select Group"}
                    <FaChevronDown className=" inline" />
                  </Listbox.Button>
                  <Listbox.Options className=" bg-white w-full border border-gray-500 rounded-2xl mt-1">
                    {usersData?.results?.map((group, index) => (
                      <Listbox.Option as={"ul"} key={index} value={group}>
                        {({ active }) => (
                          <li
                            className={` p-2 ${
                              active ? "bg-gray-400 rounded-xl" : ""
                            }`}
                          >
                            {group?.groupName}
                          </li>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Listbox>
              </>
            )}
          </div>
          <div className="flex justify-center mx-10">
            {modalData ? (
              <button
                type="button"
                onClick={(e) => openModal()}
                className="bg-[#D32A3D] text-white px-10 py-2 rounded-full text-lg font-semibold inline-block "
              >
                See All Permissions
              </button>
            ) : (
              <button
                type="button"
                onClick={(e) => openModal()}
                className="bg-[#D32A3D] text-white px-10 py-2 rounded-full text-lg font-semibold inline-block "
              >
                Add Permissions
              </button>
            )}
          </div>
        </Modal>
        <Modal
          isOpen={isDeleteOpen}
          openModal={openDeleteModal}
          closeModal={closeDeleteModal}
        >
          <Dialog.Title
            as="h3"
            className="text-2xl font-bold leading-6 text-black text-center"
          >
            Delete Group
          </Dialog.Title>
          <div className="p-8 text-black text-center">
            <p>Are you sure want to delete this group?</p>
          </div>
          <div className="flex justify-center gap-8">
            <button
              type="button"
              onClick={(e) => handleDelete(e)}
              className="bg-[#D32A3D] text-white px-10 py-2 rounded-full text-lg font-semibold inline-block "
            >
              Yes
            </button>

            <button
              type="button"
              onClick={(e) => closeDeleteModal()}
              className="bg-black text-white px-10 py-2 rounded-full text-lg font-semibold inline-block "
            >
              No
            </button>
          </div>
        </Modal>
        <Modal
          isOpen={isGroupUsersOpen}
          openModal={openGroupUsersModal}
          closeModal={closeGroupUsersModal}
        >
          <Dialog.Title
            as="h3"
            className="text-2xl font-bold leading-6 text-black text-center"
          >
            Staff Group
          </Dialog.Title>
          <div className="mt-2 rounded-lg p-4 border">
            <div className="flex font-bold justify-between ">
              <h5>Total Group Employes</h5>
              <h5>{groupUsers?.length}</h5>
            </div>
            <div className="rounded-lg border border-zinc-400 mt-2">
              <div className="h-80 overflow-y-auto">
                {groupUsers?.map((item) => (
                  <>
                    <div className="flex px-2  border-b border-gray-700 py-2">
                      <h5>
                        {item.firstName} {item.surName}
                        <br />
                        {item.email}
                      </h5>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </Modal>
        <ModalOverlay
          isOpen={
            isModalOpen || isAddStaffOpen || isDeleteOpen || isGroupUsersOpen
          }
        />
      </div>
      <nav
        className="flex md:flex-row flex-col justify-between items-center pt-4 mx-5 mb-5 mt-5"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 ">
          Showing{" "}
          <span className="font-semibold text-gray-900">
            {`${(currentPage - 1) * 10 + 1}-${Math.min(
              currentPage * 10,
              usersData?.totalResults
            )}`}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900">
            {usersData.totalResults}
          </span>
        </span>
        <Pagination
          currentPage={currentPage}
          totalPages={usersData.totalPages}
          handleClick={handleClick}
        />
      </nav>
    </div>
  );
}
