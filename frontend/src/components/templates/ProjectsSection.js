import React from 'react';
import homestyles from '../../style/Home.module.css';
import GradientLine from '../atoms/GradientLine';
import styles from '../../style/Common.module.css';
import { ArrowRightAlt } from '@mui/icons-material';

const ProjectsSection = () => {
  return (
    <section className='bg-grey pt-5 pb-5'>
      <div className='container'>
        <div className='row justify-content-left mb-5'>
            <div className='col-lg-10'>
                <GradientLine />
                <h3 className={styles.sectionTitle}>Signature Developments</h3>
                <p>Driven by purpose and precision, our projects redefine Mumbai’s skyline with their contemporary design and thoughtful execution.</p>
                <p>They offer comfort, convenience, and a strong sense of community for those seeking the best real estate investment in Mumbai. </p>
            </div>
            
        </div>
        <div className='row align-items-end'>
        <div className='col-lg-6 mb-3'>
                <div className={homestyles.highlightProject}>
                    <img src='/images/gulmohar-home.png' width='100%' />
                </div>
            </div>
            <div className='col-lg-6 mb-3'>
            <div className={homestyles.projectBox}>
                <div className='row align-items-end'>
                    <div className='col-lg-9'>
                    <h2>Gulmohar Avenue</h2>
                    <p>Bandra has always been one of the most prestigious localities of Mumbai city and Gulmohar Avenue is our new residential project in Bandra-(E). Bandra is known for its unmatched surroundings, seamless connectivity and non-stop progressive social infrastructure. </p>
                    </div>
                    <div className='col-lg-3'>
                        <a className={styles.commonBlueButton} href='/project/gulmohar-avenue'><ArrowRightAlt className='m-0' /></a>
                    </div>
                </div>
            </div>
            </div>
        </div>
        <div className='row row-reverse align-items-end mb-5 align-bottom-section'>
        <div className='col-lg-6 mb-3 h-100'>
                <div className={homestyles.highlightProject}>
                    <img src='/images/prabhat-home.png' width='100%' />
                </div>
            </div>
            <div className='col-lg-6 mb-3 h-100 d-flex flex-column justify-content-end'>
            <div className={homestyles.projectBox}>
                <div className='row align-items-end'>
                    <div className='col-lg-9'>
                    <h2>Prabhat Darshan</h2>
                    <p>Located in one of Mumbai’s most well-connected neighbourhoods, Prabhat Darshan is among the most preferred residential projects in Khar. With its location right opposite Khar Station, residents enjoy effortless travel and connectivity across the city. Surrounded by dynamic social and commercial infrastructure, these apartments in Khar are ideal for those seeking residential properties for sale near Khar.</p>
                    </div>
                    <div className='col-lg-3'>
                        <a className={`${styles.commonBlueButton}`} href='/project/prabhat-darshan'><ArrowRightAlt className='m-0' /></a>
                    </div>
                </div>
            </div>
            </div>
        </div>
        <div className='row justify-content-start mb-5'>
       <div className='col-lg-3'><a className={styles.commonBlueButton} href='/projects'>More Projects <ArrowRightAlt /></a></div> 
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
