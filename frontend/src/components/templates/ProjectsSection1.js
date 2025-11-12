import React from 'react';
import homestyles from '../../style/Home.module.css';
import GradientLine from '../atoms/GradientLine';
import styles from '../../style/Common.module.css';
import { ArrowRightAlt } from '@mui/icons-material';

const ProjectsSection1 = () => {
  return (
    <section className='bg-grey pt-5 pb-5'>
      <div className='container'>
        <div className='row justify-content-left mb-5'>
            <div className='col-lg-10'>
                <GradientLine />
                <h3 className={styles.sectionTitle}>Signature Developments</h3>
                <p>Driven by purpose and precision, our projects stand as milestones in Mumbai's evolving skyline—designed to offer comfort, convenience, and community.</p>
            </div>
            
        </div>
        <div className='row align-items-end'>
        <div className='col-lg-6 mb-3'>
                 <div className={homestyles.highlightProject1}>
                                    <img src='/images/gulmohar-avenue.jpg' width='100%' />
                                </div>

            </div>
            <div className='col-lg-6 mb-3'>
            <div className={homestyles.projectBox}>
                <div className='row align-items-end'>
                    <div className='col-lg-9'>
                    <h2>Gulmohar Avenue</h2>
                    <p>Bandra has always been one of the most prestigious localities of Mumbai city and Gulmohar Avenue is nestled in this much sought-after abode. Bandra is known for its unmatched surroundings, seamless connectivity and non-stop progressive social infrastructure.</p>
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
                <div className={homestyles.highlightProject1}>
                    <img src='/images/prabhat-darshan.jpg' width='100%' />
                </div>
            </div>
            <div className='col-lg-6 mb-3 h-100 d-flex flex-column justify-content-end'>
            <div className={homestyles.projectBox}>
                <div className='row align-items-end'>
                    <div className='col-lg-9'>
                    <h2>Prabhat Darshan</h2>
                    <p>Situated in one of Mumbai's city centers Prabhat Darshan is a composite building surrounded by a flourishing hub for residential, commercial, educational and social infrastructure. This project is located opposite Khar Station granting easy access to south, central and extended suburbs of Mumbai.</p>
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

export default ProjectsSection1
