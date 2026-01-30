import React, { useState } from 'react';
import NewsBox from '../molecules/NewsBox';

const worthyData = [
  {
    image: "images/news/worthy1.jpg",
    title: "Budget Reaction",
    source: "NBM & CW Magazine",
    date: "January 2018",
        url: "/",
    showArrow: true,
  },
  {
    image: "images/news/worthy2.jpg",
    title: "Pre-budget coverage of Shivalik Ventures",
    source: "Vyapaar",
    date: "31 January 2018",
    url: "/",
    showArrow: true,
  },
  {
    image: "images/news/worthy3.jpg",
    title: "Pre-budget coverage of Shivalik Ventures",
    source: "Prahaar",
    date: "30 January 2018",
        url: "/",
    showArrow: true,
  },
  {
    image: "images/news/worthy4.jpg",
    title: "Budget 2018: Top 5 expectations of real estate experts",
    source: "99acres",
    date: "25 January 2018",
    url: "/https://www.99acres.com/articles/budget-2018-top-5-expectations-of-real-estate-experts.html",
    showArrow: true,
  },
  
];

const WorthyMentionsColList = () => {
const [selectedIndex, setSelectedIndex] = useState(null);
const INITIAL_COUNT = Math.min(6, worthyData.length); // Adjust for short lists
const LOAD_INCREMENT = 3;
const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);


  const handleClose = () => setSelectedIndex(null);
  const handlePrev = () =>
    setSelectedIndex((prev) => (prev - 1 + worthyData.length) % worthyData.length);
  const handleNext = () =>
    setSelectedIndex((prev) => (prev + 1) % worthyData.length);

  const handleLoadMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + LOAD_INCREMENT, worthyData.length)
    );
  };

  const handleViewLess = () => {
    setVisibleCount(INITIAL_COUNT);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Optional: Scroll back to top
  };

  return (
    <>
      <div className='row'>
        {worthyData.slice(0, visibleCount).map((item, index) => (
          <NewsBox key={index} item={item} index={index} onClick={setSelectedIndex} />
        ))}
      </div>

           {selectedIndex !== null && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={worthyData[selectedIndex].image}
              alt="Large View"
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

      {/* Only show View More/View Less if there are more than 6 items */}
{worthyData.length > INITIAL_COUNT && (
  <div className="text-start mt-4">
    {visibleCount < worthyData.length ? (
      <button className="mr-btn border-0" onClick={handleLoadMore}>
        View More
        <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
          <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" />
        </svg>
      </button>
    ) : (
      <button className="mr-btn border-0" onClick={handleViewLess}>
        View Less
        <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
          <path d="M8 13h12v-2H8V8l-4 4 4 4z" />
        </svg>
      </button>
    )}
  </div>
)}

    </>
  );
};

export default WorthyMentionsColList;
