import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


const FaqProjectDetail = () => {
  const [activeId, setActiveId] = useState(null); // Default open itemYes
  const [FAQContent, setFAQContent] = useState([]);

  const {name} = useParams()

  useEffect(() => {
  
      const fetchProjectFeatures = async () => {
        try {
          const apiUrl = process.env.REACT_APP_API_URL;
          const response = await axios.get(`${apiUrl}/api/faq/project/${name}`);
          const ProjectFAQData = response.data.FAQs;
          console.log("faq", ProjectFAQData)
          setFAQContent(ProjectFAQData);
           if (ProjectFAQData.length > 0) {
        setActiveId(ProjectFAQData[0]._id);
      }
        } catch (error) {
          console.error("Error fetching project faq:", error);
        }
      };
  
      fetchProjectFeatures();
    }, [name]);

  const handleToggle = (id) => {
    setActiveId(prev => (prev === id ? '' : id));
  };

 const renderAccordion = (items) => (
    <div className="accordion">
      {items.map((faq) => (
        <div className="accordion-item" key={faq._id}>
          <h2 className="accordion-header" id={`heading-${faq._id}`}>
            <button
              className={`accordion-button ${
                activeId === faq._id ? '' : 'collapsed'
              }`}
              type="button"
              onClick={() => handleToggle(faq._id)}
              aria-expanded={activeId === faq._id}
              aria-controls={`collapse-${faq._id}`}
            >
              {faq.question}
            </button>
          </h2>
          <div
            id={`collapse-${faq._id}`}
            className={`accordion-collapse collapse ${
              activeId === faq._id ? 'show' : ''
            }`}
            aria-labelledby={`heading-${faq._id}`}
          >
            <div className="accordion-body">
              <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const midpoint = Math.ceil(FAQContent.length / 2);
  const col1Items = FAQContent.slice(0, midpoint);
  const col2Items = FAQContent.slice(midpoint);

  return (
      <section className="bg-grey pt-5 pb-5 loan-faq">
            <div className="container">
              <div className="row justify-content-left mb-3 my-4">
              
                <div className="col-md-6">{renderAccordion(col1Items)}</div>
                <div className="col-md-6">{renderAccordion(col2Items)}</div>
              </div>
            </div>
      </section>
    );
};

export default FaqProjectDetail;