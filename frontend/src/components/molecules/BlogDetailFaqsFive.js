import React,{useState} from 'react'


const accordionItems = [
  {
    id: '1',
    title: 'How can an unemployed spouse get a home loan?',
    content: [
      'An unemployed spouse can get a home loan, but they have to apply for the home loan with a joint applicant. Many financial institutes offer the best home loan interest for spouses. Hence, it is preferred to get a home loan with your spouse as a  co-applicant.'
    ]
  },
  {
    id: '2',
    title: 'Can we get a home loan for a built house?',
    content: [
      'Yes, we can get home loans for built houses. A home loan can be used to buy a property that is already built or is still being built by a builder.',
    ]
  },
  {
    id: '3',
    title: 'How to get a loan for INR 8 lakhs immediately?',
    content: [
      "You can get INR 8 lakhs as a loan if you are at least 21 years old and have a salaried income of around 25k per month."
    ]
  },
  {
    id: '4',
    title: ' Can I get 0% home loan?',
    content: [
      'Bandra North is one of the best residential areas in Bandra as it offers perfect accessibility to everything and luxurious yet affordable homes. Shivalik’s Gulmohar Avenue offers affordable homes in Bandra North.',
    ]
  },
  {
    id: '5',
    title: 'Which are the best areas to buy a house in Mumbai?',
    content: [
      "Getting a 0% home loan is highly unlikely, if not impossible. However, interest rates can vary based on several factors. It's advisable to check with various banks and financial institutions to find the best interest rates for your home loan. Additionally, government schemes or specific bank promotions might offer lower interest rates, but it's unlikely to be 0%."
    ]
  },
  
];



  

const BlogDetailFaqsFive = () => {
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

export default BlogDetailFaqsFive;