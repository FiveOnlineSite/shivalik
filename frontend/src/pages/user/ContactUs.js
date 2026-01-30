import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '../../components/templates/Layout';
import InnerBanner from '../../components/atoms/InnerBanner';
import GradientLine from '../../components/atoms/GradientLine';
import ContactForm from '../../components/molecules/ContactForm';
import OfficeLocation from '../../components/atoms/OfficeLocation';
import styles from '../../style/Common.module.css';
import axios from 'axios';
import MetaDataComponent from "../../components/atoms/MetaDataComponent"

const ContactUs = () => {

    const location = useLocation();
    const currentPath = location.pathname;

    const [contactContent, setContactContent] = useState(null)

     useEffect(() => {
        const fetchContactContent = async () => {
          try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await axios.get(`${apiUrl}/api/contact-content`);
            const ContactContentData = response.data.ContactContents[0];
    
            setContactContent(ContactContentData);
    
            console.log("Fetched alt:", ContactContentData.social_media[0]?.alt);
            console.log("Fetched ContactContent:", ContactContentData.social_media);
          } catch (error) {
            console.error("Error fetching ContactContent:", error);
          }
        };
    
        fetchContactContent();
      }, []);
    
  return (
   <Layout>
      <MetaDataComponent/>

    {/* Contact us BANNER SECTION START */}
        <InnerBanner page={currentPath}/>
      {/* Contact us BANNER SECTION CLOSE */}
     <section className='cont-sec'>
        <div className='container'>
            <div className='row'>
                <div className='col-lg-7'>
                    <div>
                        <div className='cont-head'>
                            <GradientLine />
                            <h2>Contact Us</h2>
                        </div>
                                {contactContent && (
                        <div className='row'>
                    
                                <div className='col-lg-6'>
                                <div className='cont-rt'>
                                    <h5>Call</h5>
                                    <div dangerouslySetInnerHTML={{__html: contactContent.phone_number}}></div>
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                 <div className='cont-rt'>
                                    <h5>Registered Office</h5>
                                    <div dangerouslySetInnerHTML={{__html: contactContent.office_address}}></div>
                                 </div>
                            </div>
                            <div className='col-lg-6'>
                                 <div className='cont-rt'>
                                    <h5>Email</h5>
                                   <div dangerouslySetInnerHTML={{__html: contactContent.emails}}></div>
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                 <div className='cont-rt'>
                                     <h5>Social Network</h5>
                                      <div className={styles.socialIcon}>
                                        <ul className='d-flex'>
                                        {contactContent.social_media && contactContent.social_media.map((socialMedia) => (

                                            <li key={socialMedia._id}>
                                                <a href={socialMedia.link} className='icon-you-one' rel='noreferrer' target='_blank'>
                                                {socialMedia.icon?.[0]?.filepath && (
                                                    <img src={socialMedia.icon?.[0]?.filepath} alt={socialMedia.alt} width="100px"/>
                                                )}
                                                </a>
                                            </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                         )}
                    </div>
                </div>
                <div className='col-lg-5'>
                    <ContactForm />
                </div>
            </div>
    </div>
    <div className='container-fluid'>
            <div className='map-one'>
                <OfficeLocation />
            </div>
    </div>
            

       
    </section>
   </Layout>
  )
}

export default ContactUs
