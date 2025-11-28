import React from 'react';
import GradientLine from '../atoms/GradientLine';
import styles from '../../style/Common.module.css';
import FaqProjectDetail from '../molecules/FaqProjectDetail';

const ProjectDetFaqSection = () => {
  return (

    <section className='pt-5 pb-5' id="faq">
        <div className='container'>
            <div className='row justify-content-left mb-3'>
                    <div className='col-lg-12'>
                        <GradientLine />
                        <h2 className={`${styles.sectionTitle}`}>Loan FAQs & Registration</h2>
                    </div>
                </div>
            <FaqProjectDetail />
        </div>
    </section>

  );
};

export default ProjectDetFaqSection;
