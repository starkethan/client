import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import pic from '../components/assets/userprofile.jpg';
import { Link } from 'react-router-dom';


export const StatusBar = () => {
    const [u, setU] = useState(null);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/auth/getuser`)
      .then((response) => {
        setU(response.data);
      })
      .catch((err) => console.log(err));
  }, []);  

    const [users, setUsers] = useState([]);
    useEffect(() => {
      axios
        .get(`${process.env.REACT_APP_API}/auth/getusers`)
        .then((users) => setUsers(users.data))
        .catch((err) => console.log(err));
    }, []);

    const [story, setStory] = useState([]);
    const handleStory = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("userId", u._id);
      formData.append("username", u.username);
      formData.append("profile", u.pic);


      if(story.length > 12) { 
      alert("Not more than 12")}
    
      else
      for (let i = 0; i < story.length; i++) {
        
        formData.append("story", story[i]);
      }

      axios.post(`${process.env.REACT_APP_API}/story/s`, formData)
      .then((res) => {
        if (res.data === "Success") {
          window.location.reload();
        } else {
          alert("Story submission failed.")
        }
      })
      .catch((err) => console.log(err));
    }

   const  deleteStatus = (e, userId) => {
    e.preventDefault();
    axios.put(`${process.env.REACT_APP_API}/story/delete`, {userId} )
    .then((res) => {
      if (res.data === "Success") {
        window.location.reload();
      } else {
        alert("Failed to Delete")
      }
    })
    .catch((err) => console.log(err));
  }

   
    
    
  return (
    <div className='dark:bg-black dark:text-white select-none'>
      <div>
        { 
        
        u ? 
       
        <div className=' fixed lg:ml-[10.5%] dark:bg-black bg-white px-2 lg:px-6 mt-2 lg:mt-1'>  
{  u.status.length ? 
  <Popup
                          contentStyle={{
                            width: "400px",
                            background: "transparent",
                            border: "none"
                          }}
                          trigger={
                            <button>
                             
  <div> 
  <img src={`${process.env.REACT_APP_API}/profile/${u.pic}`} alt="profile" className='h-14 w-14 rounded-full ' />
    <p className='font-bold dark:text-white'>Me</p>

</div>
                            </button>
                          }
                          modal
                          nested
                        >
                          {(close) => (
                            <div className='dark:bg-zinc-800 rounded-xl bg-white p-2'>
                              <div className='dark:text-white hover:bg-red-500 absolute p-2' onClick={close}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

                              </div>
                                <div style={{fontFamily:"Brush script MT"}}  className='flex justify-center dark:text-white  text-3xl mb-4 border-b border-black-50 p-2'>My Status</div>
                                
                                
                            
                          <div className='flex justify-center gap-10'>
                           
                                <Link onClick={close} className=' font-semibold p-2 px-6 rounded-full text-white bg-blue-500 ' to={`/status/${u.username}`} >
  View Status
  </Link>
  <button onClick={e => deleteStatus(e, u._id)} className=' text-white bg-red-500 px-6 font-semibold rounded-full p-2'>
  Delete All
</button>
</div> 
 
  

                        <form className='border dark:border-gray-700 border-black-50 p-2 mt-3 rounded-2xl' onSubmit={handleStory}>
                          <div className='flex font-semibold dark:text-white w-full justify-center border-b border-blue-50 dark:border-gray-700'>Add More</div>
                              <input
                                type="file"
                                accept={[
                                  "image/*",
                                  "video/mp4",    
                                ]}
                                className="mt-3 p-2 text-red-400
            before:mr-5 before:p-2 before:px-10
            before:content-['Select']
            file:hidden
            before:rounded-full
            before:font-semibold  before:text-white
            before:bg-gradient-to-r before:from-blue-400 before:to-purple-400
            hover:cursor-pointer hover:opacity-80"
            multiple required onChange={(e) => setStory(e.target.files)}
                              />
                            
                              <center>
                              

                                <button
                                
                                  className="mt-3 active:opacity-50 font-semibold text-white bg-blue-500 px-4 p-2 w-full rounded-full"
                                >
                                  Post
                                </button>
                              </center>
                              </form>


                         



                            

                            </div>
                          )}
                        </Popup>

  :


<Popup
                          contentStyle={{
                            width: "400px",
                            background: "transparent",
                            border: "none"
                          }}
                          trigger={
                            <button>
                             
  <div> 
         <p className='border dark:border-gray-600 border-black rounded-full font-bold text-blue-500'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14 ">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
</p>
         <p className='font-bold text-blue-500'>Add</p>

</div>
                            </button>
                          }
                          modal
                          nested
                        >
                          {(close) => (
                            <div className='dark:bg-zinc-800 rounded-xl bg-white p-2'>
                               <div className='dark:text-white hover:bg-red-500 absolute p-2' onClick={close}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

                              </div>
                                <div style={{fontFamily:"Brush script MT"}}  className='flex justify-center p-1 dark:text-white  text-3xl mb-4 border-b border-black-50'>Status</div>
                        <form onSubmit={handleStory}>
                              <input
                                type="file"
                                accept={[
                                  "image/*",
                                  "video/mp4",    
                                ]}
                                className="mt-3 text-red-400
            file:mr-5 file:py-2 file:px-10
            file:rounded-full file:border-0
            file:text-md file:font-semibold  file:text-white
            file:bg-gradient-to-r file:from-blue-400 file:to-purple-400
            hover:file:cursor-pointer hover:file:opacity-80"
            multiple required onChange={(e) => setStory(e.target.files)}
                              />
                            
                              <center>

                                <button
                                
                                  className="mt-4 mb-3 active:opacity-50 font-semibold text-white bg-blue-500 px-4 p-2 w-full rounded-full"
                                >
                                  Post
                                </button>
                              </center>
                              </form>
                            </div>
                          )}
                        </Popup>
                      }
                        </div>
                 :<></>  }
                        </div>

                        <div className=' dark:text-white flex justify-center p-2 mt-2 text-3xl font-bold'>Status</div>   


              
                  
                      { users.map((user) => {
                       return <div className='lg:px-2' key={user._id} >
                         

                       { user.status ? 
                       
                       
                       user.status.length && user.username !== u.username ? 
                        <div className='mt-9 lg:fixed lg:left-32 lg:ml-2 lg:p-4 lg:rounded-3xl lg:border dark:border-gray-600 lg:border-black lg:h-[500px] overflow-auto no-scrollbar'>

<div className='flex  lg:flex-col'>

                        <div>
                          <Link to={`/status/${user.username}`}>
                            {  !user.pic ?
                          <img src={pic} alt="profile" className='rounded-full w-14 h-14' /> 
                     :    <img src={`${process.env.REACT_APP_API}/profile/${user.pic}`} alt="profile" className='rounded-full w-14 h-14' /> 
                            
                          }
                          { user.username.length > 6 ? 
                          <p>
                         {user.username.slice(0,6)}...
                          </p>
                          :
                          <p>{user.username}</p>
                          }
                          </Link>
                          </div>
                          </div>
                      
                       </div>  : null :null

                      } 
                      
                    </div>
                           
                      
                
                   
                 
                  })}
                          
                     
    </div>
  )
}
