import React from 'react';
import styles from '../../style/Common.module.css';
import homestyles from '../../style/Home.module.css';
import GradientLine from '../atoms/GradientLine';

const KeyFeaturesSection = () => {
  return (
    <section className={`${homestyles.keyfeatureBgImg} pt-5 pb-5`}>
        <div className='container'>
            <div className='row justify-content-center align-items-center'>
                <div className='col-lg-8 text-center'>
                    <div className={`${homestyles.keyFeatureBox} pt-5 pb-5 pl-5 pr-5 mt-5 mb-5`}>
                        <GradientLine />
                        <h3 className={styles.sectionTitle}>Built on Trust</h3>
                        <p>For over three decades, Shivalik has been a name synonymous with integrity and excellence. From blueprint to delivery, we build with a promise—to create homes that stand tall on quality, transparency, and timeless value.</p>
                        <p>Each project is a reflection of our deep-rooted commitment to purposeful design and people-first thinking. Because for us, it's not just about building structures—it's about shaping lives and strengthening communities.</p>
                        <div className='row'>
                            <div className='col-lg-3 col-6 text-center'>
                                <img src='images/quality-icon.svg' className='mb-3' />
                                <p>Lasting Quality</p>
                            </div>
                            <div className='col-lg-3 col-6 text-center'>
                            <img src='images/integrity-icon.svg' className='mb-3' />
                            <p>Ethical Approach</p>
                            </div>
                            <div className='col-lg-3 col-6 text-center'>
                            <img src='images/target-audience-icon.svg' className='mb-3' />
                            <p>Customer First</p>
                            </div>
                            <div className='col-lg-3 col-6 text-center'>
                            <img src='images/legacy-icon.svg' className='mb-3' />
                            <p>Legacy Driven</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default KeyFeaturesSection
