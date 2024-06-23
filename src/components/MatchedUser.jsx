import React from 'react'
import { Link } from 'react-router-dom';
import pic from './assets/userprofile.jpg';

export const MatchedUser = ({ users, post, c, c1 }) =>  {
  const matchingUser = users.find((user) => user.email === post.email);

  if (matchingUser) {
    return (
      <Link key={matchingUser.id} to={`/profile/${matchingUser.username}`} className="flex">
        { matchingUser.pic ?
        <img
          src={`http://localhost:3001/profile/${matchingUser.pic}`}
          alt="profilepic"
          className={c}
        />  : <img
        src={pic}
        alt="profilepic"
        className={c}
      />}
        <h1 className={c1}>
          {matchingUser.username}
        </h1>
      </Link>
    );
  } else {
    return (
        <img
          src={pic}
          alt="profilepic"
          className="lg:w-14 lg:h-14 ml-4 mt-2 w-12 h-12 rounded-full  max-[400px]:ml-2"
        />
      

    ) 
  }
}


