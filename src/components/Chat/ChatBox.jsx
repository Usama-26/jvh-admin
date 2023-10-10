import { FileMessageWithProgress } from "./FileMessageWithProgress";
import chatsRepository from "@/repositories/chatsRepository";
import Image from "next/image";
import React from "react";
import { useEffect } from "react";
import { ImAttachment } from "react-icons/im";
import { useRef } from "react";
import { useState } from "react";
import InputEmoji from "react-input-emoji";
import { convertDateAndTime } from "@/utils/chat";

export function ChatBox({ socket, chat, currentUser, online }) {
  const scroll = useRef();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);

  const handleSend = async (e) => {
    e && e.preventDefault();
    if (message !== "") {
      const messageObj = {
        chatId: chat.id,
        messageBody: {
          author: currentUser,
          message,
          time: new Date().toISOString(),
        },
      };
      try {
        const { result } = await chatsRepository.createMessage(messageObj);
        socket.emit("send-message", chat?.senderId?.id, result);
        console.log(result);
        setMessages((list) => [...list, result]);
        setMessage("");
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleEnterPress = (e) => {
    handleSend();
  };

  function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
      const messageObj = {
        chatId: chat.id,
        messageBody: {
          author: currentUser,
          attachment: "attachment",
          message: file.name,
          time: new Date().toISOString(),
        },
      };
      setFileName(file.name);
      setFile(file);
      setMessages((list) => [...list, messageObj.messageBody]);
    }
  }
  useEffect(() => {
    setMessage("");
    setMessages([]);
    setUserData(chat?.senderId);
  }, [chat, currentUser]);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const { result } = await chatsRepository.getMessages(chat.id);
        setMessages(result);
      } catch (err) {
        setMessages([]);
        console.log(err);
      }
    };
    if (chat !== null) getMessages();
  }, [chat]);

  useEffect(() => {
    socket.once("receive-message", (data) => {
      if (data?.author == chat?.senderId?.id) {
        setMessages([...messages, data]);
      }
    });
    scroll?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      {chat ? (
        <>
          <div className="card p-4 flex gap-4 mb-4 border-b rounded-t-lg border-gray-200 bg-white">
            <div className="relative w-16 h-16 rounded-full bg-[#d32a3d] flex justify-center items-center">
              <h1 className="font-bold text-2xl text-white">
                {chat?.senderId?.firstName?.charAt(0)}
              </h1>
              <span
                className={`w-3 h-3 rounded-full absolute bottom-2 right-0 ${
                  online ? " bg-green-500" : "bg-gray-400"
                }`}
              ></span>
            </div>
            <div>
              <h3 className="text-[#d32a3d] font-semibold text-lg">
                {userData?.firstName}
              </h3>
              <h5 className="font-semibold text-gray-500">
                {online ? "Online" : "Offline"}
              </h5>
            </div>
          </div>
          <div
            id="messages"
            className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
          >
            {messages.map((message, index) => (
              <div key={index} className="chat-message" ref={scroll}>
                <div
                  className={`flex items-end ${
                    message.author == currentUser && "justify-end"
                  }`}
                >
                  <div className="flex flex-col space-y-2 text-xs max-w-xs order-1 items-end">
                    <div>
                      {message?.attachment ? (
                        <span
                          className={`px-2 py-2 rounded-lg inline-block rounded-br-none ${
                            message.author == currentUser
                              ? "bg-[#D32A3D]  text-white rounded-br-none"
                              : "bg-gray-200  text-gray-700 rounded-bl-none"
                          }`}
                        >
                          <FileMessageWithProgress
                            chatId={chat?.id}
                            message={message}
                            file={file}
                            socket={socket}
                            userId={chat?.senderId?.id}
                          />
                        </span>
                      ) : (
                        <span
                          className={`px-4 py-2 rounded-lg inline-block rounded-br-none  ${
                            message.author == currentUser
                              ? "bg-[#D32A3D]  text-white rounded-br-none"
                              : "bg-gray-200  text-gray-700 rounded-bl-none"
                          }`}
                        >
                          {message?.message}
                          <span className="block text-right">
                            {convertDateAndTime(message?.time)}
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t-2 border-gray-200 px-4 py-4 mb-2 sm:mb-0">
            {!chat?.isClosed ? (
              <div className="relative flex items-center">
                <InputEmoji
                  borderColor={"#b9b2b2"}
                  value={message}
                  onChange={setMessage}
                  onEnter={handleEnterPress}
                />

                <label
                  for="file-input"
                  class="relative inline-block cursor-pointer"
                >
                  <ImAttachment className="w-6 h-6 cursor-pointer" />
                  <input
                    id="file-input"
                    type="file"
                    class="hidden"
                    onChange={handleFileSelect}
                    accept="image/jpeg, image/png, image/gif"
                    maxLength={1024 * 1024}
                  />
                </label>

                <button
                  onClick={(e) => handleSend(e)}
                  type="button"
                  className="h-12 w-12 inline-flex items-center justify-center rounded-full ml-2 px-2 bg-[#D32A3D] ease-in-out text-white focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className=" ml-1 h-6 w-6 transform rotate-45"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <h1 className="font-semibold text-3xl text-gray-400">
            Tap on conversation to start...
          </h1>
        </div>
      )}
    </>
  );
}
