import React, { useState } from 'react';

const accordionItems = [
  {
    id: '1',
    title: 'Is the land/plot vacant?',
    content: [
      'Yes'
    ]
  },
  {
    id: '2',
    title: 'Whether title is clear for the land?',
    content: [
      'Yes',
    ]
  },
  {
    id: '3',
    title: 'Whether plan is sanctioned from Competent Authority?',
    content: [
      'Yes',
    ]
  },
  {
    id: '4',
    title: 'What are the chances of the plans getting altered after receiving all the permissions?',
    content: [
      'Plans won’t be changed after receiving all the permissions',
    ]
  },
  {
    id: '5',
    title: 'Can we see the buildings I.O.D. and Commencement Certificate?',
    content: [
      'Yes'
    ]
  },
  {
    id: '6',
    title: 'When you will get the O.C. for the building?',
    content: [
      'As mentioned in the agreement'
    ]
  },
  {
    id: '7',
    title: 'When the Agreement will get registered?',
    content: [
      'After paying 10% of the Agreement Value'
    ]
  },
  {
    id: '8',
    title: 'Which documents we have to submit?',
    content: [
     'PAN',
      'Aadhar',
      'Photographs',
    ]
  },
  {
    id: '9',
    title: 'Have you got all required Environmental Clearances & NOCs?',
    content: [
        'Yes',
    ]
  },
  {
    id: '10',
    title: 'Does the Agreement for Sale have to be registered?',
    content: [
        'Yes',
    ]
  },
  {
    id: '11',
    title: 'What will be the height of the building?',
    content: [
        '50.45 mt (G + 15)',
    ]
  },
  {
    id: '12',
    title: 'When the Construction starting?',
    content: [
        'Construction has started',
    ]
  },
  {
    id: '13',
    title: 'Date of first slab casting of my wing/building',
    content: [
        'Nov 17',
    ]
  },
  {
    id: '14',
    title: 'Date of finishing construction and obtaining OC',
    content: [
        'IOct 2019 for phase 1',
    ]
  },
  {
    id: '15',
    title: 'Date of handing over possessions',
    content: [
        'Oct 2019 for phase 1',
    ]
  },
  {
    id: '16',
    title: 'How many flats can I purchase in this scheme?',
    content: [
        'As many as you want',
    ]
  },
  {
    id: '17',
    title: 'When will the society be formed?',
    content: [
        'Society will be formed after obtaining OC',
    ]
  },
  {
    id: '18',
    title: 'What if there is a delay in the possession of the flat?',
    content: [
        'As per RERA, you will be paid penalty and as mentioned in agreement.',
    ]
  },
  {
    id: '19',
    title: 'Is the project RERA complied & registered under RERA??',
    content: [
        'Yes',
    ]
  },
  {
    id: '20',
    title: 'What is the total area that you are going to develop?',
    content: [
        '2023.1 sq mt',
    ]
  },
  {
    id: '21',
    title: 'Number of floors, units per floor?',
    content: [
        '15 floors, 4 units per floor',
    ]
  },
  {
    id: '22',
    title: 'When do I have to pay the booking amount and how much?',
    content: [
        'Booking amount has to be paid when you plan to buy the flat. The amount will be Rs. 51,000 /-',
    ]
  },
  {
    id: '23',
    title: 'Terms and Conditions you mentioned specifications may change as per the project requirement. But you have to construct as per plan showed at the time of booking. Will it be OK?',
    content: [
        'There will be no changes',
    ]
  },
  {
    id: '24',
    title: 'Due to unforeseen reason if you are unable to allot us apartment you will refund the amount with @ 12% interest and any delay we have to pay you by 18% interest. Is it a fair deal?',
    content: [
        'State Bank of India highest marginal cost of Lending Rate +2% for both parties',
    ]
  },
  {
    id: '25',
    title: "What is Advance Maintenance Charges? And how many years' maintenance chargers it will cover?",
    content: [
        'Adv. Maintenance charges covers common areas light bill, watchman, liftmen salaries, water charges etc.12 months advance maintenance charges will be collected',
    ]
  },
  {
    id: '26',
    title: 'Will I get benefits of Capital gain if I sell the purchased flat after 2 years from the date of Sale agreement even at the time of these sale the possession is still not handed over to me?',
    content: [
        'Yes',
    ]
  },
  {
    id: '27',
    title: 'Can a NRI invest in immovable property in India & what documents are required for acquisition of property?',
    content: [
        'Yes a NRI can invest and only POI No. is required.',
    ]
  },
  {
    id: '28',
    title: 'What documents are required from an Estate Agent in order to sell a developer’s flat?',
    content: [
        'The Estate Agent needs to enter into an agreement with the developer in order to be able to sell developers flat. He needs to be RERA registered and should provide a valid RERA ID. Once this procedure is completed the Estate Agent is eligible to sell flats and will get a standard commission on sale of each flat.',
    ]
  },
];

const FaqProjectDetailPD = () => {
      const [activeId, setActiveId] = useState('1'); // Default open itemYes
    
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
  <div className="container my-4">
      <div className="row">
        <div className="col-md-6">{renderAccordion(col1Items)}</div>
        <div className="col-md-6">{renderAccordion(col2Items)}</div>
      </div>
    </div>
    </>
  )
}

export default FaqProjectDetailPD