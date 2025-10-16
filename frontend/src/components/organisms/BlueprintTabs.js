import React, { useState, useEffect, useRef } from 'react';
import styles from '../../style/Common.module.css';
import { ArrowRightAlt } from '@mui/icons-material';

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
  const formRef = useRef();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  
  const [otp, setOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;
  const API_TOKEN = "68|ncbSSlsNVuTuoPIyYMSFKXZ6UWXMrkgXXWTALQnH008f96ac";
  const TEMPLATE_ID = "1707175318595098816";
  const ENTITY_ID = "1701159921797802436";

   useEffect(() => {
  const fetchProjectSitePlan = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.get(`${apiUrl}/api/site-plan/project/${name}`);

      const sitePlans = response.data?.SitePlan || [];

      if (sitePlans.length === 0) {
        console.warn("No site plans found for this project.");
        return;
      }

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

   useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Validation
  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Invalid email';
    if (!formData.phone.trim()) errors.phone = 'Phone is required';
    return errors;
  };

 const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

  const handleSendOtp = async () => {
    if (!formData.phone || formData.phone.length !== 10) {
      return;
    }

    const newOtp = generateOtp();
    setOtp(newOtp);
    setIsSendingOtp(true);

    try {
      const message = `Dear User Your OTP code for Shivalik Ventures is ${newOtp} DO NOT disclose it to anyone.`;
      const apiUrl = `https://dtasit.ai/backend/api/http/sms/send?recipient=91${formData.phone}&sender_id=SHIVAK&message=${encodeURIComponent(message)}&api_token=${API_TOKEN}&dlt_template_id=${TEMPLATE_ID}&type=plain&entity_id=${ENTITY_ID}`;
      
      const response = await axios.get(apiUrl);
      if (response.data.status === 'success') {
        setOtpSent(true);
        setTimer(30);
      } 
      
    } catch (err) {
      console.error('OTP Send Error:', err);
     } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = () => {
    if (enteredOtp.trim() === otp.trim()) {
      setOtpVerified(true);
     } 
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (!otpVerified) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API_URL}/api/project-enquiry`, {
        ...formData,
        page: window.location.pathname
      });

      console.log('Email sent successfully!', response);

        const updated = {};
        Object.keys(plans).forEach((bhk) => {
          Object.keys(plans[bhk]).forEach((subTab) => {
            updated[`${bhk}-${subTab}`] = true;
          });
        });

        setUnlocked(updated);
        sessionStorage.setItem('blueprintUnlocked', JSON.stringify(updated));
        setFormVisible(false);

      setFormData({ name: '', email: '', phone: '' });
      setOtp('');
      setEnteredOtp('');
      setOtpSent(false);
      setOtpVerified(false);
      setTimer(0); 

    } catch (err) {
      console.error('Form Submit Error:', err);
     }
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
      {Object.keys(plans).length > 1 && (
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
      )}

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
            <form onSubmit={handleSubmit} ref={formRef} className={styles.modalForm}>
            <div>
              <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className="form-control" required/>
              {errors.name && <small className="text-danger">{errors.name}</small>}
            </div>

            <div>
              <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} className="form-control" required />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>

           <div className="d-flex gap-2 align-items-center">
  {/* Phone input */}
  <input
    type="tel"
    name="phone"
    placeholder="Phone"
    value={formData.phone}
    onChange={handleChange}
    className="form-control"
    required
  />
  </div>

  {/* Show Send OTP only if OTP not sent */}
  {!otpSent && (
    <button
      onClick={handleSendOtp}
      disabled={isSendingOtp}
      style={{
    cursor: isSendingOtp ? "not-allowed" : "pointer",
    opacity: isSendingOtp ? 0.7 : 1,
  }}
          className={`${styles.commonBlueButton} ${styles.enquireNowBtn} ${styles.enquireNowBtn2} border-0 mt-3`}
        >
      {isSendingOtp ? 'Sending...' : 'Send OTP'} <ArrowRightAlt />
    </button>
  )}

    {otpSent && !otpVerified && (
    <div>
      <input type="text" name="otp" placeholder="Enter OTP" value={enteredOtp} onChange={e => setEnteredOtp(e.target.value)} className="form-control" />
      <div>
        <p className="text-primary mt-4" style={{ cursor: timer <= 0 ? 'pointer' : 'default', fontSize: "15px" }}
            onClick={() => timer <= 0 && handleSendOtp()}>
        {timer > 0 ? `Resend in ${timer}s` : 'Resend OTP'}
      </p>
      <button
  type="button"
  onClick={handleVerifyOtp}
  disabled={isSubmitting}
  style={{
    cursor: isSubmitting ? "not-allowed" : "pointer",
    opacity: isSubmitting ? 0.7 : 1,
  }}
  className={`${styles.commonBlueButton} ${styles.enquireNowBtn} border-0 mt-3`}
>
  Verify OTP <ArrowRightAlt />
</button>
      </div>
      

    </div>
  )}
{/* Show Submit & Download only if OTP verified */}
{otpVerified && (
  <button
    type="submit"
    className={`${styles.commonBlueButton} ${styles.enquireNowBtn} border-0 mt-3`}
    disabled={isSubmitting}
    style={{
    cursor: isSubmitting ? "not-allowed" : "pointer",
    opacity: isSubmitting ? 0.7 : 1,
  }}
  >
   {isSubmitting ? 'Submitting...' : 'Submit'} <ArrowRightAlt />
  </button>
)}
          </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlueprintTabs;
