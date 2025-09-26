import React, { useEffect, useState } from 'react';
import NewsBox from '../molecules/NewsBox';
import axios from 'axios';

// const newsData = [
//   {
//     image: "images/news/news1.png",
//     title: "Shivalik Venture launches 3rd phase of Bandra North – Gulmohar Avenue",
//     source: "Gujarat Samachar",
//     date: "12th March 2019",
//   },
//   {
//     image: "images/news/news2.png",
//     title: "Shivalik Venture launches 3rd phase of Bandra North – Gulmohar Avenue",
//     source: "Navrashtra",
//     date: "11th March 2019",
//   },
//   {
//     image: "images/news/news3.png",
//     title: "Shivalik Venture launches 3rd phase of Bandra North – Gulmohar Avenue",
//     source: "Shivner",
//     date: "11th March 2019",
//   },
//   {
//     image: "images/news/news4.png",
//     title: "Shivalik Venture launches 3rd phase of Bandra North – Gulmohar Avenue",
//     source: "Lokmat",
//     date: "1st March 2019",
//   },
//   {
//     image: "images/news/news5.png",
//     title: "Shivalik Venture launches 3rd phase of Bandra North – Gulmohar Avenue",
//     source: "Loksatta",
//     date: "28th Feb 2019",
//   },
//   {
//     image: "images/news/news6.png",
//     title: "Shivalik Venture launches 3rd phase of Bandra North – Gulmohar Avenue",
//     source: "Architecture Update",
//     date: "24th February 2019",
//     url: "https://architectureupdate.in/shivalik-venture-launches-3rd-phase-of-bandra-north-gulmohar-avenue/",
//     showArrow: true,
//   },
//   {
//     image: "images/news/news9.jpg",
//     title: "Shivalik Venture launches 3rd phase of Bandra North – Gulmohar Avenue",
//     source: "HT",
//     date: "23rd Feb 2019",
//   },
//   {
//     image: "images/news/news7.jpg",
//     title: "Shivalik Venture launches 3rd phase of Bandra North – Gulmohar Avenue",
//     source: "Midday",
//     date: "22nd Feb 2019",
//   },
//   {
//     image: "images/news/news8.jpg",
//     title: "Shivalik Venture Set To Launch Gulmohar Avenue",
//     source: "Infrabuddy.com",
//     date: "19th February 2019",
//     url: "https://www.hugedomains.com/domain_profile.cfm?d=infrabuddy.com&utm_source=hdrhttpstest",
//     showArrow: true,
//   },
//   {
//     image: "images/news/news10.png",
//     title: "Shivalik Venture launches third and final phase of ‘Bandra North - Gulmohar Avenue’",
//     source: "Devdiscourse",
//     date: "14 Feb 2019",
//     url: "https://www.devdiscourse.com/article/business/381454-shivalik-venture-launches-third-and-final-phase-of-bandra-north---gulmohar-avenue",
//     showArrow: true,
//   },
//   {
//     image: "images/news/news11.png",
//     title: "Shivalik Venture launches third and final phase of ‘Bandra North – Gulmohar Avenue’",
//     source: "The Property Times",
//     date: "13 Feb 2019",
//     url: "https://thepropertytimes.in/shivalik-venture-launches-third-final-phase-bandra-north-gulmohar-avenue/",
//     showArrow: true,
//   },
//   {
//     image: "images/news/news12.jpg",
//     title: "गुलमोहर एवेन्यू का तीसरा चरण पेश’",
//     source: "Navbharat",
//     date: "12 Feb 2019",
//     url: "https://epaper.navbharatlive.com/?edn=Mumbai&isid=NAVABHARAT_MUM_20190212&pid=NAVABHARAT_MUM#Page/7/Article/NAVABHARAT_MUM_20190212_7_19/76px/1200951",
//     showArrow: true,
//   },
//   {
//     image: "images/news/news13.jpg",
//     title: "गुलमोहर एवेन्यू का तीसरा चरण लॉन्च",
//     source: "Janswabhiman",
//     date: "12 Feb 2019",
//   },
//   {
//     image: "images/news/news14.jpg",
//     title: "शिवालिक वेंचरद्वारे ‘बांद्रा नॉर्थ – गुलमोहर अॅव्हेन्यू’च्या तिसऱ्या टप्प्याचा शुभारंभ",
//     source: "Arthniti Magazine",
//     date: "09 Feb 2019",
//     url: "https://arthnitimagazine.blogspot.com/2019/02/blog-post_80.html?m=1",
//     showArrow: true,
//   },
//   {
//     image: "images/news/news15.jpg",
//     title: "Shivalik Ventures receiving award at 'MID DAY REAL ESTATE ICONS' held on 21st Dec 2018",
//     source: "MID DAY",
//     date: "28 Dec 2018",
//     url: "https://epaper2.mid-day.com/epaper/28-12-2018-252-archive-edition-Mumbai-Page-1.html",
//     showArrow: true,
//   },
//   {
//     image: "images/news/news16.jpg",
//     title: "Shivalik Ventures wins Emerging Developer Award. Award received by Vineeta Ajgaonkar, VP - Sales & Marketing - Shivalik Ventures",
//     source: "Hindustan Times",
//     date: "31 October 2018",
  
