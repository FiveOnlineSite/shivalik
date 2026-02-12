import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { ArrowRightAlt } from '@mui/icons-material';
import styles from '../../style/Common.module.css';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactForm = () => {

   const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [successModal, setSuccessModal] = useState("");
    
  const formRef = useRef();

   const [otp, setOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [isAgreed, setIsAgreed] = useState(false);

const API_URL = process.env.REACT_APP_API_URL;
  const API_TOKEN = "68|ncbSSlsNVuTuoPIyYMSFKXZ6UWXMrkgXXWTALQnH008f96ac";
  const TEMPLATE_ID = "1707175318595098816";
  const ENTITY_ID = "1701159921797802436";

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
    if (!formData.phone.trim()) errors.phone = 'phone is required';
    return errors;
  };

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

  const handleSendOtp = async () => {
    // if (!formData.phone || formData.phone.length !== 10) {
    // if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'phone must be 10 digits';
    //   toast.error('Enter a valid 10-digit phone number');
    //   return;
    // }
if (!isAgreed) {
  toast.error("Please agree to the Terms & Conditions before sending OTP");
  return;
}

    if (!/^\d{10}$/.test(formData.phone)) {
  setErrors(prev => ({ ...prev, phone: 'Contact must be 10 digits' }));
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
    if (!isAgreed) {
  toast.error("Please agree to the Terms & Conditions before verifying OTP");
  return;
}

    if (enteredOtp.trim() === otp.trim()) {
      setOtpVerified(true);
      toast.success('OTP verified successfully!');
    } else {
      toast.error('Invalid OTP entered.');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAgreed) {
  toast.error("Please agree to the Terms & Conditions before submitting the form");
  return;
}

    const validationErrors = validate();
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length > 0) return;

    if (!otpVerified) {
      toast.error('Please verify OTP before submitting');
      return;
    }

    setIsSubmitting(true);

   try {
      const response = await axios.post(`${API_URL}/api/contact-response`, {
        ...formData,
        page: window.location.pathname
      });

        setSuccessModal("Contact form submitted successfully!");
  
              setFormData({ name: '', email: '', phone: '', message: '' });
      setOtp('');
      setEnteredOtp('');
      setOtpSent(false);
      setOtpVerified(false);
      setIsAgreed(false)
      setTimer(0); 
        formRef.current?.reset();


      } catch (err) {
        console.error('Failed to send email:', err);
                setSuccessModal("Failed to submit the form. Please try again.");

      } 
      finally {
    setIsSubmitting(false); // <-- reset submitting state
        setTimeout(() => setSuccessModal(""), 3000);
  }
    }

  return (
    <div className='contactFor'>
      <div className="contFor">
        <div className='contFor-head'>
          <h5>Get in Touch</h5>
          <p>Your dream home is just a conversation away.</p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} noValidate>
          <div className="mb-5">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <small className="text-danger">{errors.name}</small>}
          </div>

          <div className="mb-5">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </div>

          <div className="mb-5">
            <input
              type="text"
              name="phone"
              className="form-control"
              placeholder="Contact"
              value={formData.phone}
              onChange={handleChange}
              onPaste={(e) => {
                      const paste = e.clipboardData.getData('text');
                      if (!/^\d{1,10}$/.test(paste)) {
                        e.preventDefault();
                      }
                    }}
                    inputMode="numeric"
                    maxLength="10"
                    required
            />
            {errors.phone && <small className="text-danger">{errors.phone}</small>}
          </div>

          <div className="mb-5">
            <textarea
              name="message"
              className="form-control"
              placeholder="Message"
              rows="3"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div class="form-check"><input class="form-check-input border border-secondary" id="agreeCheck" type="checkbox" name="agree" required checked={isAgreed}
    onChange={(e) => setIsAgreed(e.target.checked)}/><label class="form-check-label label-one" htmlFor="agreeCheck"><p>By submitting an enquiry, I authorize Shivalik Ventures to contact me via Call, SMS, RCS, WhatsApp, Email, or any other relevant medium. Also by submitting, I agree to the <a class="sa-txt" href="/terms-and-conditions" data-discover="true"> Terms &amp; Conditions </a>and<a class="sa-txt" href="/privacy-policy" data-discover="true"> Privacy Policy</a>.</p></label></div>

           {!otpSent && (
    <button
  type="button"
  onClick={handleSendOtp}
  disabled={isSendingOtp}
  style={{
    cursor: isSendingOtp || !isAgreed ? "not-allowed" : "pointer",
    opacity: isSendingOtp ? 0.7 : 1,
  }}
  className={`${styles.commonBlueButton} ${styles.enquireNowBtn} border-0 mt-3`}
>
  {isSendingOtp ? "Sending..." : "Send OTP"} <ArrowRightAlt />
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

{otpVerified && (
  <div className="mb-5">
    <button
  type="submit"
  disabled={isSubmitting}
  style={{
    cursor: isSubmitting || !isAgreed ? "not-allowed" : "pointer",
    opacity: isSubmitting ? 0.7 : 1,
  }}
  className={styles.commonBlueButton}
>
  {isSubmitting ? "Submitting..." : "Submit"} <ArrowRightAlt />
</button>

  </div>
)}



          {successModal && (
                  <div className={`alert ${successModal.includes("Failed") ? "alert-danger" : "alert-success"} mt-3`}>
                    {successModal}
                  </div>
                )}
         </form>
      </div>
    </div>
  );
};

export default ContactForm;
