import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import axios from 'axios'
import pic from './assets/userprofile.jpg'
import { LeftNavbar } from './LeftNavbar'


export const Notifications = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    useEffect(() => {
      axios
        .get("http://localhost:3001/auth/getuser")
        .then((response) => {
          setUser(response.data);
        })
        .catch((err) => console.log(err));
    }, []);
    localStorage.setItem("user", JSON.stringify(user));
    var u = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
      axios
        .get("http://localhost:3001/auth/getusers")
        .then((users) => setUsers(users.data))
        .catch((err) => console.log(err));
    }, []);
  
    const handleRemove = (id) => {
      axios
      .put("http://localhost:3001/auth/remove/"+ id)
       window.location.reload();
    }
    
  
  return (
    <div>
           <LeftNavbar />

          <div className='pb-20 dark:bg-black dark:text-white'>
      { user ? 
    <div>
        <div className='sticky top-0 dark:bg-black bg-white font-bold text-3xl p-2 mb-4 border-b dark:border-white border-black'>
               Notifications  
        </div>
      
       

        <div >
            <p className='pb-2'>When someone likes or comments on your post, you'll see notification here</p>
        </div>
        { user.notifications
         ?
         (user.notifications.length && user.username !== u.username ? 

          <button onClick={() => handleRemove(user._id)} className='sticky top-14 rounded-lg dark:bg-gray-800 mb-2 bg-white text-red-500 font-semibold p-1'>Remove All</button>
        :null)  :null
        }

        { user.notifications ? 
       (user.notifications.length && user.username !== u.username ?  
      user.notifications.slice().reverse().map((n) => {
        
        return (<center>
        <div className='bg-slate-200 dark:bg-gray-900 lg:w-[50%] p-2 mb-2 rounded-2xl'>
            <Link to={`/p/${n.id}`}>
              <div className='flex justify-between'>
                <div className='flex gap-2'>
              
                <Link className='flex gap-2' to={`/profile/${n.username}`}> 
 {users.map((u) => {
                return (
                u.email === n.email ? ( u.pic ? 
                <div><img src={`http://localhost:3001/profile/${u.pic}`} alt="profile" className='w-10 h-10 rounded-full'/></div>
                :<div><img src={pic} alt="profile" className='w-10 h-10 rounded-full'/></div>

                 ) : null
                  
      )})}
                          <p className='mt-2 font-semibold'>{n.username}</p>
                    </Link>
                    <p className='mt-2'>{n.notification}</p>
                </div>

           <div className='flex gap-4'> 
            <small className='p-2'>
        <Moment fromNow>{n.createdAt}</Moment>
         </small>
            </div>    
        
         </div>
            </Link>
    </div>
    </center>
    )
       })   
      : 
      <div className='text-3xl pt-4'>No Notifications</div> ):  <div className='text-3xl pt-4'>No Notifications</div> }

</div> : null }
    </div>
    </div>
  )
}
