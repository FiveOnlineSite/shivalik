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
                        <p>For over three decades, Shivalik has been a name built on integrity, transparency, and excellence. From blueprint to delivery, every project reflects our purpose, which is to create homes in Mumbai that offer comfort, connection, and a sense of belonging.</p>
                        <p>Each development is a reflection of our people-first approach and commitment to purposeful design. Because for us, building isn’t just about structures; it’s about shaping lives and nurturing communities </p>
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
