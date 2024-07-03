import React, { useEffect, useState } from "react";
import { LeftNavbar } from "../components/LeftNavbar";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";
import ReactShowMoreText from "react-show-more-text";
import { LikeButton } from "../components/LikeButton";
import { CommentButton } from "../components/CommentButton";
import { ShareButton } from "../components/ShareButton";
import { NumberFormat } from "../components/NumberFormat";
import { MatchedUser } from "../components/MatchedUser";
import { Report } from "../components/Report";

export const P = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [users, setUsers] = useState([]);
  const [comment, setComment] = useState();
  var user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

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

  useEffect(() => {
    axios
      .get("http://localhost:3001/post/getpost/" + id)
      .then((post) => {
        setPost(post.data);
      })
      .catch((err) => console.log(err));
  });

  const handleDelete = (id, userId, file, caption) => {
    axios
      .put("http://localhost:3001/post/deletepost/" + id, {userId, file, caption})
      .then((result) => {
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className=" select-none">
      <LeftNavbar />

      <div className="lg:hidden dark:text-white border-b  border-black-50 dark:border-gray-600">
        {post ? (
          <div>
            <div>
              <MatchedUser
                users={users}
                post={post}
                c={"w-8 h-8 ml-4 my-2  rounded-full"}
                c1={"font-semibold ml-4 mt-[10px] max:[640px]-text-xs"}
              />
            </div>

            {post.file.includes(".pdf") ||
            post.file.includes(".mp4") ||
            post.file.includes(".txt") ? (
              <center>
                <iframe
                  src={`http://localhost:3001/posts/${post.file}`}
                  frameborder="0"
                  title="file"
                  className="h-[700px] w-full"
                ></iframe>
              
              </center>
            ) : (
              <img
                src={`http://localhost:3001/posts/${post.file}`}
                alt="postpicture"
                className="h-[585px] w-full border border-black rounded-sm"
              />
            )}

            <div className="flex items-center justify-between mx-4 mt-3 mb-2">
              <div className="flex gap-5">
                {/* like button */}
                <LikeButton post={post} />
                {/* comment button  */}
                <CommentButton
                  post={post}
                  
                  trigger={
                    <button title="Comment">
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
                    </button>
                  }
                />
                {/* share button  */}
                <ShareButton post={post._id} />
              </div>
              {/* view button */}
              <Link
                title="Open in new tab"
                to={`http://localhost:3001/posts/${post.file}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button>
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
                      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </button>
              </Link>
            </div>
            <div className=" text-left ml-6 -mt-2 font-semibold">
              {post.like.length ? (
                <>
                  {" "}
                  {NumberFormat(post.like.length)}{" "}
                  {post.like.length > 1 ? <>likes</> : <>like</>}
                </>
              ) : (
                <></>
              )}
            </div>
            <small className="flex p-1 pl-6">
              <Moment format="MMM DD yyyy">{post.createdAt}</Moment>
            </small>
            <p className=" p-2 break-words">{post.description}</p>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="w-[80%] ml-40 mt-4 max-[1024px]:hidden">
        {post ? (
          <div className="flex">
            <div className="w-[60%] border-r dark:border-white border-black">
              {post.file.includes(".pdf") ||
              post.file.includes(".txt") ? (
                <center>
                  <iframe
                    src={`http://localhost:3001/posts/${post.file}`}
                    frameborder="0"
                    title="file"
                    className="h-[570px] w-full"
                  ></iframe>
               
                </center>
              ) 
              :post.file.includes(".mp4") ?
              <center>
              <video
                src={`http://localhost:3001/posts/${post.file}`}
                controls
                className="h-[570px] bg-black w-full"
              ></video>
           
            </center>

              : (
                <img
                  src={`http://localhost:3001/posts/${post.file}`}
                  alt="postpicture"
                  className="h-[570px] w-full border-r dark:border-white border-black rounded-sm"
                />
              )}
            </div>

            <div>
              <div className="flex flex-row h-12 w-[394px] dark:bg-black dark:text-white border-y dark:border-gray-600 bg-zinc-300">
                <MatchedUser
                  users={users}
                  post={post}
                  c={"lg:w-8 lg:h-8 ml-4 mt-2 rounded-full  max-[400px]:ml-2"}
                  c1={"font-semibold ml-4 mt-[10px] max:[640px]-text-xs"}
                />
              </div>

              <div>
                <div className="flex h-[357px] overflow-y-auto border-y dark:border-gray-600 dark:text-white overflow-x-hidden">
                  {post.comment.length ? (
                    <ol>
                      {post.comment
                        .slice()
                        .reverse()
                        .map((com) => (
                          <li key={com._id}>
                            <div className="w-[394px] flex gap-2 justify-between mb-1 border-y border-black-50 dark:border-gray-600 p-2">
                              <div className="flex gap-4">
                                <h1 className="font-bold">{com.username}</h1>

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
                                {user.username === com.username ||
                                user.role === "admin" ? (
                                  <button
                                    onClick={(e) =>
                                      deleteComment(e, post._id, com._id)
                                    }
                                    className="text-red-500 font-bold hover:scale-110 active:opacity-50"
                                  >
                                    Delete
                                  </button>
                                ) : (
                                  <Report
                                    post={post}
                                    comment={com.comment}
                                    trigger={
                                      <button className="text-red-500 font-bold hover:scale-110 active:opacity-50">
                                        Report
                                      </button>
                                    }
                                  />
                                )}
                              </small>
                            </div>
                          </li>
                        ))}
                    </ol>
                  ) : (
                    <h1 className="ml-32 text-2xl dark:text-white">No Comments</h1>
                  )}
                </div>

                <div className="flex items-center dark:text-white justify-between mx-4 mt-3 mb-2">
                  <div className="flex gap-5">
                    {/* like button */}
                    <LikeButton post={post} />

                    {/* comment button */}

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

                    {/* share button  */}
                    <ShareButton post={post._id} />
                  </div>

                  {/* view button */}
                  <Link
                    title="Open in new tab"
                    to={`http://localhost:3001/posts/${post.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button>
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
                          d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
                <div className=" text-left dark:text-white ml-6 -mt-2 font-semibold">
                  {post.like.length ? (
                    <>
                      {" "}
                      {NumberFormat(post.like.length)}{" "}
                      {post.like.length > 1 ? <>likes</> : <>like</>}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                
<div className="flex dark:text-white justify-between">
                <small className="flex p-1 pl-6">
                  <Moment format="MMM DD yyyy">{post.createdAt}</Moment>
                </small>

<div>
                {user.username === post.username ||
                                user.role === "admin" ? (
                                  <button
                                    onClick={(e) =>
                                      handleDelete( post._id, post.userId,  post.file, post.description)
                                    }
                                    className="text-red-500 font-bold hover:scale-110 active:opacity-50"
                                  >
                                    Delete
                                  </button>
                                ) : (
                                  <Report
                                    post={post}
                                    trigger={
                                      <button className="text-red-500 font-bold hover:scale-110 active:opacity-50">
                                        Report
                                      </button>
                                    }
                                  />
                                )}
                                </div>
</div>

                <form
                  onSubmit={(e) => {
                    addComment(e, post._id, post.userId);
                  }}
                >
                  <div className="flex ">
                    <input
                      type="text"
                      placeholder="Add a Comment..."
                      className="w-full p-2 dark:text-white dark:bg-black outline-none border-t border-black-50 dark:border-gray-600 mt-2 -mb-1.5"
                      value={comment}
                      required
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button className=" text-blue-500 p-3 dark:bg-black bg-white outline-none border-t border-black-50 dark:border-gray-600 mt-2 -mb-1.5 active:opacity-50">
                      Post
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
