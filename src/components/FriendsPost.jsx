import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Link, useNavigate } from "react-router-dom";
import { ShareButton } from "./ShareButton";
import axios from "axios";
import Moment from "react-moment";
import { NumberFormat } from "./NumberFormat";
import { CommentButton } from "./CommentButton";
import { LikeButton } from "./LikeButton";
import { MatchedUser } from "./MatchedUser";
import { Report } from "./Report";

export const FriendsPost = ({ post }) => {
  const [users, setUsers] = useState([]);
  var user = JSON.parse(localStorage.getItem("user"));


  console.log(post);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/auth/getusers`)
      .then((users) => setUsers(users.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id, userId, file, caption) => {
    axios
      .put(`${process.env.REACT_APP_API}/post/deletepost/` + id, {userId, file, caption})
      .then((result) => {
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };
  
 const handleClick = (id) => {
  navigate(`/p/${id}`)
 }
  
  return (
    <div>

          <div
            
            className=" bg-white dark:bg-black flex flex-col border dark:border-gray-600 border-black mb-3 rounded-lg shadow-md"
          >
            <div className="flex flex-row justify-between border-b border-black-50">
              <div className="flex  mt-3 mb-3 ">
         
           <MatchedUser users={users} post={post} c={"lg:w-14 lg:h-14 ml-4 mt-2 w-12 h-12 rounded-full border border-slate-500  max-[400px]:ml-2"} c1={"text-xl font-semibold ml-4 mt-[23px] max:[640px]-text-xs"} />

                <h1 className="ml-4 mt-5 max-[640px]:mt-4">.</h1>

                <h1 className=" ml-4 mt-[23px] text-[17px] max-[640px]-text-xs">
                  <Moment fromNow>{post.createdAt}</Moment>
                </h1>
              </div>
              <div className="flex mr-4">
                <Popup
                  contentStyle={{
                    width: "300px",
                    marginTop: "170px",
                    background: "transparent",
                    border: "none"
                  }}
                  trigger={
                    <button>
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="lg:w-10 lg:h-10 lg:mt-4 active:opacity-50 max-[640px]:w-8 h-8 mt-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                    </button>
                  }
                  modal
                  nested
                >
                  {(close) => (
                    <div onClick={close}>
                    <div className="bg-white dark:bg-zinc-800 dark:text-white rounded-xl">
                      {user.email === post.email || user.role === 'admin' ? (
                        <>
                          <button
                            className="w-full p-4 text-red-500 font-bold  border-b border-black-50"
                            onClick={(e) => {
                              handleDelete(post._id, post.userId, post.file, post.description);
                              close();
                            }}
                          >
                            Delete
                          </button>
                        </>
                      ) : (
                        
                     <Report post={post} trigger={   <button 
                      className="w-full p-4 text-red-500 font-bold  border-b border-black-50" >
                          Report
                    </button> } />
                      
                      )}
                      <button onClick={() =>  handleClick(post._id) } className="w-full p-4 border-b border-black-50 text-blue-500 font-bold">Go to post</button>
                      <button className="w-full p-4" onClick={() => close()}>
                        Cancel
                      </button>
                    </div>
                    </div>
                  )}
                </Popup>
              </div>
            </div>

            <div className="bg-black">
              {post.file.includes(".pdf") || post.file.includes(".txt") ? (
                <center>
                  <iframe src={`${process.env.REACT_APP_API}/posts/${post.file}`}  title="file"  className="md:h-[585px] h-[530px] w-[80%]" ></iframe>
                
                </center>
              )
              :
              post.file.includes(".mp4") ? 
              <center>
              <video src={`${process.env.REACT_APP_API}/posts/${post.file}`} controls   className="md:h-[585px] h-[530px] w-[80%]" />
            
            </center>
              
              : (
                <img
                  src={`${process.env.REACT_APP_API}/posts/${post.file}`}
                  alt="postpicture"
                  className="h-[585px] w-full border border-black rounded-sm"
                />
              )}
            </div>

            <div className="flex items-center justify-between pt-2 pb-2 border-t border-black-50">
              <div className="flex gap-5 ml-4">
                {/* like button */}
                <LikeButton post={post} />

                {/* comment button */}
                <CommentButton post={post} trigger={<button title="Comment">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 active:opacity-50"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
              />
            </svg>
          </button>} />

                {/* share button */}
                <ShareButton post={post._id} />
              </div>
              <div className="flex mr-4">
                {/* view button */}
                <Link
                  to={`${process.env.REACT_APP_API}/posts/${post.file}`}
                  download={""}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open in new tab"
                >
                  <button>
                   
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 active:opacity-50">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
</svg>

                  </button>
                </Link>
              </div>
            </div>

            <div className="text-left ml-6 -mt-2 font-semibold">
              {post.like.length ? <> {NumberFormat(post.like.length)} {post.like.length > 1 ? <>likes</> : <>like</> }</> : <></>}
            </div>
            <div className="flex gap-4 pl-6 p-2">
              <p className="font-bold">{post.username}</p>
            </div>

              <div className=" px-2 pb-2 w-full break-words">
                 {post.description}
            </div>
            
          </div>
        
        
    </div>
  );
};
