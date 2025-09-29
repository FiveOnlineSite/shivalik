import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ClientTieUps = () => {
  const settings = {
    dots: false,
    infinite: false,
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

  const [projectBanks, setProjectBanks] = useState([])
  const {name} = useParams()

  useEffect(() => {
  
      const fetchProjectBank= async () => {
        try {
          const apiUrl = process.env.REACT_APP_API_URL;
          const response = await axios.get(`${apiUrl}/api/bank/project/${name}`);
          const ProjectBankData = response.data.Banks;
          console.log("bank", ProjectBankData)
          setProjectBanks(ProjectBankData);
        } catch (error) {
          console.error("Error fetching project bank:", error);
        }
      };
  
      fetchProjectBank();
    }, [name]);    

  return (
    <Slider {...settings}>
      {projectBanks && projectBanks.map((bank) => (
        <div key={bank._id} style={{ textAlign: "center" }}>
          {bank.image?.[0]?.filepath && (
            <img
            src={bank.image?.[0]?.filepath}
            alt={bank.alt}
            style={{ width: "100%", height: "auto"}}
          />
          )}
          
          <p className='text-center' style={{ marginTop: "8px", fontSize: "11px", color: "#333" }}>{bank.title}</p>
        </div>
      ))}
    </Slider>
  );
};

export default ClientTieUps;

