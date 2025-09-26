import React, { useState } from 'react';
import styles from '../../style/Common.module.css';
import { ArrowRightAlt } from '@mui/icons-material';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const BrochureModelPD = ({ show, onClose, pageName }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});

  // Form field change handler
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Validation function
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }

    return newErrors;
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const templateParams = {
      user_name: formData.name,
      user_email: formData.email,
      page_name: pageName || 'Unknown Page',
    };

    emailjs
      .send(
        'service_tdz29fc',     // 🔁 replace with your actual EmailJS service ID
        'template_xtwkw7j',    // 🔁 replace with your EmailJS template ID
        templateParams,
        'mgxBoQVq-3JhWvMuD'      // 🔁 replace with your EmailJS public API key
      )
       .then(() => {
        toast.success('Brochure sent successfully!');

        // Download brochure
        const link = document.createElement('a');
        link.href = './images/pdf/prabhat-darshan-brochure.pdf';
        link.download = 'prabhat-darshan-brochure.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setFormData({ name: '', email: '' }); // Reset form
        setErrors({});
        onClose(); // Close modal
      })
      .catch((error) => {
        console.error('Email send failed:', error);
        toast.error('Failed to send email. Please try again.');
      });
  };
  if (!show) return null;

  return (
    <>
  <div className={styles.modalOverlay}>
        <div className={styles.modalBox}>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
          <h3>Download Brochure</h3>
          <form onSubmit={handleSubmit} className={styles.modalForm}>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
              />
              {errors.name && <small className="text-danger">{errors.name}</small>}
            </div>

            <div className="mb-3">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
              />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>

            <button
              type="submit"
              className={`${styles.commonBlueButton} ${styles.enquireNowBtn} border-0 mt-3`}
            >
              Submit & Download <ArrowRightAlt />
            </button>
          </form>
        </div>
      </div>

      {/* Toast container */}
      <ToastContainer position="top-center" autoClose={2500} />
    </>
  )
}

export default BrochureModelPD;