//   },
//   {
//     image: "images/news/news17.jpg",
//     title: "व्यक्ति को सक्षम करने की दिशा में शिवालिक",
//     source: "Navbharat",
//     date: "18 March 2018",
//     url: "https://epaper.navbharatlive.com/",
//     showArrow: true,
//   },
//   {
//     image: "images/news/news18.jpg",
//     title: "The Bandra North project by Shivalik Ventures offers home with an excellent lifestyle...",
//     source: "DNA",
//     date: "17 March 2018",
//     url: "",
//     showArrow: true,
//   },
//   {
//     image: "images/news/news19.jpg",
//     title: "Living within city limits",
//     source: "Mid-Day",
//     date: "16 March 2018",
//     url: "",
//     showArrow: true,
//   },
//   {
//     image: "images/news/news20.jpg",
//     title: "Buyer aspirations fulfilled",
//     source: "DNA",
//     date: "10 March 2018",
//     url: "",
//     showArrow: true,
//   },
//   {
//     image: "images/news/news21.jpg",
//     title: "शिवालिक व्हेंचर्सचा पश्चिम उपनगरात प्रकल्प",
//     source: "Loksatta",
//     date: "27 February 2018",
//     url: "https://epaper.loksatta.com/Mumbai-marathi-epaper?eid=7&edate=27/02/2018#page/10/1",
//     showArrow: true,
//   },
//   {
//     image: "images/news/news22.jpg",
//     title: "Bandra North project by Shivalik Ventures gets an overwhelming response",
//     source: "Hindustan Times",
//     date: "24 February 2018",
//     url: "",
//     showArrow: true,
//   },
//   {
//     image: "images/news/news23.jpg",
//     title: "Shivalik Ventures’ Project ‘Bandra North’ Receives Overwhelming Response",
//     source: "Realtynxt",
//     date: "24 February 2018",
//     url: "https://realtynxt.com/residential-news/2018-02-23/shivalik-ventures-project-bandra-north-receives-overwhelming-response",
//     showArrow: true,
//   },
//   {
//     image: "images/news/news24.jpg",
//     title: "Bandra North project gets an overwhelming response",
//     source: "City Air News",
//     date: "19 February 2018",
//     url: "",
//     showArrow: true,
//   },
//   {
//     image: "images/news/news25.jpg",
//     title: "Bandra North project gets an overwhelming response",
//     source: "Magic Bricks",
//     date: "19 February 2018",
//     url: "https://content.magicbricks.com/property-news/industry-buzz/bandra-north-project-gets-an-overwhelming-response/97399.html",
//     showArrow: true,
//   },
//   {
//     image: "images/news/news26.jpg",
//     title: "शिवालिक व्हेंचर्स आकर्षक प्रकल्प",
//     source: "Prahaar",
//     date: "17 February 2018",
//     url: "",
//     showArrow: true,
//   },
//   {
//     image: "images/news/news27.jpg",
//     title: "'बी मुंबईकर' सार्थ करणारे शिवालिक व्हेंचर्स",
//     source: "Navarashtra",
//     date: "16 February 2018",
//     url: "",
//     showArrow: true,
//   },
//   {
//     image: "images/news/news28.jpg",
//     title: "Shivalik Ventures launches its most-awaited premium residential project in Mumbai",
//     source: "99acres",
//     date: "10 February 2018",
//     url: "https://www.99acres.com/articles/shivalik-ventures-launches-its-most-awaited-premium-residential-project-in-mumbai.html",
//     showArrow: true,
//   },
//   {
//     image: "images/news/news29.jpg",
//     title: "Shivalik Ventures launches most awaited residential Bandra North project",
//     source: "Magicbricks",
//     date: "10 February 2018",
//     url: "https://content.magicbricks.com/property-news/industry-buzz/shivalik-ventures-launches-most-awaited-residential-bandra-north-project/97203.html",
//     showArrow: true,
//   },
//   {
//     image: "images/news/news30.jpg",
//     title: "शिवालिक व्हेंचर्स करणार घराचे स्वप्न पूर्ण",
//     source: "Saamna",
//     date: "10 February 2018",
//     url: "",
//     showArrow: true,
//   },
//   {
//     image: "images/news/news31.jpg",
//     title: "Shivalik Ventures launches residential 'Bandra North' Projects",
//     source: "Mid-Day",
//     date: "9 February 2018",
//     url: "",
//     showArrow: true,
//   },
//   {
//     image: "images/news/news32.jpg",
//     title: "NCCCL bags 'Bandra North",
//     source: "Asian Age",
//     date: "8 February 2018",
   
