import React, { useState } from 'react';

const accordionItems = [
  {
    id: '1',
    title: 'Which is the most luxurious area in Mumbai?',
    content: [
      'South Bombay is considered to be the most luxurious area in Mumbai. Although you are looking for a luxurious yet affordable place, Bandra is a preferred option.'
    ]
  },
  {
    id: '2',
    title: 'How much money do you need to live comfortably in Mumbai?',
    content: [
      'The cost of living in Mumbai can vary from Rs 40,000 to 1 lakh, depending on your family size and your neighbourhood.',
    ]
  },
 
  
];




const BlogDetailFaqsThree = () => {
    const [activeId, setActiveId] = useState('1'); // Default open item
    const handleToggle = (id) => {
        setActiveId(prev => (prev === id ? '' : id));
    };

  // Split items into two columns
  const midpoint = Math.ceil(accordionItems.length / 2);
  const col1Items = accordionItems.slice(0, midpoint);
  const col2Items = accordionItems.slice(midpoint);

 const renderAccordion = (items) => (
  <div className="accordion" id="accordionParent">
    {items.map((item) => (
      <div className="accordion-item" key={item.id}>
        <h2 className="accordion-header" id={`heading${item.id}`}>
          <button
            className={`accordion-button ${activeId === item.id ? '' : 'collapsed'}`}
            type="button"
            onClick={() => handleToggle(item.id)}
            aria-expanded={activeId === item.id}
            aria-controls={`collapse${item.id}`}
          >
            {item.title}
          </button>
        </h2>
        <div
          id={`collapse${item.id}`}
          className={`accordion-collapse collapse ${activeId === item.id ? 'show' : ''}`}
          aria-labelledby={`heading${item.id}`}
          data-bs-parent="#accordionParent"
        >
          <div className="accordion-body">
            {item.content.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
);

  return (
    <>
    <div className=" my-4">
      <div className="row">
        <div className="col-md-6">{renderAccordion(col1Items)}</div>
        <div className="col-md-6">{renderAccordion(col2Items)}</div>
      </div>
    </div>
    </>
  )
}

export default BlogDetailFaqsThree;