import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import pic from './assets/userprofile.jpg'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import {NumberFormat} from './NumberFormat';

export const LeftNavbar = () => {
  const navigate = useNavigate();
  var user = JSON.parse(localStorage.getItem("user"));
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  
  useEffect(() => {
    if (theme === 'dark') {
    localStorage.setItem("theme", theme);
  document.documentElement.classList.add('dark')
  
    } else {
      localStorage.setItem("theme", theme);
      document.documentElement.classList.remove('dark')
    }
  }, [theme]);
  
    const toggle = () => {
      setTheme(theme === 'dark' ? 'light' : 'dark')
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
  
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:3001/auth/verify')
    .then(res => {
      if (res.data.status) {

      } else {
        navigate('/')
      }
    })
  }) 

  return (
    <div className=" select-none dark:bg-black dark:text-white bg-white flex lg:flex-col justify-between z-10 fixed w-full bottom-0 lg:top-0 lg:gap-[20px] lg:w-[80px] dark:border-gray-600 border lg:border-r-black">
 
      <div>
        <Link to="/home" title="home">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-10 ml-8 lg:mt-4 lg:ml-5 w-8 lg:w-10 hover:scale-110 active:opacity-50"  onClick={() => window.scrollTo({top: 0})}>
  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>   
        </Link>
      </div>

      <Link to='/search' title="search">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-10 ml-5 w-8 lg:w-10 hover:scale-110 active:opacity-50 " 
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
      </Link>


<Link to='/chats' title="chat" >
  <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-10 ml-5 w-8 lg:w-10 hover:scale-110 active:opacity-50"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
          />
        </svg>
      </div>

</Link>


     
<Link to='/createpost' title="create">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-10 ml-5 w-8 lg:w-10 hover:scale-110 active:opacity-50"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
      </Link>







      <Link to='/status' title="status" >
  <div>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 ml-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z" />
</svg>


      </div>

</Link>
    



      
       <div className="lg:flex hidden">
        { user ? 
        <Link className="flex hover:scale-110  active:opacity-50" to='/notification' title="notifications">
          <svg
         xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-10 ml-5 w-8 lg:w-10 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" 
          />
        </svg>
       
         {
          user.notifications ? 
          user.notifications.length ? 
          user.notifications.map((n) => {
          
         return <div>

    {
                n.username !== user.username ? 
            <div className=" fixed left-10 w-6 h-6 text-white bg-red-600 rounded-full">{NumberFormat(user.notifications.length)}</div>
            : null
         }
            </div>
          })
          :null
          : <></>
        }
        </Link> : <></> }
</div>




      
     { user ?  
     <div> 
     {
     user.pic ? 
   <Link to={`/profile/${user.username}`}  title="profile">
    
       <img src={`http://localhost:3001/profile/${user.pic}`} alt="profile" className="lg:h-10 ml-5 h-8 lg:mt-0 mt-1 w-8 lg:w-10 transform hover:scale-110 active:opacity-50 rounded-full border border-black lg:mr-5 mr-8" /> 
  </Link>:

<Link to={`/profile/${user.username}`} title="profile">


<img src={pic} alt="profile" className="lg:h-10 ml-5 h-8 lg:mt-0 mt-1 w-8 lg:w-10 transform hover:scale-110 active:opacity-50 rounded-full border border-black lg:mr-5 mr-8" />

</Link>}</div>
: <></>

    
   
        }
        
    
        <button onClick={handleLogout} title="logout" className="lg:flex hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-10 ml-5 w-8 lg:w-10 hover:scale-110 active:opacity-50"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
            />
          </svg>
        </button>



      

      
      <div className="lg:flex hidden">
        
        <Popup contentStyle={{width: "300px", border:"none", background: "transparent", marginTop: "280px", marginLeft: "70px"}} trigger=
                {<button title="settings">             
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-10 ml-5 w-8 lg:w-10 transform hover:scale-110 active:opacity-50">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
</svg>         
     </button>} 
                modal nested >
                {
                    close => (
                        <div>
                          <button className=' dark:bg-zinc-800 dark:text-white bg-white w-full p-4 border-b border-black-50 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-t-lg  active:opacity-50'>
                          <Link to='/settings'className="p-4 px-24" >
          Settings
                            </Link>
                            


                          </button>

                          <button className=' dark:bg-zinc-800 dark:text-white bg-white w-full p-4 border-b border-black-50 hover:bg-slate-200 dark:hover:bg-slate-800  active:opacity-50'>


                          <Link to='/friends'className="p-4 px-24" >
          Friends
                            </Link>
                            </button>


                          <button className=' dark:bg-zinc-800 dark:text-white bg-white w-full p-4 border-b border-black-50 hover:bg-slate-200 dark:hover:bg-slate-800  '>
                           
                           <div className="flex justify-between">
                           <p className="ml-14 mt-2 dark:hidden">Light Mode</p>
                           <p className="ml-14 mt-2 hidden dark:flex">Night Mode</p>


                           { theme === 'light' ? 
 <button onClick={toggle}>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 mr-10">
  <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
</svg>
 </button>

       :
       <button onClick={toggle}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 mr-10">
  <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
</svg>
       </button>
    
    }
                           </div>
                            
                          </button>
                          
                            
                          
                           
                        
            
                            
            
                            <button onClick={handleLogout} className="dark:bg-zinc-800 dark:text-white bg-white w-full p-4 border-b border-black-50 hover:bg-slate-200 dark:hover:bg-slate-800  active:opacity-50">
          Log Out
        </button>
        

                          
                                <button      className='dark:bg-zinc-800 dark:text-white bg-white w-full p-4 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-b-lg active:opacity-50'
 onClick=
                                    {() => close()}>
                                        Cancel
                                </button>
                            </div>
                      
                    )
                }
            </Popup>
   


            </div>
      
      
    </div>
  );
};
