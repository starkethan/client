import Axios from 'axios'
import React, { useEffect, useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { LeftNavbar } from '../components/LeftNavbar'
import { RightNavbar } from '../components/RightNavbar'
import { Post } from '../components/Post'
import { Header } from '../components/Header'
import axios from 'axios'


export const Home = () => {
  const [u, setU] = useState(null);

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState();

  const runOnce = useRef(false)
useEffect(() => {
  if (runOnce.current === false){
  
    axios
      .get(`http://localhost:3001/post/getposts?page=${page}`)
      .then((posts) => {
        setPosts((prev) => [...prev, ...posts.data]);
        if (posts.data.length > 0) {
          setHasMore(true);
        }
        setHasMore(false);
        setLoading(false);
      })
      .catch((err) => console.log(err));}
      return () => runOnce.current = true
  }, [page]);

  const handleScroll = () => {
  //  console.log("Height", document.documentElement.scrollHeight);
  //  console.log("Top", document.documentElement.scrollTop);
  //  console.log("window", window.innerHeight);

   if (hasMore && window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {

    setLoading(true);
    setPage(prev => prev + 1);
   }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll)

  })


  useEffect(() => {
    Axios
      .get("http://localhost:3001/auth/getuser")
      .then((response) => {
        setU(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
 
 

  const navigate = useNavigate()
  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get('http://localhost:3001/auth/verify')
    .then(res => {
      if (res.data.status) {

      } else {
        navigate('/')
      }
    })
  }) 

  const [activeTab, setActiveTab] = useState('Public'); 

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='select-none dark:bg-black dark:text-white'>
      
      {  u ? 
         <Header  user = {u}/>
         : <></>
      }
      <LeftNavbar/>

      <div className='p-1'>
              <RightNavbar />

      </div>

<center>


      <div className="flex lg:w-[50%] ml-6 border-b  dark:border-gray-600 border-black-50 justify-center  mt-10 lg:mt-0 gap-32">
      <div
        className={`max-[1024px]:w-full lg:text-xl font-semibold cursor-pointer ${
          activeTab === 'Public' ? 'border-b-2 border-blue-500' : ''
        }`}
        onClick={() => handleTabClick('Public')}
      >
        Public
      </div>
      <div
        className={` max-[1024px]:w-full lg:text-xl font-semibold cursor-pointer ${
          activeTab === 'Friends' ? 'border-b-2 border-blue-500' : ''
        }`}
        onClick={() => handleTabClick('Friends')}
      >
        Friends
      </div>
      </div>
      </center> 


<div className=' pb-20 p-1 lg:ml-40 mt-2 lg:w-1/2 '>  
<Post  posts={posts} />
{loading && <p className='flex justify-center'>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 animate-spin">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>
Loading...</p> }

</div>

       </div>
    
  )
  
}