//   },
//   {
//     image: "images/news/news33.jpg",
//     title: "Shivalik Ventures launches most awaited residential Bandra North project",
//     source: "City Air News",
//     date: "8 February 2018",
//     url: "",
//     showArrow: true,
//   },
//   {
//     image: "images/news/news34.jpg",
//     title: "Shivalik Ventures awards Bandra North project contract to NCCCL",
//     source: "Magic Bricks",
//     date: "7 February 2018",
//     url: "https://content.magicbricks.com/property-news/industry-buzz/shivalik-ventures-awards-bandra-north-project-contract-to-new-consolidated-construction-company-limited-ncccl/97169.html",
//     showArrow: true,
//   },
//   {
//     image: "images/news/news35.jpg",
//     title: "Shivalik Ventures scaling vertical limits at affordable rates",
//     source: "City Air News",
//     date: "6 February 2018",
//     url: "",
//     showArrow: true,
//   },
//   {
//     image: "images/news/news36.jpg",
//     title: "'Shivalik Venture's leaves up to its tagline of ‘Be Mumbaikar’",
//     source: "Magic Bricks",
//     date: "22 January 2018",
//     url: "https://content.magicbricks.com/property-news/industry-buzz/shivalik-ventures-leaves-up-to-its-tagline-of-be-mumbaikar/96824.html",
//     showArrow: true,
//   },
//   {
//     image: "images/news/news37.jpg",
//     title: "शिवालिक की प्राथमिकता",
//     source: "Navbharat",
//     date: "21 January 2018",
//     url: "https://epaper.navbharatlive.com/",
//     showArrow: true,
//   },
//   {
//     image: "images/news/news38.jpg",
//     title: "शिवालिक व्हेंचर्स: घर के सामने को कारे साकार",
//     source: "Manthan",
//     date: "20 February 2018",
//     // url: "",
//     // showArrow: true,
//   },
//   {
//     image: "images/news/news39.jpg",
//     title: "वांद्र्यातील गुलमोहर: मुंबईकरांसाठी उत्तम पर्याय",
//     source: "Punya Nagari",
//     date: "18 January 2018",
//     url: "https://epaper.punyanagari.in/epaper_1_5_73_2018-1-14_a.html",
//     showArrow: true,
//   },
//   {
//     image: "images/news/news40.jpg",
//     title: "Bandra North, the new connectivity destination",
//     source: "Magic Bricks",
//     date: "16 January 2018",
//     url: "https://content.magicbricks.com/property-news/industry-buzz/bandra-north-the-new-connectivity-destination/96552.html",
//     showArrow: true,
//   },
//   {
//     image: "images/news/news41.jpg",
//     title: "Overwhelming Response For Shivalik Ventures' Bandra North Property",
//     source: "Hindustan Times",
//     date: "2 December 2017",
//     // url: "",
//     // showArrow: true,
//   },
// ];

const groupBy = (arr, key) =>
  arr.reduce((acc, item) => {
    const group = item[key] || "Uncategorized";
    acc[group] = acc[group] || [];
    acc[group].push(item);
    return acc;
  }, {});

const NewsColList = ({ data }) => {
  

    const grouped = groupBy(data, "news_category");
  const [selectedIndex, setSelectedIndex] = useState(null);
  
  const LOAD_INCREMENT = 3;
  const [visibleCount, setVisibleCount] = useState(3);

  const allItems = data;
  const handleClose = () => setSelectedIndex(null);
  const handlePrev = () =>
    setSelectedIndex((prev) => (prev - 1 + allItems.length) % allItems.length);
  const handleNext = () =>
    setSelectedIndex((prev) => (prev + 1) % allItems.length);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + LOAD_INCREMENT, allItems.length));
  };

  const handleViewLess = () => {
    setVisibleCount(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
     {Object.entries(grouped).map(([category, items]) => (
      <div key={category} className="row">
        {items.slice(0, visibleCount).map((item, index) => (
          <NewsBox
            key={index}
            item={item}
            index={index}
            onClick={setSelectedIndex}
          />
        ))}
      </div>
     ))}

      {/* Modal */}
      {selectedIndex !== null && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={allItems[selectedIndex].image[0].filepath}
              alt={allItems[selectedIndex].alt}
              className="modal-img"
            />
            <button className="prev-btn" onClick={handlePrev}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="next-btn" onClick={handleNext}>
              <i className="fas fa-chevron-right"></i>
            </button>
            <button className="close-btn" onClick={handleClose}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="text-start mt-4">
        {visibleCount < allItems.length ? (
          <button className="mr-btn border-0" onClick={handleLoadMore}>
            View More
          </button>
        ) : (
          <button className="mr-btn border-0" onClick={handleViewLess}>
            View Less
          </button>
        )}
      </div>
    </>
  );
};


export default NewsColList;
