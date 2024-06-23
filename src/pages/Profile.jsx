import React, { useEffect, useState } from "react";
import { LeftNavbar } from "../components/LeftNavbar";
import profile from "../components/assets/userprofile.jpg";
import { Link, useNavigate, useParams} from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import { NumberFormat } from "../components/NumberFormat";

export const Profile = () => {
  const [users, setUsers] = useState([]);
  var u = JSON.parse(localStorage.getItem("user"));
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { username } = useParams();
  const [pic, setPic] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3001/post/getposts")
      .then((posts) => {
        setPosts(posts.data);
      })
      .catch((err) => console.log(err));
  });
  
  const formData = new FormData();
  formData.append("pic", pic);
  const changePhoto = (e, id) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/auth/editphoto/" + id, formData)
      .then((res) => {
        if (res.data === "Success") {
          window.location.reload()
        }
      })
      .catch((err) => console.log(err));
  };


  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/getusers")
      .then((users) => setUsers(users.data))
      .catch((err) => console.log(err));
  }, []);

  const removePhoto = (id) => {
    axios
      .put("http://localhost:3001/auth/removephoto/" + id)
      .then(res => {
        if (res.data === "Success") {
          window.location.reload()
        }
    })
      .catch((err) => console.log(err));

  }
  
  const handleLogout = () => {
    axios
      .get("http://localhost:3001/auth/logout")
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
    <div className="dark:bg-black dark:text-white">
      <LeftNavbar/>
{ users.map((user) => {
  return <div key={user._id}>
 {
  user.username === username ?

 <div>
 
      <div className="flex lg:flex-row flex-col">
      { username === u.username ? 
        <Popup
          contentStyle={{
            width: "400px",
            marginTop: "170px",
            background: "transparent",
            border: "none"
          }}
          trigger={
            <button className="w-20 h-20 ml-4 mt-4 lg:w-40 lg:h-40 lg:ml-64 lg:mt-8 rounded-full">
              {" "}
              {user.pic ? (
                <img
                  src={`http://localhost:3001/profile/${user.pic}`}
                  alt="profile pic"
                  className="w-20 h-20 lg:w-40 lg:h-40 rounded-full border border-black"
                />
              ) : (
                <img
                  src={profile}
                  alt="profile pic"
                  className="w-20 h-20 lg:w-40 lg:h-40 rounded-full border border-black "
                />
              )}
            </button>
          }
          modal
          nested
        >
          {(close) => (
            <div className="text-center dark:bg-zinc-800 bg-white rounded-xl dark:text-white">
              <div className="p-6 text-2xl border-b dark:border-gray-600 border-black-50">
                Change Profile Photo
              </div>

              <button className="w-full p-3 border-b dark:border-gray-600 border-black-50">
              <label htmlFor="profile" className="px-8 cursor-pointer text-blue-400 font-bold">
                Select Photo 
              <input
                type="file"
                id="profile"
                accept="image/*"
                hidden
                onChange={(e) => {
                  setPic(e.target.files[0]);
              }}
             
              />
          
   </label>
   
    <div   onClick={(e) => changePhoto(e, u._id)} className=" text-blue-400 font-bold">
              upload</div>
    </button>
              
              

              <button onClick={() => {removePhoto(user._id, user.pic);  close();}} className="w-full p-3 border-b dark:border-gray-600 border-black-50 text-red-500 font-bold">
                Remove Current Photo
              </button>
              <br />

              <button className="w-full p-3" onClick={() => close()}>
                Cancel
              </button>
            </div>
          )}
        </Popup>:<> {user.pic ? (
          <Link to={`/status/${username}`}>
                <img
                  src={`http://localhost:3001/profile/${user.pic}`}
                  alt="profile pic"
                  className={`w-20 h-20 ml-4 mt-4 lg:w-40 lg:h-40 lg:ml-64 lg:mt-8 rounded-full border border-black ${user.status.length ? 'border-4 border-blue-700 p-1' : 'border border-black'} `}
                /></Link>
              ) : (
                <Link to={`/status/${username}`}>
                <img
                  src={profile}
                  alt="profile pic"
                  className={`w-20 h-20 ml-4 mt-4 lg:w-40 lg:h-40 lg:ml-64 lg:mt-8 rounded-full ${user.status.length ? 'border-4 border-blue-700 p-1' : 'border border-black'} `}
                /></Link>
              )}</>}
   <div className="text-2xl mt-2 -ml-64 lg:mt-20 lg:ml-20">
          <span className="font-semibold">
            {user.posts.length ? NumberFormat(user.posts.length) : <>0</>}
           </span>{user.posts.length > 1 ?  <> posts</> : <> post</>}
        </div>
        <div className="text-2xl mt-2 -ml-64 lg:mt-20 lg:ml-20">
          <span className="font-semibold">
            {user.likes.length ? NumberFormat(user.likes.length) : <>0</>}
           </span>{user.likes.length > 1 ?  <> likes</> : <> like</>}
        </div>
      
        <div className="flex justify-center lg:-ml-[200px] text-2xl font-semibold  mt-2 lg:mt-32">
          {user.username}
        </div>
     

{ username === u.username ? 


        <div className="flex flex-row gap-4 ml-10 mt-6 lg:ml-10 lg:mt-32">
          <Link
            to={`/editprofile/${user._id}`}
            className=" bg-slate-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg p-2 mb-6 font-semibold transform active:opacity-50 hover:bg-stone-300"
          >
            Edit Profile
          </Link>

          <div>
            <Popup
              contentStyle={{
                width: "400px",
                marginTop: "170px",
                background: "transparent",
                border: "none"
              }}
              trigger={
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="lg:w-10 lg:h-10 lg:ml-0 lg:mt-0 transform active:opacity-50 max-[700px]:w-8 h-8 ml-4 mt-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
                    />
                  </svg>
                </button>
              }
              modal
              nested
            >
              {(close) => (
                <div className="text-center dark:text-white dark:bg-zinc-800 rounded-xl bg-white">
                  <button className="w-full rounded-t-xl dark:hover:bg-zinc-700 p-4 border-b dark:border-gray-600 border-black-50">
                    <Link to="/settings" className="px-40  py-4 -ml-2">
                      Settings
                    </Link>
                  </button>

                  <br />

                  <button
                    onClick={handleLogout}
                    className="w-full p-4 dark:hover:bg-zinc-700 border-b dark:border-gray-600 border-black-50"
                  >
                    Log Out
                  </button>
                  <br />

                  <button className="rounded-b-xl dark:hover:bg-zinc-700 w-full p-4 " onClick={() => close()}>
                    Cancel
                  </button>
                </div>
              )}
            </Popup>
          </div>
        </div>

:<></>}



      </div>
      <div className="flex justify-center">{user.bio}</div>

 
      <Link
        to={`https://${user.website}` || "http://localhost:3000"}
        target="_blank"
        className="text-blue-600"
      >
        {user.website}
      </Link>



      <hr className="mt-10" />
      <div className="flex flex-row lg:ml-96 ml-2 ">
        <div>
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
              d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
            />
          </svg>
        </div>

        <div className="border-t-2 dark:border-white border-black">POSTS</div>

        <div className="flex flex-wrap mt-10 -ml-16 lg:pb-0 pb-20 lg:-ml-80 gap-1">
          {
            user.posts.length ? 
          user.posts.slice().reverse().map((p) => {
           return (<div key={p.id}>
{ posts.some((post) => post.username === username  ) ? (
          
<div>             
                          {p.post.includes(".pdf") || p.post.includes(".txt") ? (
               <center>
                 <Link to={`http://localhost:3000/p/${p.id}`}>
                                     <iframe src={`http://localhost:3001/posts/${p.post}`} title="file"  className="h-32 w-32 lg:h-40 lg:w-40 border border-black px-6" ></iframe>

                 </Link>
                
               </center>
             )
             :
             p.post.includes(".mp4") ? 
             <center>
               <Link to={`http://localhost:3000/p/${p.id}`}>
                                     <video src={`http://localhost:3001/posts/${p.post}`}  autoPlay muted className="h-32 w-32 lg:h-40 lg:w-40 border border-black px-6" />

                 </Link>
             </center>
             
             
             : (
              <Link to={`http://localhost:3000/p/${p.id}`}>
              
               <img
                 src={`http://localhost:3001/posts/${p.post}`}
                 alt="postpicture"
                 className="h-32 w-32 lg:h-40 lg:w-40  border border-black"
               /></Link>
             )}
                      
</div>
            ) : (
              <></>
            )}
           </div> 
          )
          })
           : 
           <div className="lg:ml-72 ml-20">
                 { username === u.username ? 
            <div className="text-2xl hover:text-black text-blue-500 font-semibold"><Link to='/createpost'>
            Share your first Post</Link></div>
            :
            <div className="ml-20 text-2xl">No Post</div>
                 }
           </div>
      

          }

        </div></div></div>
 :<></>
}
      </div>})}
    </div>
  );
};
