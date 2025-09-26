import React, { useState } from 'react';
import Layout from '../../components/templates/Layout';
import styles from '../../style/Common.module.css';
import GradientLine from '../../components/atoms/GradientLine';
import homestyles from '../../style/Home.module.css';
import { Download, Phone } from 'react-feather';
import GalleryGrid from '../../components/organisms/GalleryGrid';
import TestimonialsSection from '../../components/templates/TestimonialsSection'
import ProjectDetFaqSection from '../../components/templates/ProjectDetFaqSection';
import ClientTieUps from '../../components/organisms/ClientTieUps';
import HorizontalTimeline from '../../components/organisms/HorizontalTimeline';
import BlueprintTabs from '../../components/organisms/BlueprintTabs';
import BrochureModal from '../../components/organisms/BrochureModel';
import BlueprintPD from '../../components/organisms/BlueprintPD';
import ProjectDetFaqSectionPD from '../../components/templates/ProjectDetFaqSectionPD';
import ClientTieUpPD from '../../components/organisms/ClientTieUpPD';
import HorizontalTimelinePD from '../../components/organisms/HorizontalTimelinePD';
import BrochureModelPD from '../../components/organisms/BrochureModelPD';

const PrabhatDarshan = () => {

const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Layout>
      {/* PROJECT DETAIL BANNER SECTION START */}
      <section className={styles.projectDetHeader}>
        <div className='row g-0'>
          <div className='col-lg-7'>
            <div className='me-lg-3'>
              <img src='images/prabhatDarshan/luxurious-apartments-india-prabhat-darshan.png' width='100%' />
            </div>
          </div>
          <div className='col-lg-5'>
            <div className='row align-items-center g-0'>
              <div className='col-lg-6 col-md-12 mb-2 mt-2 ps-lg-3 ps-2'>
                <p className='mb-0'>RERA Registeration No.: P51800002608 <a href="maharerait.mahaonline.gov.in" target='_blank'>maharerait.mahaonline.gov.in</a></p>
              </div>
              {/* <div className='col-lg-3 col-6 mb-3 mt-3'>
                <img src='images/qr-code.png' width='100%' />
              </div> */}
              <div className='col-lg-3 col-md-4 mb-3 mt-3'>
                <img src='images/maharera.png' width='100%' />
              </div>
              <div className='col-lg-12 mt-5 pt-5 ps-lg-3 ps-2'>
                <h1 className={styles.projectDetTitle}>Prabhat <span>Darshan</span></h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* PROJECT DETAIL BANNER SECTION CLOSE */}

      {/* PROJECT NAV BAR SECTION START */}
      <section className={styles.projectDetNav}>
        <div className='container'>
          <div className='col-lg-12'>
            <div className="scrollmenu text-center">
              <a href="#about">About</a>
              <a href="#amenities">Amenities</a>
              <a href="#plan">Plan</a>
              <a href="#location">Location</a>
              {/* <a href="#gallery">Gallery</a> */}
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
      <section className='pt-5 pb-5 before-bg-type1' id='about'>
              <div className=''>
                  <div className='row align-items-center g-0'>
                      <div className='col-lg-6'>
                        <div className={`${homestyles.aboutImg} mb-3`}><img src='images/prabhatDarshan/txt-img-prabhat-darshan.jpeg' width='100%' /></div>  
                      </div>
                      <div className='col-lg-6'>
                          <div className={homestyles.aboutText}>
                              {/* <span className={styles.gradientLine}></span> */}
                              <GradientLine />
                              <h3 className={styles.sectionTitle}>Prabhat Darshan</h3>
                              <p className='pb-3'>Situated in one of Mumbai’s city centers Prabhat Darshan is a composite building surrounded by a flourishing hub for residential, commercial, educational and social infrastructure. This project is located opposite Khar Station granting easy access to South, Central and Extended Suburbs of Mumbai. At Prabhat Darshan, apartments are designed with beauty and built for persistent endurance for comfortable lifestyle keeping in mind the composite nature of the building.</p>
                              <a className={styles.commonOrangeButton} href='tel:02235155550'><Phone className='m-0' /></a> 
                              
                             <a className={styles.commonBlueButton} href="images/pdf/prabhat-darshan-brochure.pdf" target="_blank"
                                onClick={(e) => {
                                  e.preventDefault(); // prevent the default PDF opening
                                  setShowModal(true); // show the modal instead
                                }}
                              >Download Brochure <Download /></a>
                              <BrochureModelPD show={showModal} onClose={() => setShowModal(false)} />
                          </div>
                      </div>
                  </div>
              </div>
          </section>
      {/* ABOUT SECTION CLOSE */}

      {/* Live the Fine Print at Prabhat Darshan start */}
      <section className='bg-grey pt-5 pb-5'>
        <div className=''>
          <div className='row row-reverse g-0'>

            <div className='col-lg-4'>
              <img className={`${styles.borderRadius} border-radius-left`} src='images/project-det3.png' width='100%' />
            </div>
            <div className='col-lg-7 offset-lg-1 mt-lg-0 mt-3 mob-space'>
              <GradientLine />
              <h3 className={styles.sectionTitle}>Live the Fine Print at Prabhat Darshan</h3>
              <div className='row g-0'>
                <div className='col-lg-6'>
                  <div className='row g-0'>
                    {/*  */}
                    {/* <div className='col-lg-12 mb-3'>
                      <div className={`${styles.iconsProjectList} row align-items-center`}>
                        <div className='col-lg-2'>
                          <img src='images/icons/structural.svg' width='100%' />
                        </div>
                        <div className='col-lg-10'>
                          <h4>RCC & Brick Work</h4>
                        </div>
                        <div className='col-lg-12 mt-1'>
                          <ul>
                            <li>Seismic resistant RCC frame structure.</li>
                          </ul>
                        </div>
                      </div>
                    </div> */}
                    {/*  */}
                    {/*  */}
                    <div className='col-lg-12 col-md-6 col-sm-6 mb-3'>
                      <div className={`${styles.iconsProjectList} row align-items-center g-0`}>
                        <div className='col-lg-2 col-2 pe-2'>
                          <img src='images/icons/flooring.svg' width='100%' />
                        </div>
                        <div className='col-lg-10 col-10 col-10'>
                          <h4>Specifications</h4>
                        </div>
                        <div className='col-lg-12 mt-1'>
                          <ul>
                            <li>Vitrified tiles flooring in all rooms.</li>
                            <li>Putty finished walls with Acrylic emulsion paint in all the rooms.</li>
                            <li>Fire Retardant flush main door</li>
                            <li>Aluminium anodized sliding windows.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/*  */}
                       {/*  */}
                    <div className='col-lg-12 col-md-6 col-sm-6 mb-3'>
                      <div className={`${styles.iconsProjectList} row align-items-center g-0`}>
                        <div className='col-lg-2 col-2 pe-2'>
                          <img src='images/icons/kitchen.svg' width='100%' />
                        </div>
                        <div className='col-lg-10 col-10 col-10'>
                          <h4>Kitchen</h4>
                        </div>
                        <div className='col-lg-12 mt-1'>
                          <ul>
                            <li>Ceramic tile Dado up to beam bottom above platform.</li>
                            <li>Granite platform with standard quality SS sink with CP fittings.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/*  */}
                    
                    {/*  */}
                    {/* <div className='col-lg-12 mb-3'>
                      <div className={`${styles.iconsProjectList} row align-items-center`}>
                        <div className='col-lg-2 col-2 pe-2'>
                          <img src='images/icons/door.svg' width='100%' />
                        </div>
                        <div className='col-lg-10 col-10 col-10'>
                          <h4>Windows</h4>
                        </div>
                        <div className='col-lg-12 mt-1'>
                          <ul>
                            <li>Granite window frame with aluminium anodized sliding windows.</li>
                          </ul>
                        </div>
                      </div>
                    </div> */}
                    {/*  */}
                    {/*  */}
                    {/* <div className='col-lg-12 mb-3'>
                      <div className={`${styles.iconsProjectList} row align-items-center`}>
                        <div className='col-lg-2 col-2 pe-2'>
                          <img src='images/icons/door.svg' width='100%' />
                        </div>
                        <div className='col-lg-10 col-10 col-10'>
                          <h4>Doors</h4>
                        </div>
                        <div className='col-lg-12 mt-1'>
                          <ul>
                            <li>Fire retardant flush type door in wooden frame with chrome plated brass fittings, night latch for main door, peephole, safety chain, decorative handle & heavy duty doorstopper.</li>
                            <li>Internal wooden door with flush door shutter & granite frame.</li>
                          </ul>
                        </div>
                      </div>
                    </div> */}
                    {/*  */}
                     {/*  */}
                    {/* <div className='col-lg-12 mb-3'>
                      <div className={`${styles.iconsProjectList} row align-items-center`}>
                        <div className='col-lg-2 col-2 pe-2'>
                          <img src='images/icons/paint-roller.svg' width='100%' />
                        </div>
                        <div className='col-lg-10 col-10 col-10'>
                          <h4>Wall Finish</h4>
                        </div>
                        <div className='col-lg-12 mt-1'>
                          <ul>
                            <li>Putty finish wall with acrylic emulsion paint in all rooms.</li>
                          </ul>
                        </div>
                      </div>
                    </div> */}
                    {/*  */}
                  </div>
                  
                </div>
                <div className='col-lg-6'>
                  <div className='row g-0'>
                    {/*  */}
                    <div className='col-lg-12 col-md-6 col-sm-6 mb-3'>
                      <div className={`${styles.iconsProjectList} row align-items-center g-0`}>
                        <div className='col-lg-2 col-2 pe-2'>
                          <img src='images/icons/electrical.png' width='100%' />
                        </div>
                        <div className='col-lg-10 col-10 col-10'>
                          <h4>Electricals</h4>
                        </div>
                        <div className='col-lg-12 mt-1'>
                          <ul>
                            <li>Concealed fire resistant copper wiring with modular switches.</li>
                            <li>Plug point provision for telephone, lights, fans and Tv point.</li>
                            <li>Earth leakage circuit breaker.</li>
                            <li>Premium quality modular switches.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/*  */}
                    {/*  */}
                    <div className='col-lg-12 col-md-6 col-sm-6 mb-3'>
                      <div className={`${styles.iconsProjectList} row align-items-center g-0`}>
                        <div className='col-lg-2 col-2 pe-2'>
                          <img src='images/icons/bathroom.png' width='100%' />
                        </div>
                        <div className='col-lg-10 col-10 col-10'>
                          <h4>Bathroom</h4>
                        </div>
                        <div className='col-lg-12 mt-1'>
                          <ul>
                            <li>Ceramic tiles Dado up to 7 feet height.</li>
                            <li>Anti-skid flooring in bathroom.</li>
                            <li>Premium quality sanitary ware with CP fittings.</li>
                            <li>Louvered windows for toilets and bathrooms.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/*  */}
                 
                   
                    
                  </div>
                  
                </div>
                
              </div>
            </div>
            
          </div>
        </div>
      </section>
      {/* Live the Fine Print at Prabhat Darshan close */}

      {/* Highlights section start */}
