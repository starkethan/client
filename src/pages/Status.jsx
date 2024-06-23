import React, { useEffect, useState } from 'react'
import { LeftNavbar } from '../components/LeftNavbar'
import { StatusBar } from '../components/StatusBar';
import axios from 'axios';

export const Status = () => {
  const [s, setS] = useState([]);
    useEffect(() => {
      axios
        .get("http://localhost:3001/story/getstory")
        .then((s) => setS(s.data))
        .catch((err) => console.log(err));
    }, []);
  return (
    <div>
              <LeftNavbar />
<div>
<StatusBar />
       </div>
        {   
        
        s ? 

        s.length ?    
        
        <div className='flex justify-center mt-[12%]  text-3xl font-semibold dark:text-white'>Tap on profile to see Status</div>
:       <div className='flex justify-center mt-[12%] text-3xl font-semibold dark:text-white'>No Status</div>
  :null      }
    </div>
  )
}
