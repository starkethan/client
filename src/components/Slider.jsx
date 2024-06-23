import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import pic  from './assets/userprofile.jpg';


export const Slider = ({username}) => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  function getExtensionFromUrl(url) {
    const parts = url.split('.');
    return parts.length > 1 ? parts[parts.length - 1] : '';
  }
  const [stories, setStories] = useState(null);

useEffect(() => {
  axios
    .get("http://localhost:3001/story/getstory")
    .then((stories) => setStories(stories.data))
    .catch((err) => console.log(err));
}, []);

  const slides = stories ? stories.flatMap(story =>
    story.stories.filter(s => s.username === username).map(s => ({
      url: 'http://localhost:3001/stories/' + s.story,
      type: getExtensionFromUrl('http://localhost:3001/stories/' + s.story) ,
      userId: s.userId,
      username: s.username,
      createdAt: s.createdAt
    }))
  ) : null;
  

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/getusers")
      .then((users) => setUsers(users.data))
      .catch((err) => console.log(err));
  }, []);

  
    const prevSlide = () => {
      const isFirstSlide = currentIndex === 0;
      const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
    };
  
    const nextSlide = () => {
      const isLastSlide = currentIndex === slides.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    };
  
    const goToSlide = (slideIndex) => {
      setCurrentIndex(slideIndex);
    };

    
    


  return (
    <div className='select-none'>
         
      {  slides ? 
      <div>
{ users.map((user) => {
  return  <div key={user._id}>
{
user._id === slides[currentIndex].userId ? 
 <div>
    
<div className='lg:h-[500px] h-[600px] lg:w-[400px] w-full m-auto lg:py-4 relative group'> 
  { slides[currentIndex].type === 'txt' || slides[currentIndex].type === 'pdf' || slides[currentIndex].type === 'mp4'  ? 
  <div className='lg:h-[500px] h-[600px] lg:w-[900]'>
     { user._id === slides[currentIndex].userId ?
  <Link to={`/profile/${user.username}`}  className='absolute p-2 left-1'>
    <div className='flex gap-2'>
      { user.pic ? 
      <img src={`http://localhost:3001/profile/${user.pic}`} alt="profile" className='h-12 w-12 rounded-full'/>
      :       <img src={pic} alt="profile" className='h-12 w-12 rounded-full'/>

       }
        <p className='text-xl text-white font-medium mt-3'>  {user.username} </p> 

    </div>
    <div  className='ml-10 text-white -mt-3 text-xs'><Moment format='ddd hh:mm A'>{slides[currentIndex].createdAt}</Moment></div>
  </Link>: null}
      <iframe src={slides[currentIndex].url} title='slide' className='w-full h-full rounded-2xl'></iframe>
  </div>
  :
  <div className='h-[670px] lg:h-[500px] w-full'>
  { user._id === slides[currentIndex].userId ?
  <Link to={`/profile/${user.username}`}  className='absolute p-2 left-1'>
    <div className='flex gap-2'>
      { user.pic ? 
      <img src={`http://localhost:3001/profile/${user.pic}`} alt="profile" className='h-12 w-12 rounded-full'/>
      :       <img src={pic} alt="profile" className='h-12 w-12 rounded-full'/>
    }  <p className='text-xl text-white font-medium mt-2'>  {user.username} </p> 
     <div  className='mt-4 text-white text-xs'><Moment format='ddd hh:mm A'>{slides[currentIndex].createdAt}</Moment></div>

    </div> 
  </Link>: null}
  
  
  <img 
    src={slides[currentIndex].url}
    className=' w-full h-full rounded-2xl border border-black'
    alt="Slide"
  />
  
    </div>
}


  {
        slides.length !== 1 ? 
 <div>

{  
    currentIndex !== 0 ? 

      <div className='hidden group-hover:block absolute top-[50%]  -translate-x-0 translate-y-[-50%] left-2  text-2xl rounded-full p-1 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      : null

}


      {  currentIndex !== slides.length - 1 ?
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-2  text-2xl rounded-full p-1 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div> : null
}

    
      <div className='flex overflow-auto dark:text-white lg:flex-wrap justify-center'>
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className='text-2xl cursor-pointer'
          >
            <RxDotFilled/>
          </div>
        ))}
</div>
</div> : null
        }



    </div> 
 </div> : <></>
}
 </div>

})}

 </div> : <></>}

  
    </div>
  )
}
