import React, { useEffect, useState } from "react";
import axios from "axios";

export const LikeButton = ({ post }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/getuser")
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => console.log(err));
  }, []); 

  const handleLike = (id, userId) => {
    try {
      axios.put("http://localhost:3001/post/like/" + id, {userId}).then((res) => {
        if (res.data === "Success") {
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleUnLike = (id, userId) => {
    try {
      axios.put("http://localhost:3001/post/unlike/" + id, {userId}).then((res) => {
        if (res.data === "Success") {
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      { user ? 
      <div>
      {post.like ? (
        <div>
          {post.like.some((l) => l.email === user.email) ? (
            <button
              title="unlike"
              onClick={() => {
                handleUnLike(post._id, post.userId);
              
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="current"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-8 w-8 active:opacity-50 dark:fill-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>
          ) : (
            <button
              title="Like"
              onClick={() => {
                handleLike(post._id, post.userId);
              
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-8 w-8 active:opacity-50"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>
          )}
        </div>
      ) : (
        <></>
      )}
      </div> : <> </> }
    </div>
  );
};
