// TestimonialBox.jsx
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import styles from '../../style/Common.module.css';
import axios from 'axios';
import Slider from 'react-slick';
import TestimonialsList from '../organisms/TestimonialsList';


const TestimonialBox = ({ quoteImage, rating, initials}) => {

  const settings = {
      dots: false,
      arrows: false,
      infinite: true,
      speed: 600,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      fade: false, // You can make this true if you want a fade effect
    };
  
    const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)          // split by whitespace
    .slice(0, 2)           // take first two words (first + last)
    .map(w => w[0]?.toUpperCase())
    .join("");

   const [Testimonials, setTestimonials] = useState([]);
  
    useEffect(() => {
      const fetchTestimonials = async () => {
        try {
          const apiUrl = process.env.REACT_APP_API_URL;
  
          // const response = await axios.get("/api/user/allUsers");
          const response = await axios({
            method: "GET",
            baseURL: `${apiUrl}/api/`,
            url: "testimonial",
          });
  
          setTestimonials(response.data.testimonials);
         // setTestimonials(response.data.Testimonials);
        } catch (error) {
          console.error("Error fetching testimonials:", error);
        }
      };
  
      fetchTestimonials();
    }, []);

  return (
    <Slider {...settings} >
    {Testimonials && Testimonials.map((testimonial) => (
      <div className='container'>
    <div className='row align-items-center' key={testimonial._id}>
      
        <div className='col-lg-5'>
        <div className={`${styles.testiImg} pt-3 pb-3`}>
          {testimonial.type === "image" && testimonial.media.filepath && (
                            <img src={`${testimonial?.media.filepath}`} width='100%' alt={testimonial.alt} />

            )}

            {testimonial.type === "video" && testimonial.media.filepath && (
                  <video
                    src={`${testimonial?.media.filepath}`}
                    width='100%'
                    muted
                    autoPlay
                    style= {{height: "500px", objectFit: "cover"}}
                    playsInline
                    controls
                  />
                )}
        </div>
      </div>
      <div className='col-lg-7'>
        <img className='mb-3 pb-3' src='images/Quotes.png' alt="quote" />
        <div className={styles.testiText}>
          <div className={styles.testiInfo}>
            <div className={`mb-3`}>
                <FontAwesomeIcon
                  icon={faStar}
                  style={{
                    fontSize: '1.2rem',
                    color: "#F58634",
                  }}
                />
                <FontAwesomeIcon
                  icon={faStar}
                  style={{
                    fontSize: '1.2rem',
                    color: "#F58634",
                  }}
                />
                <FontAwesomeIcon
                  icon={faStar}
                  style={{
                    fontSize: '1.2rem',
                    color: "#F58634",
                  }}
                />
                <FontAwesomeIcon
                  icon={faStar}
                  style={{
                    fontSize: '1.2rem',
                    color: "#F58634",
                  }}
                />
                <FontAwesomeIcon
                  icon={faStar}
                  style={{
                    fontSize: '1.2rem',
                    color: "#F58634",
                  }}
                />
            </div>
            <div dangerouslySetInnerHTML={{__html: testimonial.content}}></div>
          </div>
          <ul className='d-flex align-items-center gap-2'>
            <li>{getInitials(testimonial.name)}</li>
            <li>{testimonial.name}</li>
          </ul>
        </div>
      </div>
     
    </div>
     </div>
    ))}
    </Slider>
    
  );
};

export default TestimonialBox;
