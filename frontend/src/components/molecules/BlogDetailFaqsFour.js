import React ,{useState}from 'react';

const accordionItems = [
  {
    id: '1',
    title: 'Which is the best residential area in Bandra?',
    content: [
      'Bandra North stands out as the premier residential choice in Bandra due to its exceptional connectivity and the affordability of apartments.'
    ]
  },
  {
    id: '2',
    title: 'Which is the best residential area in Bandra West?',
    content: [
      'Pali Hill is the best residential area in Bandra West as it is well-connected and offers a range of amenities.',
    ]
  },
  {
    id: '3',
    title: 'Which is the most posh area in Bandra?',
    content: [
      "Pali Hill is one of the most posh and upscale areas in Bandra West. It's known for its greenery, relatively quiet streets, and luxurious apartments and bungalows."
    ]
  },
  {
    id: '4',
    title: 'Where do celebs live in Bandra?',
    content: [
      'Celebs live in Pali Hill, Bandstand and Carter Road in Bandra. Many high-profile actors and personalities reside in the vicinity of Bandra.',
    ]
  },
  
  
];



const BlogDetailFaqsFour = () => {


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

export default BlogDetailFaqsFour;