// import React, { useState } from 'react';
// import emailjs from 'emailjs-com';
// // import styles from '../EnquireForm.module.css'; // adjust if needed

// import styles from '../../style/Common.module.css';
// import { ArrowRightAlt } from '@mui/icons-material';
// const EnquireForm = () => {
    
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//   });

//   const handleFormSubmit = (e) => {
//     e.preventDefault();

//     const pageName = window.location.pathname.split('/').filter(Boolean).pop() || 'home';
//     const pageNameTitle = 'Gulmohar Avenue 1BHK and 2BHK Plan';

//     const templateParams = {
//       name: formData.name,
//       email: formData.email,
//       phone: formData.phone,
//       page: pageName,
//       subject: `${pageNameTitle || 'Unknown Page'}`,
//     };

//     emailjs
//       .send(
//         'service_7yt4sc5', // replace with actual
//         'template_cwwiuc9', // replace with actual
//         templateParams,
//         'zt1IjjWWqmHaJnJ_O' // replace with actual
//       )
//       .then((response) => {
//         console.log('Email sent successfully!', response);
//         // your logic after success
//       })
//       .catch((err) => {
//         console.error('Failed to send email:', err);
//       });
//   };

//   return (
//     <div>
//       <form onSubmit={handleFormSubmit}>
//         <input
//           type="text"
//           placeholder="Name"
//           value={formData.name}
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           required
//         />
//         <input
//           type="tel"
//           placeholder="Phone"
//           value={formData.phone}
//           onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//           required
//         />
//         <button
//           type="submit"
//           className={`${styles.commonBlueButton} ${styles.enquireNowBtn} ${styles.enquireNowBtn2} border-0 mt-3`}
//         >
//           Submit <ArrowRightAlt />
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EnquireForm;


import React, { useState, useEffect } from 'react';
import styles from '../../style/Common.module.css';
import { ArrowRightAlt } from '@mui/icons-material';
import emailjs from 'emailjs-com';
import axios from 'axios';
import { useParams } from 'react-router-dom';



const BlueprintTabs = () => {
    const [plans, setPlans] = useState([]);
const [planTitles, setPlanTitles] = useState([]);
const {name} = useParams()
  const [activeTab, setActiveTab] = useState(null);
const [activeSubTab, setActiveSubTab] = useState(null);
const [unlocked, setUnlocked] = useState({});
  const [formVisible, setFormVisible] = useState(false);


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

   useEffect(() => {
  const fetchProjectSitePlan = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.get(`${apiUrl}/api/site-plan/project/${name}`);

      // Default to [] if SitePlan is missing
      const sitePlans = response.data?.SitePlan || [];

      if (sitePlans.length === 0) {
        console.warn("No site plans found for this project.");
        return;
      }

      // Transform into plans + titles
      const newPlans = {};
      const newTitles = {};

      sitePlans.forEach(plan => {
        const bhk = plan.site_plan.replace(/\s+/g, ""); // safe "1 BHK" -> "1BHK"

        newPlans[bhk] = {
          [`${bhk} Floor Plan`]: plan.floor_plan?.[0]?.filepath || "",
          [`${bhk} Unit Plan`]: plan.unit_plan?.[0]?.filepath || "",
        };

        newTitles[bhk] = {
          [`${bhk} Floor Plan`]: `${plan.site_plan} Floor Plan` || `${bhk} Floor Plan`,
          [`${bhk} Unit Plan`]: `${plan.site_plan} Unit Plan` || `${bhk} Unit Plan`,
        };
      });

      setPlans(newPlans);
      setPlanTitles(newTitles);

      // set defaults
      const firstBhk = Object.keys(newPlans)[0];
      if (firstBhk) {
        setActiveTab(firstBhk);
        setActiveSubTab(Object.keys(newPlans[firstBhk])[0]);
      }

    } catch (error) {
      console.error("Error fetching project siteplan:", error);
    }
  };

  fetchProjectSitePlan();
}, [name]);

  const handleUnlock = () => {
    setFormVisible(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const pageName = window.location.pathname.split('/').filter(Boolean).pop() || 'home';
    const pageNameTitle = 'Gulmohar Avenue 1BHK and 2BHK Plan';
    
    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      page: pageName,
      subject: `${pageNameTitle || 'Unknown Page'}`, 
    };

    emailjs
      .send(
        'service_7yt4sc5',     // replace with actual
      'template_cwwiuc9',    // replace with actual
      templateParams,
      'zt1IjjWWqmHaJnJ_O'      // replace with actual
      )
      .then((response) => {
        console.log('Email sent successfully!', response);

        // Unlock all BHKs and sub-tabs
        const updated = {};
        Object.keys(plans).forEach((bhk) => {
          Object.keys(plans[bhk]).forEach((subTab) => {
            updated[`${bhk}-${subTab}`] = true;
          });
        });

        setUnlocked(updated);
        sessionStorage.setItem('blueprintUnlocked', JSON.stringify(updated));
        setFormVisible(false);
      })
      .catch((err) => {
        console.error('Failed to send email:', err);
      });
  };

  const isUnlocked = unlocked[`${activeTab}-${activeSubTab}`];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--x', `${x}%`);
    e.currentTarget.style.setProperty('--y', `${y}%`);
  };

  return (
    <div className="blueprint-wrapper">
      {/* Horizontal Tabs */}
      <div className="horizontal-tabs">
        {Object.keys(plans).map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? 'active' : ''}
            onClick={() => {
              setActiveTab(tab);
              setActiveSubTab(Object.keys(plans[tab])[0]);
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Layout */}
      <div className="blueprint-body">
        {/* Vertical Tabs */}
        {activeTab && plans[activeTab] && (
        <div className="vertical-tabs">
          {Object.keys(plans[activeTab]).map((subTab) => (
            <button
              key={subTab}
              className={activeSubTab === subTab ? 'active' : ''}
              onClick={() => setActiveSubTab(subTab)}
            >
              {planTitles[activeTab][subTab]}
            </button>
          ))}
        </div>
        )}

        {/* Image + Title Section */}
        {activeTab && activeSubTab && (
        <div className="blueprint-right-section">
          <div className={`blueprint-image-wrapper ${isUnlocked ? 'unblurred' : 'blurred'}`}>
            <div className="zoom-wrapper mb-3" onMouseMove={handleMouseMove}>
              <img
                src={plans[activeTab][activeSubTab]}
                alt={planTitles[activeTab][activeSubTab]}
                className="blueprint-image zoom-target"
              />
              {!isUnlocked && (
                <button className="enquire-btn" onClick={handleUnlock}>
                  Enquire Now
                </button>
              )}
            </div>
          </div>
          <div className="blueprint-title-right">
            <h4>{planTitles[activeTab][activeSubTab]}</h4>
          </div>
        </div>
      )}
      </div>

      {/* Enquiry Form Popup */}
      {formVisible && (
        <div className="popup-form-overlay">
          <div className="popup-form">
            <button className="close-icon" onClick={() => setFormVisible(false)}>×</button>
            <h3>Enquiry Form</h3>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
              <button
                type="submit"
                className={`${styles.commonBlueButton} ${styles.enquireNowBtn} ${styles.enquireNowBtn2} border-0 mt-3`}
              >
                Submit <ArrowRightAlt />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlueprintTabs;
