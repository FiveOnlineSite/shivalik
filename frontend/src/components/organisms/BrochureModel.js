import React, { useState } from 'react';
import styles from '../../style/Common.module.css';
import { ArrowRightAlt } from '@mui/icons-material';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const BrochureModal = ({ show, onClose, pageName, brochureUrl }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});
  const [projectAbout, setProjectAbout] = useState([])
  const {name} = useParams()
  
  useEffect(() => {
  
      const fetchProjectAbout = async () => {
        try {
          const apiUrl = process.env.REACT_APP_API_URL;
          const response = await axios.get(`${apiUrl}/api/about/title/${name}`);
          const ProjectAboutData = response.data.about;
          console.log("about", ProjectAboutData)
          setProjectAbout(ProjectAboutData);
        } catch (error) {
          console.error("Error fetching project about:", error);
        }
      };
  
      fetchProjectAbout();
    }, [name]);

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
        'service_tdz29fc',
        'template_xtwkw7j',
        templateParams,
        'mgxBoQVq-3JhWvMuD'
      )
      .then(() => {
        toast.success('Brochure sent successfully!');

        // Download brochure
        const link = document.createElement('a');
        link.href = './images/pdf/gulmohar-avenue-brochure.pdf';
        link.download = 'gulmohar-avenue-brochure.pdf';
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
  );
};

export default BrochureModal;
