import React, { useState } from "react";
import profile from "../components/assets/userprofile.jpg";
import { LeftNavbar } from "../components/LeftNavbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const EditProfile = () => {
  var user = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  const [website, setWebsite] = useState();
  const [bio, setBio] = useState();
  const [birthday, setBirthday] = useState();
  const [gender, setGender] = useState();
  const [pic, setPic] = useState();

  const formData = new FormData();
  formData.append("pic", pic);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put("http://localhost:3001/auth/editprofile/" + id, {
        website,
        bio,
        birthday,
        gender,
      })
      .then((res) => {
        if (res.data === "Success") {
          navigate(`/profile/${user.username}`);
        }
      })
      .catch((err) => console.log(err));
  };

  const changePhoto = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/auth/editphoto/" + id, formData)
      .then((res) => {
        if (res.data === "Success") {
          navigate(`/profile/${user.username}`);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col dark:text-white">
      <LeftNavbar />
      <div className="text-2xl font-bold m-4">Edit profile</div>
      <center>
        <div className="flex flex-row justify-between dark:bg-black bg-slate-200 border border-slate-400 mb-2 rounded-2xl lg:w-[600px] px-4">
          {user.pic ? (
            <img
              src={`http://localhost:3001/profile/${user.pic}`}
              alt="profile"
              className="w-20 h-20 my-2 rounded-full"
            />
          ) : (
            <img
              src={profile}
              alt="profile"
              className="w-20 h-20 my-2 rounded-full"
            />
          )}
          <div className="text-xl lg:text-2xl font-semibold mt-6">
            {" "}
            {user.username}{" "}
          </div>

          <form onSubmit={changePhoto} className="pt-7">
            <label
              htmlFor="profile"
              className="bg-blue-500 text-xs lg:text-xl text-white font-semibold px-2 p-1 mx-2 rounded-full cursor-pointer"
              title="Select photo"
              
            >
              {" "}
              Select
              <input
                type="file"
                id="profile"
                accept="image/*"
                hidden
                onChange={(e) => {
                  setPic(e.target.files[0]);
                }}
              />
            </label>
            <button
              className="bg-blue-500 text-xs lg:text-xl text-white font-semibold px-4 p-2 rounded-full"
              title="Change Photo"
            >
              Change Photo
            </button>
          </form>
        </div>

        <form
          onSubmit={handleSubmit}
          className="lg:w-[600px] border border-slate-300 p-4 rounded-2xl"
        >
          <div className="flex flex-col">
            <label
              htmlFor="website"
              className="text-xl lg:text-2xl font-semibold"
            >
              Website
            </label>
            <input
              type="text"
              placeholder="Enter your website link"
              maxLength={100}
              className="p-4 bg-slate-200 dark:bg-zinc-800 rounded-2xl"
              defaultValue={user.website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="bio" className="text-xl lg:text-2xl font-semibold">
              Bio
            </label>
            <input
              type="text"
              placeholder="Enter something about you..."
              maxLength={100}
              className="p-4 bg-slate-200 dark:bg-zinc-800 rounded-2xl"
              defaultValue={user.bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="dob" className="text-xl lg:text-2xl font-semibold">
              Birthday
            </label>
            <input
              type="date"
              className="p-4 bg-slate-200 dark:bg-zinc-800 rounded-2xl"
              defaultValue={user.birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="gender" className="text-2xl font-semibold">
              Gender
            </label>
            <select
              className="p-4 bg-slate-200 dark:bg-zinc-800 rounded-2xl"
              defaultValue={user.gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <small>This won’t be part of your public profile.</small>
          <br />

          <button
            className="bg-blue-600 text-white font-semibold text-xl p-2 w-1/3 rounded-2xl mt-6"
            title="update"
          >
            Update
          </button>
        </form>
      </center>
    </div>
  );
};
