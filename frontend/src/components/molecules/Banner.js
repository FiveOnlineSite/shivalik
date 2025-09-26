import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import styles from '../../style/Common.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';

const Banner = () => {
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

  // const banners = [
  //   {
  //     desktopImg: 'images/banner/banner1.jpg',
  //     mobileImg: 'images/banner/banner1.jpg',
  //     heading: "Homes Built for a Better Tomorrow",
  //     text: 'More than just buildings—Shivalik projects are designed to elevate lives, foster communities, and create lasting memories.',
  //   },
  //   {
  //     desktopImg: 'images/banner/banner2.jpg',
  //     mobileImg: 'images/banner/banner2.jpg',
  //     heading: "Homes Built for a Better Tomorrow",
  //     text: 'More than just buildings—Shivalik projects are designed to elevate lives, foster communities, and create lasting memories.',
  //   },
  //   {
  //     desktopImg: 'images/banner/project-detail-one.png',
  //     mobileImg: 'images/banner/project-detail-one.png',
  //     heading: "Homes Built for a Better Tomorrow",
  //     text: 'More than just buildings—Shivalik projects are designed to elevate lives, foster communities, and create lasting memories.',
  //   },
  //   {
  //     desktopImg: 'images/banner/banner4.jpg',
  //     mobileImg: 'images/banner/banner4.jpg',
  //     heading: "Homes Built for a Better Tomorrow",
  //     text: 'More than just buildings—Shivalik projects are designed to elevate lives, foster communities, and create lasting memories.',
  //   },
  // ];


   const [homeBanner, setHomeBanner] = useState([])

    useEffect(() => {
      const fetchHomeBanner = async () => {
        try {
          const apiUrl = process.env.REACT_APP_API_URL;
  
          const response = await axios({
            method: "GET",
            baseURL: `${apiUrl}/api/`,
            url: "home-banner",
          });
  
          setHomeBanner(response.data.banners);
          // console.log(response.data.news);
          console.log("filepath", response.data.banners.banner[0].filepath);
          // setHomeBanner(response.data.HomeBanner);
        } catch (error) {
          console.error("Error fetching Home Banner:", error);
        }
      };
  
      fetchHomeBanner();
    }, []);

  return (
    <section className="position-relative banner_Section">
      <Slider {...settings}>
        {homeBanner && homeBanner.map((banner) => (
          <div key={banner._id}>
            {banner.link && (
              <a href={banner.link} >
         <div className={`${styles.bannerBox} position-relative`}>
              <div className={styles.bannerImg}>
                {/* Mobile Image */}
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
              <div className={`${styles.bannerText} text-center`}>
                <h2>{banner.title}</h2>
                <div dangerouslySetInnerHTML={{__html: banner.description}}></div>
              </div>
            </div>
            </a>
            )}
            {banner.link === "" && (
         <div className={`${styles.bannerBox} position-relative`}>
              <div className={styles.bannerImg}>
                {/* Mobile Image */}
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
              <div className={`${styles.bannerText} text-center`}>
                <h2>{banner.title}</h2>
                <div dangerouslySetInnerHTML={{__html: banner.description}}></div>
              </div>
            </div>
            )}
            
           
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Banner;