import {
  convertMessageToShortName,
  convertUserNameToShortNane,
} from "@/utils/chat";
import Image from "next/image";
import React from "react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Fill } from "react-icons/ri";
export function Conversation({
  chat,
  openEditChatModal,
  openDeleteModal,
  online,
  index,
  selected,
}) {
  return (
    <div className="cursor-pointer card p-4 min-w-[350px] flex justify-between items-center gap-4 rounded-lg border border-zinc-300">
      <div className="relative w-16 h-16 rounded-full bg-[#d32a3d] flex justify-center items-center">
        <h1 className="font-bold text-2xl text-white">
          {chat?.senderId?.firstName?.charAt(0)}
        </h1>
        <span
          className={`w-3 h-3 rounded-full absolute bottom-2 right-0 ${
            online ? "bg-green-500" : "bg-gray-400"
          }`}
        ></span>
      </div>
      <h3 className="text-gray-800 font-semibold text-lg">
        {convertUserNameToShortNane(chat?.senderId?.firstName, 12)}
      </h3>
      <div className="text-xs">
        <span>{new Date(chat.createdAt).toLocaleDateString()}</span>
        <br />
        <span>{new Date(chat.createdAt).toLocaleTimeString()}</span>
      </div>
      <div>
        <button>
          <BiEdit
            onClick={() => openEditChatModal(chat, index)}
            className="w-6 h-6 inline mr-2 "
          />
        </button>
        {selected === "close" && (
          <button onClick={() => openDeleteModal(chat, index)}>
            <RiDeleteBin6Fill className="w-6 h-6 fill-[#d32a3d] inline" />
          </button>
        )}
      </div>
    </div>
  );
}
