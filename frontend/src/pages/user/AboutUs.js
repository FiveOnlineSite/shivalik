import React from 'react';
import Layout from '../../components/templates/Layout';
import InnerBanner from '../../components/atoms/InnerBanner';
import { ArrowRightAlt } from '@mui/icons-material';
import GradientLine from '../../components/atoms/GradientLine';
import homestyles from '../../style/Home.module.css';
import styles from '../../style/Common.module.css';
import AwardsSlider from '../../components/organisms/AwardsSlider';
import { useLocation } from 'react-router-dom';

const AboutUs = () => {

    const location = useLocation();
    const currentPath = location.pathname;
  return (
    <Layout>
      {/* ABOUT US BANNER SECTION START */}
        <InnerBanner page={currentPath}/>
      {/* ABOUT US BANNER SECTION CLOSE */}

      {/* Quality. Vision. Affordability. The Founders’ Promise. section start */}
      <section className='pt-5 pb-5 before-bg-type2 position-relative'>
        <div className=''>
            <div className='row align-items-center'>
                <div className='col-lg-6'>
                  <div className={`${homestyles.aboutImg} mb-3`}><img src='images/about-img2.jpeg' width='100%' /></div>  
                </div>
                <div className='col-lg-6'>
                    <div className={`${homestyles.aboutText} ${styles.aboutText2}`}>
                        {/* <span className={styles.gradientLine}></span> */}
                        <GradientLine />
                        <h3 className={styles.sectionTitle}>Quality. Vision. Affordability. The Founders’ Promise.</h3>
                        <p>It all began in the early 80s, when two socially conscious gentlemen, Ramakant R. Jadhav and Prakash V. Ajgaonkar, rose to meet the challenge of making housing affordable for the lower and the middle class population of Mumbai. Today, almost three decades, many companies and success stories later, the social commitment is just as serious; except that with the growing number of realty houses making the same effort, the commitment is now reflected in the quality of projects and the value it brings to its owners. </p>

<p>In all, Ramakant R. Jadhav and Prakash V. Ajgaonkar did not just begin a movement towards making affordable housing a reality in Mumbai. Empowered by a vision of 'better homes for all at large', they have shown how to think beyond traditional limits and create value within the framework of law and regulations.</p>
                        {/* <a className={styles.commonBlueButton} href='#'>Learn more <ArrowRightAlt /></a> */}

                        <div className='row mt-5 pt-5'>
                      <div className='col-lg-6'>
                        <div className='row align-items-center'>
                          <div className='col-lg-3 col-3'><img src='images/vision.svg' width='100%' /></div>
                          <div className='col-lg-9 col-9'><h3>Vision</h3></div>
                          <div className='col-lg-12 mt-3'>
                            <p>To transform the City of Mumbai into a world-class metropolis</p>
                          </div>
                        </div>
                      </div>
                      <div className='col-lg-6'>
                        <div className='row align-items-center'>
                          <div className='col-lg-3 col-3'><img src='images/mission.svg' width='100%' /></div>
                          <div className='col-lg-9 col-9'><h3>Mission</h3></div>
                          <div className='col-lg-12 mt-3'>
                            <p>Shivalik Ventures strives to bring social upliftment through customer-centric approach.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </section>
      {/* Quality. Vision. Affordability. The Founders’ Promise. section close */}

      {/* Shivalik Ventures Advantage start */}
      <section className='bg-grey pt-5'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12 mb-5'>
             <h3 className={styles.sectionTitle}>Shivalik Ventures Advantage</h3>
            </div>
            <div className='col-lg-5'>
            
                <GradientLine />
                <h3 className={styles.sectionSubtitle1}>Unique Differentiator</h3>
              
            </div>
            <div className='col-lg-7'>
              <p>Shivalik Ventures has always been fair and transparent in its operations. Over the years, Shivalik Ventures has built goodwill and trust among the slum dwellers and maintained excellent relations with the Government of Maharashtra and SRA.</p>
            </div>
            
          </div>
        </div>
        <div className='row mt-3'>
          
              <img src='images/construction-company-mumbai-shivalik-ventures.png' width='100%' />
        
        </div>
      </section>
      {/* Shivalik Ventures Advantage close */}

      {/* Distinguishing Strength start */}
      <section className='pt-5 pb-5 mt-5 mb-5'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <GradientLine />
                <h3 className={`${styles.sectionSubtitle1} mb-5`}>Distinguishing Strength</h3>
                <p>We bring to the table a strong expertise across the value chain. Our teams operate to facilitate formation of societies, providing temporary accommodation, constructing permanent rehabilitation buildings, after getting necessary approvals from the respective authorities. Our teams in the field are driven by Management team which brings their expertise in Project management, Finance and overall project execution along with proficient branding and sales network.</p>
                <p>Shivalik Ventures’s major constituents include Unitech Limited and Rohan group, apart from the original promoters namely Mr. Ramakant Jadhav and Mr. Prakash Ajgaonkar. Shivalik Ventures, by virtue of its constituents, has its commitment to strong corporate governance, review systems, and high quality standards in design and construction.</p>
                <p>Shivalik Ventures starts its operations by identifying slum clusters, getting consents from slum dwellers through an interactive process and approvals from SRA, and acquisition of land. It completes the approval process by getting the Letter of Intent (LOI) from SRA along with the Intimation of Approval (IOA) and Commencement Certificate (CC) with the help of its experienced operations and project management team. Shivalik Ventures has led to corporate synergy which ensures smooth and economically viable project implementation mechanism.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Distinguishing Strength close */}

      {/* Award and Recognition start */}
      <section>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <GradientLine />
              <h3 className={`${styles.sectionSubtitle1} mb-5`}>Award and Recognition</h3>
            </div>
          </div>
        </div>

        <div className=''>
          <AwardsSlider />
        </div>
      </section>
      {/* Award and Recognition close */}

    </Layout>
  )
}

export default AboutUs
