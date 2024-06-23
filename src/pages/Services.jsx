import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { RWebShare } from "react-web-share";
import { NumberFormat} from '../components/NumberFormat';
import { PostSlider } from '../components/PostSlider';


 
export const Services = () => {

  const largeNumber = 10212022;
  const currentPageUrl = window.location.href;
  const [story, setStory] = useState([]);

var user = JSON.parse(localStorage.getItem('user'));
const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')



const handleStory = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("userId", user._id);
  if(story.length > 12) { 
  alert("Not more than 12")}

  else
  for (let i = 0; i < story.length; i++) {
    
    formData.append("story", story[i]);
  }
  axios.post('http://localhost:3001/story/s', formData)
  .then((res) => {
    if (res.data === "Success") {
      window.location.href = "/home";
    } else {
      alert("Story submission failed.")
    }
  })
  .catch((err) => console.log(err));
}


const [stories, setStories] = useState([]);

useEffect(() => {
  axios
    .get("http://localhost:3001/story/getstory")
    .then((stories) => setStories(stories.data))
    .catch((err) => console.log(err));
}, []);


// useEffect(()=> {
//   if(window.matchMedia('(prefers-color-scheme: dark)').matches){
//     setTheme('dark');
//   } 
//   else {
//     setTheme('light');
//   }
// }, [])

useEffect(() => {
  if (theme === 'dark') {
  localStorage.setItem("theme", theme);
document.documentElement.classList.add('dark')

  } else {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.remove('dark')
  }
}, [theme]);

  const toggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
 


  const [userData, setUserData] = useState(null);
  useEffect(() => {
    axios.get('http://localhost:3001/auth/getuser')
    .then((response) => {
      setUserData(response.data);
    })
    .catch(err => console.log(err))
  },[])



  // const [image, setImage] = useState(null);
  //    const onImageChange = (event) => {
  //     if (event.target.files && event.target.files[0]) {
  //       setImage(URL.createObjectURL(event.target.files[0]));
  //     }
  //   };

  const [images, setImages] = useState([]);
  const onImageChange = (event) => {
    if (event.target.files) {
      const newImages = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages(newImages);
    }
  };

    // function getExtensionFromUrl(url) {
    //   const parts = url.split('.');
    //   return parts.length > 1 ? parts[parts.length - 1] : '';
    // }
    

    // const slides = stories ? stories.flatMap(story =>
    //   story.stories.map(s => ({
    //     url: 'http://localhost:3001/stories/' + s.story,
    //     type: getExtensionFromUrl('http://localhost:3001/stories/' + s.story) ,
    //     userId: s.userId
    //   }))
    // ) : [];
  

   


  return (

    <div className='dark:bg-black dark:text-white '>
      
     
      <h1 className='text-6xl'>  No Services Available</h1> 
 

<input type="file"
  multiple onChange={onImageChange}
        />
{/* {image && <img alt="preview" src={image} />} */}
<div className='flex flex-wrap'>
    {images.map((imageUrl) => (
      <div >
             <img key={imageUrl} src={imageUrl} alt="preview" className='h-60 w-60' />
      </div>
    ))}
  </div>

<form onSubmit={handleStory}>
<input type="file" multiple required onChange={(e) => setStory(e.target.files)}
/>
 <button  className='bg-blue-400 text-white p-2 rounded-full'>post</button>
 </form>
    
  
       <p>Formatted number:{NumberFormat(largeNumber)}</p>

<p>{user.username}</p>
<p>{user.email}</p>
<p>{user._id}</p>
<p>{user.password}</p>

       {userData ? (
        <div>
        
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <p>Password: {userData.password}</p>

          


        </div>
      ) : (
        <p>Loading...</p>
      )}





<div>
      <RWebShare
        data={{
          text: "Like humans, flamingos make friends for life",
          url: "https://on.natgeo.com/2zHaNup",
          title: "Flamingos",
        }}
      >
        <button>Share 🔗</button>
      </RWebShare>
    </div>


    <button  onClick={() => {navigator.clipboard.writeText(currentPageUrl)}}>copy</button>



   

    
{
  stories  ?
  stories.map((story) => {
    return (story.stories.map((s) => {
     return ( <div key={s._id} className='flex justify-center'>
              <img src={`http://localhost:3001/stories/${s.story}`} alt="slide"  className='h-60 w-60'/> 
     </div>
      )
    }))
  }):<></>
} 


{ theme === 'light' ? 
 <button onClick={toggle}>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20 ">
  <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
</svg>
 </button>

       :
       <button onClick={toggle}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20">
  <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
</svg>
       </button>
    
    }
    

<PostSlider />

</div>
  )
}