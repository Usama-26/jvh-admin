/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { IoMdSettings } from "react-icons/io";
import { IoMdTrash } from "react-icons/io";
import Modal from "@/components/Modal";
import Spinner from "../svgs/spinner";
import ModalOverlay from "../ModalOverlay";
import { Dialog, Tab } from "@headlessui/react";
import Repository, {
  baseUrl,
  getError,
} from "@/repositories/genericRepository";
import { toast } from "react-toastify";

export function NotificationGear() {
  const [isAddBlogModal, setIsAddBlogModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState([]);
  function openAddBlogModal() {
    setIsAddBlogModal(true);
  }
  function closeAddBlogModal() {
    setIsAddBlogModal(false);
    setEmail("");
  }

  const addEmail = async (e) => {
    e.preventDefault();
    let payload = {
      email: email,
    };
    setLoading(true);
    try {
      const response = await Repository.post(
        `${baseUrl}/notificationemails`,
        payload
      );
      // toast.success("Email added successfully", {});
      setLoading(false);
      // setIsAddBlogModal(false);
      getEmails();
      setEmail("");
    } catch (error) {
      toast.error("An error occured", {});
      setLoading(false);
    }
  };

  const getEmails = async () => {
    try {
      const response = await Repository.get(`${baseUrl}/notificationemails`);
      setEmails(response.data);
    } catch (error) {}
  };
  const deleteEmail = async (id) => {
    try {
      const response = await Repository.delete(
        `${baseUrl}/notificationemails/${id}`
      );
      // toast.success("Email deleted successfully", {});
      // closeAddBlogModal();
      getEmails();
    } catch (error) {
      toast.error("An error occured", {});
    }
  };

  useEffect(() => {
    getEmails();
  }, []);

  return (
    <>
      {/* <span className="text-[#D32A3D] cursor-pointer">Clear data!!</span> */}
      <form action="" onSubmit={(e) => addEmail(e)}>
        <label htmlFor="blog_heading" className="mb-2 block font-bold">
          Email
        </label>
        <input
          type="text"
          id="blog_heading"
          className="w-full px-4 py-2 rounded-full border border-gray-500 mb-4"
          value={email}
          placeholder="Enter Email Address"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-[#D32A3D] text-white px-10 py-2 rounded-full text-xl font-semibold flex items-center mx-auto"
          disabled={loading}
        >
          {loading && <Spinner />}
          Save
        </button>
      </form>
      <div className="py-2 mb-2">
        <span className="font-semibold">Added Emails</span>
        <div>
          {emails.map((email) => (
            <>
              <div className="flex items-center justify-between border p-2 mt-2 rounded-2xl">
                <div className="flex flex-col ">{email.email}</div>
                <button
                  onClick={() => deleteEmail(email.id)}
                  className="bg-[#D32A3D] p-1 rounded-full"
                >
                  <IoMdTrash className="stroke-white w-4 h-4" color="white" />
                </button>
              </div>
            </>
          ))}
        </div>
      </div>

      {/* <ModalOverlay isOpen={isAddBlogModal} /> */}
    </>
  );
}
