import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ClientTieUps = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows:false,        
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  // Now each slide includes a title
  const slides = [
    { src: "images/client/icici.png", title: "APF Num: MUM/17/5298" },
    { src: "images/client/pnb.png", title: "PNB" },
    { src: "images/client/pnb-housing.png", title: "APF Num: MUM-0118-445" },
    { src: "images/client/axis.png", title: "APF Num: VIRPAS011924" },
    { src: "images/client/Central-Bank-Of-India.png", title: "APF Num: CPPC/MSRO/2017-18/APF005" },
    { src: "images/client/hdfc.png", title: "APF Num: P1070220" },
  ];

  return (
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <div key={index} style={{ textAlign: "center" }}>
          <img
            src={slide.src}
            alt={slide.title}
            style={{ width: "100%", height: "auto"}}
          />
          <p className='text-center' style={{ marginTop: "8px", fontSize: "11px", color: "#333" }}>{slide.title}</p>
        </div>
      ))}
    </Slider>
  );
};

export default ClientTieUps;

