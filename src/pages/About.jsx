import React, { useEffect } from "react";
import aboutimg1 from "../components/assets/aboutimg1.jpg";
import aboutimg3 from "../components/assets/aboutimg3.jpg";
import aboutimg4 from "../components/assets/aboutimg4.jpg";
import logo from '../components/assets/hucschatbb.png'
import { Link } from "react-router-dom";

export const About = () => {
  useEffect(() => {
    document.title = "Hucschat"
  })
  return (
    <div className="dark:text-white">
       
        
      
        <div className=" bg-black px-[40%] border-b border-gray-700 p-2 w-full sticky top-0">
        <Link to='/home' className="flex justify-center">
                                <img src={logo} alt="logo" className="lg:h-20 h-10"/>
        
                                </Link>
        </div>
      
          
         
     

      <h1        
 className="text-8xl p-20 max-[480px]:text-2xl font-semibold">
        Give people the
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
          {""} power {""}
        </span>
        to Share Photos Videos <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
          {""}PDF And Txt Files{""}
        </span>
      </h1>
      <div className="flex flex-col">
        <img src={aboutimg1} alt="pic" />
      </div>
      <h1 className="text-8xl p-20 max-[480px]:text-2xl font-semibold">
        and bring the world closer
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          {""} together
        </span>
      </h1>
      <div className="flex flex-col lg:ml-8 lg:gap-40 gap-10">
       
        <div className="flex lg:flex-row flex-col w-full lg:p-20 justify-between">
          <pre
            style={{ fontFamily: "Brush script MT" }}
            className="text-6xl mt-6 md:mt-8 lg:mt-14 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 max-[480px]:text-2xl font-semibold"
          >
            Post any Pic
          </pre>
          <div >
          <img src={aboutimg3} alt="pic" className="rounded-lg" />

          </div>
        </div>

        <div className="flex lg:flex-row flex-col justify-between  w-full lg:px-20">
          <div>
          <img src={aboutimg4} alt="pic" className="rounded-lg" />

          </div>
          
          <h1 className="text-6xl max-[480px]:text-2xl font-semibold">
            Connect with more people
          </h1>
        </div>
      </div>
      <div className="flex flex-col mt-20">
          <p className="text-3xl underline mb-2 font-semibold">About the developer </p>
          <p className="text-justify p-4">Hi, I'm <b>Rahat Sharma</b>, a final year MCA(2022-2024) student at University of Jammu.
             This project serves as the culmination of my academic journey and demonstrates my
             understanding of web development principles, particularly in utilizing javascript.
             Throughout this project, I significantly improved my proficiency
             in javascript and gained valuable experience in user interface design using reactjs and tailwind css.</p>
        </div>
      <div className="border-t-2 border-gray-100 dark:border-gray-700 mt-20 p-20">
        <h1
          style={{ fontFamily: "Brush script MT" }}
          className="text-3xl font-semibold"
        >
          Hucschat
        </h1>
        <small>@2024 all rights reserved</small>
      </div>
    </div>
  );
};
