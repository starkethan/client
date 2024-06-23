import React from "react";
import { Settingsbar } from "../components/Settingsbar";
import profile from "../components/assets/userprofile.jpg";
import { Link } from "react-router-dom";
import Moment from "react-moment";

export const Settings = () => {
  var user = JSON.parse(localStorage.getItem("user"));

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
        <Settingsbar />
      </div>
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
                src={`http://localhost:3001/profile/${user.pic}`}
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
                <Moment format="MMM DD YYYY" className="ml-2">{user.createdAt || ""}</Moment>
              </small>
              <small>
                Updated:
                <Moment format="MMM DD YYYY" className="ml-2">{user.updatedAt || ""}</Moment>
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
  );
};
