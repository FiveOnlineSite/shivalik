import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { ArrowRightAlt } from '@mui/icons-material';
import styles from '../../style/Common.module.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contact: '',
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const formRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'contact') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 10) {
        setFormData(prev => ({ ...prev, [name]: cleaned }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!emailRegex.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!/^\d{10}$/.test(formData.contact)) newErrors.contact = 'Contact must be 10 digits';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setSuccessMsg('');
    setErrorMsg('');

    if (Object.keys(validationErrors).length === 0) {
      emailjs.sendForm(
        'service_bfwdb21',     // Replace with your Service ID
        'template_jh8juy6',    // Replace with your Template ID
        formRef.current,
        'mgxBoQVq-3JhWvMuD'      // Replace with your Public Key
      ).then(() => {
        setSuccessMsg('✅ Message sent successfully!');
        setErrorMsg('');
        setFormData({ fullName: '', email: '', contact: '' });
        setErrors({});
      }).catch((err) => {
        console.error('Failed to send email:', err);
        setErrorMsg('❌ Failed to send message. Please try again.');
        setSuccessMsg('');
      });
    }
  };

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
              name="fullName"
              className="form-control"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <small className="text-danger">{errors.fullName}</small>}
          </div>

          <div className="mb-5">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </div>

          <div className="mb-5">
            <input
              type="text"
              name="contact"
              className="form-control"
              placeholder="Contact"
              value={formData.contact}
              onChange={handleChange}
            />
            {errors.contact && <small className="text-danger">{errors.contact}</small>}
          </div>

          <div className="mb-5">
            <a className={styles.commonBlueButton} href='#'>Submit <ArrowRightAlt /></a>
          </div>

          {successMsg && <div className="text-success">{successMsg}</div>}
          {errorMsg && <div className="text-danger">{errorMsg}</div>}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
