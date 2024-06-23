import React from "react";
import { Settingsbar } from "../components/Settingsbar";
import { Link} from "react-router-dom";
import Moment from "react-moment";

export const PersonalDetails = () => {
  var user = JSON.parse(localStorage.getItem("user"));
 
  return (
    <div className="bg-gradient-to-b from-purple-200 to-blue-200 ">
      <div className="text-2xl  font-bold">
        <Link
          to="/home"
          style={{ fontFamily: "Brush script MT" }}
          className="visible lg:hidden"
        >
          Hucschat
        </Link>
      </div>
      <Settingsbar />

      <div className="flex flex-col h-screen">
        <div className="flex md:text-3xl text-2xl font-semibold px-10 pt-10">
          Personal details
        </div>
        <p className="flex px-10 pb-2 md:pb-20 text-gray-500">
          Friends uses this information to verify your identity and to keep our
          community safe.{" "}
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
    </div>
  );
};
