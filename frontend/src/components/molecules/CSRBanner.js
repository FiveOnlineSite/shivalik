import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import styles from '../../style/Common.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';

const CSRBanner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false, 
  };

   const [csrBanner, setCSRBanner] = useState([])

    useEffect(() => {
      const fetchCSRBanner = async () => {
        try {
          const apiUrl = process.env.REACT_APP_API_URL;
  
          const response = await axios({
            method: "GET",
            baseURL: `${apiUrl}/api/`,
            url: "csr-banner",
          });
  
          setCSRBanner(response.data.banners);
          // console.log(response.data.news);
          console.log("filepath", response.data.banners.banner[0].filepath);
          // setCSRBanner(response.data.csrBanner);
        } catch (error) {
          console.error("Error fetching csr Banner:", error);
        }
      };
  
      fetchCSRBanner();
    }, []);

  return (
    <section className="position-relative banner_Section">
      <Slider {...settings}>
        {csrBanner && csrBanner.map((banner) => (
          <div key={banner._id}>
         <div className={`${styles.bannerBox} position-relative`}>
              <div className={styles.bannerImg}>
                
                {banner.mobile_image[0].filepath && (
                  <img
                  src={banner.mobile_image[0].filepath}
                  className="img-fluid d-block d-sm-none mob-img" width='100%'
                  alt={banner.mobile_alt}
                />
                )}
                
                {banner.image[0].filepath && (

                <img
                  src={banner.image[0].filepath}
                  className="img-fluid d-none d-sm-block" width='100%'
                  alt={banner.alt}
                />
                )}
              </div>
              <div className={`${styles.bannerText} text-center row justify-content-center align-items-center`}>
                      <div className='col-10'>
                        <p className={`customSubtext fadeInDown delay-3`}>CSR</p>
                        <h2 className={`customTitle fadeInDown delay-2`}>{banner.title}</h2>
                      </div>
                    </div>
            </div>
         
            </div>
        ))}
      </Slider>
    </section>
  );
};

export default CSRBanner;