<section className='mb-5 mt-5 pt-5 pb-3 highlight-sec'>
  <div className='container'>
    <div className='row'>
      <div className='col-lg-12'>
        <GradientLine />
        <h3 className={styles.sectionTitle}>Highlights</h3>
      </div>
      <div className='col'>
        <div className={styles.highlightBox}>
          <img src='images/highlight1.png' className="mb-1" width='100%' />
          <h5>Entrance lobby</h5>
        </div>
      </div>
      <div className='col'>
        <div className={styles.highlightBox}>
          <img src='images/highlight2.png' className="mb-1" width='100%' />
          <h5>Society office</h5>
        </div>
      </div>
      <div className='col'>
        <div className={styles.highlightBox}>
          <img src='images/prabhatDarshan/elevator-one.png' className="mb-1" width='100%' />
          <h5>Lifts</h5>
        </div>
      </div>
      <div className='col'>
        <div className={styles.highlightBox}>
          <img src='images/prabhatDarshan/staircase-one.png' className="mb-1" width='100%' />
          <h5>Staircase</h5>
        </div>
      </div>
      {/* <div className='col'>
        <div className={styles.highlightBox}>
          <img src='images/highlight5.png' className="mb-1" width='100%' />
          <h5>Gymnasium</h5>
        </div>
      </div> */}
    </div>
  </div>
