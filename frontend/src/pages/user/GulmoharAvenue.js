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
import { useParams, useLocation } from 'react-router-dom';
const GulmoharAvenue = () => {

const [showModal, setShowModal] = useState(false);
const [projectBanner, setProjectBanner] = useState("");
const [projectAbout, setProjectAbout] = useState([])
const [projectContent, setProjectContent] = useState([])
const [projectFeatures, setProjectFeatures] = useState([])
const [projectHighlight, setProjectHighlight] = useState([])
const [projectAmenities, setProjectAmenities] = useState([])
const [projectDisclaimer, setProjectDisclaimer] = useState([])
const [projectLocation, setProjectLocation] = useState([])
  const [projectGallery, setProjectGallery] = useState([])

const {name} = useParams()

  useEffect(() => {

    const fetchProjectBanner = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/project/project/${name}`);
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
        const response = await axios.get(`${apiUrl}/api/about/project/${name}`);
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
        const response = await axios.get(`${apiUrl}/api/feature-content/project/${name}`);
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
        const response = await axios.get(`${apiUrl}/api/feature/project/${name}`);
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
        const response = await axios.get(`${apiUrl}/api/highlight/project/${name}`);
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
        const response = await axios.get(`${apiUrl}/api/amenity/project/${name}`);
        const ProjectAmenitiesData = response.data.Amenities;
        console.log("amenities", ProjectAmenitiesData)
        setProjectAmenities(ProjectAmenitiesData);
      } catch (error) {
        console.error("Error fetching project amenities:", error);
      }
    };
    fetchProjectAmenities();
  }, [name]);

  useEffect(() => {
    const fetchProjectDisclaimer = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/disclaimer/project/${name}`);
        const ProjectDisclaimerData = response.data.disclaimers;
        console.log("disclaimers", ProjectDisclaimerData)
        setProjectDisclaimer(ProjectDisclaimerData);
      } catch (error) {
        console.error("Error fetching project disclaimers:", error);
      }
    };
    fetchProjectDisclaimer();
  }, [name]);

  useEffect(() => {
    const fetchProjectLocation = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/location/project/${name}`);
        const ProjectLocationData = response.data.Location;
        console.log("Location", ProjectLocationData)
        setProjectLocation(ProjectLocationData);
      } catch (error) {
        console.error("Error fetching project Location:", error);
      }
    };
    fetchProjectLocation();
  }, [name]);

   useEffect(() => {
      const fetchProjectGallery = async () => {
        try {
          const apiUrl = process.env.REACT_APP_API_URL;
          const response = await axios.get(`${apiUrl}/api/gallery/project/${name}`);
          const ProjectGalleryData = response.data.Galleries;
          console.log("gallery", ProjectGalleryData)
          setProjectGallery(ProjectGalleryData);
        } catch (error) {
          console.error("Error fetching project gallery:", error);
        }
      };
      fetchProjectGallery();
    }, [name]);

    const location = useLocation(); // gives current URL (pathname, search, hash)

  useEffect(() => {
    const fetchMetaTag = async () => {
      // Add canonical tag
      const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (linkCanonical) {
        linkCanonical.setAttribute("href", canonicalUrl);
      } else {
        linkCanonical = document.createElement("link");
        linkCanonical.rel = "canonical";
        linkCanonical.href = canonicalUrl;
        document.head.appendChild(linkCanonical);
      }

      try {
        const apiUrl = process.env.REACT_APP_API_URL;

        let page = location.pathname;

        const response = await axios.get(`${apiUrl}/api/project/project/${name}`);
        const metaTag = response.data.banner;

        document.title = metaTag.metaTitle || "Default Title";

        let metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute("content", metaTag.metaDescription || "");
        } else {
          metaDescription = document.createElement("meta");
          metaDescription.name = "description";
          metaDescription.content = metaTag.metaDescription || "";
          document.head.appendChild(metaDescription);
        }

        // Meta keywords
        let metaKeyword = document.querySelector('meta[name="keywords"]');
        if (metaKeyword) {
          metaKeyword.setAttribute("content", metaTag.metaKeyword || "");
        } else {
          metaKeyword = document.createElement("meta");
          metaKeyword.name = "keywords"; 
          metaKeyword.content = metaTag.metaKeyword || "";
          document.head.appendChild(metaKeyword);
        }
      } catch (error) {
        console.error("Error fetching meta tag:", error);
      }
    };

    fetchMetaTag();
  }, [location]);


  return (
    <Layout>

      <section className={styles.projectDetHeader}>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='d-lg-block d-none desktop-banner'>
              {projectBanner.banner?.[0]?.filepath && (
                <img src={projectBanner.banner?.[0]?.filepath} width='100%' alt={projectBanner.banner_alt} />
              )}
            </div>

            <div className='d-lg-none d-block  mobile-banner'>
              {projectBanner.mobile_banner?.[0]?.filepath && (
                <img src={projectBanner.mobile_banner?.[0]?.filepath} width='100%' alt={projectBanner.mobile_banner_alt} />
              )}
            </div>
          </div>
          
        </div>
      </section>

      {/* PROJECT NAV BAR SECTION START */}
     <section className={styles.projectDetNav}>
  <div className="container navbar-container">
    <div className="col-lg-12">
      <div className="scrollmenu text-center">
        {/* About Section */}
        {projectAbout?.length > 0 && (
          <a href="#about">About</a>
        )}

        {/* Amenities Section */}
        {projectAmenities?.length > 0 && (
          <a href="#amenities">Amenities</a>
        )}

        {/* Plan Section */}
        {projectContent?.length > 0 && (
          <a href="#plan">Plan</a>
        )}

        {/* Location Section */}
        {projectLocation?.length > 0 && (
          <a href="#location">Location</a>
        )}

        {/* Gallery Section */}
        {projectGallery?.length > 0 && (
          <a href="#gallery">Gallery</a>
        )}

        {/* Testimonials Section */}
        <a href="#client">Client Review</a>

        {/* Timeline / Current Status */}
        <a href="#current">Current Status</a>

        {/* FAQ Section */}
        <a href="#faq">FAQ's</a>

        {/* Bank Tie-ups */}
        <a href="#bank">Bank Tie-ups</a>

      </div>
    </div>
  </div>
</section>

      {/* PROJECT NAV BAR SECTION CLOSE */}

      {/* ABOUT SECTION START */}
      {projectAbout && projectAbout.map((about, index) => (
  <section key={index} className='mt-5 mb-5 before-bg-type1' id='about'>
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
          <span className='overlayText'>
           Artistic impression for representation purpose only
          </span>
        </div>
      </div>
      <div className='col-lg-6'>
        <div className={homestyles.aboutText}>
          <GradientLine />
          <h1 className={styles.sectionTitle}>{about.project?.title}</h1>
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
      <section className='bg-grey pt-5 pb-5 live-fine-section'>
        <div className=''>
      {projectContent && projectContent.map((content) => (

          <div className='row row-reverse g-0'>

            <div className='col-lg-4 position-relative'>
              {content.image?.[0]?.filepath && (
              <img className={`${styles.borderRadius} border-radius-left position-relative`} src={content.image?.[0]?.filepath} width='100%' alt={content.alt} />
              )}
              <span className='overlayText'>
           Artistic impression for representation purpose only
          </span>
            </div>
            <div className='col-lg-7 offset-lg-1 mt-lg-0 mt-3 mob-space'>
              <GradientLine />
              <h2 className={styles.sectionTitle}>{content.title}</h2>
              <div className='row g-0'>
      {projectFeatures && projectFeatures.map((feature) => (

                <div className='col-lg-6 pe-4' key={feature._id}>
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
        <h2 className={styles.sectionTitle}>Highlights</h2>
      </div>
      {projectHighlight && projectHighlight.map((highlight) => (

      <div className='col' key={highlight._id}>
  <div className={`${styles.highlightBox} position-relative`}>
    {highlight.image?.[0]?.filepath && (
      <img
        src={highlight.image[0].filepath}
        className="mb-1 position-relative"
        width="100%"
        alt={highlight.alt}
      />
    )}

    <span className="overlayText">
      Artistic impression for representation purpose only
    </span>

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
              <h2 className={styles.sectionTitle}>Amenities That Bring the Community Together</h2>
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
              <h2 className={styles.sectionTitle}>Site Plan</h2>
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
           {projectLocation && projectLocation.map((location) => (
          <div className='row align-items-center'>

            <div className='col-lg-12'>
              <GradientLine />
              <h2 className={styles.sectionTitle}>Well connected to all that is important</h2>
            </div>
            {location.info && location.info.length > 0 ? (
              <div className='row align-items-center'>
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
      {location.info && location.info.map((info) => (
        <tr key={info._id}>
        <td class="align-top">{info.place}</td>
        <td>{info.distance}</td>
      </tr>
      ))}
      
    </tbody>
  </table>
</div>
              </div>
            </div>
            <div className='col-lg-7'>
              <iframe
                  src={location.map_link}
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
         
            ) : (
            <div className='col-lg-12'>
              <iframe
                  src={location.map_link}
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map"
                />
            </div>
            )}
          </div>
          ))}
        </div>
      </section>
    
            <GalleryGrid />
         
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
              <h2 className={styles.sectionTitle}>Current Status</h2>
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
              <h2 className={styles.sectionTitle}>Bank Tie-Ups</h2>
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
      {projectDisclaimer && projectDisclaimer.length > 0 && (
<section className={`${styles.reraSection} mb-5`}>
        <div className='container-fluid'>
      {projectDisclaimer && projectDisclaimer.map((disclaimer) => (

          <div className='row '>
            <div className='col-lg-7'>
              <div dangerouslySetInnerHTML={{__html: disclaimer.description}}></div>
            </div>
            <div className='col-lg-5'>
              <div className='row align-items-center'>
                <div className='col-lg-3 col-md-3 col-sm-3 col-4'>
                  {disclaimer.qr?.[0]?.filepath && (<img src={disclaimer.qr?.[0]?.filepath} width='100%' alt={disclaimer.alt} />)}
                  </div>
                <div className='col-lg-3 col-md-3 col-sm-3 col-4'><img src='/images/maharera.png' width='100%' /></div>
                <div className='col-lg-6'>
                  <p className='mb-0'>RERA Registeration No.: {disclaimer.registration_no}</p>
                  <p className=''><a href="maharerait.mahaonline.gov.in" className='text-dark text-decoration-none' target='_blank'>maharerait.mahaonline.gov.in</a></p>
                </div>
              </div>
            </div>
          </div>
      ))}
        </div>
      </section>
      )}
      
      {/* rera section close */}

    </Layout>
  )
}

export default GulmoharAvenue;
