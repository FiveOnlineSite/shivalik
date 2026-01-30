import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import SidebarAccordion from "../organisms/SidebarAccordion";

const AdminSidebar = () => {
  const { auth, setAuth } = useAuth();

  const [openAccordion, setOpenAccordion] = useState(null);

  const handleAccordionToggle = (key) => {
    setOpenAccordion((prev) => (prev === key ? prev : key));
  };

  const handleLogout = () => {
    setAuth({
      user: null,
      access_token: "",
    });
    localStorage.removeItem("access_token");
  };

  if (!auth) {
    // Handle case when auth is not defined
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="sidebar-brand">
        <NavLink to="/admin/dashboard">
          <img
            className="admin-logo"
            src="/images/logo.svg"
            alt="Logo"
            loading="lazy"
          />{" "}
          {/* <span>Shivalik</span> */}
        </NavLink>
      </div>
      <div className="sidebar-menu">
        <ul>
          <li>
            <NavLink to="/admin/dashboard" className="nav-link" title="Home">
              <span className="las la-home"></span> <span>Dashboard</span>
            </NavLink>
          </li>

          <SidebarAccordion
            title="Home"
            iconClass="las la-home"
            isOpen={openAccordion === "home"}
            toggleOpen={() => handleAccordionToggle("home")}
            links={[
              {
                to: "/admin/home-banners",
                linkIcon: "las la-tasks",
                label: "Home Banners",
              },
              {
                to: "/admin/counters",
                linkIcon: "las la-home",
                label: "Counters",
              },
              {
                to: "/admin/testimonials",
                linkIcon: "las la-home",
                label: "Testimonials",
              },
            ]}
          />

             <li>
            <NavLink to="/admin/banners" title="Banners">
              <span className="las la-cogs"></span> <span>Banners</span>
            </NavLink>
          </li>
         
          <li>
            <NavLink to="/admin/awards-recognition" title="Awards & Recognition">
              <span className="las la-cogs"></span> <span>Awards & Recognition</span>
            </NavLink>
          </li>

          <SidebarAccordion
            title="FAQ"
            iconClass="las la-home"
            isOpen={openAccordion === "faq"}
            toggleOpen={() => handleAccordionToggle("faq")}
            links={[
              {
                to: "/admin/faq-categories",
                linkIcon: "las la-home",
                label: "FAQ Category",
              },
              {
                to: "/admin/faq-contents",
                linkIcon: "las la-home",
                label: "FAQ Content",
              },
              
            ]}
          />

          <SidebarAccordion
            title="CSR"
            iconClass="las la-home"
            isOpen={openAccordion === "csr"}
            toggleOpen={() => handleAccordionToggle("csr")}
            links={[
              {
                to: "/admin/csr-banners",
                linkIcon: "las la-home",
                label: "CSR Banners",
              },
              {
                to: "/admin/csr",
                linkIcon: "las la-home",
                label: "CSR",
              },
              
            ]}
          />

           <li>
            <NavLink to="/admin/edit/stamp-duty-calculator" title="Stamp Duty Calculator">
              <span className="las la-cogs"></span> <span>Stamp Duty Calculator</span>
            </NavLink>
          </li>

         <li>
            <NavLink to="/admin/news-worthy-mentions" title="News & Worthy Mentions">
              <span className="las la-cogs"></span> <span>News & Worthy Mentions</span>
            </NavLink>
          </li>

           <SidebarAccordion
            title="Blogs"
            iconClass="las la-home"
            isOpen={openAccordion === "blogs"}
            toggleOpen={() => handleAccordionToggle("blogs")}
            links={[
              {
                to: "/admin/blogs",
                linkIcon: "las la-home",
                label: "Blogs",
              },
              {
                to: "/admin/blog-faqs",
                linkIcon: "las la-home",
                label: "Blog FAQ",
              },
              
            ]}
          />

          <SidebarAccordion
            title="Contact Us"
            iconClass="las la-home"
            isOpen={openAccordion === "contact"}
            toggleOpen={() => handleAccordionToggle("contact")}
            links={[
              
              {
                to: "/admin/contact-responses",
                linkIcon: "las la-home",
                label: "Contact Responses",
              },
              {
                to: "/admin/contact-contents",
                linkIcon: "las la-home",
                label: "Contact Contents",
              },

            ]}
          />

          <SidebarAccordion
            title="Projects"
            iconClass="las la-home"
            isOpen={openAccordion === "projects"}
            toggleOpen={() => handleAccordionToggle("projects")}
            links={[
              {
                to: "/admin/projects",
                linkIcon: "las la-home",
                label: "Projects",
              },
              {
                to: "/admin/project-enquiries",
                linkIcon: "las la-home",
                label: "Project Enquiries",
              },
            ]}
          />

          <SidebarAccordion
            title="Project Details"
            iconClass="las la-home"
            isOpen={openAccordion === "project-details"}
            toggleOpen={() => handleAccordionToggle("project-details")}
            links={[
              {
                to: "/admin/abouts",
                linkIcon: "las la-home",
                label: "About",
              },
              {
                to: "/admin/feature-contents",
                linkIcon: "las la-home",
                label: "Features Content",
              },
              {
                to: "/admin/features",
                linkIcon: "las la-home",
                label: "Features",
              },
              {
                to: "/admin/highlights",
                linkIcon: "las la-home",
                label: "Highlights",
              },
              {
                to: "/admin/amenities",
                linkIcon: "las la-home",
                label: "Amenities",
              },
              {
                to: "/admin/site-plans",
                linkIcon: "las la-home",
                label: "Site Plans",
              },
              {
                to: "/admin/location",
                linkIcon: "las la-home",
                label: "Location Info",
              },
              {
                to: "/admin/gallery",
                linkIcon: "las la-home",
                label: "Gallery",
              },
              {
                to: "/admin/project-faqs",
                linkIcon: "las la-home",
                label: "FAQ",
              },
              {
                to: "/admin/current-status",
                linkIcon: "las la-home",
                label: "Current Status",
              },
              {
                to: "/admin/banks",
                linkIcon: "las la-home",
                label: "Bank Tie-Ups",
              },
               {
                to: "/admin/disclaimers",
                linkIcon: "las la-home",
                label: "Disclaimers",
              },
               
            ]}
          />

          <li>
            <NavLink to="/admin/meta-data" title="Meta Data">
              <span className="las la-cogs"></span> <span>Meta Data</span>
            </NavLink>
          </li>
         
          <li className="logout-menu" title="Logout">
            <NavLink to="/login" onClick={handleLogout}>
              <span className="las la-sign-out-alt"></span> <span>Logout</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminSidebar;
