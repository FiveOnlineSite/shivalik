import React, { useState, useRef, useEffect } from 'react';

const timelineData = [
  {
    date: '08 February 2020',
    status: 'Ongoing Construction',
    possession: 'September 2026',
    rera: 'P51800014036',
    images: ['images/timeline/Prabhat-darshan-project-01.png', 'images/timeline/Prabhat-darshan-project-02.png', 'images/timeline/Prabhat-darshan-project-03.png', 'images/timeline/Prabhat-darshan-project-04.png'],
  },
  {
    date: '04 April 2019',
    status: 'Ongoing Construction',
    possession: 'December 2026',
    rera: 'P51800012025',
    images: ['images/timeline/pd1-april-2019.png', 'images/timeline/pd2-april-2019.png', 'images/timeline/pd3-april-2019.png', 'images/timeline/pd4-april-2019.png'],
  },
  {
    date: '21 January 2019',
    status: 'Ongoing Construction',
    possession: 'October 2026',
    rera: 'P51800011888',
    images: ['images/timeline/pd1-jan-2019.png', 'images/timeline/pd2-jan-2019.png', 'images/timeline/pd3-jan-2019.png'],
  },
  {
    date: '30 November 2018',
    status: 'Ongoing Construction',
    possession: 'October 2026',
    rera: 'P51800011222',
    images: ['images/timeline/pd1-nov-2018.png', 'images/timeline/pd2-nov-2018.png', 'images/timeline/pd3-nov-2018.png'],
  },
  
];

const HorizontalTimelinePD = () => {
     const [activeIndex, setActiveIndex] = useState(0);
      const lineRef = useRef(null);
      const scrollRef = useRef(null);
    
      const scrollToActive = () => {
      const container = scrollRef.current;
      if (!container || !container.children || !container.children[activeIndex]) return; // ← check added
      const activeDot = container.children[activeIndex];
      const offset = activeDot.offsetLeft - container.offsetWidth / 2 + activeDot.offsetWidth / 2;
      container.scrollTo({ left: offset, behavior: 'smooth' });
    };
    
    
      useEffect(() => {
        scrollToActive();
      }, [activeIndex]);
    
      const handleDotClick = (index) => {
        setActiveIndex(index);
      };
    
      const getFillPercent = () => ((activeIndex) / (timelineData.length - 1)) * 100;
    
  return (
    <>
    <div className="timeline-wrapper">
      <div className="project-details">
        <p><strong>Current Status:</strong> {timelineData[activeIndex].status}</p>
        <p><strong>Possession by</strong> {timelineData[activeIndex].possession}</p>
        <p><strong>MahaRERA:</strong> {timelineData[activeIndex].rera}</p>
      </div>

      <div className="timeline-container">
        <div className="timeline-scroll" ref={scrollRef}>
          <div className="timeline-line" ref={lineRef}>
            <div className="timeline-fill" style={{ width: `${getFillPercent()}%` }} />
            {timelineData.map((item, index) => (
              <div
                key={index}
                className={`timeline-dot ${index === activeIndex ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}>
                <span className="timeline-date">{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="timeline-images row">
        {timelineData[activeIndex].images.map((img, i) => (
          <div className="col-6 col-md-4 col-lg-3 mb-3" key={i}>
            <img src={img} alt={`project-${i}`} className="img-fluid rounded" />
          </div>
        ))}
      </div>

    </div>
    </>
  )
}

export default HorizontalTimelinePD