import React, { useEffect, useRef, useState } from "react";
import { LeftNavbar } from "../components/LeftNavbar";
import { io } from "socket.io-client";
import axios from "axios";
import { ChatBar } from "../components/ChatBar";
import { Link } from "react-router-dom";

export const Chats = () => {
  var user = JSON.parse(localStorage.getItem("user"));
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();



  useEffect(() => {
    socket.current = io("http://localhost:3001");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user._id]);

  
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/chat/${user._id}`
        );
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  // const [message, setMessage] = useState("")
  // const [messageReceived, setMessageReceived] = useState("")
  // const [sender, setSender] = useState("")
  // const [profile, setProfile] = useState()
  // const sendMessage = (e) => {
  //   e.preventDefault()
  //   let msg = {
  //     sender: user.username,
  //     profile: user.pic,
  //     message
  //   }
  //   socket.emit("send_message", msg);
  //   setMessage("");

  // }
  // useEffect(() => {
  //   socket.on("receive_message", (data) => {
  // setMessageReceived(data.message)
  // setSender(data.sender)
  // setProfile(data.profile)
  //   })
  // })

  return (
    <div className="lg:flex">
      <LeftNavbar />
      <div className="lg:flex lg:flex-col border-r border-black-50 lg:w-[470px] mb-40 md:mb-0">
        <div className="sticky top-0 dark:bg-black dark:text-white bg-white">
          <p className="text-xl font-bold p-2">{user.username}</p>
          <p className="flex lg:px-24 px-6 text-xl pb-2 font-bold">Messages</p>
        </div>
        <div className="lg:h-[520px] pb-32 overflow-y-scroll">
          {chats.map((chat) => {
            return (
              // setCurrentChat(chat)
              // <div onClick={() => handleClick(chat._id)} key={chat._id}>
              <div  key={chat._id}>
              <Link to={`/chat/${chat._id}`}>
                <ChatBar
                  data={chat}
                  currentUserId={user._id}
                  online={checkOnlineStatus(chat)}
                />
              </Link>
              </div>
            );
          })}
        </div>
      </div>
      <center className="hidden dark:text-white lg:flex">
          <div className="pt-52 lg:pl-60">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="currentColor"
              className="w-20 h-20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
              />
            </svg>
            Tap on a chat to start a conversation
          </div>{" "}
        </center>
    </div>
  );
};
