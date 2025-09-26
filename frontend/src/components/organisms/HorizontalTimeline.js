import React, { useState, useRef, useEffect } from 'react';

const timelineData = [
  {
    date: '19th September 2022',
    status: 'Ongoing Construction',
    possession: 'September 2026',
    rera: 'P51800014036',
    images: ['images/timeline/sv1-thumb.png', 'images/timeline/sv-thumb.png', 'images/timeline/sv2-thumb.png', 'images/timeline/sv3-thumb.png'],
  },
  {
    date: '08 February 2020',
    status: 'Ongoing Construction',
    possession: 'December 2026',
    rera: 'P51800012025',
    images: ['images/timeline/shivalik-ventures-1-2020.png', 'images/timeline/shivalik-ventures-2-2020.png', 'images/timeline/shivalik-ventures-3-2020.png', 'images/timeline/shivalik-ventures-4-2020.png'],
  },
  {
    date: '09 July 2019',
    status: 'Ongoing Construction',
    possession: 'October 2026',
    rera: 'P51800011888',
    images: ['images/timeline/shivalik-ventures-1-2019.png', 'images/timeline/shivalik-ventures-2-2019.png', 'images/timeline/shivalik-ventures-3-2019.png', 'images/timeline/shivalik-ventures-4-2019.png'],
  },
  {
    date: '04 April 2019',
    status: 'Ongoing Construction',
    possession: 'October 2026',
    rera: 'P51800011222',
    images: ['images/timeline/shivalik-ventures-1-ap-2019.png', 'images/timeline/shivalik-ventures-2-ap-2019.png', 'images/timeline/shivalik-ventures-3-ap-2019.png', 'images/timeline/shivalik-ventures-4-ap-2019.png'],
  },
  
];

const HorizontalTimeline = () => {
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
  );
};

export default HorizontalTimeline;
