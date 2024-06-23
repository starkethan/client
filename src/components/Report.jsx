import axios  from 'axios';
import React, { useEffect, useState } from 'react'
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";


export const Report = ({post, comment, trigger}) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/getuser")
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  
  const postUrl = `http://localhost:3000/p/${post._id}`;

    const r1 = "I don't like it"
    const r2 = "Bullying or harassment"
    const r3 = "Nudity or sexual activity"
    const r4 = "Scam or fraud"
    const r5 = "It's spam"
    const r6 = "Spreading hate"
    const r7 = "False information"
 

    const handleReport = (username, reason, sender, email, postUrl, comment) => {
    axios
      .post("http://localhost:3001/report/", {
        username,
        reason,
        sender,
        email, 
        postUrl,
        comment

      })
      .then((response) => {
        if (response.data.status) {
          window.location.reload();
        }
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  return (
    <div>
          <Popup
        contentStyle={{
          width: "300px",
          borderRadius: "10px",
          marginTop: "120px",
        }}
        trigger={
         trigger
        }
        modal
        nested
      >
        {(close) => (
          <div>
            
            <div className=" border-b border-black-50 p-2">
              <span
                className="fixed  flex flex-row p-2 -mt-2 hover:bg-red-600"
                onClick={() => close()}
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
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </span>
              <center>
                {" "}
                <p className="font-semibold">Report</p>
              </center>
            </div>
            <div className="flex flex-col p-2" onClick={close}>
              <div>
                <div className="p-1 rounded-2xl">
                  <p className="mt-2 ml-6 font-semibold"> Why are you reporting this post?</p>
                </div>
                <div onClick={() => handleReport(post.username, r1, user.username, user.email, postUrl, comment)} className="p-1 rounded-2xl hover:bg-slate-200">
                  <p className="mt-2 ml-6">{r1}</p>
                </div>
                <div onClick={() => handleReport(post.username, r2, user.username, user.email, postUrl, comment)} className="p-1 rounded-2xl hover:bg-slate-200">
                  <p className="mt-2 ml-6">{r2}</p>
                </div>
                <div onClick={() => handleReport(post.username, r3, user.username, user.email, postUrl, comment)} className="p-1 rounded-2xl hover:bg-slate-200">
                  <p className="mt-2 ml-6">{r3}</p>
                </div>
                <div onClick={() => handleReport(post.username, r4, user.username, user.email, postUrl, comment)} className="p-1 rounded-2xl hover:bg-slate-200">
                  <p className="mt-2 ml-6">{r4}</p>
                </div>
                <div onClick={() => handleReport(post.username, r5, user.username, user.email, postUrl, comment)} className="p-1 rounded-2xl hover:bg-slate-200">
                  <p className="mt-2 ml-6">{r5}</p>
                </div>
                <div onClick={() => handleReport(post.username, r6, user.username, user.email, postUrl, comment)} className="p-1 rounded-2xl hover:bg-slate-200">
                  <p className="mt-2 ml-6">{r6}</p>
                </div>
                <div onClick={() => handleReport(post.username, r7, user.username, user.email, postUrl, comment)} className="p-1 rounded-2xl hover:bg-slate-200">
                  <p className="mt-2 ml-6">{r7}</p>
                </div>
            


               


















                
              </div>

            </div>
          </div>
        )}
      </Popup>




    </div>
  )
}
