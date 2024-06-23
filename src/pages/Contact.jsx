import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const notify = () =>
  toast("Thank you!", {
    duration: 1000,
    position: "top-center",
    style: { background: "#007FFF", color: "white", width: "200px" },
  });

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:3001/auth/verify')
    .then(res => {
      if (res.data.status) {

      } else {
        navigate('/')
      }
    })
  }) 




  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/user/contactus", {
        name,
        email,
        message,
      })
      .then((response) => {
        if (response.data.status) {
          notify();
       window.location.reload()
          
        }
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
        <div className="bg-gradient-to-r from-blue-300 via-current to-blue-600 lg:h-full h-screen  w-full">
          <Link to='/home' style={{fontFamily:"Brush script MT"}} className=" flex pt-4 pl-4 text-3xl text-white">Hucschat</Link>
          <center>
          <div className=" text-white">         
            <h1 className="text-2xl font-bold">Contact Us</h1>
            <h1 className=" mt-4">
              Got a question? We'd love to hear from you.
            </h1>
            <h1> Send us a message and we'll respond as soon as possible.</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col p-8 lg:w-1/2">
              <label htmlFor="name" className="text-white font-bold">
                Name*
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                required
                className="outline-none text-center p-1 rounded-lg"
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="email" className="text-white font-bold mt-2">
                Email address*
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="outline-none text-center p-1 rounded-lg"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="message" className="text-white font-bold m-2">
                Message
              </label>
              <textarea
                name="message"
                id=""
                cols="30"
                rows="7"
                placeholder="Enter message"
                required
                className="outline-none text-center resize-none rounded-3xl"
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>

              <center>
              <button
                type="submit"
                className="bg-green-400 w-1/2 text-white font-semibold text-xl mt-10 p-3  rounded-full hover:scale-110 active:opacity-50"
              >
                Send Message
              </button>
              <Toaster />  </center>
              
            </div>
          </form>
          </center>
        </div>
        
      </div>
      
  );
};

export default Contact;
