import React, { useState, useRef, useEffect } from 'react';
import styles from '../../style/Common.module.css';
import { ArrowRightAlt } from '@mui/icons-material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

const BrochureModal = ({ show, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [brochureLink, setBrochureLink] = useState('');
  const { name } = useParams();
  const formRef = useRef();

  // OTP states
  const [otp, setOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);

  // Load environment variables
  const API_URL = process.env.REACT_APP_API_URL;
  const API_TOKEN = "68|ncbSSlsNVuTuoPIyYMSFKXZ6UWXMrkgXXWTALQnH008f96ac";
  const TEMPLATE_ID = "1707175318595098816";
  const ENTITY_ID = "1701159921797802436";

 useEffect(() => {
  const fetchProjectAbout = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/about/project/${name}`);
      const projectData = response.data.about;

      console.log('Project about data:', projectData); // <-- log entire project data

      const project = projectData[0];

      if (project?.brochure?.length > 0) {
        setBrochureLink(project.brochure[0].filepath);
        console.log('Brochure link fetched:', project.brochure[0].filepath);
      } else {
        console.warn('No brochure found for this project.');
      }
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  };

  fetchProjectAbout();
}, [name, API_URL]);


  // Countdown for resend OTP
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

  // Send OTP
  const handleSendOtp = async () => {
    if (!formData.phone || formData.phone.length !== 10) {
      toast.error('Enter a valid 10-digit phone number');
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
        toast.success('OTP sent successfully!');
        setOtpSent(true);
        setTimer(30); // 2 minutes
      } else {
        toast.error(response.data.message || 'Failed to send OTP');
      }
    } catch (err) {
      console.error('OTP Send Error:', err);
      toast.error('Failed to send OTP. Check API token or DLT settings.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = () => {
    if (enteredOtp.trim() === otp.trim()) {
      setOtpVerified(true);
      toast.success('OTP verified successfully!');
    } else {
      toast.error('Invalid OTP entered.');
    }
  };

  // Submit form
  const handleSubmit = async e => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (!otpVerified) {
      toast.error('Please verify OTP before submitting');
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`${API_URL}/api/project-enquiry`, {
        ...formData,
        page: window.location.pathname
      });

      toast.success('Form submitted successfully!');
      
      // After successful form submission
if (brochureLink) {
  try {
    const response = await axios.get(brochureLink, { responseType: 'blob' });
const url = window.URL.createObjectURL(new Blob([response.data]));
const link = document.createElement('a');
link.href = url;
link.setAttribute('download', brochureLink.split('/').pop());
document.body.appendChild(link);
link.click();
link.remove();
window.URL.revokeObjectURL(url);

  } catch (err) {
    console.error('Brochure download failed:', err);
    toast.error('Failed to download brochure.');
  } finally {
    setIsSubmitting(false); // <-- reset submitting state
  }
}


      // Reset
      setFormData({ name: '', email: '', phone: '' });
      setOtp('');
      setEnteredOtp('');
      setOtpSent(false);
      setOtpVerified(false);
      setTimer(0); 
      onClose();

    } catch (err) {
      console.error('Form Submit Error:', err);
      toast.error('Failed to submit form. Please try again.');
    }
  };

  if (!show) return null;

  return (
    <>
      <div className={styles.modalOverlay}>
        <div className={styles.modalBox}>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
          <h3>Download Brochure</h3>

          <form onSubmit={handleSubmit} ref={formRef} className={styles.modalForm}>
            <div className="mb-3">
              <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className="form-control" required/>
              {errors.name && <small className="text-danger">{errors.name}</small>}
            </div>

            <div className="mb-3">
              <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} className="form-control" required />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>

           <div className="mb-3 d-flex gap-2 align-items-center">
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
      type="button"
      onClick={handleSendOtp}
      disabled={isSendingOtp}
      style={{
    cursor: isSendingOtp ? "not-allowed" : "pointer",
    opacity: isSendingOtp ? 0.7 : 1,
  }}
      className={`${styles.commonBlueButton} ${styles.enquireNowBtn} border-0 mt-3`}
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
   {isSubmitting ? 'Submitting...' : 'Submit & Download'} <ArrowRightAlt />
  </button>
)}
          </form>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={2500} />
    </>
  );
};

export default BrochureModal;
