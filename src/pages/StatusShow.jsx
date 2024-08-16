import React, { useEffect, useState } from 'react'
import { LeftNavbar } from "../components/LeftNavbar";
import { StatusBar } from '../components/StatusBar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Slider } from '../components/Slider';

export const StatusShow = () => {
  const [status, setStatus] = useState([]);

  useEffect(() => {
    document.title = "Status | Hucschat"
  })

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/story/getstory`)
      .then((status) => setStatus(status.data))
      .catch((err) => console.log(err));
  }, []);
  
  const { username } = useParams();

  return (
    <div>
        <LeftNavbar  />
        <div>
<StatusBar status={status}/>
       </div>

       <div className='flex justify-center '>
        <Slider  username={username}/>
        </div>

      

    </div>
  )
}
