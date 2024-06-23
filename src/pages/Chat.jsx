import React, { useEffect, useRef, useState } from "react";
import { LeftNavbar } from "../components/LeftNavbar";
import { io } from "socket.io-client";
import axios from "axios";
import { ChatBar } from "../components/ChatBar";
import { Link, useParams } from "react-router-dom";
import { ChatBox } from "../components/ChatBox";

export const Chat = () => {

  var user = JSON.parse(localStorage.getItem("user"));
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const { id } = useParams();
  const socket = useRef();

  // sending message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current = io("http://localhost:3001");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user._id]);

  // receive Message from socket server
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setReceiveMessage(data);
    });
  });

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/chat/${user._id}`
        );
        setChats(data);
        // console.log(data)
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




  return (
    <div className="flex flex-col">
        <LeftNavbar />
      
        <div className="lg:flex lg:fixed w-full lg:flex-col lg:border-r border-black-50 lg:w-[470px] mb-40 md:mb-0">
        <div className="lg:flex lg:flex-col hidden dark:bg-black bg-white">
          <p className="text-xl font-bold p-2 dark:text-white">{user.username}</p>
          <p className="flex lg:px-24 px-6 text-xl pb-2 font-bold dark:text-white border-b dark:border-white">Messages</p>
        </div>
        <div className="lg:h-[520px] pb-32 overflow-y-scroll hidden lg:flex lg:flex-col">
        {chats.map((chat) => {
            return (
              <div  key={chat._id}>
                <div>
                    <Link to={`/chat/${chat._id}`}>  <ChatBar 
                  data={chat}
                  currentUserId={user._id}
                  online={checkOnlineStatus(chat)}
                /></Link>
                </div>
               
    </div>
     );
  })}
  </div>
  <div className="lg:flex lg:fixed lg:top-0 lg:ml-[465px]">
  {chats.map((chat) => {
            return (
              <div key={chat._id}>
{chat._id === id ? 

 <div className="ml-2 mr-2 lg:mb-24 lg:h-[592px] overflow-y-scroll no-scrollbar">
     <ChatBox 
     chat={chat}
     currentUser={user._id}
     setSendMessage={setSendMessage}
     receiveMessage={receiveMessage} 
     online={checkOnlineStatus(chat)}
     />
     </div> : <></>
}
</div>
);
})} </div>
  </div>
   </div>


  )
}
