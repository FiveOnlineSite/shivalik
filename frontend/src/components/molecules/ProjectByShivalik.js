// components/ProjectCard.jsx
import React from 'react';
import styles from '../../style/Common.module.css';
import { ArrowRightAlt } from '@mui/icons-material';

const ProjectByShivalik = ({
  item, index
}) => {
  return (
    <div className='col-lg-6 mb-5'>
      <div className={`${styles.projectPicture} position-relative mb-3`}>
        {item.image?.[0]?.filepath && (
        <img src={item.image?.[0]?.filepath} width='100%' alt={item.alt} />
        )}

{item.disclaimer && (
<span className='overlayText'>
           {item.disclaimer}
          </span>
)}
          

        {item.banner_alt && (
    <div className={styles.projectButton}>
                     <a
                       href={`/project/${item.title
                      .toLowerCase()
                      .trim()
                      .replace(/&/g, "and")
                      .replace(/['’]/g, "")   // remove apostrophes
                      .replace(/\//g, "-")
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-+|-+$/g, "")
                                }`}
                       className={styles.commonBlueButton}
                     >
                      View More <ArrowRightAlt />
                     </a>
    </div>
  )}
      </div>
      <div className={styles.projectDetails}>
        <h3>{item.title}</h3>
        <div className='row align-items-center'>
          <div className='col-lg-8'>
            <h5><strong>Location</strong></h5>
            <p>{item.location}</p>
          </div>
          <div className='col-lg-4'>
            <span className={`${styles.projectTag} mb-3 bg-blue text-center`}>
              {/* {new Date(
                            item.completion_date
                          ).toLocaleDateString("en-US", {
                         
                            year: "numeric",
                          })
                          } */}
                          {item.completion_date}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectByShivalik;
