import React, { useState } from 'react'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';


export const PostSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    function getExtensionFromUrl(url) {
      const parts = url.split('.');
      return parts.length > 1 ? parts[parts.length - 1] : '';
    }

    const slides = [
        {
          url: 'http://localhost:3001/profile/pic_1710765355574.jpg',
          type: getExtensionFromUrl('http://localhost:3001/profile/pic_1710765355574.jpg') 
        },  
        {
            url: 'http://localhost:3001/profile/pic_1715332169600.jpg',
            type: getExtensionFromUrl('http://localhost:3001/profile/pic_1715332169600.jpg') 
          }, 
          {
            url: 'http://localhost:3001/profile/pic_1714144929977.jpg',
            type: getExtensionFromUrl('http://localhost:3001/profile/pic_1714144929977.jpg') 
          },
           {
            url: 'http://localhost:3001/profile/pic_1714146074030.jpg',
            type: getExtensionFromUrl('http://localhost:3001/profile/pic_1714146074030.jpg') 
          }, 
          {
            url: 'http://localhost:3001/profile/pic_1714569335834.jpg',
            type: getExtensionFromUrl('http://localhost:3001/profile/pic_1714569335834.jpg') 
          }, 
          {
            url: 'http://localhost:3001/profile/pic_1714571248468.jpg',
            type: getExtensionFromUrl('http://localhost:3001/profile/pic_1714571248468.jpg') 
          }, 

    ]


    //   const slides = files ? files.map(f => ({
//       url: 'http://localhost:3001/posts/' + f.file,
//       type: getExtensionFromUrl('http://localhost:3001/posts/' + f.file) ,
//     }))
//   ) : null;
  


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
    
<div className='lg:h-[500px] h-[600px] lg:w-[400px] w-full m-auto lg:py-16 relative group'> 
  { slides[currentIndex].type === 'txt' || slides[currentIndex].type === 'pdf' || slides[currentIndex].type === 'mp4'  ? 
  <div className='lg:h-[500px] h-[600px] lg:w-[900]'>
     
      <iframe src={slides[currentIndex].url} title='slide' className='w-full h-full rounded-2xl'></iframe>
  </div>
  :
  <div className='h-[670px] lg:h-[500px] w-full'>
 
  
  
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

      <div className='hidden group-hover:block absolute top-[60%]  -translate-x-0 translate-y-[-50%] left-2  text-2xl rounded-full p-1 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      : null

}


      {  currentIndex !== slides.length - 1 ?
      <div className='hidden group-hover:block absolute top-[60%] -translate-x-0 translate-y-[-50%] right-2  text-2xl rounded-full p-1 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div> : null
}

    
      <div className='flex -mt-6 overflow-auto dark:text-white lg:flex-wrap justify-center'>
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


    
)
}



//   const slides = stories ? stories.flatMap(story =>
//     story.stories.filter(s => s.username === username).map(s => ({
//       url: 'http://localhost:3001/stories/' + s.story,
//       type: getExtensionFromUrl('http://localhost:3001/stories/' + s.story) ,
//       userId: s.userId,
//       username: s.username,
//       createdAt: s.createdAt
//     }))
//   ) : null;
  