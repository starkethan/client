import axios from "axios";
import React, { useState } from "react";
import { LeftNavbar } from "../components/LeftNavbar";


export const CreatePost = () => {
  var user = JSON.parse(localStorage.getItem("user"));
  const [description, setDescription] = useState();
  const [file, setFile] = useState();


  const handleSubmit = (e, id) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("description", description);
    formData.append("email", user.email);
    formData.append("username", user.username);
    formData.append("userId", user._id);
    formData.append("file", file);
    
if (file){
    axios
      .post("http://localhost:3001/post/create/" +id, formData)
      .then((res) => {
        if (res.data === "Success") {
          window.location.href = "/home";
        }
      })
      .catch((err) => console.log(err));}
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const allowedExtensions = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'application/pdf', 'text/plain'];
    if (!allowedExtensions.includes(file.type)) {
      alert('Invalid file type for: ' + file.name);
      event.target.value = ''; // Clear the file selection
      return;
    }
    setFile(event.target.files[0]);
}

  const [show, setShow] = useState(null);
  const onShowChange = (event) => {
   if (event.target.files && event.target.files[0]) {
     setShow(URL.createObjectURL(event.target.files[0]));
   }
 };

  return (
    <div>
    
              <LeftNavbar /> 

  

      <div className="flex dark:text-white justify-center ">
        <form  onSubmit={(e) => {handleSubmit(e, user._id)}} >
          <div className="flex flex-col justify-center lg:p-10 p-6 border dark:border-gray-700 border-black rounded-xl mt-6 shadow-2xl">
            <h1 className="font-semibold mb-3">
              Upload file from your computer
            </h1>
            <center>
                          { file ? (
                           show && file.type.includes('image') ? 
                            
                           <img src={show} alt="show" className="h-[200px] w-[200px]"/> 

:   show && file.type.includes('mp4') ? 
<video className="h-[200px] w-[200px] bg-black " src={show} muted autoPlay />
:
<iframe src={show} title="preview" />) : <></>
                          }
            </center>

            <input
              type="file"
              accept={['image/jpeg', 'image/png', 'image/webp', 'video/mp4', '.pdf', '.txt']}
              className="m-8 text-red-400
            file:mr-5 file:py-2 file:px-10
            file:rounded-full file:border-0
            file:text-md file:font-semibold  file:text-white
            file:bg-gradient-to-r file:from-blue-400 file:to-purple-400
            hover:file:cursor-pointer hover:file:opacity-80"
              required
              onChange={(e) => { handleFileUpload(e); onShowChange(e)}}
            />
            <textarea
              name="caption"
              id=""
              required
              maxLength={360}
              cols="30"
              rows="4"
              placeholder="Write a caption..."
              className="resize-none outline-none border border-black dark:bg-gray-900 rounded-lg text-center"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button 
            className="bg-blue-500 p-2 mt-6 rounded-full text-white active:opacity-80">
              Create Post
            </button>
          
           

          </div>
        </form>
      </div>
    </div>
  );
};
