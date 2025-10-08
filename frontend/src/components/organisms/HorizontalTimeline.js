import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';


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

  
  const [projectStatus, setProjectStatus] = useState([])

  const {name} = useParams()
  useEffect(() => {
  
      const fetchProjectStatus = async () => {
        try {
          const apiUrl = process.env.REACT_APP_API_URL;
          const response = await axios.get(`${apiUrl}/api/current-status/project/${name}`);
          const sortedData = response.data.status.sort(
          (a, b) => new Date(b.date.split("-").reverse().join("-")) - new Date(a.date.split("-").reverse().join("-"))
        ); 
        setProjectStatus(sortedData);
          console.log("status", sortedData)
        
        } catch (error) {
          console.error("Error fetching project status:", error);
        }
      };
  
      fetchProjectStatus();
    }, [name]);


    const getFillPercent = () => {
  if (!projectStatus.length) return 0;
  return (activeIndex / (projectStatus.length - 1)) * 100;
};

if (!projectStatus.length) return null;

  const activeStatus = projectStatus[activeIndex];

  return (
    <>
    <div className="timeline-wrapper">
      
      <div className="project-details">
        <p><strong>Current Status: </strong>{activeStatus.status}</p>
        <p><strong>Possession by: </strong> {new Date(
                            activeStatus.possession
                          ).toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          })}</p>
        <p><strong>MahaRERA: </strong> {activeStatus.maharera}</p>
      </div>

      <div className="timeline-container">
  <div className="timeline-scroll" ref={scrollRef}>
    <div className="timeline-line" ref={lineRef}>
      <div className="timeline-fill" style={{ width: `${getFillPercent()}%` }} />
      {projectStatus.map((status, index) => (
        <div
          key={status._id}
          className={`timeline-dot ${index === activeIndex ? 'active' : ''}`}
          onClick={() => handleDotClick(index)}
        >
          <span className="timeline-date">{new Date(
                            status.date
                          ).toLocaleDateString("en-UK", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}</span>
        </div>
      ))}
    </div>
  </div>
</div>


      <div className="timeline-images row">
          {activeStatus.images && activeStatus.images.map((image) => (   
          <div className="col-6 col-md-4 col-lg-3 mb-3" key={image._id}>
            {image.image?.[0]?.filepath && (
            <img src={image.image?.[0]?.filepath} alt={image.alt} className="img-fluid rounded" />
            )}
          </div>
        ))}
      </div>

    </div>
    </>
    
  );
};

export default HorizontalTimeline;
