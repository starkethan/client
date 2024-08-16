import React, { useEffect, useRef, useState } from "react";
import pic from "../components/assets/userprofile.jpg";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";
import InputEmojiWithRef from "react-input-emoji";
import ReactShowMoreText from "react-show-more-text";

export const ChatBox = ({
  chat,
  currentUser,
  setSendMessage,
  receiveMessage,
  online
}) => {
  const userId = chat?.members?.find((id) => id !== currentUser);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState();
  const [caption, setCaption] = useState(" ");
  const scroll = useRef(null);

  useEffect(() => {
    if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/auth/getusers`)
      .then((users) => setUsers(users.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/message/${chat._id}`
        );
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleFile = async () => {
    const message = new FormData();
    message.append("senderId", currentUser);
    message.append("chatId", chat._id);
    message.append("file", file);
    message.append("caption", caption);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/message/file`,
        message
      );
      setMessages([...messages, data]);
      setFile("");

    } 
    catch (error) {
      console.log(error);
    }

    const receiverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });
  };

  const handleSend = async () => {
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    if (newMessage) {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API}/message/`,
          message
        );
        setMessages([...messages, data]);
        setNewMessage("");
      } catch (error) {
        console.log(error);
      }
    }

    const receiverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });
  };

  const handleEnter = () => {
    if (newMessage) {
      handleSend();
    }
  };

  const [show, setShow] = useState(null);
  const onShowChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setShow(URL.createObjectURL(event.target.files[0]));
    }
  };


  // scroll to latest message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      {chat ? (
        <div className="flex flex-col lg:w-[750px] ">
          {users.map((user) => {
            return (
              <div key={user._id}>
                {user._id === userId ? (
                  <div>
                    <div className="flex justify-between dark:text-white dark:bg-black bg-white border-b border-black-50 lg:h-16 sticky top-0  max-[1024px]:fixed w-full">
                      <Link
                        to={`/profile/${user.username}`}
                        className="flex flex-row gap-5 ml-2 mb-2"
                      >
                        {user.pic ? (
                          <div>
                            <img
                              src={`${process.env.REACT_APP_API}/profile/${user.pic}`}
                              alt="profile pic"
                              className="w-12 h-12 ml-2 mt-2 mb-2 rounded-full border border-black"
                            />
                          </div>
                        ) : (
                          <img
                            src={pic}
                            alt="profile pic"
                            className="w-12 h-12 ml-2 mt-2 rounded-full border border-black"
                          />
                        )}
                        <div className="flex flex-col pt-5">
                          <p className="font-bold">{user.username}</p>
                        <small>{online ? "Online" : "Offline"}</small>
                        </div>
                        

                      </Link>
                      <div className="flex">
                        <Popup
                          contentStyle={{
                            width: "400px",
                            marginTop: "170px",
                            background: "transparent",
                            border: "none"
                          }}
                          trigger={
                            <button>
                              {" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-10 h-10 mt-1 mr-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                                />
                              </svg>
                            </button>
                          }
                          modal
                          nested
                        >
                          {(close) => (
                            <div className="bg-white dark:bg-zinc-800 rounded-xl dark:text-white">
                              <button className="w-full p-4 text-red-500 dark:hover:bg-zinc-700 hover:bg-slate-200 font-bold rounded-t-xl border-b border-black-50 dark:border-gray-600">
                                <Link to={'/chats'} className="p-4 px-32">
                                  Close Chat
                                </Link>
                              </button>

                              <button
                                className="w-full dark:hover:bg-zinc-700 hover:bg-slate-200 rounded-b-xl p-4"
                                onClick={() => close()}
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </Popup>
                      </div>
                    </div>
                    <div>
                    <div className="lg:hidden p-10"></div>

                      {messages.map((message) => (
                        <div>
                          {
                            <div
                              ref={scroll}
                              key={message._id}
                              className="overflow-auto"
                            >
                              {message.senderId === currentUser ? (
                                <div className="clearfix">
                                  {message.file ? (
                                    message.file.includes(".pdf") ||
                                    message.file.includes(".mp4") ||
                                    message.file.includes(".txt") ? (
                                      <center className="rounded-l-3xl w-[310px] break-words rounded-tr-3xl float-right border-4 border-blue-500 mb-2 mt-2 clearfix">
                                        <iframe
                                          src={`${process.env.REACT_APP_API}/message/${message.file}`}
                                          title="file"
                                          className="p-1 mb-2  rounded-t-2xl h-[300px] w-[300px] border-b border-black"
                                        ></iframe>
                                        <Link
                                          to={`${process.env.REACT_APP_API}/message/${message.file}`}
                                          className="bg-blue-500 text-white px-4 py-1 w-full float-right active:opacity-50 rounded-full"
                                        >
                                          Open{" "}
                                        </Link>
                                        <div className="p-2">
                                          <span>{message.caption} </span>
                                        </div>
                                        <span className="text-xs w-full float-right p-1">
                                          <Moment fromNow>
                                            {message.createdAt}
                                          </Moment>
                                        </span>
                                      </center>
                                    ) : (
                                      <Link
                                        to={`${process.env.REACT_APP_API}/message/${message.file}`}
                                        className="rounded-l-3xl mx-4 w-[300px] break-words rounded-tr-3xl float-right border-4 border-blue-500 mb-2 mt-2 clearfix"
                                        rel="noopener noreferrer"
                                      >
                                        <img
                                          src={`${process.env.REACT_APP_API}/message/${message.file}`}
                                          alt="file"
                                          className="p-1 rounded-t-2xl h-[300px] w-[300px] border-b border-black"
                                        />
                                        <div className="p-2">
                                          <span>{message.caption} </span>
                                        </div>
                                        <span className="text-xs w-full float-right p-1">
                                          <Moment fromNow>
                                            {message.createdAt}
                                          </Moment>
                                        </span>
                                      </Link>
                                    )
                                  ) : (
                                    <div className="flex flex-col bg-blue-500 break-words text-white float-right w-3/5 mx-4 my-2 p-2 rounded-l-3xl rounded-tr-3xl clearfix">
                                      <ReactShowMoreText
                                        lines={20}
                                        more="Show more"
                                        less="Show less"
                                        anchorClass="show-more-less-clickable"
                                        expanded={false}
                                        width={410}
                                        truncatedEndingComponent={"..... "}
                                      >
                                        {message.text}
                                      </ReactShowMoreText>

                                      <span className="text-xs">
                                        <Moment fromNow>
                                          {message.createdAt}
                                        </Moment>{" "}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="clearfix">
                                  {message.file ? (
                                    message.file.includes(".pdf") ||
                                    message.file.includes(".mp4") ||
                                    message.file.includes(".txt") ? (
                                      <center className="rounded-r-3xl mx-4 w-[310px] break-words rounded-bl-3xl float-left border-4 border-gray-300 mb-2 mt-2 clearfix">
                                        <iframe
                                          src={`${process.env.REACT_APP_API}/message/${message.file}`}
                                          title="file"
                                          className="p-1 mb-2 rounded-t-2xl h-[300px] w-[300px] border-b border-black"
                                        ></iframe>
                                        <Link
                                          to={`${process.env.REACT_APP_API}/message/${message.file}`}
                                          className="bg-blue-500 text-white px-4 py-1 w-full float-right active:opacity-50 rounded-full"
                                        >
                                          Open{" "}
                                        </Link>
                                        <div className="p-2">
                                          <span>{message.caption} </span>
                                        </div>
                                        <span className="text-xs w-full float-right p-1">
                                          <Moment fromNow>
                                            {message.createdAt}
                                          </Moment>
                                        </span>
                                      </center>
                                    ) : (
                                      <Link
                                        to={`${process.env.REACT_APP_API}/message/${message.file}`}
                                        className="rounded-r-3xl mx-4 w-[300px] break-words rounded-bl-3xl float-left border-4 border-gray-300 mb-2 mt-2 clearfix"
                                        rel="noopener noreferrer"
                                      >
                                        <img
                                          src={`${process.env.REACT_APP_API}/message/${message.file}`}
                                          alt="file"
                                          className="p-1 rounded-tr-3xl h-[300px] w-[300px] border-b border-black"
                                        />
                                        <div className="p-2">
                                          <span>{message.caption} </span>
                                        </div>
                                        <span className="text-xs w-full float-right p-1">
                                          <Moment fromNow>
                                            {message.createdAt}
                                          </Moment>
                                        </span>
                                      </Link>
                                    )
                                  ) : (
                                    <div className="flex flex-col  break-words bg-gray-300  w-3/5 mx-4 my-2 p-2 rounded-r-3xl rounded-bl-3xl clearfix">
                                      <ReactShowMoreText
                                        lines={20}
                                        more="Show more"
                                        less="Show less"
                                        anchorClass="show-more-less-clickable"
                                        expanded={false}
                                        width={410}
                                        truncatedEndingComponent={"....."}
                                      >
                                        {message.text}
                                      </ReactShowMoreText>
                                      <span className="text-xs">
                                        <Moment fromNow>
                                          {message.createdAt}
                                        </Moment>{" "}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          }
                        </div>
                      ))}
                      <div className="lg:flex hidden p-10 w-full"></div>

                      <div className="flex fixed right lg:bottom-0 w-[90%] lg:w-[57%] bottom-9">
                        <InputEmojiWithRef
                          value={newMessage}
                          onChange={handleChange}
                          keepOpened={true}
                          onEnter={handleEnter}
                        ></InputEmojiWithRef>

                        <input
                          type="file"
                          id="file"
                          hidden
                          onChange={(e) => {
                            setFile(e.target.files[0]);
                          }}
                        />

                        <Popup
                          contentStyle={{
                            width: "350px",
                            background: "transparent",
                            border: "none"
                          }}
                          trigger={
                            <button>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="gray"
                                className="w-8 h-8"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
                                />
                              </svg>
                            </button>
                          }
                          modal
                          nested
                        >
                          {(close) => (
                            <div className="dark:bg-zinc-800 p-4 rounded-xl dark:text-white bg-white">
                              <center>
                                {file ? (
                                  show && file.type.includes("image") ? (
                                    <img
                                      src={show}
                                      alt="show"
                                      className="h-[200px]"
                                    />
                                  ) : (
                                    <iframe src={show} title="preview" />
                                  )
                                ) : (
                                  <></>
                                )}
                              </center>

                              <input
                                type="file"
                                accept={[
                                  "image/*",
                                  "video/mp4",
                                  ".pdf",
                                  ".txt",
                                ]}
                                className="mt-3 text-red-400
            file:mr-5 file:py-2 file:px-10
            file:rounded-full file:border-0
            file:text-md file:font-semibold  file:text-white
            file:bg-gradient-to-r file:from-blue-400 file:to-purple-400
            hover:file:cursor-pointer hover:file:opacity-80"
                                required
                                onChange={(e) => {
                                  setFile(e.target.files[0]);
                                  onShowChange(e);
                                }}
                              />
                              <textarea
                                name="caption"
                                cols="3"
                                rows="3"
                                placeholder="Add Caption..."
                                maxLength={100}
                                className="mt-2 p-2 dark:bg-zinc-800 outline-none rounded-3xl resize-none border border-black w-full"
                                onChange={(e) => setCaption(e.target.value)}
                              ></textarea>
                              <center>
                                <button
                                  hidden={!file}
                                  onClick={() => {
                                    handleFile();
                                    close();
                                  }}
                                  className="mt-3 active:opacity-50 font-semibold text-white bg-blue-500 px-4 p-1 rounded-full"
                                >
                                  Send
                                </button>
                              </center>
                            </div>
                          )}
                        </Popup>

                        <button
                          onClick={(e) => {
                            handleSend();
                          }}
                          title="send"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1"
                            stroke="gray"
                            className="w-9 h-9 lg:p-0 p-1 hover:bg-blue-500 hover:stroke-white rounded-r-full"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}{" "}
              </div>
            );
          })}
        </div>
      ) : (
        <center className="flex">
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
      )}
    </div>
  );
};
