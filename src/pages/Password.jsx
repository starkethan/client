import React from "react";
import { Settingsbar } from "../components/Settingsbar";
import { Link } from "react-router-dom";

export const Password = () => {
  return (
    <div className="bg-gradient-to-b from-purple-200 to-blue-200 ">
      <div className="text-2xl font-bold bg-gradient-to-b from-purple-200 to-blue-200">
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
    </div>
  );
};
