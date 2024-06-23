import axios from 'axios';
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Settingsbar = () => {
    const navigate = useNavigate();
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
    <div>
        <div className='bg-gradient-to-r from-purple-200 to-blue-200 flex flex-col h-screen float-left lg:px-10 border-r-2 border-black-50 max-[700px]:p-1'>  
            <Link to='/home' style={{fontFamily:"Brush script MT"}} className='text-2xl font-bold p-4 max-[1024px]:hidden'>Hucschat</Link>
            <div className='flex flex-col gap-10 text-xl font-semibold mt-10'>
            <div className='hover:bg-slate-600 hover:text-white rounded-3xl'>
                <Link to='/settings' className='focus:bg-black focus:text-white flex gap-2 p-4 rounded-3xl'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>

<p className='max-[700px]:hidden'>
  Profile
  </p>   
                
                </Link></div>
          
            <div className='hover:bg-slate-600 hover:text-white  rounded-3xl'>
            <Link to='/personaldetails' className='focus:bg-black focus:text-white flex gap-2 p-4 rounded-3xl'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
</svg>
<p className='max-[700px]:hidden'>

   Personal details
</p>
               
                </Link></div>
            <div className='hover:bg-slate-600 hover:text-white rounded-3xl'>
            <Link to='/password' className=' focus:bg-black focus:text-white flex gap-2 p-4 rounded-3xl '>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
</svg>

<p className='max-[700px]:hidden'>

      Password
</p>
            


            </Link>
            </div>



            
               <button onClick={handleLogout} className="flex gap-2 hover:bg-slate-600 hover:text-white p-4  rounded-3xl active:opacity-50">


               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
</svg>

<p className='max-[700px]:hidden'>
        Logout
</p>
          
 
        </button>   
                
               

              
           
            </div>
            
           

        </div>
    </div>
  )
}
