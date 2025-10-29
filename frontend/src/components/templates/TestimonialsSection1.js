// TestimonialSlider.jsx
import React from 'react';
import Slider from 'react-slick';
import TestimonialBox1 from '../molecules/TestimonialBox1';
import styles from '../../style/Common.module.css';

const TestimonialSlider1 = () => {
  return (
    <section id="client" className={`${styles.testimonialSec} testimonials_section_home position-relative pt-5 pb-5`}>

        <TestimonialBox1/>
    </section>

  );
};

export default TestimonialSlider1;
