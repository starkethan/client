import React, { useEffect, useState } from 'react'
import { LeftNavbar } from '../components/LeftNavbar'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Moment from 'react-moment'


export const Friends = () => {
    const [activeTab, setActiveTab] = useState('Friends');
    const [requests, setRequests] = useState();
    const [userData, setUserData] = useState(null);

     useEffect(() => {
    document.title = "Hucschat"
  })
  
    useEffect(() => {
      axios
        .get(`${process.env.REACT_APP_API}/auth/getuser`)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((err) => console.log(err));
    }, []);
    localStorage.setItem("user", JSON.stringify(userData));
  
    var user = JSON.parse(localStorage.getItem("user"));

    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };

    const handleRequest = (sender, friend, sId, fId, sPic, fPic, rId) => {
      
      axios.put(`${process.env.REACT_APP_API}/friends/f`, {sender, friend, sId, fId, sPic, fPic, rId})
      .then((res) => {
        if (res.data === "Success") {
          window.location.reload();
        } else {
          alert("Something went wrong")
        }
      })
      .catch((err) => console.log(err));

    }

    const handleReject = (rId) => {
      
      axios.put(`${process.env.REACT_APP_API}/friends/r`, {rId})
      .then((res) => {
        if (res.data === "Success") {
          window.location.reload();
        } else {
          alert("Something went wrong")
        }
      })
      .catch((err) => console.log(err));

    }

    useEffect(() => {
      axios
        .get(`${process.env.REACT_APP_API}/friends/requests`)
        .then((requests) => {
          setRequests(requests.data);
        })
        .catch((err) => console.log(err));
    },[]);

  return (
    <div>
        <LeftNavbar />

        <center className='dark:text-white'>
        <div className="flex lg:w-[50%] ml-3 border-b dark:border-gray-600 border-black-50 justify-center mt-10 lg:mt-0 gap-32">
          <div
            className={`lg:text-2xl font-semibold cursor-pointer ${
              activeTab === 'Friends' ? 'border-b-2 border-blue-500' : ''
            }`}
            onClick={() => handleTabClick('Friends')}
          >
            Friends
          </div>
          <div
            className={`lg:text-2xl font-semibold cursor-pointer ${
              activeTab === 'Requests' ? 'border-b-2 border-blue-500' : ''
            }`}
            onClick={() => handleTabClick('Requests')}
          >
            Requests
          </div>
        </div>
        {activeTab === 'Friends' && (
          <div className='mt-5'>
            { 
              user && user.friends.length ? 
              user.friends.map((f) => (
                <div key={user._id} className='flex justify-between border border-gray-600 p-2 m-1 rounded-lg lg:w-[50%]'>
                <Link to={`/profile/${f.friend}`} key={f._id} className='flex gap-2 '>
                <img src={`${process.env.REACT_APP_API}/profile/${f.pic}`} alt="friend" className='h-14 w-14 rounded-full'/>
                <p className='text-2xl mt-3'>{f.friend}</p>
</Link>
<div className='mt-4'>Since <Moment format='ddd MMM DD YYYY'>{f.created}</Moment> </div>
</div>
              ))
              :
              <p className='text-3xl p-10'>No friends</p>


            }

          
            
            
          </div>
        )}

        {activeTab === 'Requests' && (
          <div className='mt-5'>
            
            {requests.length ? (
              <ul>
                {requests.map((request) => (
                  <li className='lg:flex lg:justify-between lg:w-[50%] border border-gray-600 p-3 m-1 rounded-lg'  key={request._id}> 
                  <div className='lg:flex lg:m-0 m-2 gap-1'>
                    <Link to={`/profile/${request.Sender}`} className='text-blue-600'> {request.Sender} </Link>
                 sent you a friend request.
                  </div>
                  <div className='flex justify-center gap-2'>
                  <button onClick={() => handleRequest(request.Sender, request.Friend, request.SenderId, request.FriendId, request.Spic, request.Fpic, request._id)} className='bg-blue-600 p-1 px-4 rounded-full text-white active:opacity-50'>Accept</button>
                  <button onClick={() => handleReject(request._id)} className='bg-red-600 p-1 px-4 rounded-full text-white active:opacity-50'>Reject</button>
                  </div>
                  </li> 

                ))}
              </ul>
            ) : (
              <p className='text-3xl p-10'>No friend requests yet.</p>
            )}
          </div>
        )}
      </center>
        
       

    </div>
  )
}
