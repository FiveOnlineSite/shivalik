// components/ProjectCard.jsx
import React from 'react';
import styles from '../../style/Common.module.css';

const ProjectByPromoters = ({
  image,
  title,
  location,
  tag,
  buttonElement // Full JSX button (e.g., <a>...</a>) passed from parent
}) => {
  return (
    <div className='col-lg-6 mb-5'>
      <div className={`${styles.projectPicture} position-relative mb-3`}>
        <img src={image} width='100%' alt={title} />
        {buttonElement && (
    <div className={styles.projectButton}>
      {buttonElement}
    </div>
  )}
      </div>
      <div className={styles.projectDetails}>
        <h3>{title}</h3>
        <div className='row align-items-center'>
          <div className='col-lg-8'>
            <h5><strong>Location</strong></h5>
            <p>{location}</p>
          </div>
          <div className='col-lg-4'>
            <span className={`${styles.projectTag} mb-3 bg-blue text-center`}>
              {tag}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectByPromoters;
