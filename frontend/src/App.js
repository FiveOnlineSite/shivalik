import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import pages
import Home from './pages/user/Home'
import Home1 from './pages/user/Home1'

import AboutUs from './pages/user/AboutUs'
import Blogs from './pages/user/Blogs';
import ContactUs from './pages/user/ContactUs';
import CSR from './pages/user/CSR';
import EMICalculator from './pages/user/EMICalculator';
import FAQs from './pages/user/FAQs';
import News from './pages/user/News';
import ProjectDetail from './pages/user/GulmoharAvenue';
import Projects from './pages/user/Projects';
import Resources from './pages/user/Resources';
import StampDutyCalculator from './pages/user/StampDutyCalculator';
import GulmoharAvenue from './pages/user/GulmoharAvenue';
import PrabhatDarshan from './pages/user/PrabhatDarshan';
import BlogDetailOne from './pages/user/BlogDetailOne';
import BlogDetailTwo from './pages/user/BlogDetailTwo';
import BlogDetailThree from './pages/user/BlogDetailThree';
import BlogDetailFour from './pages/user/BlogDetailFour';
import BlogDetailFive from './pages/user/BlogDetailFive';
import BlogDetailSix from './pages/user/BlogDetailSix';

import AdminRoutes from "./route/AdminRoute";
import Login from "./pages/admin/Login"
import DashBoard from "./pages/admin/Dashboard"
import HomeBanner from './pages/admin/Home/HomeBanner/HomeBanner';
import AddHomeBanner from './pages/admin/Home/HomeBanner/AddHomeBanner';
import EditHomeBanner from './pages/admin/Home/HomeBanner/EditHomeBanner'
import Counter from './pages/admin/Home/Counter/Counter';
import AddCounter from './pages/admin/Home/Counter/AddCounter';
import EditCounter from './pages/admin/Home/Counter/EditCounter';
import Testimonials from './pages/admin/Home/Testimonials/Testimonials';
import AddTestimonial from './pages/admin/Home/Testimonials/AddTestimonial';
import EditTestimonial from './pages/admin/Home/Testimonials/EditTestimonial';
import Banners from './pages/admin/Banners/Banners';
import AddBanner from './pages/admin/Banners/AddBanner';
import EditBanner from './pages/admin/Banners/EditBanner';
import Awards from './pages/admin/Awards/Awards';
import AddAward from './pages/admin/Awards/AddAward';
import EditAward from './pages/admin/Awards/EditAward';
import FAQCategory from './pages/admin/FAQ/FAQCategory/FAQCategory';
import AddFAQCategory from './pages/admin/FAQ/FAQCategory/AddFAQCategory';
import EditFAQCategory from './pages/admin/FAQ/FAQCategory/EditFAQCategory';
import FAQContent from './pages/admin/FAQ/FAQContent/FAQContent';
import AddFAQContent from './pages/admin/FAQ/FAQContent/AddFAQContent';
import EditFAQContent from './pages/admin/FAQ/FAQContent/EditFAQContent';

