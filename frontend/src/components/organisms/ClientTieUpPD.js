import React from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const ClientTieUpPD = () => {

    const settings = {
      dots: false,
    infinite: false,
    speed: 500,
    arrows:false,        
    slidesToShow: 3,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

// Now each slide includes a title
  const slides = [
    { src: "images/client/icici.png", title: "APF Num: MUM/17/5298" },
    { src: "images/client/dhfl.jpg", title: "APF Num: DAH-10206-11-17" },
    { src: "images/client/hdfc.png", title: "APF Num: P1070220" },
  ];


  return (
    <>
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <div key={index} style={{ textAlign: "center" }}>
          <img
            src={slide.src}
            alt={slide.title}
            style={{ width: "70%", height: "auto",margin:"auto"}}
          />
          <p className='text-center' style={{ marginTop: "0px", fontSize: "13px", color: "#333" }}>{slide.title}</p>
        </div>
      ))}
    </Slider>
    </>
  )
}

export default ClientTieUpPD