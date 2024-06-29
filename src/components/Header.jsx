import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import logo from './assets/hucschatw.png';
import { NumberFormat } from './NumberFormat';
import logo1 from './assets/hucschatbb.png';


export const Header = ({user}) => {
    const navigate = useNavigate();
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
  return (
    <div>
    <div className='flex lg:hidden justify-between px-4 pt-1 bg-white dark:bg-black fixed w-full top-0 border-b border-black-50 dark:border-gray-600'>  
     <Link to='/about' style={{fontFamily:"Brush script MT"}} className="lg:hidden text-2xl font-mono font-semibold ">
      <img src={logo} alt="logo"  className='dark:hidden h-8 mt-1 rounded-xl'/>
      <img src={logo1} alt="logo"  className='hidden dark:flex h-8 mt-1 rounded-xl'/>
      </Link>

      <div className='flex'>
        

      { theme === 'light' ? 
 <button onClick={toggle}>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 ">
  <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
</svg>
 </button>

       :
       <button onClick={toggle}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 ">
  <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
</svg>
       </button>
    
    }






      <Link to='/notification' title='notifications'>
      <svg
         xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1"
          stroke="currentColor"
          className="h-10 ml-5 w-8 lg:w-10 hover:scale-110 active:opacity-50"
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
                <div className='absolute top-1 bg-red-500 ml-4 w-6 text-white rounded-full'>{NumberFormat(user.notifications.length)}</div>
                : null
         }
            </div>
          })
          :null
          : <></>
        }
     
      </Link>



      <Popup contentStyle={{width: "300px", background: "transparent", border:"none"}} trigger=
                {<button title="menu">             
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-10 ml-5 w-8 lg:w-10 transform hover:scale-110 active:opacity-50">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
</svg>         
     </button>} 
                modal nested >
                {
                    close => (
                        <div>
                          <button className=' dark:bg-zinc-800 dark:text-white bg-white w-full p-4 border-b border-black-50 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-t-lg  active:opacity-50'>
                          <Link to='/friends'className="p-4 px-24" >
          Friends
                            </Link>

                          </button>
                          <button className=' dark:bg-zinc-800 dark:text-white bg-white w-full p-4 border-b border-black-50 hover:bg-slate-200 dark:hover:bg-slate-800 active:opacity-50'>
                          <Link to='/about'className="p-4 px-24" >
          About
                            </Link>

                          </button>

                          <button className=' dark:bg-zinc-800 dark:text-white bg-white w-full p-4 border-b border-black-50 hover:bg-slate-200 dark:hover:bg-slate-800 active:opacity-50'>
                          <Link to='/contact'className="p-4 px-24" >
          Contactus
                            </Link>

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
     
    </div>
  )
}
