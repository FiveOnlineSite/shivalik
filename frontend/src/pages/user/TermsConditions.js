import React from 'react';
import styles from '../../style/Common.module.css';
import GradientLine from './../../components/atoms/GradientLine';
import Layout from '../../components/templates/Layout';
import MetaDataComponent from '../../components/atoms/MetaDataComponent';
import { useLocation } from 'react-router-dom';

const TermsConditions = ({ gradient = 'white' }) => {

  const gradientClass = 
    gradient === 'grey' ? styles.greyGradient :
    gradient === 'dark' ? styles.darkGradient :
    styles.whiteGradient;


  return (
    <Layout>
        
      <MetaDataComponent/>
     <section className={`${styles.innerBannerSection} ${gradientClass} position-relative`}>
      
        <div className='inner-banner row'>
        <img className="d-lg-block d-none" src="./images/banner2.jpg" width='100%' alt="privacy-policy-banner" />

        <img className="d-lg-none d-block" src="./images/banner2.jpg" width='100%' alt="privacy-policy-banner" />

        <div className={`${styles.innerPageTitle}`}>
          <GradientLine />
          <h1>Terms & Conditions</h1>
        </div>
      </div>
      
      
    </section>

    <section className="terms-conditions-section py-5">
      <div className="container">
        <p className='accordion-body'>Please be advised that accessing or utilizing the website implies the user's consent to abide by the following terms and conditions:</p>
        
        <h6 className="terms-title accordion-button">Intellectual Property</h6>
        <p className='accordion-body'>All content, images, logos, and other materials on this website are the property of Shivalik Ventures or its licensors. These properties are safeguarded by intellectual property laws, and users are expressly prohibited from copying, altering, distributing, or utilizing any content without obtaining prior written permission.</p>

         <h6 className="terms-title accordion-button">Property Information</h6>
        <p className='accordion-body'>This website's content, which includes details of the properties, is subject to change at any time. Shivalik ventures is not responsible for any inaccuracies or omissions in the information provided.</p>

         <h6 className="terms-title accordion-button">User Obligations</h6>
        <p className='accordion-body'>Users are obligated to furnish accurate and current information when submitting inquiries or requests. Additionally, users must commit to refraining from engaging in any unlawful or harmful activities, such as hacking, spamming, or transmitting malicious software.</p>


         <h6 className="terms-title accordion-button">Privacy and Data Collection</h6>
        <p className='accordion-body'>Shivalik ventures may collect, store, and use your personal information in accordance with its privacy policy. We may use third-party services or tracking technologies, such as cookies or analytics tools, to collect information about your use of this website.</p>

         <h6 className="terms-title accordion-button">Disclaimer of Liability</h6>
        <p className='accordion-body'>Shivalik ventures explicitly disclaims liability for any damages, losses, or injuries arising from the use of the website or reliance on the provided information. This disclaimer extends to encompass, but is not limited to, financial losses, property damage, or any other direct or indirect damages.</p>

 <h6 className="terms-title accordion-button">Links to Third-Party Websites</h6>
        <p className='accordion-body'>This website may contain links to external websites or resources. We do not endorse or assume responsibility for the content, privacy practices, or availability of those third-party sites.</p>


 <h6 className="terms-title accordion-button">Modifications to the Terms</h6>
        <p className='accordion-body'>Shivalik ventures may update or modify these terms and conditions at any time without prior notice. We encourage you to review these terms periodically to stay informed about any changes.</p>

 <h6 className="terms-title accordion-button">Governing Law and Jurisdiction</h6>
        <p className='accordion-body'>Any legal disputes arising from your use of this website will be governed by the laws of the State of Maharashtra and will be resolved in the courts of Mumbai.</p>

      </div>
    </section>
    </Layout>
  );
}

export default TermsConditions

