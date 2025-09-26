import React, { useRef,useState } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MessageSquare, Phone } from 'react-feather';
import { ArrowRightAlt } from '@mui/icons-material';
import styles from '../../style/Common.module.css';
import SideNav from '../atoms/SideNav';


const HeaderElements = () => {
 const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email format';

    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';

    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!validate()) return;

    emailjs
      .sendForm(
        'service_tdz29fc', // Replace with your EmailJS service ID
        'template_jh8juy6', // Replace with your EmailJS template ID
        form.current,
        'mgxBoQVq-3JhWvMuD' // Replace with your EmailJS public key
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success('Your enquiry has been sent successfully!');
          form.current.reset();
          setFormData({ name: '', email: '', phone: '', message: '' });
          setErrors({});

          const modalElement = document.getElementById('exampleModal');
          const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
          if (modalInstance) modalInstance.hide();
        },
        (error) => {
          console.log(error.text);
          toast.error('Something went wrong. Please try again.');
        }
      );
  };

 
  return (
    <ul className='nav-header'>
        <li className='d-lg-block d-none'><a href='about-us'>About Us</a></li>
        <li className='d-lg-block d-none'><a href='projects'>Our Projects</a></li>
        <li><a type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className={styles.feIcon}><MessageSquare color='white' /></a></li>
          
      
    
         {/* Modal Enquiry Form */}
      <div className="modal fade enquirecustom" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Enquire Now</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form ref={form} onSubmit={sendEmail} className='enquire_now_form' noValidate>
                <div className="mb-3 pb-1">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
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
                  ></textarea>
                  {errors.message && <small className="text-danger">{errors.message}</small>}
                </div>

                <button type="submit" className={`${styles.commonBlueButton} ${styles.enquireNowBtn} border-0`}>
                  Submit <ArrowRightAlt />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} />
      


      {/* modal popup enquiry */}
        <li><a href='tel:022 62727777' className={styles.feIcon}><Phone color='white' /></a></li>
        <li><a href='https://wa.me/8291969925?text=Hi, I have been redirected from your website. I would like to understand your services.&utm_source=website&utm_medium=chat&utm_campaign=contact_us' target='_blank'><img src='images/whatsapp.svg' /></a></li>
        <li>
        <SideNav />
        </li>
    </ul>
  )
}

export default HeaderElements