import StampDuty from './pages/admin/StampDuty';
import NewsWorthy from './pages/admin/NewsWorthy/NewsWorthy';
import AddNewsWorthy from './pages/admin/NewsWorthy/AddNewsWorthy';
import EditNewsWorthy from './pages/admin/NewsWorthy/EditNewsWorthy';
import ContactResponse from './pages/admin/Contact/ContactResponse';
import AdminBlogs from './pages/admin/Blogs/Blog/Blogs';
import AddBlog from './pages/admin/Blogs/Blog/AddBlog';
import EditBlog from './pages/admin/Blogs/Blog/EditBlog';
import BlogFAQ from './pages/admin/Blogs/BlogFaq/BlogFaq';
import AddBlogFaq from './pages/admin/Blogs/BlogFaq/AddBlogFaq';
import EditBlogFaq from './pages/admin/Blogs/BlogFaq/EditBlogFaq';
import ContactContent from './pages/admin/Contact/ContactContent';
import Project from './pages/admin/Projects/Project/Project';
import AddProject from './pages/admin/Projects/Project/AddProject';
import EditProject from './pages/admin/Projects/Project/EditProject';
import About from './pages/admin/ProjectDetails/About/About';
import AddAbout from './pages/admin/ProjectDetails/About/AddAbout';
import EditAbout from './pages/admin/ProjectDetails/About/EditAbout';
import FeaturesContent from './pages/admin/Features/FeaturesContent/FeaturesContent';
import AddFeaturesContent from './pages/admin/Features/FeaturesContent/AddFeaturesContent';
import EditFeaturesContent from './pages/admin/Features/FeaturesContent/EditFeaturesContent';
import Features from './pages/admin/Features/Feature/Features';
import AddFeature from './pages/admin/Features/Feature/AddFeature';
import EditFeature from './pages/admin/Features/Feature/EditFeature';
import SitePlan from './pages/admin/ProjectDetails/SitePlan/SitePlan';
import AddSitePlan from './pages/admin/ProjectDetails/SitePlan/AddSitePlan';
import EditSitePlan from './pages/admin/ProjectDetails/SitePlan/EditSitePlan';
import Highlights from './pages/admin/ProjectDetails/Highlights/Highlights';
import AddHighlight from './pages/admin/ProjectDetails/Highlights/AddHighlight';
import EditHighlight from './pages/admin/ProjectDetails/Highlights/EditHighlight';
import Amenities from './pages/admin/ProjectDetails/Amenities/Amenities';
import AddAmenity from './pages/admin/ProjectDetails/Amenities/AddAmenity';
import EditAmenity from './pages/admin/ProjectDetails/Amenities/EditAmenity';
import Gallery from './pages/admin/ProjectDetails/Gallery/Gallery';
import AddGallery from './pages/admin/ProjectDetails/Gallery/AddGallery';
import EditGallery from './pages/admin/ProjectDetails/Gallery/EditGallery';
import Banks from './pages/admin/ProjectDetails/Banks/Banks';
import AddBank from './pages/admin/ProjectDetails/Banks/AddBank';
import EditBank from './pages/admin/ProjectDetails/Banks/EditBank';
import ProjectFAQ from './pages/admin/ProjectDetails/FAQ/FAQ';
import AddProjectFAQ from './pages/admin/ProjectDetails/FAQ/AddFAQ';
import EditProjectFAQ from './pages/admin/ProjectDetails/FAQ/EditFAQ';
import Disclaimers from './pages/admin/ProjectDetails/Disclaimers/Disclaimers';
import AddDisclaimer from './pages/admin/ProjectDetails/Disclaimers/AddDisclaimer';
import EditDisclaimer from './pages/admin/ProjectDetails/Disclaimers/EditDisclaimer';
import Status from './pages/admin/ProjectDetails/Status/Status';
import AddStatus from './pages/admin/ProjectDetails/Status/AddStatus';
import EditStatus from './pages/admin/ProjectDetails/Status/EditStatus';
import LocationInfo from './pages/admin/ProjectDetails/LocationInfo/LocationInfo';
import AddLocationInfo from './pages/admin/ProjectDetails/LocationInfo/AddLocationInfo';
import EditLocationInfo from './pages/admin/ProjectDetails/LocationInfo/EditLocationInfo';
import MetaData from './pages/admin/MetaData/MetaData';
import AddMetaData from './pages/admin/MetaData/AddMetaData';
import EditMetaData from './pages/admin/MetaData/EditMetaData';
import ProjectEnquiry from './pages/admin/Projects/ProjectEnquiry';
import CSRBanners from './pages/admin/CSRBanners/CSRBanners';
import AddCSRBanners from './pages/admin/CSRBanners/AddCSRBanners';
import EditCSRBanners from './pages/admin/CSRBanners/EditCSRBanners';
import AdminCSR from './pages/admin/CSR/CSR';
import AddCSR from './pages/admin/CSR/AddCSR';
import EditCSR from './pages/admin/CSR/EditCSR';
import PrivacyPolicy from './pages/user/PrivacyPolicy';
import TermsConditions from './pages/user/TermsConditions';

