import React from 'react';
import Layout from '../../components/templates/Layout';
import InnerBanner from '../../components/atoms/InnerBanner';
import { ArrowRightAlt } from '@mui/icons-material';
import GradientLine from '../../components/atoms/GradientLine';
import homestyles from '../../style/Home.module.css';
import styles from '../../style/Common.module.css';
import AwardsSlider from '../../components/organisms/AwardsSlider';
import { useLocation } from 'react-router-dom';
import MetaDataComponent from "../../components/atoms/MetaDataComponent"

const AboutUs = () => {

    const location = useLocation();
    const currentPath = location.pathname;
  return (
    <Layout>
      <MetaDataComponent/>
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
                        <p>It all began in the early 80s, when two socially conscious visionaries, Ramakant R. Jadhav and Prakash V. Ajgaonkar, set out to make quality housing accessible for Mumbai’s lower and middle-class families. Nearly four decades and many success stories later, their social commitment remains just as strong,  now reflected through the quality of every project and the lasting value it offers to its residents.</p>

<p>What they started was more than just a business; it was a movement to make budget 1BHK and 2BHK homes  with optimum utilization of space a reality in Mumbai. In all, Ramakant R. Jadhav and Prakash V. Ajgaonkar did not just begin a movement towards making Smart housing a reality in Mumbai. Guided by the vision of “better homes for all”, they continue to inspire an approach that balances innovation, integrity and compliance within the city’s evolving urban landscape.</p>
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
                            <p>Bring social upliftment through customer-centric approach.</p>
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
                <h3 className={styles.sectionSubtitle1}>What Makes Us Different</h3>
              
            </div>
            <div className='col-lg-7'>
              <p>Shivalik Ventures, stands on a foundation of fairness and transparency. Over the years, it has earned the trust of communities it works with, from slum dwellers to government bodies, building strong partnerships with the Government of Maharashtra and the SRA through consistent integrity and collaboration. Shivalik Ventures properly stands as the best property to invest in Mumbai</p>
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
                <p>Shivalik Ventures brings extensive experience across every stage of real estate projects in Mumbai The company’s teams manage the process from society formation and obtaining statutory approvals to providing temporary accommodation and constructing permanent rehabilitation buildings.</p>
                <p>The organization is backed by its key promoters, Mr. Ramakant Jadhav and Mr. Prakash Ajgaonkar, along with prominent partners Unitech Limited and Rohan Group. Together, they uphold strong corporate governance practices and maintain high standards in project management, finance, design, and construction.</p>
                <p>Operating under the Slum Rehabilitation Authority (SRA) framework, Shivalik Ventures identifies eligible slum clusters, secures necessary consents from residents, and obtains approvals such as the Letter of Intent (LOI), Intimation of Approval (IOA), and Commencement Certificate (CC).This systematic and compliant approach has enabled the company to deliver large-scale housing projects in Mumbai efficiently and transparently, strengthening its position among trusted real estate developers in Mumbai and builders known for their residential properties in Mumbai.</p>
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
