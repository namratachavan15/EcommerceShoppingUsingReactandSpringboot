import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css';
import MainCarouselData from './MainCarouselData';
const MainCarousel = () => {
  const items = MainCarouselData.map((item)=><img className="w-full h-[150] object-cover cursor-pointer -z-10" src={item.images} role="presentation" alt="" />
)  
   
  return (
    <div className="w-full">
          <AliceCarousel
        mouseTracking
        items={items}
       disableButtonsControls
       autoPlay
       autoPlayInterval={1000}
       infinite
    />
    </div>
    
  )
}

export default MainCarousel