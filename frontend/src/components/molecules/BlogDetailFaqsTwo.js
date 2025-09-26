import React, { useState } from 'react';

const accordionItems = [
  {
    id: '1',
    title: 'What is the price of 1 BHK flat in Khar East?',
    content: [
      '1 BHK flats in Khar East (Bandra North) is around 1 Cr. Shivalik offers Gulmohar Avenue as a residential property featuring 1 & 2 BHK, where 1 BHK flats are available for around 99 lakhs.'
    ]
  },
  {
    id: '2',
    title: 'How to estimate the price of 1 BHK flat in Khar East?',
    content: [
      'You can estimate the price of 1 BHK flats in Khar East by looking at the reputation of the builder offering the flat, the location of the flat, amenities included in the society, stamp duty, registration charges and even the fee of brokerage.',
    ]
  },
  {
    id: '3',
    title: 'What is special about Bandra?',
    content: [
      "Bandra is a special place in Mumbai. It's known for its mix of cultures and being close to the sea; it's also a popular spot for celebrities, and it's easy to get around the city from there. It's a first choice for people who want to buy properties in this region due to its posh neighbourhood with lovely flats and residences."
    ]
  },
  {
    id: '4',
    title: 'Which is the best residential area in Bandra?',
    content: [
      'Bandra North is one of the best residential areas in Bandra as it offers perfect accessibility to everything and luxurious yet affordable homes. Shivalik’s Gulmohar Avenue offers affordable homes in Bandra North.',
    ]
  },
  {
    id: '5',
    title: 'Which are the best areas to buy a house in Mumbai?',
    content: [
      'Bandra is a recommended area to buy a house in Mumbai, owing to growing real estate value, excellent connectivity throughout Mumbai and affordable prices of homes.'
    ]
  },
  
];



const BlogDetailFaqsTwo = () => {
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

export default BlogDetailFaqsTwo;