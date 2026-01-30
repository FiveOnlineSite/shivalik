import React,{useState} from 'react'

const accordionItems = [
  {
    id: '1',
    title: 'What are the current home loan rates in Mumbai?',
    content: [
      'Current home loan rates in Mumbai range from 6.75%pa - 10.25%pa. However, you can directly contact financial institutions and banks or visit their local branches in Mumbai to inquire about the latest home loan rates tailored to your specific financial situation.'
    ]
  },
  {
    id: '2',
    title: 'Can I take a home loan to buy a home?',
    content: [
      "Yes, you can take a home loan to buy a home. The amount you can borrow as a home loan depends on various factors, such as your income, credit score, existing debts, and the lender's policies.",
    ]
  },
  {
    id: '3',
    title: 'How to buy a house with a 100% loan?',
    content: [
      "Obtaining a 100% home loan is difficult. No banks are allowed to lend 100% of the amount to the borrower. However, you can opt for certain government schemes or get a loan from Private lenders or NBFCs. You can even check with your real estate developer if they offer in-house financing or negotiate with your seller."
    ]
  },
  {
    id: '4',
    title: 'Is 90% home loan possible?',
    content: [
      'Obtaining a 90% home loan can be challenging. However you can negotiate with your seller, check for government schemes or search for private lenders.',
    ]
  },
  {
    id: '5',
    title: 'Which banks give 90% home loans?',
    content: [
      'Banks like SBI, HDFC can give 90% home loans. However, the percent of home loan varies depending on your income and credit score.'
    ]
  },
  {
    id: '6',
    title: 'How does a home loan work in Mumbai?',
    content: [
      'A home loan in Mumbai, like in other parts of India, works in a similar way. A general overview of how it typically works:',
      '- Eligibility Check',
      '- Loan Application',
      '- Loan Approval',
      '- Down Payment',
      '- EMIs',
      '- Repayment',
      'Before finalizing the loan, bank usually conducts a valuation of the property to ensue it is worth the amount they are lending',
      
    ]
  },
   {
    id: '7',
    title: 'How much salary is needed to buy a house in Mumbai?',
    content: [
      "The amount of salary needed to buy a house in Mumbai depends on various factors such as the property's cost, location of your property, the down payment you can make, the interest rate on the home loan, and your other financial obligations.Ideally, your EMI should not exceed 50-60% of your monthly take-home salary"
    ]
  },
   {
    id: '8',
    title: 'How much is the downpayment on a home loan in Mumbai?',
    content: [
      "The down payment on a home loan in Mumbai typically ranges from 15% to 25% of the property's value. However, this can vary based on the lending institution's policies and your eligibility."
    ]
  },
  
];


const BlogDetailFaqsSix = () => {
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

export default BlogDetailFaqsSix;