import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from '../components/assets/hucschatgg.png'
export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = "Hucschat"
  })

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(`${process.env.REACT_APP_API}/auth/signup`, {
      username,
      email,
      password,
    })
      .then((response) => {
        console.log(response);
        if (response.data.status) {
          navigate("/login");
        } else {
          alert("user already exists")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="lg:flex lg:flex-row lg:justify-between lg:pr-60 bg-gray-100">
      <Link to='/about' className="bg-gray-100"><img src={logo} alt="logo" className="lg:h-20 h-12 m-4"/></Link>
    <form onSubmit={handleSubmit}>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 ">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Sign up</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative w-80">
                    <input
                      type="text"
                      placeholder="Enter Username"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      pattern="[A-Za-z0-9]{4,20}"
                      title="must be at least 4 character & no special characters"
                      required
                      autoComplete="off"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <label
                      htmlFor="username"
                      className="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Username
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter Email"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                      required
                      autoComplete="off"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Enter Password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Must contain at least 1 digit, 1 uppercase&lowercase letter & 8 or more characters"
                      required
                      autoComplete="off"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white rounded-md px-2 py-1 w-full"
                    >
                      Sign up
                    </button>
                  </div>
                  <p>
                    Have an account?{" "}
                    <Link to="/login" className="text-blue-500">
                      Log in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    </div>

  );
};
