import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const AwardsSlider = () => {

  const [awards, setAwards] = useState([])
  // Image sets
  const itemsLTR = [
    "./images/awards/award1.jpg",
    "./images/awards/award2.jpg",
    "./images/awards/award3.jpg",
    "./images/awards/award4.jpg",
    "./images/awards/award5.jpg",
    "./images/awards/award6.jpg",
    "./images/awards/award7.jpg",
    "./images/awards/award8.jpg",
  ];

  const itemsRTL = [
    "./images/awards/award1.jpg",
    "./images/awards/award2.jpg",
    "./images/awards/award3.jpg",
    "./images/awards/award4.jpg",
     "./images/awards/award5.jpg",
    "./images/awards/award6.jpg",
    "./images/awards/award7.jpg",
    "./images/awards/award8.jpg",
  ];

  // Duplicate the items to create seamless looping
  const loopItemsLTR = [...itemsLTR, ...itemsLTR];
  const loopItemsRTL = [...itemsRTL, ...itemsRTL];

  // Slider Settings
  const leftToRight = {
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 8000,
    pauseOnHover: false,
    cssEase: "linear",
    infinite: true,
    responsive: [
      {
        breakpoint: 1200, // below 1200px
        settings: {
          slidesToShow: 6,
        }
      },
      {
        breakpoint: 992, // below 992px
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 576, // below 576px (mobile)
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };

  const rightToLeft = {
    ...leftToRight,
    rtl: true, // Right to left direction
  };

  useEffect(() => {
      const fetchAwards = async () => {
        try {
          const apiUrl = process.env.REACT_APP_API_URL;
          const response = await axios.get(`${apiUrl}/api/award`);
          const AwardsData = response.data.awards;
  
          setAwards(AwardsData);
         
          
        } catch (error) {
          console.error("Error fetching awards:", error);
        } 
      };
  
      fetchAwards();
    }, []);

  return (
    <div className="awards-slider-wrapper mb-5">
      {}
      <div className="slider-row">

        <Slider {...leftToRight}>
          {awards && awards.map((award) => (
            <div key={award._id} className="slide-item">
              {award.image[0].filepath && (
              <img src={award.image[0].filepath} alt={award.alt} style={{ width: "100%" }} />

              )}
            </div>
          ))}
        </Slider>
      </div>

      <div className="slider-row" dir="rtl">
        <Slider {...rightToLeft}>
         
        {awards && awards.map((award) => (    
            <div key={award._id} className="slide-item">
               {award.image[0].filepath && (
              <img src={award.image[0].filepath} alt={award.alt} style={{ width: "100%" }} />
               )}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default AwardsSlider;