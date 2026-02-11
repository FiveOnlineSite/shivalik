import React from 'react';
import styles from '../../style/Common.module.css';
import GradientLine from './../../components/atoms/GradientLine';
import Layout from '../../components/templates/Layout';
import MetaDataComponent from '../../components/atoms/MetaDataComponent';

const PrivacyPolicy = ({ gradient = 'white' }) => {

  const gradientClass = 
    gradient === 'grey' ? styles.greyGradient :
    gradient === 'dark' ? styles.darkGradient :
    styles.whiteGradient;


  return (
    <Layout>
         <MetaDataComponent/>
     <section className={`${styles.innerBannerSection} ${gradientClass} position-relative`}>
      
        <div className='inner-banner row'>
        <img className="d-lg-block d-none" src="./images/banner.jpg" width='100%' alt="privacy-policy-banner" />

        <img className="d-lg-none d-block" src="./images/banner.jpg" width='100%' alt="privacy-policy-banner" />

        <div className={`${styles.innerPageTitle}`}>
          <GradientLine />
          <h1>Privacy Policy</h1>
        </div>
      </div>
      
      
    </section>

    <section className="privacy-policy-section py-5">
      <div className="container">
          <p className='accordion-body'>All content, images, logos, and other materials on this website are the property of Shivalik Ventures or its licensors. These properties are safeguarded by intellectual property laws, and users are expressly prohibited from copying, altering, distributing, or utilizing any content without obtaining prior written permission.</p>
      
      <div className='my-2'>
         <h6 className="terms-title accordion-button">INTERPRETATIONS AND DEFINITIONS</h6>
        <p className='accordion-body'><b>“Data”</b> shall mean personal information, including sensitive personal information and special category personal data (as defined under Data Protection Laws) about you, which we collect, receive, or otherwise process in connection with your use of our website and/or the Platform.</p>
         <p className='accordion-body'><b>“Data Protection Laws”</b> shall mean any applicable law for the time being in force relating to the processing of Data.</p>
 <p className='accordion-body'><b>“Service Providers”</b> includes entities which provide services to and to whom we may disclose your Data for a specific purpose pursuant to a written contract.</p>
 <p className='accordion-body'><b>“Shivalik ventures”</b> shall mean Shivalik Ventures, and its subsidiaries, affiliates and associate companies.</p>
 <p className='accordion-body'><b>“User or You”</b> shall mean the natural person who accesses our website/pages or Platform.</p>

      </div>
       
<div className='my-2'>
<h6 className="terms-title accordion-button">WEBSITE CONTENT OVERVIEW:</h6>
        <p className='accordion-body'><b>The contents of this website, containing details of properties and property photos, are provided for informational and illustrative purposes only. This information is subject to change at any time. Users are hereby advised that the actual properties may differ from what is shown in photos and cost on the website and pages, and as such, no claims shall be entertained based on such representations.</b></p>

</div>
        
        <div className='my-2'>
        <h6 className='terms-title accordion-button'>TYPES OF DATA COLLECTED</h6>
        <p className='accordion-body'><b>PERSONAL DATA</b></p>
        <p className='accordion-body'>While visiting to this website, we may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:</p>
        <ul className='accordion-body ps-3 privacy-list'>
          <li className='accordion-body'>Email address</li>
          <li className='accordion-body'>First name and last name</li>
          <li className='accordion-body'>Phone number</li>
          <li className='accordion-body'>Address, State, Province, ZIP/Postal code, City</li>

        </ul>

        <p className='accordion-body'><b>We may use Personal Data for the following purposes:</b></p>
        <ul className='accordion-body ps-3 privacy-list'>
          <li className='accordion-body'><b>To provide and maintain our service,</b> including to monitor the usage of our Service.</li>
          <li className='accordion-body'><b>To contact you:</b> To contact you by email, telephone calls, SMS, or other equivalent forms of electronic communication.</li>
        <li className='accordion-body'><b>To provide information related to the property’s sale, purchase etc. </b>with, special offers and general information about properties, real estate services which we offer that are similar to those that you have already purchased or enquired about. </li>
          <li className='accordion-body'><b>To manage your requests:</b> To attend and manage your requests to us.</li>

        </ul>

        <p className='accordion-body'><b>We may share your personal information in the following situations:</b></p>
        <ul className='accordion-body ps-3 privacy-list'>
          <li className='accordion-body'><b>With Affiliates: </b>We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our associates and any other subsidiaries, that We control or that are under common control with us.</li>
                    <li className='accordion-body'><b>With Authorized Developers: </b>We may disclose your personal information with Real Estate Regulatory Authority (RERA) registered Developers for further processing as necessary. </li>
          <li className='accordion-body'><b>With Your consent: </b>We may disclose your personal information for any other purpose with your consent.</li>

        </ul>

        <p className='accordion-body'><b>RETENTION OF YOUR PERSONAL DATA</b></p>
        <p className='accordion-body'>We shall retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws). </p>
        

        </div>
        <div className='my-2'>
         <h6 className="terms-title accordion-button">DISCLOSURE OF YOUR PERSONAL DATA</h6>
         <p className='accordion-body'><b>USER'S CONSENT</b></p>
        <p className='accordion-body'>By using the website and/or by providing information to us through this website, the user consents to the collection and use of the information disclosed by the user on the website in accordance with this privacy policy. </p>
       
       <p className='accordion-body'><b>LAW ENFORCEMENT</b></p>
        <p className='accordion-body'>Under certain circumstances, the we may be required to disclose your personal data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).</p>
        
        <p className='accordion-body'><b>OTHER LEGAL REQUIREMENTS</b></p>
        <p className='accordion-body'>The company may disclose your personal data in the good faith belief that such action is necessary to:</p>
        <ul className='accordion-body ps-3 privacy-list'>
          <li className='accordion-body'>Comply with a legal obligation.</li>
          <li className='accordion-body'>Prevent or investigate possible wrongdoing in connection with the service.</li>
        <li className='accordion-body'>Protect the personal safety of users of the service or the public.</li>
          <li className='accordion-body'>Protect against legal liability.</li>

        </ul>

<p className='accordion-body'><b>SECURITY OF YOUR PERSONAL DATA</b></p>
        <p className='accordion-body'>The security of Your Personal Data is important to Us but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.</p>
        
        <p className='accordion-body'><b>CHILDREN'S PRIVACY</b></p>
        <p className='accordion-body'>Our service does not address anyone under the age of 18. We do not knowingly collect personally identifiable information from anyone under the age of 18. If You are a parent or guardian and you are aware that your child has provided us with personal data, please contact us. If we become aware that we have collected personal data from anyone under the age of 18 without verification of parental consent, we take steps to remove that information from our servers.</p>
        
        <p className='accordion-body'><b>CHANGES TO THIS PRIVACY POLICY</b></p>
        <p className='accordion-body'>We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page. You are advised to review this privacy policy periodically for any changes. Changes to this privacy policy are effective when they are posted on this page.</p>
        
        <p className='accordion-body'><b>CONTACT US</b></p>
        <p className='accordion-body'>To request to review, update, or delete your personal information or to otherwise reach us, please submit a request by e-mailing us at <a class="privacy-mail" href="mailto:enquiry@shivalikventures.com">enquiry@shivalikventures.com</a></p>
        
        </div>
      </div>
    </section>
    </Layout>
  );
}

export default PrivacyPolicy



