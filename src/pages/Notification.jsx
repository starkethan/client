import React, { useEffect, useState } from 'react'
import { Notifications } from '../components/Notifications'
import axios from 'axios'

export const Notification = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    document.title = "Hucschat"
  })
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/auth/getuser`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  localStorage.setItem("user", JSON.stringify(user));

  return (
  <div>
     <Notifications />
  </div>
  )
}
