// TestimonialSlider.jsx
import React from 'react';
import Slider from 'react-slick';
import TestimonialBox from '../molecules/TestimonialBox';
import styles from '../../style/Common.module.css';

const TestimonialSlider = () => {
  return (
    <section id="client" className={`${styles.testimonialSec} testimonials_section_home position-relative pt-5 pb-5`}>
        <TestimonialBox/>
    </section>

  );
};

export default TestimonialSlider;
