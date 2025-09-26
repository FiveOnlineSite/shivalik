import React from 'react'
import GradientLine from '../atoms/GradientLine';
import styles from '../../style/Common.module.css';
import FaqProjectDetailPD from '../molecules/FaqProjectDetailPD';

const ProjectDetFaqSectionPD = () => {
  return (
    <>
     <section className='pt-5 pb-5' id="faq">
        <div className='container'>
            <div className='row justify-content-left mb-3'>
                    <div className='col-lg-12'>
                        <GradientLine />
                        <h3 className={`${styles.sectionTitle}`}>Loan FAQs & Registration</h3>
                    </div>
                </div>
            < FaqProjectDetailPD/>
        </div>
    </section>
    </>
  )
}

export default ProjectDetFaqSectionPD