import React from 'react';
import Logo from '../atoms/Logo';
import styles from '../../style/Common.module.css';
import BlogsSection1 from '../templates/BlogsSection1';

const Footer1 = () => {
  return (
<>
     {/* Blogs section start */}
          <BlogsSection1 />
     {/* Blogs section close */}

    <footer className='mt-5'>
      <div className='container'>
        <div className='row mb-5'>
          <div className='col-lg-4'>
            <div className='footer_logo mb-3'><Logo /></div>
            <p className='mb-3'>Building homes with integrity, driven by purpose. At Shivalik, every square foot speaks of trust.</p>
            <div className={styles.socialIcon}>
              <ul className='d-flex'>
              <li><a href='https://www.youtube.com/channel/UCzGodQJIXPM4yUl4BHY1Hug' className='icon-you-one' target='_blank'><i class="fa-brands fa-youtube"></i></a></li>
              <li><a href='https://www.facebook.com/shivalikventures/' target='_blank'><img src="/images/fb.svg" /></a></li>
              <li><a href='https://www.instagram.com/shivalik_ventures/' target='_blank'><img src="/images/insta.svg" /></a></li>
              <li><a href='https://www.linkedin.com/company/shivalik-ventures-1/' target='_blank'><img src="/images/linkedin.svg" /></a></li>
            </ul>
            </div>
          </div>
          <div className='col-lg-2 offset-lg-3'>
            <div className={styles.footerLink}>
              <ul>
                {/* <li><a href='#'>Home</a></li> */}
                <li><a href='about-us'>About</a></li>
                <li><a href='projects'>Projects</a></li>
                <li><a href='faqs'>FAQs</a></li>
              </ul>
            </div>
          </div>
          <div className='col-lg-2'>
            <div className={styles.footerLink}>
              <ul>
                <li><a href='csr'>CSR</a></li>
                {/* <li><a href='#'>Resources</a></li> */}
                <li><a href='blogs'>Blogs</a></li>
                <li><a href='contact-us'>Contact Us</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className={`${styles.footerCopyrights} pt-3`}>
            <p className='text-center'>&copy; 2025 All Rights Reserved by Shivalik</p>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer1
