import React, { useEffect, useState } from 'react';
import styles from '../../style/Common.module.css';
import { ArrowRightAlt } from '@mui/icons-material';
import emailjs from 'emailjs-com';

const plans = [
  {
    title: 'Floor plan',
    image: 'images/prabhatDarshan/top-apartments-mumbai-prabhat-darshan.jpg',
  },
  {
    title: 'Typical Unit plan',
    image: 'images/prabhatDarshan/affordable-apartments-mumbai-prabhat-darshan.jpg',
  },
];

const BlueprintPD = () => {
   const [activeIndex, setActiveIndex] = useState(0);
  const [formVisible, setFormVisible] = useState(false);
  const [user, setUser] = useState(null); // holds user after "login"
  const [unlocked, setUnlocked] = useState({});

  const currentPlan = plans[activeIndex];
  const isUnlocked = unlocked[activeIndex] || !!user;

  // Load user from localStorage (optional)
  // useEffect(() => {
  //   const storedUser = localStorage.getItem('userInfo');
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);

  const handleUnlock = () => {
    setFormVisible(true);
  };

  const handleFormSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const pageName = 'Prabhat Darshan Floor and Typical Unit Plan';

  const templateParams = {
    name,
    email,
    phone,
    subject: `${pageName || 'Unknown Page'}`,
  };
    emailjs.send(
      'service_7yt4sc5',     // replace with actual
      'template_k8n5yto',    // replace with actual
      templateParams,
      'zt1IjjWWqmHaJnJ_O'      // replace with actual
    )
     .then(() => {
      const userInfo = { name, email, phone };
      setUser(userInfo);
      setUnlocked({ ...unlocked, [activeIndex]: true });
      setFormVisible(false);
    })
    .catch((error) => {
      console.error('EmailJS error:', error);
    });
  };

    const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--x', `${x}%`);
    e.currentTarget.style.setProperty('--y', `${y}%`);
  };
  return (
<div className="blueprint-wrapper">
      <div className="blueprint-body">
        <div className="vertical-tabs">
          {plans.map((plan, index) => (
            <button
              key={index}
              className={activeIndex === index ? 'active' : ''}
              onClick={() => setActiveIndex(index)}
            >
              {plan.title}
            </button>
          ))}
        </div>

        <div className="blueprint-right-section">
          <div className={`blueprint-image-wrapper ${isUnlocked ? 'unblurred' : 'blurred'}`}>
            <div className="zoom-wrapper mb-3" onMouseMove={handleMouseMove}>
              <img
                src={currentPlan.image}
                alt={currentPlan.title}
                className="blueprint-image zoom-target"
              />
              {!isUnlocked && !user && (
                <button className="enquire-btn" onClick={handleUnlock}>
                  Enquire Now
                </button>
              )}
            </div>
          </div>
          <div className="blueprint-title-right">
            <h4>{currentPlan.title}</h4>
          </div>
        </div>
      </div>

      {formVisible && (
        <div className="popup-form-overlay">
          <div className="popup-form">
            <button className="close-icon" onClick={() => setFormVisible(false)}>×</button>
            <h3>Enquiry Form</h3>
            <form onSubmit={handleFormSubmit}>
              <input name="name" type="text" placeholder="Name" required />
              <input name="email" type="email" placeholder="Email" required />
              <input name="phone" type="tel" placeholder="Phone" required />
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

export default BlueprintPD;
