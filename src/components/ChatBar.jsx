import React, { useEffect, useState } from 'react'
import axios from 'axios'
import  pic  from '../components/assets/userprofile.jpg'

export const ChatBar = ({data, currentUserId, online}) => {

 const userId = data.members.find((id)=> id!==currentUserId)

        const [users, setUsers] = useState([]);
        useEffect(() => {
          axios
            .get("http://localhost:3001/auth/getusers")
            .then((users) => setUsers(users.data))
            .catch((err) => console.log(err));
        }, []);
    return (
        <div>
         
         
         {users.map((user) => {
return <div key={user._id}>
  {
                user._id === userId? 
<center>
                 <div className=' dark:text-white border border-black-50 dark:hover:bg-zinc-800 hover:bg-zinc-200'>
        <div className='flex flex-row gap-4 lg:pl-24 pl-4 py-4'>
        { 
        user.pic ?
        
        <img
                    src={`http://localhost:3001/profile/${user.pic}`}
                    alt="profile"
                    className="w-14 h-14 rounded-full"
                  /> :
                   <img
                    src={pic}
                    alt="profile"
                    className="w-14 h-14 rounded-full"
                  /> }
  <div className='flex justify-between'><div className='lg:text-2xl font-semibold pt-3'>{user.username}</div>
  <small>{online ? "Online" : ""}</small>

   </div>

</div>

</div> 
          </center>

               :<></>
            }
</div>
            
         })}

        </div>

    ) 

}



























//     const [users, setUsers] = useState([])
//     useEffect(() => {
//       axios.get('http://localhost:3000/auth/getusers')
//       .then(users => setUsers(users.data))
//       .catch(err => console.log(err))
//     },[])
    
//         var user = JSON.parse(localStorage.getItem('user'));
    
//   return (
//     <div>
//       <div className='sticky top-0 bg-white'>

//           <p className='text-xl font-bold p-2'>{user.username}</p>
//             <p className='flex lg:px-24 px-6 text-xl pb-2 font-bold'>Messages</p>

//       </div>
         
//             <div className='lg:overflow-y-scroll lg:h-[515px] h-full'>
//             {
//         users.map(user => {
//         return <div key={user._id}>
//           <Link to={`/chat`}>
          
          
          
          
          
//              <center>
//                  <div className='border border-black-50   hover:bg-zinc-200'>
//         <div className='flex flex-row gap-4 lg:px-24 pl-4 py-4'>
//         { 
//         user.pic ?
        
//         <img
//                     src={`http://localhost:3000/profile/${user.pic}`}
//                     alt="profile"
//                     className="w-14 h-14 rounded-full"
//                   /> :
//                    <img
//                     src={pic}
//                     alt="profile"
//                     className="w-14 h-14 rounded-full"
//                   /> }
//   <h1 className=' lg:text-2xl font-semibold pt-3 list-none'>{user.username}</h1>
// </div></div>
//           </center>
//           </Link>
       
//  </div>
//         }) }
//          </div>
//     </div>
//   )
// }