const App = () => {
  return (
    <>
      <BrowserRouter>

               <ToastContainer position="top-right" style={{ marginTop: "70px" }} autoClose={3000} />

         <Routes>
 
         <Route path='/' element={<Home />} />
         <Route path='/home1' element={<Home1 />} />

         <Route path='/about-us' element={<AboutUs />} />
        
          {/* blog pages internal */}
         <Route path='/blog/:title' element={<BlogDetailOne />} />
         {/* <Route path='/top-10-reasons-to-buy-a-home-in-bandra' element={<BlogDetailTwo />} />
         <Route path='/bandra-best-kept-secret-luxury-living-on-a-budget' element={<BlogDetailThree />} />
         <Route path='/investing-in-Bandra-future-affordable-luxury-homes' element={<BlogDetailFour />} />
         <Route path='/get-your-dream-home-mumbai-how-to-secure-the-right-home-loan' element={<BlogDetailFive />} />
         <Route path='/how-to-get-a-home-loan-to-buy-a-home-in-mumbai' element={<BlogDetailSix />} /> */}
<Route path='/privacy-policy' element={<PrivacyPolicy />} />
      <Route path='/terms-and-conditions' element={<TermsConditions />} />
         <Route path='/blogs' element={<Blogs />} />
         <Route path='/contact-us' element={<ContactUs />} />
         <Route path='/csr' element={<CSR />} />
         <Route path='/emi-calculator' element={<EMICalculator />} />
         <Route path='/faqs' element={<FAQs />} />
         <Route path='/news' element={<News />} />
         <Route path='/project/:name' element={<GulmoharAvenue />} />
         {/* <Route path='/prabhat-darshan' element={< PrabhatDarshan/>} /> */}
         <Route path='/projects' element={<Projects />} />
         <Route path='/resources' element={<Resources />} />
         <Route path='/stamp-duty-calculator' element={<StampDutyCalculator />} />


          <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminRoutes />}>
          <Route path="dashboard" element={<DashBoard />} />

          <Route path="home-banners" element={<HomeBanner />} />
          <Route path="add/home-banners" element={<AddHomeBanner />} />
          <Route path="edit/home-banners/:id" element={<EditHomeBanner />} />

          <Route path="counters" element={<Counter />} />
          <Route path="add/counters" element={<AddCounter />} />
          <Route path="edit/counters/:id" element={<EditCounter />} />

          <Route path="testimonials" element={<Testimonials />} />
          <Route path="add/testimonials" element={<AddTestimonial />} />
          <Route path="edit/testimonials/:id" element={<EditTestimonial />} />

          <Route path="banners" element={<Banners />} />
          <Route path="add/banners" element={<AddBanner />} />
          <Route path="edit/banners/:id" element={<EditBanner />} />

          <Route path="awards-recognition" element={<Awards />} />
          <Route path="add/awards-recognition" element={<AddAward />} />
          <Route path="edit/awards-recognition/:id" element={<EditAward />} />

          <Route path="faq-categories" element={<FAQCategory />} />
          <Route path="add/faq-categories" element={<AddFAQCategory />} />
          <Route path="edit/faq-categories/:id" element={<EditFAQCategory />} />

          <Route path="faq-contents" element={<FAQContent />} />
          <Route path="add/faq-contents" element={<AddFAQContent />} />
          <Route path="edit/faq-contents/:id" element={<EditFAQContent />} />

          <Route path="edit/csr" element={<EditCSR />} />

          <Route path="edit/stamp-duty-calculator" element={<StampDuty />} />

          <Route path="news-worthy-mentions" element={<NewsWorthy />} />
          <Route path="add/news-worthy-mentions" element={<AddNewsWorthy />} />
          <Route path="edit/news-worthy-mentions/:id" element={<EditNewsWorthy />} />

          <Route path="contact-responses" element={<ContactResponse />} />
          <Route path="contact-contents" element={<ContactContent />} />

          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="add/blogs" element={<AddBlog />} />
          <Route path="edit/blogs/:id" element={<EditBlog />} />

          <Route path="blog-faqs" element={<BlogFAQ />} />
          <Route path="add/blog-faqs" element={<AddBlogFaq />} />
          <Route path="edit/blog-faqs/:id" element={<EditBlogFaq />} />

          <Route path="projects" element={<Project />} />
          <Route path="add/projects" element={<AddProject />} />
          <Route path="edit/projects/:id" element={<EditProject />} />

          <Route path="abouts" element={<About />} />
          <Route path="add/abouts" element={<AddAbout />} />
          <Route path="edit/abouts/:id" element={<EditAbout />} />

          <Route path="feature-contents" element={<FeaturesContent />} />
          <Route path="add/feature-contents" element={<AddFeaturesContent />} />
          <Route path="edit/feature-contents/:id" element={<EditFeaturesContent />} />

          <Route path="features" element={<Features />} />
          <Route path="add/features" element={<AddFeature />} />
          <Route path="edit/features/:id" element={<EditFeature />} />

          <Route path="site-plans" element={<SitePlan />} />
          <Route path="add/site-plans" element={<AddSitePlan />} />
          <Route path="edit/site-plans/:id" element={<EditSitePlan />} />

          <Route path="highlights" element={<Highlights />} />
          <Route path="add/highlights" element={<AddHighlight />} />
          <Route path="edit/highlights/:id" element={<EditHighlight />} />

          <Route path="amenities" element={<Amenities />} />
          <Route path="add/amenities" element={<AddAmenity />} />
          <Route path="edit/amenities/:id" element={<EditAmenity />} />

          <Route path="gallery" element={<Gallery />} />
          <Route path="add/gallery" element={<AddGallery />} />
          <Route path="edit/gallery/:id" element={<EditGallery />} />

          <Route path="banks" element={<Banks />} />
          <Route path="add/banks" element={<AddBank />} />
          <Route path="edit/banks/:id" element={<EditBank />} />

          <Route path="project-faqs" element={<ProjectFAQ />} />
          <Route path="add/project-faqs" element={<AddProjectFAQ />} />
          <Route path="edit/project-faqs/:id" element={<EditProjectFAQ />} />

          <Route path="disclaimers" element={<Disclaimers />} />
          <Route path="add/disclaimers" element={<AddDisclaimer />} />
          <Route path="edit/disclaimers/:id" element={<EditDisclaimer />} />

          <Route path="current-status" element={<Status />} />
          <Route path="add/current-status" element={<AddStatus />} />
          <Route path="edit/current-status/:id" element={<EditStatus />} />

          <Route path="location" element={<LocationInfo />} />
          <Route path="add/location" element={<AddLocationInfo />} />
          <Route path="edit/location/:id" element={<EditLocationInfo />} />

          <Route path="meta-data" element={<MetaData />} />
          <Route path="add/meta-data" element={<AddMetaData />} />
          <Route path="edit/meta-data/:id" element={<EditMetaData />} />

          <Route path="project-enquiries" element={<ProjectEnquiry />} />

          <Route path="csr-banners" element={<CSRBanners />} />
          <Route path="add/csr-banners" element={<AddCSRBanners />} />
          <Route path="edit/csr-banners/:id" element={<EditCSRBanners />} />

          <Route path="csr" element={<AdminCSR />} />
          <Route path="add/csr" element={<AddCSR />} />
          <Route path="edit/csr/:id" element={<EditCSR />} />

          </Route>
         </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
