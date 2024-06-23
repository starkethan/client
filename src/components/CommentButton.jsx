import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Link, useNavigate } from "react-router-dom";
import { ShareButton } from "./ShareButton";
import axios from "axios";
import Moment from "react-moment";
import { NumberFormat } from "./NumberFormat";
import ReactShowMoreText from "react-show-more-text";
import { LikeButton } from "./LikeButton"
import { Report } from "./Report";
import { MatchedUser } from "./MatchedUser";
export const CommentButton = ({ post, trigger }) => {
  
  const [comment, setComment] = useState("");
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/getuser")
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => console.log(err));
  }, []);  const [users, setUsers] = useState([]);
  

  const navigate = useNavigate();

  const handleDelete = (id, userId, file, caption) => {
    axios
      .put("http://localhost:3001/post/deletepost/" + id, {userId, file, caption})
      .then((result) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/getusers")
      .then((users) => setUsers(users.data))
      .catch((err) => console.log(err));
  }, []);

  const addComment = (e, id, userId) => {
    e.preventDefault();
    setComment("");
    
    axios
      .put("http://localhost:3001/post/comments/" + id, { comment, userId })

      .then((res) => {
        if (res.data === "Success") {
          navigate("/home");
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteComment = (e, id, comment) => {
    e.preventDefault();
  
    axios
    .put("http://localhost:3001/post/deletecomment/" + id, { comment })
    .then((res) => {
      if (res.data === "Success") {
        navigate("/home");
      }
    })
    .catch((err) => console.log(err));

  }
  return (
    <div>
      { user ? 
    <div className="dark:text-white">

   
    
       <Popup
        contentStyle={{
          width: "500px",
          marginTop: "17px",
          marginBottom: "28px",
          overflowY: "auto",
          scrollbarWidth: "none",
          background: "transparent",
          border: "none"
        }}
        trigger={
         trigger
        }
        modal
        nested
      >
        {(close) => (
          <div className="flex dark:bg-zinc-900 bg-white dark:text-white rounded-[4px] flex-col">
            <span
              className="px-3 p-1 fixed  hover:bg-red-600"
              onClick={() => close()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </span>

                
            { post.file.includes(".pdf") || post.file.includes(".mp4") || post.file.includes(".txt") ? (
                <center>
                                      <iframe src={`http://localhost:3001/posts/${post.file}`}  title="file"  className="h-40 w-40" ></iframe>

              
           
                </center>
              ) : (
                <center>
                    <img
                  src={`http://localhost:3001/posts/${post.file}`}
                  alt="postpicture"
                  className="h-40 w-40"
                />
                </center>
              
              )}

            <div className=" mt-4 pb-40">
              {post.comment.length ? (
                <ol>
                  {post.comment
                    .slice()
                    .reverse()
                    .map((com) => (
                      <li key={com._id}>
                        <div className="flex gap-2 justify-between mb-1 border-y border-black-50 dark:border-gray-600 p-2">
                          <div className="flex gap-4">
                            <h1 className="font-bold"><MatchedUser users={users} post={com} c={'lg:w-8 lg:h-8 w-6 h-6 mr-2 rounded-full '} /></h1>
                          

                            <ReactShowMoreText
                              lines={4}
                              more="Show more"
                              less="Show less"
                              anchorClass="show-more-less-clickable"
                              expanded={false}
                              width={280}
                              truncatedEndingComponent={"... "}
                            >
                              <h1>{com.comment}</h1>
                            </ReactShowMoreText>
                          </div>

                          <small className="flex flex-col">
                            <Moment fromNow>{com.created}</Moment>
                            { user.username === com.username || user.role === 'admin' ? 
                            <button onClick={(e) => deleteComment(e, post._id, com._id)} className="text-red-500 font-bold hover:scale-110 active:opacity-50">Delete</button>
:                    <Report post={post} comment={com.comment} trigger={ <button className="text-red-500 font-bold hover:scale-110 active:opacity-50">Report</button>} />

}
                          </small>
                        </div>
                      </li>
                    ))}
                </ol>
              ) : (
                <h1 className="text-2xl dark:text-white text-center">No Comments</h1>
              )}
            </div>

            <div className="flex flex-col border-t border-black-50 dark:border-gray-600 sticky bottom-0  dark:bg-zinc-900 bg-white">
              <div className="flex items-center justify-between mx-4 mt-3 mb-2">
                <div className="flex gap-5">
                  {/* like button inside comment section */}
               <LikeButton post={post} />
                  {/* comment button inside comment section */}
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
                  {/* share button inside comment section*/}
                  <ShareButton post={post._id} />
                </div>
                <div className="flex">
                  {/* view button inside comment section */}
                  <Link title="Open in new tab"
                    to={`http://localhost:3001/posts/${post.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button>
                     
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 active:opacity-50">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
</svg>

                    </button>
                  </Link>{" "}
                </div>
              </div>
              <div className=" text-left ml-6 -mt-2 font-semibold">
              {post.like.length ? <> {NumberFormat(post.like.length)} {post.like.length > 1 ? <>likes</> : <>like</> }</> : <></>}
  
              </div>
              <div className="flex justify-between p-2 pl-6 gap-2">
                <p className="font-bold">{post.username}</p>
               <div className="flex">
                 { user.username === post.username || user.role === 'admin' ? 
                            <button  onClick={(e) => 
                              handleDelete(post._id, post.userId, post.file, post.description)} className="text-red-500 font-bold hover:scale-110 active:opacity-50">Delete</button>
:        <Report post={post} trigger={<button className="text-red-500 font-bold hover:scale-110 active:opacity-50">Report</button>} />
}
</div>
              </div>
              <small className="flex p-1 pl-6">
                <Moment format="MMM DD YYYY">{post.createdAt}</Moment>
              </small>

              <form
                onSubmit={(e) => {
                  addComment(e, post._id, post.userId);
                }}
              >
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Add a Comment..."
                    className="w-full p-3  dark:bg-zinc-900 outline-none dark:border-gray-600 border-t border-black-50 mt-6 -mb-1.5"
                    value={comment}
                    required
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button className=" text-blue-500 p-3  dark:bg-zinc-900 bg-white outline-none border-t border-black-50 dark:border-gray-600 mt-6 -mb-1.5 active:opacity-50">
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Popup> 
      </div>  :<></>
    }
    </div>
  );
};
