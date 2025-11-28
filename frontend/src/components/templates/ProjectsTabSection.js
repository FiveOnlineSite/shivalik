import React from 'react';
import styles from '../../style/Common.module.css';
import GradientLine from '../atoms/GradientLine';
import { ArrowRightAlt } from '@mui/icons-material';
import ShivalikProjectList from '../organisms/ShivalikProjectList';
import ProjectByPromoters from '../molecules/ProjectByPromoters';
import PromotersProjectList from '../organisms/PromotersProjectList';
import axios from 'axios';
import { use } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const ProjectsTabSection = () => {
    
   const [shivalikHero, setShivalikHero] = useState(null);
   const [shivalikList, setShivalikList] = useState([]);
   
   const [promotersList, setPromotersList] = useState([]);
   
    useEffect(() => {
      const fetchProject = async () => {
        try {
          const apiUrl = process.env.REACT_APP_API_URL;
          const response = await axios.get(`${apiUrl}/api/project`);
          const all = response.data.Projects;

          // Split by category
      const shivalikItems = all.filter((i) => i.project_category === "Shivalik");
      const promotersItems = all.filter((i) => i.project_category === "Promoters");

      // Sort by sequence
      shivalikItems.sort((a, b) => a.sequence - b.sequence);
      promotersItems.sort((a, b) => a.sequence - b.sequence);

      // Take hero (seq 1) + the rest
      setShivalikHero(shivalikItems[0] || null);
      setShivalikList(shivalikItems.slice(1));

      setPromotersList(promotersItems);
  
       } catch (error) {
          console.error("Error fetching projects:", error);
        } 
      };
  
      fetchProject();
    }, []);


  return (
    <section>
      <div class="container">
  <ul class="nav nav-pills mb-5 justify-content-center" id="pills-tab" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link active position-relative" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Projects by Shivalik</button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link position-relative" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Projects by Promoters</button>
    </li>
  </ul>

  <div class="tab-content" id="pills-tabContent">

    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
        {/*  */}
      <div className='row mb-5'>
        <div className='col-lg-5'>
            <div className={styles.projectShortDes}>
                <GradientLine />
                <h3 className={styles.sectionTitle}>Projects by Shivalik</h3>
            </div>
        </div>
        <div className='col-lg-6 offset-lg-1'>
            <p>Each project by Shivalik is a testament to our vision of purposeful urban living. Thoughtfully located housing in Mumbai’s prime location, meticulously designed, and built to last, our developments blend functionality with elegance, offering residents not just homes, but a lifestyle anchored in comfort, connectivity, and community.</p>
        </div>
      </div>
      {/*  */}
      {/*  */}
              {shivalikHero && (

      <div className='row pb-5 mb-5 border-bottom'>
        <div className='col-lg-6'>
            <div className={`${styles.projectPicture} position-relative mb-3`}>
            {shivalikHero.image[0].filepath && (
            <img src={shivalikHero.image[0].filepath} width='100%' alt={shivalikHero.alt} />

            )}
            {shivalikHero.disclaimer && (
<span className='overlayText'>
           {shivalikHero.disclaimer}
          </span>
)}
      
            {shivalikHero.banner_alt && (
                <div className={styles.projectButton}>
                <a className={styles.commonBlueButton} 
                 href={`/project/${shivalikHero.title
              .toLowerCase()
              .trim()
              .replace(/&/g, "and")
              .replace(/['’]/g, "")   // remove apostrophes
              .replace(/\//g, "-")
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-+|-+$/g, "")
                        }`}
             >Learn More <ArrowRightAlt /></a>
            </div>
            )}
          
            </div>
        </div>
        <div className='col-lg-6'>
            <div className={styles.projectDetails}>
            <span className={`${styles.projectTag} mb-3`}>
                            {shivalikHero.completion_date}
            </span>
            <h3 className={styles.sectionTitle}>{shivalikHero.title}</h3>
            <h5><strong>Location</strong></h5>
            <h6 className='mb-3'>{shivalikHero.location}</h6>
            {shivalikHero.excerpt && (
            <div dangerouslySetInnerHTML={{__html: shivalikHero.excerpt}}></div>

            )}
            </div>
        </div>
      </div>
              )}
      <ShivalikProjectList data={shivalikList} />
    </div>
    {/* project by shivalik close */}
    <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
      {/*  */}
      <div className='row justify-content-center border-custom'>
              <ShivalikProjectList data={promotersList} />

      </div>
      {/*  */}
    </div>
  </div>
</div>
    </section>
  )
}

export default ProjectsTabSection
