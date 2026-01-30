import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BlogDetailFaqs = () => {
  const [activeId, setActiveId] = useState(""); 
  const [BlogFAQContent, setBlogFAQContent] = useState([]);

  const handleToggle = (id) => {
    setActiveId(prev => (prev === id ? '' : id));
  };

  const { title } = useParams();

  useEffect(() => {
    const fetchFAQContent = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/blog-faq/blog/${title}`);
        const blogFAQData = response.data.blogFaqs;

        setBlogFAQContent(blogFAQData);

         if (blogFAQData.length > 0) {
        setActiveId(blogFAQData[0]._id);
      }
      } catch (error) {
        console.error('Error fetching blog faq content:', error);
      }
    };

    fetchFAQContent();
  }, [title]);

  const renderAccordion = (items, colKey) => (
    <div className="accordion" id={`accordionParent-${colKey}`}>
      {items.map((item) => (
        <div className="accordion-item" key={item._id}>
          <h2 className="accordion-header" id={`heading${item._id}`}>
            <button
              className={`accordion-button ${activeId === item._id ? '' : 'collapsed'}`}
              type="button"
              onClick={() => handleToggle(item._id)}
              aria-expanded={activeId === item._id}
              aria-controls={`collapse${item._id}`}
            >
              {item.question}
            </button>
          </h2>
          <div
            id={`collapse${item._id}`}
            className={`accordion-collapse collapse ${activeId === item._id ? 'show' : ''}`}
            aria-labelledby={`heading-${item._id}`}
            data-bs-parent={`#accordionParent-${colKey}`}
          >
            <div className="accordion-body">
              <div dangerouslySetInnerHTML={{ __html: item.answer }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (!BlogFAQContent || BlogFAQContent.length === 0) {
    return null;
  }

  // split FAQ list into 2 halves
  const midpoint = Math.ceil(BlogFAQContent.length / 2);
  const col1Items = BlogFAQContent.slice(0, midpoint);
  const col2Items = BlogFAQContent.slice(midpoint);

  return (
    <div className="my-4">
      <div className="row">
         <h5>FAQs</h5>
        <div className="col-md-6">{renderAccordion(col1Items, "col1")}</div>
        <div className="col-md-6">{renderAccordion(col2Items, "col2")}</div>
      </div>
    </div>
  );
};

export default BlogDetailFaqs;
