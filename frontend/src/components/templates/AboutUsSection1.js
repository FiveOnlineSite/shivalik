import React from 'react';
import homestyles from '../../style/Home.module.css';
import HomeIcon from '@mui/icons-material/Home';
import { ArrowRightAlt } from '@mui/icons-material';
import GradientLine from '../atoms/GradientLine';
import styles from '../../style/Common.module.css';

const AboutUsSection1 = () => {
  return (
    <section className='pt-5 pb-5 before-bg-type1'>
        <div className=''>
            <div className='row align-items-center'>
                <div className='col-lg-6'>
                  <div className={`${homestyles.aboutImg1} mb-3`}><img src='images/about-img1.png' width='100%' /></div>  
                </div>
                <div className='col-lg-6'>
                    <div className={homestyles.aboutText}>
                        {/* <span className={styles.gradientLine}></span> */}
                        <GradientLine />
                        <h3 className={styles.sectionTitle}>Creating Homes, Enriching Lives</h3>
                        <p className='pb-5'>It all began in the early 80s, when two socially conscious gentlemen, Ramakant R. Jadhav and Prakash V. Ajgaonkar, rose to meet the challenge of creating <b>quality housing for Mumbai</b>’s lower and middle-class families</p>
                        <a className={styles.commonBlueButton} href='about-us'>Learn more <ArrowRightAlt /></a>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default AboutUsSection1
