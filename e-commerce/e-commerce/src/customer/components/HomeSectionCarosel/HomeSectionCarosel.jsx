import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { Button } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useState } from "react";


const HomeSectionCarosel = ({data,sectionName}) => {
  console.log("data is",data)
  const [activeIndex, setActiveindex] = useState(0);
  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5 },
  };

  
  const slidePrev = () => {
    console.log("Prev clicked - New Index:", activeIndex);
    setActiveindex(activeIndex - 1);
  }
  const slideNext = () =>{
console.log("Next clicked - New Index:", activeIndex);
  setActiveindex(activeIndex + 1);
  }

  const syncActiveIndex = ({ item }) => setActiveindex(item);

  const items = (data || [])
  .slice(0, 10)
  .map((item, index) => <HomeSectionCard key={index} product={item} />);


  return (
    <div className="border h-[335px] px-5">

      <div className="relative">
        <h2 className='text-2xl font-extrabold text-gray-800 '>{sectionName}</h2>
        <AliceCarousel
        key={activeIndex} 
          mouseTracking
          items={items}
          disableButtonsControls
          disableDotsControls
          responsive={responsive}
          onSlideChanged={syncActiveIndex}
          activeIndex={activeIndex}
        />
        {activeIndex !== items.length - 5 &&
          <Button
            variant="contained"
            className="z-50 bg-white"
            sx={{
              position: "absolute",
              top: "8rem",
              right: "0rem",
              transform: "translateX(50%) rotate(90deg)",
              bgcolor: "white",
            }}
              style={{marginRight:'4px'}}
            aria-label="Previous"
            onClick={slideNext}
          >
            <KeyboardArrowLeftIcon
              sx={{ transform: "rotate(90deg)", color: "black" }}
            />
          </Button>
        }

        {/* Right Button */}
        {activeIndex !== 0 && (
         <Button
            variant="contained"
            className="z-50 bg-white"
            sx={{
              position: "absolute",
              top: "8rem",
              left: "0rem",
              transform: "translateX(50%) rotate(-90deg)",
              bgcolor: "white",
            }}
            style={{marginLeft:'-70px'}}
            aria-label="next"
            onClick={slidePrev}
          >
            <KeyboardArrowLeftIcon
              sx={{ transform: "rotate(90deg)", color: "black" }}
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default HomeSectionCarosel;
