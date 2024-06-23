import React, { useEffect, useState } from "react";
import { LeftNavbar } from "../components/LeftNavbar";
import pic from "../components/assets/userprofile.jpg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const Search = () => {
  const [users, setUsers] = useState([]);
  var u = JSON.parse(localStorage.getItem("user"));
  var userId = u._id;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/getusers")
      .then((users) => setUsers(users.data))
      .catch((err) => console.log(err));
  }, []);

  const handleClick = (e, receiverId) => {
    e.preventDefault();
    var senderId = u._id;
    console.log(senderId, receiverId);
    axios
      .post(`http://localhost:3001/chat/`, { senderId, receiverId })
      .then((res) => {
        if (res.data) {
          navigate("/chats");
        }
      })
      .catch((err) => console.log(err));
  };

  function search_users() {
    let input = document.getElementById("searchbar").value;
    input = input.toLowerCase();
    let x = document.getElementsByClassName("users");
    let y = document.getElementsByClassName("container");

    for (let i = 0; i < x.length; i++) {
      if (!x[i].innerHTML.toLowerCase().includes(input)) {
        x[i].style.display = "none";
        y[i].style.display = "none";
      } else if (input === "") {
        x[i].style.display = "none";
        y[i].style.display = "none";
      } else {
        x[i].style.display = "list-item";
        y[i].style.display = "list-item";
      }
    }
  }

  return (
    <div className="dark:bg-black dark:text-white">
      <LeftNavbar />
      <center>
        <h1 className=" text-2xl lg:text-3xl font-bold p-2">Search</h1>

        <form>
          <input
            type="Search"
            id="searchbar"
            onKeyUp={search_users}
            autoFocus
            placeholder="Search..."
            className="w-1/2 p-2 outline-none lg:p-3 lg:pt-4 dark:bg-gray-900 bg-slate-200 rounded-full pl-4 lg:pl-6 lg:pb-4 max-[700px]:w-11/12"
          />
        </form>

        {users.map((user) => {
          return (
            <div key={user.username}>
              {user._id !== userId ? (
                <div className="container hidden list-none  lg:w-1/2 mt-4 shadow-xl border border-black rounded-full dark:hover:bg-gray-900 hover:bg-slate-200 max-[700px]:w-11/12">
                  <div className="flex flex-row justify-between  mx-4 my-2">
                    <Link to={`/profile/${user.username}`} className="flex gap-4">
                      {user.pic ? (
                        <img
                          src={`http://localhost:3001/profile/${user.pic}`}
                          alt="profile"
                          className="w-14 h-14 rounded-full"
                        />
                      ) : (
                        <img
                          src={pic}
                          alt="profile"
                          className="w-14 h-14 rounded-full"
                        />
                      )}

                      <h1 className="users lg:text-2xl font-semibold mt-3 list-none">
                        {user.username}
                      </h1>
                    </Link>

                    {u.chats.length ? (
                      <div className="flex font-semibold bg-blue-500 text-white rounded-full p-2 my-2 px-4">
                        {u.chats.some((c) => c.chat === user._id) ? (
                          "Already Added"
                        ) : (
                          <button onClick={(e) => handleClick(e, user._id)}>
                            Add to Chat
                          </button>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={(e) => handleClick(e, user._id)}
                        className="flex font-semibold bg-blue-500 text-white rounded-full p-2 my-2 px-4"
                      >
                        Add to Chat
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </center>


    </div>
  );
};
