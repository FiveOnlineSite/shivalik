import React from 'react';
import GradientLine from '../atoms/GradientLine';
import styles from '../../style/Common.module.css';
import TwoColumnNRIAccordion from '../molecules/TwoColumnNRIAccordion';

const FaqsNRIPIOHelpSection = () => {
  return (
    <section className='pt-5 pb-5 nri-faq'>
      <div className='container'>
        <div className='row justify-content-left mb-3'>
                    <div className='col-lg-12'>
                        <GradientLine />
                        <h3 className={`${styles.sectionTitle}`}>NRI & PIO Help</h3>
                    </div>
        </div>
        <TwoColumnNRIAccordion />
      </div>
    </section>
  )
}

export default FaqsNRIPIOHelpSection
