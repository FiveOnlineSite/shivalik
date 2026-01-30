// SideNav.js
import React, { useState } from "react";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openNav = () => setIsOpen(true);
  const closeNav = () => setIsOpen(false);

  return (
    <>
      <div className={`sidenav ${isOpen ? "open" : ""}`}>
        <a className="closebtn" onClick={closeNav}>&times;</a>
        <a href="/about-us">About Us</a>
        <a href="/projects">Projects</a>
        <a href="/csr">CSR</a>
        <a href="/faqs">FAQs</a>
        <a href="/emi-calculator">EMI Calculator</a>
        <a href="/stamp-duty-calculator">Stamp Duty Calculator</a>
        <a href="/news">News</a>
        <a href="/blogs">Blogs</a>
        <a href="/contact-us">Contact</a>
      </div>

      <div className='text-end' style={{ fontSize: "30px", cursor: "pointer" }} onClick={openNav}>
        <span className='firstline'></span>
        <span className='secline'></span>
        <span className='thirdline'></span>
      </div>
    </>
  );
};

export default SideNav;
