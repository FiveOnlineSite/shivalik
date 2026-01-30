import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MessageSquare, Phone } from 'react-feather';
import { ArrowRightAlt } from '@mui/icons-material';
import styles from '../../style/Common.module.css';
import SideNav from '../atoms/SideNav';
import axios from "axios"

const HeaderElements = () => {
 const formRef = useRef();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [successModal, setSuccessModal] = useState("");
    
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
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Validation
  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
  if (!formData.message.trim()) errors.message = 'Message is required';

    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Invalid email';
    if (!formData.phone.trim()) errors.phone = 'Phone is required';
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

    const errors = {};
  if (!formData.name.trim()) errors.name = 'Name is required';
  if (!formData.email.trim()) errors.email = 'Email is required';
  if (!formData.message.trim()) errors.message = 'Message is required';

  else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Invalid email';
  if (!formData.phone.trim()) errors.phone = 'Phone is required';
  else if (!/^\d{10}$/.test(formData.phone)) errors.phone = 'Phone must be 10 digits';

  setErrors(errors);

  if (Object.keys(errors).length > 0) {
    toast.error("Please fill all required fields correctly before sending OTP");
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
    if (enteredOtp.trim() === otp.trim()) {
      setOtpVerified(true);
      toast.success('OTP verified successfully!');
    } else {
      toast.error('Invalid OTP entered.');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    
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

      toast.success('Your enquiry has been sent sucessfully');

              setFormData({ name: '', email: '', phone: '', message: '' });
      setOtp('');
      setEnteredOtp('');
      setOtpSent(false);
      setOtpVerified(false);
      setTimer(0); 
          setErrors({});

        formRef.current?.reset();
         const modalElement = document.getElementById('exampleModal');
          const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
          if (modalInstance) modalInstance.hide();
        

      } catch (err) {
        console.error('Failed to send email:', err);
          toast.error('Something went wrong. Please try again.');

      } 
      finally {
    setIsSubmitting(false); // <-- reset submitting state
        
  }
    }
 
  return (
    <ul className='nav-header'>
        <li className='d-lg-block d-none'><a href='/about-us'>About Us</a></li>
        <li className='d-lg-block d-none'><a href='/projects'>Our Projects</a></li>
        <li><a type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className={styles.feIcon}><MessageSquare color='white' /></a></li>
          
      
    
         {/* Modal Enquiry Form */}
      <div className="modal fade enquirecustom" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title fs-5" id="exampleModalLabel">Enquire Now</h3>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form ref={formRef} onSubmit={handleSubmit} className='enquire_now_form' noValidate>
                <div className="mb-3 pb-1">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  {errors.name && <small className="text-danger">{errors.name}</small>}
                </div>

                <div className="mb-3 pb-1">
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

                <div className="mb-3 pb-1">
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) => {
                      const input = e.target.value;
                      if (/^\d{0,10}$/.test(input)) {
                        setFormData({ ...formData, phone: input });
                      }
                    }}
                    onPaste={(e) => {
                      const paste = e.clipboardData.getData('text');
                      if (!/^\d{1,10}$/.test(paste)) {
                        e.preventDefault();
                      }
                    }}
                    required
                    inputMode="numeric"
                    maxLength="10"
                  />
                  {errors.phone && <small className="text-danger">{errors.phone}</small>}
                </div>

                <div className="mb-3 pb-1">
                  <textarea
                    name="message"
                    className="form-control"
                    rows="3"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>




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
    cursor: isSubmitting ? "not-allowed" : "pointer",
    opacity: isSubmitting ? 0.7 : 1,
  }}
  className={styles.commonBlueButton}
>
  {isSubmitting ? "Submitting..." : "Submit"} <ArrowRightAlt />
</button>

  </div>
)}

              </form>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} />
      


      {/* modal popup enquiry */}
        <li><a href='tel:022 62727777' className={styles.feIcon}><Phone color='white' /></a></li>
        <li><a href='https://wa.me/8291969925?text=Hi, I have been redirected from your website. I would like to understand your services.&utm_source=website&utm_medium=chat&utm_campaign=contact_us' target='_blank'><img src='/images/whatsapp.svg' /></a></li>
        <li>
        <SideNav />
        </li>
    </ul>
  )
}

export default HeaderElements
