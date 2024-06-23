import React from "react";
import aboutimg1 from "../components/assets/aboutimg1.jpg";
import aboutimg3 from "../components/assets/aboutimg3.jpg";
import aboutimg4 from "../components/assets/aboutimg4.jpg";
import logo from '../components/assets/hucschatbb.png'
import { Link } from "react-router-dom";

export const About = () => {
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
        <span  style={{ fontFamily: "Brush script MT" }} className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
          {""} power {""}
        </span>
        to Share Photos Videos <span  style={{ fontFamily: "Brush script MT" }} className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
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
      <div className="flex flex-col w-1/2 ml-10 gap-40">
       
        <div className="flex flex-row w-48 md:w-88 lg:w-full gap-10 md:gap-40 lg:gap-80">
          <pre
            style={{ fontFamily: "Brush script MT" }}
            className="text-6xl mt-6 md:mt-8 lg:mt-14 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 max-[480px]:text-2xl font-semibold"
          >
            Post any Pic
          </pre>
          <img src={aboutimg3} alt="pic" className="rounded-lg" />
        </div>
        <div className="flex flex-row w-48 md:w-88 lg:w-full gap-20 md:gap-40 lg:gap-80">
          <img src={aboutimg4} alt="pic" className="rounded-lg" />
          <h1 className="text-6xl max-[480px]:text-2xl font-semibold">
            Connect with more people
          </h1>
        </div>
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
