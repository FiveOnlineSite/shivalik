import axios from 'axios';
import React, { useEffect, useState } from 'react'

const OfficeLocation = () => {

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

    <>
    {contactContent && (
  <div className=''>
     
       <iframe className='map'
      src={contactContent.map_link}
      width="100%"
      height="450"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"></iframe>
     
  </div>
      )}
    </>
  )
}

export default OfficeLocation