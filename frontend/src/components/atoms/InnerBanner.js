import React, { useEffect, useState } from 'react';
import styles from '../../style/Common.module.css';
import GradientLine from './GradientLine';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';

const InnerBanner = ({ page, gradient = 'white' }) => {

  const gradientClass = 
    gradient === 'grey' ? styles.greyGradient :
    gradient === 'dark' ? styles.darkGradient :
    styles.whiteGradient;

    const [banner, setBanner] = useState(null);
  const location = useLocation();

       useEffect(() => {
    const fetchBanner = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(
          `${apiUrl}/api/banner/page/${encodeURIComponent(page)}`
        );
        setBanner(response.data.banner);
      } catch (error) {
        console.error("Error fetching Banner:", error);
      }
    };
    fetchBanner();
  }, [page]);

  if (!banner) return null;

  return (
    <section className={`${styles.innerBannerSection} ${gradientClass} position-relative`}>
      
        <div className='inner-banner row'>
          {banner.image?.[0]?.filepath && (
        <img className="d-lg-block d-none" src={banner.image?.[0]?.filepath} width='100%' alt={banner.alt} />

          )}
          {banner.mobile_image?.[0]?.filepath && (
        <img className="d-lg-none d-block" src={banner.mobile_image?.[0]?.filepath} width='100%' alt={banner.mobile_alt} />

          )}
        <div className={`${styles.innerPageTitle}`}>
          <GradientLine />
          <h1>{banner.title}</h1>
        </div>
      </div>
      
      
    </section>
  );
}

export default InnerBanner;
