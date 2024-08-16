import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import pic from "./assets/userprofile.jpg";
import logo from './assets/hucschatw.png';
import logo1 from './assets/hucschatbb.png';


export const RightNavbar = () => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/auth/getuser`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  localStorage.setItem("user", JSON.stringify(userData));


  const navigate = useNavigate();
  const handleLogout = () => {
    axios
      .get(`${process.env.REACT_APP_API}/auth/logout`)
      .then((res) => {
        if (res.data.status) {
          localStorage.removeItem('user')
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className=" bg-white dark:bg-black rounded-3xl border border-black dark:border-gray-600 lg:flex flex-col space-y-1 font-bold  mr-8 p-8 float-right hidden">
        <Link to='/about' className="flex"><img src={logo} alt="logo" className="dark:hidden h-14 mb-8 rounded-2xl" /></Link>
        <Link to='/about' className="flex"><img src={logo1} alt="logo" className="hidden dark:flex h-14 mb-8 rounded-2xl" /></Link>
        <div className="flex">
        {userData ?   <Link
            to={`/profile/${userData.username}`}
            className=" p-2 mb-6 transform hover:scale-110 active:opacity-50"
          >
            
          

         
            <div>
             { userData.pic ? 
            <img src={`${process.env.REACT_APP_API}/profile/${userData.pic}`}  alt="profile" className="w-20 h-20 rounded-full border border-black" /> 
          :  <img src={pic} alt="profile" className="w-20 h-20 rounded-full border border-black" />
             }</div>
            
             <div>{userData.username}</div>  
          
          </Link>   : <>Loading...</>}
        </div>
        <div className="flex flex-row justify-between">
          <Link
            to="/about"
            className="p-2 transform hover:scale-110 active:opacity-50"
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
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
            About
          </Link>
        </div>

        <div className="flex flex-row justify-between">
          <Link
            to="/contact"
            className="p-2 transform hover:scale-110 active:opacity-50"
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
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            Contact
          </Link>
        </div>

        <div className="flex flex-row justify-between">
          <Link
            to="/services"
            className="p-2 transform hover:scale-110 active:opacity-50"
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
                d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
              />
            </svg>
            Services
          </Link>
        </div>

        <div className="flex flex-row justify-between mr-28">
          <button
            onClick={handleLogout}
            className=" p-2 transform hover:scale-110 active:opacity-50"
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
            Logout
          </button>
        </div>

        <span className="text-xs font-thin pt-20 ">Hucschat</span>
        <span className="text-xs font-thin ">
          @2024 all rights reserved
        </span>
      </div>
      </div>  
      );
};
