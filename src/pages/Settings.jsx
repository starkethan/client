import React, { useEffect, useState } from "react";
import profile from "../components/assets/userprofile.jpg";
import { Link, useNavigate } from "react-router-dom";
import Moment from "react-moment";
import axios from "axios";

export const Settings = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    document.title = "Hucschat"
  })

  var user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  const handleLogout = () => {
    axios
      .get(`${process.env.REACT_APP_API}/auth/logout`)
      .then((res) => {
        if (res.data.status) {
          localStorage.removeItem("user");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/auth/verify`).then((res) => {
      if (res.data.status) {
      } else {
        navigate("/signup");
      }
    });
  });

  return (
    <div className=" bg-gradient-to-r from-blue-200 to-purple-200 h-screen overflow-hidden">
      <div className="text-2xl font-bold">
        <Link
          to="/home"
          style={{ fontFamily: "Brush script MT" }}
          className="visible md:hidden"
        >
          Hucschat
        </Link>
      </div>

      <div>
        <div className="bg-gradient-to-r from-purple-200 to-blue-200 flex flex-col h-screen float-left lg:px-10 border-r-2 border-black-50 max-[700px]:p-1">
          <Link
            to="/home"
            style={{ fontFamily: "Brush script MT" }}
            className="text-2xl font-bold p-4 max-[1024px]:hidden"
          >
            Hucschat
          </Link>
          <div className="flex flex-col gap-10 text-xl font-semibold mt-10">
            <div className="hover:bg-gray-400 hover:text-white rounded-3xl">
              <Link
                onClick={() => handleTabClick("Profile")}
                className={`flex gap-2 p-4 rounded-3xl ${
                  activeTab === "Profile" ? "bg-black text-white" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>

                <p className="max-[700px]:hidden">Profile</p>
              </Link>
            </div>

            <div className="hover:bg-gray-400 hover:text-white  rounded-3xl">
              <Link
                onClick={() => handleTabClick("Personal")}
                className={`flex gap-2 p-4 rounded-3xl ${
                  activeTab === "Personal" ? "bg-black text-white" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                  />
                </svg>
                <p className="max-[700px]:hidden">Personal details</p>
              </Link>
            </div>
            <div className="hover:bg-gray-400 hover:text-white rounded-3xl">
              <Link
                onClick={() => handleTabClick("Password")}
                className={`flex gap-2 p-4 rounded-3xl ${
                  activeTab === "Password" ? "bg-black text-white" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>

                <p className="max-[700px]:hidden">Password</p>
              </Link>
            </div>
            <button
              onClick={handleLogout}
              className="flex gap-2 hover:bg-slate-600 hover:text-white p-4  rounded-3xl active:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>

              <p className="max-[700px]:hidden">Logout</p>
            </button>
          </div>
        </div>

        {activeTab === "Profile" ? (
          <div>
            <div className="flex md:text-3xl text-2xl font-semibold px-10 pt-10">
              Profile
            </div>
            <p className="flex px-10 pb-2 md:pb-20 text-gray-500">
              Manage your profile.{" "}
            </p>

            <div className="flex justify-center ">
              <div className="bg-white flex flex-row justify-between p-4 rounded-3xl">
                <div className="flex gap-10">
                  {user.pic ? (
                    <img
                      src={`${process.env.REACT_APP_API}/profile/${user.pic}`}
                      alt="profile"
                      className="w-24 h-24 rounded-full "
                    />
                  ) : (
                    <img
                      src={profile}
                      alt="profile"
                      className="w-20 h-20 rounded-full"
                    />
                  )}

                  <div className="flex flex-col">
                    <h1 className="lg:text-3xl text-2xl font-semibold mt-3">
                      {user.username}
                    </h1>
                    <small>
                      Created:
                      <Moment format="MMM DD YYYY" className="ml-2">
                        {user.createdAt || ""}
                      </Moment>
                    </small>
                    <small>
                      Updated:
                      <Moment format="MMM DD YYYY" className="ml-2">
                        {user.updatedAt || ""}
                      </Moment>
                    </small>
                  </div>
                </div>

                <div className="flex mt-6 pl-20">
                  <Link to={`/editprofile/${user._id}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-10 h-10"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        {activeTab === "Personal" ? (
          <div className="flex flex-col h-screen">
            <div className="flex md:text-3xl text-2xl font-semibold px-10 pt-10">
              Personal details
            </div>
            <p className="flex px-10 pb-2 md:pb-20 text-gray-500">
              Friends uses this information to verify your identity and to keep
              our community safe.{" "}
            </p>

            <div className="flex flex-col p-10 bg-white mx-2 md:mx-20 border-b-2 border-black-50 rounded-t-3xl">
              <p className="font-semibold">Contact info </p>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <div className="flex flex-col p-10 bg-white mx-2 md:mx-20 border-b-2 border-black-50">
              <p className="font-semibold">Birthday </p>
              <p className="text-gray-600">
                <Moment format="DD/MM/YYYY">{user.birthday || ""}</Moment>
              </p>
            </div>
            <div className="flex flex-col p-10 bg-white mx-2 md:mx-20 border-b-2 border-black-50 rounded-b-3xl">
              <p className="font-semibold">Gender</p>
              <p className="text-gray-600">{user.gender || ""}</p>{" "}
            </div>
          </div>
        ) : (
          <></>
        )}

        {activeTab === "Password" ? (
          <div className="flex flex-col h-screen">
            <div className="flex md:text-3xl text-2xl font-semibold px-10 pt-10">
              Password
            </div>
            <p className="flex px-10 pb-2 md:pb-20 text-gray-500">
              Manage your password.
            </p>

            <Link
              to="/forgotpassword"
              className="text-2xl font-semibold text-white"
            >
              <div className="bg-blue-500 mx-20 rounded-3xl p-6">
                Change Password
              </div>
            </Link>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
