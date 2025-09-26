import React, { useState } from 'react';
import Layout from '../../components/templates/Layout';
import styles from '../../style/Common.module.css';
import GradientLine from '../../components/atoms/GradientLine';
import { ArrowRightAlt } from '@mui/icons-material';
import homestyles from '../../style/Home.module.css';
import { Download, Phone } from 'react-feather';
import GalleryGrid from '../../components/organisms/GalleryGrid';
import TestimonialsSection from '../../components/templates/TestimonialsSection'
import ProjectDetFaqSection from '../../components/templates/ProjectDetFaqSection';
import ClientTieUps from '../../components/organisms/ClientTieUps';
import HorizontalTimeline from '../../components/organisms/HorizontalTimeline';
import BlueprintTabs from '../../components/organisms/BlueprintTabs';
import BrochureModal from '../../components/organisms/BrochureModel';
import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const GulmoharAvenue = () => {

const [showModal, setShowModal] = useState(false);
const [projectBanner, setProjectBanner] = useState("");
const [projectAbout, setProjectAbout] = useState([])
const [projectContent, setProjectContent] = useState([])
const [projectFeatures, setProjectFeatures] = useState([])
const [projectHighlight, setProjectHighlight] = useState([])
const [projectAmenities, setProjectAmenities] = useState([])

const {name} = useParams()

  useEffect(() => {

    const fetchProjectBanner = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/project/title/${name}`);
        const ProjectBannerData = response.data.banner;
        console.log("banner", ProjectBannerData)
        setProjectBanner(ProjectBannerData);
      } catch (error) {
        console.error("Error fetching project banner:", error);
      }
    };

    fetchProjectBanner();
  }, [name]);

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

  useEffect(() => {

    const fetchProjectFeatureContent = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/feature-content/title/${name}`);
        const ProjectContentData = response.data.content;
        console.log("content", ProjectContentData)
        setProjectContent(ProjectContentData);
      } catch (error) {
        console.error("Error fetching project content:", error);
      }
    };

    fetchProjectFeatureContent();
  }, [name]);

  useEffect(() => {

    const fetchProjectFeatures = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/feature/title/${name}`);
        const ProjectFeaturesData = response.data.features;
        console.log("feature", ProjectFeaturesData)
        setProjectFeatures(ProjectFeaturesData);
      } catch (error) {
        console.error("Error fetching project feature:", error);
      }
    };

    fetchProjectFeatures();
  }, [name]);

 useEffect(() => {

    const fetchProjectHighlights = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/highlight/title/${name}`);
        const ProjectAmenitiesData = response.data.Highlights;
        console.log("highlight", ProjectAmenitiesData)
        setProjectHighlight(ProjectAmenitiesData);
      } catch (error) {
        console.error("Error fetching project highlights:", error);
      }
    };

    fetchProjectHighlights();
  }, [name]);

  useEffect(() => {
    const fetchProjectAmenities = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/amenity/title/${name}`);
        const ProjectAmenitiesData = response.data.Amenities;
        console.log("amenities", ProjectAmenitiesData)
        setProjectAmenities(ProjectAmenitiesData);
      } catch (error) {
        console.error("Error fetching project amenities:", error);
      }
    };
    fetchProjectAmenities();
  }, [name]);

  return (
    <Layout>

      <section className={styles.projectDetHeader}>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='d-lg-block desktop-banner'>
              {projectBanner.banner?.[0]?.filepath && (
                <img src={projectBanner.banner?.[0]?.filepath} width='100%' alt={projectBanner.banner_alt} />
              )}
            </div>

            <div className='d-md-none mobile-banner'>
              {projectBanner.mobile_banner?.[0]?.filepath && (
                <img src={projectBanner.mobile_banner?.[0]?.filepath} width='100%' alt={projectBanner.mobile_banner_alt} />
              )}
            </div>
          </div>
          
        </div>
      </section>

      {/* PROJECT NAV BAR SECTION START */}
      <section className={styles.projectDetNav}>
        <div className='container navbar-container'>
          <div className='col-lg-12'>
            <div className="scrollmenu text-center">
              <a href="#about">About</a>
              <a href="#amenities">Amenities</a>
              <a href="#plan">Plan</a>
              <a href="#location">Location</a>
              <a href="#gallery">Gallery</a>
              <a href="#client">Client Review</a>
              <a href="#current">Current Status</a>  
              <a href="#faq">FAQ's</a>
              <a href="#bank">Bank Tie-ups</a>
            </div>
          </div>
          
        </div>
      </section>
      {/* PROJECT NAV BAR SECTION CLOSE */}

      {/* ABOUT SECTION START */}
      {projectAbout && projectAbout.map((about, index) => (
  <section key={index} className='pt-5 pb-5 before-bg-type1' id='about'>
    <div className='row align-items-center g-0'>
      <div className='col-lg-6'>
        <div className={`${homestyles.aboutImg} mb-3`}>
          {about.image?.[0]?.filepath && (
            <img
              src={about.image?.[0]?.filepath}
              width='100%'
              alt={about.image?.[0]?.alt}
            />
          )}
        </div>
      </div>
      <div className='col-lg-6'>
        <div className={homestyles.aboutText}>
          <GradientLine />
          <h3 className={styles.sectionTitle}>{about.project?.title}</h3>
          <div dangerouslySetInnerHTML={{ __html: about.description }}></div>
          {about.contact && (
            <a
              className={styles.commonOrangeButton}
              href={`tel:${about.contact}`}
            >
              <Phone className='m-0' />
            </a>
          )}
          <a
            className={styles.commonBlueButton}
            onClick={() => setShowModal(true)}
          >
            Download Brochure <Download />
          </a>
          <BrochureModal show={showModal} onClose={() => setShowModal(false)}  pageName={projectAbout.project?.title}
  brochureUrl={projectAbout.brochure?.[0]?.filepath} />
        </div>
      </div>
    </div>
  </section>
))}

      {/* ABOUT SECTION CLOSE */}

      {/* Live the Fine Print at Gulmohar Avenue start */}
      <section className='bg-grey pt-5 pb-5'>
        <div className=''>
      {projectContent && projectContent.map((content) => (

          <div className='row row-reverse g-0'>

            <div className='col-lg-4'>
              {content.image?.[0]?.filepath && (
              <img className={`${styles.borderRadius} border-radius-left`} src={content.image?.[0]?.filepath} width='100%' alt={content.alt} />
              )}
            </div>
            <div className='col-lg-7 offset-lg-1 mt-lg-0 mt-3 mob-space'>
              <GradientLine />
              <h3 className={styles.sectionTitle}>{content.title}</h3>
              <div className='row g-0'>
      {projectFeatures && projectFeatures.map((feature) => (

                <div className='col-lg-6' key={feature._id}>
                  <div className={`${styles.iconsProjectList} row align-items-center g-0`}>
                        <div className='col-lg-2 col-2 pe-2'>
                          {feature.image?.[0]?.filepath && (
                          <img src={feature.image?.[0]?.filepath} width="100%" alt={feature.alt} />
                          )} 
                        </div>
                        <div className='col-lg-10 col-10'>
                          <h4>{feature.title}</h4>
                        </div>
                        <div className='col-lg-12 mt-1'>
                         <div dangerouslySetInnerHTML={{__html: feature.description}}></div>
                        </div>
                      </div>
                   
                  </div>
                   ))}
                </div>
            </div>
        </div>
    ))}
    </div>
      </section>
      {/* Live the Fine Print at Gulmohar Avenue close */}

      {/* Highlights section start */}
<section className='mb-5 mt-5 pt-5 pb-3 highlight-sec'>
  <div className='container'>
    <div className='row'>
      <div className='col-lg-12'>
        <GradientLine />
        <h3 className={styles.sectionTitle}>Highlights</h3>
      </div>
      {projectHighlight && projectHighlight.map((highlight) => (

      <div className='col' key={highlight._id}>
        <div className={styles.highlightBox}>
          {highlight.image?.[0]?.filepath && (
          <img src={highlight.image?.[0]?.filepath} className="mb-1" width='100%' alt={highlight.alt}/>
          )}
          <h5>{highlight.title}</h5>
        </div>
      </div>
      ))}
    </div>
  </div>
</section>
      {/* Highlights section close */}

      {/* Amenities That Bring the Community Together section start */}
      <section className='mt-5 mb-5' id='amenities'>
        <div className='container'>
          
          <div className='row '>
            <div className='col-lg-12'>
              <GradientLine />
              <h3 className={styles.sectionTitle}>Amenities That Bring the Community Together</h3>
            </div>
      {projectAmenities && projectAmenities.map((amenities) => (

            <div className='col-lg-3 mb-3' key={amenities._id}>
              <div className={styles.amenitiesBox}>
                <div className='row '>
                  <div className='col-lg-3 col-md-2 col-2'>
                    {amenities.image?.[0]?.filepath && (
                    <img src={amenities.image?.[0]?.filepath} width="100%" alt={amenities.alt} />
                    )} 
                  </div>
                  <div className='col-lg-9 col-md-10 col-10'>
                    <div dangerouslySetInnerHTML={{__html: amenities.description}}></div>
                  </div>
                </div>
              </div>
            </div>
      ))}
          </div>
          
        </div>
      </section>
      {/* Amenities That Bring the Community Together section close */}

      {/* site plan section start */}
      <section id='plan'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <GradientLine />
              <h3 className={styles.sectionTitle}>Site Plan</h3>
            </div>
          </div>
          <div className='row'>
             <BlueprintTabs />
          </div>
        </div>
       
      </section>
      {/* site plan section close */}

      {/* Well connected to all that is important section start */}
      <section className='mt-5 mb-5' id='location'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-12'>
              <GradientLine />
              <h3 className={styles.sectionTitle}>Well connected to all that is important</h3>
            </div>
            <div className='col-lg-5'>
              <div className={styles.placeDistance}>
                <div class="table-responsive place-distance">
  <table class="table align-middle">
    <thead>
      <tr>
        <td class="align-top"><strong>Place</strong></td>
        <td><strong>Distance</strong></td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="align-top">Bandra station</td>
        <td>0.7 KM</td>
      </tr>
      <tr>
        <td class="align-top">Khar station</td>
        <td>0.3 KM</td>
      </tr>
      <tr>
        <td class="align-top">BKC</td>
        <td>1.7 KM</td>
      </tr>
      <tr>
        <td class="align-top">Airport</td>
        <td>2.5 KM</td>
      </tr>
      <tr>
        <td class="align-top">Western express</td>
        <td>0.2 KM</td>
      </tr>
      <tr>
        <td class="align-top">SCLR</td>
        <td>2 KM</td>
      </tr>
    </tbody>
  </table>
</div>
              </div>
            </div>
            <div className='col-lg-7'>
              <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7541.714359560538!2d72.845875!3d19.070016!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c97f07d70c05%3A0xb99ce1df52c83126!2sBandra%20North!5e0!3m2!1sen!2sus!4v1751287254973!5m2!1sen!2sus"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map"
                />
            </div>
          </div>
        </div>
      </section>
      {/* Well connected to all that is important section close */}

      {/* Project Gallery section start */}
      <section className='mb-5 pb-5 mt-5 pt-5' id='gallery'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <GradientLine />
              <h3 className={styles.sectionTitle}>Project Gallery</h3>
            </div>
            <GalleryGrid />
          </div>
        </div>
      </section>
      {/* Project Gallery section close */}

      {/* Key Features Section Start */}
      <TestimonialsSection />
      {/* Key Features Section Close */}

      {/* faq section start */}
      <ProjectDetFaqSection />
      {/* faq section close */}

      {/* /\ */}
      <section id='current'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <GradientLine />
              <h3 className={styles.sectionTitle}>Current Status</h3>
            </div>
            <div className='col-lg-12'>
              <HorizontalTimeline />
            </div>
          </div>
        </div>
      </section>

      {/* Tie Ups Section start */}
      <section id='bank' className={`${styles.clientTieUpSection} tieups_section pt-5 pb-5 mt-5 mb-5`}>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <GradientLine />
              <h3 className={styles.sectionTitle}>Bank Tie-Ups</h3>
            </div>
            <div className=''>
              <ClientTieUps />
            </div>
          </div>
        </div>
      </section>
      {/* Tie Ups Section close */}

      {/*  */}

      {/* rera section start */}
      <section className={`${styles.reraSection} mb-5`}>
        <div className='container-fluid'>
          <div className='row '>
            <div className='col-lg-7'>
              <p>Disclaimer : This is not an offer, an invitation to offer and/or commitment of any nature. This contains artistic impressions and stock images for illustrative purpose and no warranty is expressly or impliedly given that the completed development will comply in any degree with such artist's impression as depicted. All terms and conditions of sale of flat, specifications and amenities of the flat/project shall be as per the final agreement between the Parties. Recipients are advised to use their discretion in relying on the information/amenities described / shown herein. All distances mentioned are aerial distances. ** The No EMI Till Possession & Flexi Payment scheme is subject to the sanction of the home buyer’s loan from financial institution / banks offering this scheme. * T & C Apply.</p>
            </div>
            <div className='col-lg-5'>
              <div className='row align-items-center'>
                <div className='col-lg-3 col-md-3 col-sm-3 col-4'><img src='images/qr-code.png' width='100%' /></div>
                <div className='col-lg-3 col-md-3 col-sm-3 col-4'><img src='images/maharera.png' width='100%' /></div>
                <div className='col-lg-6'>
                  <p className='mb-0'>RERA Registeration No.: P51800014036</p>
                  <p className=''><a href="maharerait.mahaonline.gov.in" className='text-dark text-decoration-none' target='_blank'>maharerait.mahaonline.gov.in</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* rera section close */}

    </Layout>
  )
}

export default GulmoharAvenue;