</section>
      {/* Highlights section close */}

      {/* Amenities That Bring the Community Together section start */}
      <section className='mt-5 mb-5' id='amenities'>
        <div className='container'>
          
          <div className='row'>
            <div className='col-lg-12'>
              <GradientLine />
              <h3 className={styles.sectionTitle}>Amenities That Bring the Community Together</h3>
            </div>

            <div className='col-lg-3 col-md-6 mb-3'>
              <div className={styles.amenitiesBox}>
                <div className='row'>
                  <div className='col-lg-3 col-md-2 col-2'>
                    <img src='images/amenities-icon/elevator.png' width="100%" />
                  </div>
                  <div className='col-lg-9 col-md-10 col-10'>
                    <p>3 Nos. of Automatic passenger elevator.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* <div className='col-lg-3 col-md-6 mb-3'>
              <div className={styles.amenitiesBox}>
                <div className='row'>
                  <div className='col-lg-3  col-md-2 col-2'>
                    <img src='images/amenities-icon/tank.png' width="100%" />
                  </div>
                  <div className='col-lg-9 col-md-10 col-10'>
                    <p>Underground tank, overhead water tank & fire-fighting tank with adequate storage capacity</p>
                  </div>
                </div>
              </div>
            </div> */}
            <div className='col-lg-3 col-md-6 mb-3'>
              <div className={styles.amenitiesBox}>
                <div className='row'>
                  <div className='col-lg-3  col-md-2 col-2'>
                    <img src='images/amenities-icon/sprinkle.png' width="100%" />
                  </div>
                  <div className='col-lg-9 col-md-10 col-10'>
                    <p>Efficient fire fighting system.</p>
                  </div>
                </div>
              </div>
            </div>
          
            {/* <div className='col-lg-3 col-md-6 mb-3'>
              <div className={styles.amenitiesBox}>
                <div className='row'>
                  <div className='col-lg-3'>
                    <img src='images/amenities-icon/plant.png' width="100%" />
                  </div>
                  <div className='col-lg-9'>
                    <p>Peripherial planting</p>
                  </div>
                </div>
              </div>
            </div> */}
            
            {/* <div className='col-lg-3 col-md-6 mb-3'>
              <div className={styles.amenitiesBox}>
                <div className='row'>
                  <div className='col-lg-3'>
                    <img src='images/amenities-icon/rain-water-harvesting.png' width="100%" />
                  </div>
                  <div className='col-lg-9'>
                    <p>Rain water harvesting</p>
                  </div>
                </div>
              </div>
            </div> */}
            <div className='col-lg-3 col-md-6 mb-3'>
              <div className={styles.amenitiesBox}>
                <div className='row'>
                  <div className='col-lg-3  col-md-2 col-2'>
                    <img src='images/amenities-icon/stp.png' width="100%" />
                  </div>
                  <div className='col-lg-9 col-md-10 col-10'>
                    <p>Earthquake resistant RCC design</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-3  col-md-6 mb-3'>
              <div className={styles.amenitiesBox}>
                <div className='row'>
                  <div className='col-lg-3  col-md-2 col-2'>
                    <img src='images/amenities-icon/electric-generator.png' width="100%" />
                  </div>
                  <div className='col-lg-9 col-md-10 col-10'>
                    <p>Backup Generator.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-3 col-md-6 mb-3'>
              <div className={styles.amenitiesBox}>
                <div className='row'>
                  <div className='col-lg-3  col-md-2 col-2'>
                    <img src='images/amenities-icon/intercom.png' width="100%" />
                  </div>
                  <div className='col-lg-9 col-md-10 col-10'>
                    <p>Peripheral landscaping</p>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className='col-lg-3 mb-3'>
              <div className={styles.amenitiesBox}>
                <div className='row'>
                  <div className='col-lg-2'>
                    <img src='images/amenities-icon/electric-factory.svg' />
                  </div>
                  <div className='col-lg-10'>
                    <p>Electrical substation</p>
                  </div>
                </div>
              </div>
            </div> */}
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
             <BlueprintPD />
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
            {/* <div className='col-lg-5'>
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
            </div> */}
            <div className='col-lg-12'>
              <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.9119712395004!2d72.8420833!3d19.0676076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c91af6c87363%3A0x627ca347341d0b40!2sPrabhat%20Darshan%20Residential%20Shivalik%20Ventures!5e0!3m2!1sen!2sin!4v1751351522965!5m2!1sen!2sin"
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
      {/* <section className='mb-5 pb-5 mt-5 pt-5' id='gallery'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <GradientLine />
              <h3 className={styles.sectionTitle}>Project Gallery</h3>
            </div>
            <GalleryGrid />
          </div>
        </div>
      </section> */}
      {/* Project Gallery section close */}

      {/* Key Features Section Start */}
      <TestimonialsSection />
      {/* Key Features Section Close */}

      {/* faq section start */}
      <ProjectDetFaqSectionPD />
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
              <HorizontalTimelinePD />
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
              <ClientTieUpPD />
            </div>
          </div>
        </div>
      </section>
      {/* Tie Ups Section close */}

      {/*  */}

      {/* rera section start */}
      {/* <section className={`${styles.reraSection} mb-5`}>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-7'>
              <p>Disclaimer : This is not an offer, an invitation to offer and/or commitment of any nature. This contains artistic impressions and stock images for illustrative purpose and no warranty is expressly or impliedly given that the completed development will comply in any degree with such artist's impression as depicted. All terms and conditions of sale of flat, specifications and amenities of the flat/project shall be as per the final agreement between the Parties. Recipients are advised to use their discretion in relying on the information/amenities described / shown herein. All distances mentioned are aerial distances. ** The No EMI Till Possession & Flexi Payment scheme is subject to the sanction of the home buyer's loan from financial institution / banks offering this scheme. * T & C Apply.</p>
            </div>
            <div className='col-lg-5'>
              <div className='row'>
                <div className='col-lg-2 col-6'><img src='images/qr-code.png' width='100%' /></div>
                <div className='col-lg-2 col-6'><img src='images/maharera.png' width='100%' /></div>
                <div className='col-lg-8'>
                  <p className='mb-0'>RERA Registeration No.: P51800002608</p>
                  <p className=''><a href="maharerait.mahaonline.gov.in" className='text-dark text-decoration-none' target='_blank'>maharerait.mahaonline.gov.in</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* rera section close */}

    </Layout>
    </>
  )
}

export default PrabhatDarshan