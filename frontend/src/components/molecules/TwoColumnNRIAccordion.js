import React, { useState, useEffect, useRef } from 'react';


const accordionItems = [
  {
    id: '1',
    title: 'Who is a NRI?',
    content: [
      'Non Resident Indian (NRI) is a citizen of India, who stays abroad for employment/carrying on business or vocation outside India or stays abroad under circumstances indicating an intention for an uncertain duration of stay abroad is a non-resident. Non-resident foreign citizens of Indian Origin are treated at par with Non Resident Indian (NRIs).'
    ]
  },
  {
    id: '2',
    title: 'Who is a PIO?',
    content: [
      'Persons of Indian Origin (PIO) (not being a citizen of Pakistan or Bangladesh or Shri Lanka or Afghanistan or China or Iran or Nepal or Bhutan), who',
      'a)	At any time, held Indian passport, or',
      'b)	Who or either of whose father or whose grandfather was a citizen of India by virtue of the Constitution of India or the Citizenship Act, 1955 (57 of 1955)',
    ]
  },
  {
    id: '3',
    title: 'Who is OCI?',
    content: [
      'Any person of full age and capacity:',
      '1. Who is a citizen of another country, but was a citizen of India at the time of, or at any time after, the commencement of the constitution or',
      '2. Who is a citizen of another country, but was eligible to become a citizen of India at the time of the commencement of the constitution, or',
      '3. Who is a citizen of another country, but belongs to a territory that became part of India after the 15th Day of August 1947.',
      '4. Who is a child of such a citizen, or',
      'i.	A person, who is minor child of a person mentioned in clause',
      'ii.	Provided that no person, who is or had been a citizen of Pakistan, Bangladesh shall be eligible for registration as an Overseas Citizen of India.',
    ]
  },
  {
    id: '4',
    title: 'Documents required for buying property.',
    content: [
      '1. Pan card (Permanent Account Number)',
      '2. OCI/PIO card (In case of OCI/PIO)',
      '3. Passport (In case of NRI)',
      '4. Passport size photographs',
      '5. Address proof',
    ]
  },
  {
    id: '5',
    title: 'What is the Tax treatment for income generated from property selling or renting for NRI/PIO/OCI?',
    content: [
      'The mere acquisition of property does not attract income tax. However, any income accruing from the ownership of it, in the form of rent (if it is let out) / annual value of the house (if is not let out and it is not the only residential property owned by that person in India) and/or capital gains (short term or long term) arising on the sale of this house or part thereof is taxable in the hands of the owner.'
    ]
  },
  {
    id: '6',
    title: 'Do NRI/PIO/OCI have to file return in India for their property rental income and Capital Gains Tax?',
    content: [
      'The Government of India has granted general permission for NRI/PIO/OCI to buy property in India and they do not have to pay any taxes even while acquiring property in India. However, taxes have to be paid if they are selling this property. Rental income earned is taxable in India, and they will have to obtain a PAN and file return of income if they have rented this property. On sale of the property, the profit on sale shall be subject to capital gains. If they have held the property for less than or equal to 2 years after taking actual possession then the gains would be short term capital gains, which are to be included in their total income as tax as per the normal slab rates shall be payable and if the property has been held for more than 2 years then the resultant gain would be long term capital gains subject to 20% tax plus applicable cess.'
    ]
  },
  {
    id: '7',
    title: 'How does the Double Taxation Avoidance Agreement work in the context of tax on income and Capital Gains tax paid in India by NRI?',
    content: [
      'India has DTAA’s with several countries which give a favourable tax treatment in respect of certain heads of income. However, in case of sale of immovable property, the DTAA with most countries provide that the capital gains will be taxed in the country where the immovable property is situated. Hence the non-resident will be subject to tax in India on the capital gains which arise on the sale of immovable property in India. Letting of immovable property in India would be taxed in India under most tax treaties in view of the fact that the property is situated in India.'
    ]
  },
  {
    id: '8',
    title: 'Does Capital Gains Tax (CGT) apply to NRI/PIO/OCI?',
    content: [
      'Yes, Long-term and short-term capital gains are taxable in the hands of non-residents.'
    ]
  },
  {
    id: '9',
    title: 'How does Double Taxation Avoidance Agreement work in the context of CGT paid in India on the foreign tax treatment?',
    content: [
        'In case the non-resident pays any tax on capital gains arising in India, he would normally be able to obtain a tax credit in respect of the taxes paid in India in the home country, because the income in India would also be included in the country of tax residence. The amount of the tax credit as also the basis of computing the tax credit that can be claimed are specified in the respective country’s DTAA and is also dependent on the laws of the home country where the tax payer is a tax resident.',
    ]
  },
  {
    id: '10',
    title: 'Are NRI/PIO/OCI eligible for Housing loans to buy property from any Indian Bank?',
    content: [
        '1. An authorized dealer or a housing finance institution in India approved by the National Housing Bank may provide housing loan to a non-resident Indian or a person of Indian origin residing outside India, for acquisition of a residential accommodation in India. Subject to the following conditions, namely:',
        '2. The quantum of loans, margin money and the period of repayment shall be at par with those applicable to housing finance provided to a person residing in India.',
        '3. The loan amount shall not be credited to Non-resident External (NRE) / Foreign Currency Non-resident (FCNR)/ Non-resident non-repatriable (NRNR) account of the borrower.',
        '4. The loan shall be fully secured by equitable mortgage by deposit of title deal of the property proposed to be acquired, and if necessary, also be lien on the borrower’s other assets in India.',
        '5. The instalment of loan, interest and other charges, if any, shall be paid by the borrower by remittances from outside India through normal banking channels or out of funds in his Non-resident External (NRE) / Foreign Currency Non-resident (FCNR)/ Non-resident non-repatriable (NRNR)/ Non-resident Ordinary (NRO)/ Non-resident Special Rupee (NRSR) account in India, or out of rental income derived from renting out the property acquired by utilization of the loan or by ay relative of the borrower in India by crediting the borrower’s loan account through the bank account of such relative (The word ‘relative’ means ‘relative’ as defined in section 6 of the Companies Act 1956.)',
        '6. The rate of interest on the loan shall conform to the directives issued by the Reserve Bank of India or, as the case may be, the National Housing Bank.',
    ]
  },
  {
    id: '11',
    title: 'Eligibility for NRI',
    content: [
        'The eligibility criteria of NRIs differ from Resident Indians based on a few parameters. The parameters include:',
        'age: The loan applicant has to be at least 21 years of age.',
        'Qualification:  The NRI loan seeker has to be a graduate.',
        'Income: The loan applicant has to have a minimum monthly income of $2,000 (although, this criterion may differ across HFCs.) The eligibility is also determined by the stability and continuity of your employment or business.',
        'Payment Options:  The NRI also has to route his EMI (Equated Monthly Installments) cheques through his NRE/NRO account. He cannot make payments from another source say, his savings account in India.',
        'Number of dependants: The eligibility of the applicant is also determined by the number of dependents, assets and liabilities.',
        'An NRI applicant is eligible to get a home loan ranging from a minimum of Rs. 5 Lakhs to a maximum of Rs. 1 Crore, based on the repayment capacity and the cost of the property, which although is variable by the priorities of the home loan provider. Also Home Loan Tenure for NRIs is different from Resident Indians. An applicant will be eligible for a maximum of 85% of the cost of the property or the cost of construction as applicable and 75% of the cost of land in case of purchase of land, based on the repayment capacity of the borrower.',
        'However, a NRI can enhance his loan eligibility by applying for home loans with a co-applicant who has a separate source of income. Also, the rate of interest for home loans to NRIs is higher than those offered to Resident Indians. The difference is to the extent of 0.25%-0.50%. Some HFCs also have an internally earmarked ‘negative criterion’ for NRI home loans. As such, the NRIs who hail from locations that are marked as being ‘negative’ in the books of HFCs, find it difficult to get a home loan.',
        'RBI directive loans:  The Reserve Bank of India (RBI) has clarified that Non-Resident Indians (NRIs) and Persons of Indian (PIO), purchasing immovable property in India should pay for the acquisition by funds received in India through normal banking channels by way of inward remittance from outside the country.',
        'The NRIs and Resident Indians can also acquire immovable property in India other than agricultural property, plantation or a farmhouse. It has issued certain directive for sanctioning home loans to Non-resident Indians. The guidelines provided are:',
        'The home loan amount should not exceed 85% of the cost of the dwelling unit, as the remaining amount that is 15% needs to be provided as own contribution towards the cost of unit financed. The cost of dwelling unit which is own contribution financed less the loan amount, can be met from direct remittances from abroad through normal banning channels, the Non-Resident (External) [NR(E)] Account and/or Non-Resident (Ordinary) [NR(O)] account in India.',
        'However, repayment of the loan, comprising of the principal and interest including all the charges are to be remitted to the HFC from abroad through normal banking channels, the Non-Resident (External) [NR(E)] Account and/or Non-Resident (Ordinary) [NR(O)] account in India.',
        'The repayment option for NRIs as they can pay through the funds held in any non-resident account maintained in accordance with the provisions of the Foreign Exchange Management Act, 1999 and the regulations made by the RBI from time to time. As most of the home loan provider companies consider the economical stability of the applicant, home loans for NRIs are quite feasible, because they are well off in economic resources.',
        'Documents required for Loan  The documentation required to be submitted by the NRIs are different from the Resident Indians as they are required to submit additional documents, like copy of the passport and a copy of the works contract etc. and of course NIRs have to follow certain eligibility criteria in order to get Home Loans in India.',
        'Another vital document required while processing an NRI home loan is the power of attorney (POA). The POA is important because, since the borrower is not based in India; the HFC would need a ‘representative’ in lieu of the NRI to deal with and if needed. Although not obligatory, the POA is usually drawn on the NRI’s parents/wife/children.',
        'The documents needed for obtaining NRI home loans are:',
        '1. Passport and Visa',
        '2. A copy of the appointment letter and contract from the company employing the applicant.',
        '3. The labour card/identity card (translated in English and countersigned by the consulate) if the person is employed in the Middle East Salary certificate (in English) specifying name, date of joining, designation and salary details.',
        '4. Bank Statements for the last six months.',
        'List of Classified documents for Salaried and Self Employed NRI Applicants',
        '1. Salaried NRI Applicants',
        '2. Self-Employed NRI Applicants',
        '3. Copy of valid passport showing VISA stamps',
        '4. Passport copy with valid visa stamp',
        '5. Copy of valid visa/work permit/equivalent document supporting the NRI status of the proposed account holder',
        '6. Brief profile of the applicant and business / Trade license or equivalent document',
        '7. Overseas Bank A/C for the last 3 months showing salary credits',
        '8. 6 months overseas bank account statement and NRE/NRO account',
        '9. Latest contract copy evidencing Salary/Salary Certificate/Wages Slips',
        '10. Computation of income, P & L account and B/Sheet for last 3 years certified by the C.A. / CPA or any other relevant authority as the case may be (or equivalent company accounts)',
        'Property Documents :',
        '1. Original titled deeds tracing the title of the property for a minimum period of the last 13 years.',
        '2. Encumbrance certificate for the last 13 years',
        '3. Agreement of sale / construction, if any',
        '4. Receipts for payments made for purchase of the dwelling unit.',
        '5. Approved plan/license.',
        '6. ULC clearance / conversion order etc.',
        '7. Receipts for having invested the margin money through normal banking channels from the Non-Resident (External) account in India and/or the Non-resident (Ordinary) account in India.',
        '8. Latest tax paid receipt.',
        '9. Allotment letter from the co-operative society / association of apartment owners.',
        '10. Agreement for sale / sale deed / detailed cost estimate from Architect / Engineer for property to be purchased / constructed / extended / improved.',
        '11. Copy of approved drawings of proposed construction / purchase / extension.',
        'Additional documents to be submitted by Person of Indian Origin.',
        'Photocopy of PIO card.',
        'If the PIO card is not available, photocopies of any of the following documents:',
        '1. The current passport, with birthplace as ‘INDIA’.',
        '2. The Indian passport, if held by the individual earlier.',
        '3. Parents/grandparents Indian passport/birth certificate/marriage certificate substantiating the individuals claim as a person of Indian origin.',
            
      ]
  },
   {
    id: '12',
    title: 'Do non-resident Indian citizens/foreign citizens of Indian origin require permission of Reserve Bank to acquire residential property in India?',
    content: [
        'Reserve Bank has granted general permission to foreign citizens of Indian origin, whether resident in India or abroad, to purchase immovable property in India for their bona fide residential purpose. They are therefore, not required to obtain permission of Reserve Bank.',
    ]
  },
   {
    id: '13',
    title: 'In what manner the purchase consideration for the residential immovable property should be paid by foreign citizens of Indian origin under the general permission?',
    content: [
        'The purchase consideration should be met either out of inward remittances in foreign exchange through normal banking channels or out of funds from NRE/FCNR accounts maintained with banks in India.',
    ]
  },
   {
    id: '14',
    title: 'Are there any formalities required to be completed by foreign citizens of Indian origin for purchasing residential immovable property in India under the general permission?',
    content: [
        'They are required to file a declaration in form IPI 7 with the Central Office of Reserve Bank at Mumbai within a period of 90 days from the date of purchase of immovable property or final payment of purchase consideration alongwith a certified copy of the document evidencing the transaction and bank certificate regarding the consideration paid.',
    ]
  },
   {
    id: '15',
    title: 'Can such property be sold without the permission of Reserve Bank?',
    content: [
        'Reserve Bank has granted general permission for sale of such property. However, where the property is purchased by another foreign citizen of Indian origin, funds towards the purchaser consideration should either be remitted to India or paid out of balances in NRE/FCNR accounts.',
    ]
  },
   {
    id: '16',
    title: 'Can sale proceeds of such property if and when sold be remitted out of India?',
    content: [
        'In respect of residential properties purchased on or after 26th May 1993, Reserve Bank considers applications for repatriation of sale proceeds up to the consideration amount remitted in foreign exchange for the acquisition of the Property for two such properties. The balance amount of sale proceeds if any or sale proceeds in respect of properties purchased prior to 26th May 1993, will have to be credited to the ordinary non-resident rupee account of the owner of the property.',
    ]
  },
   {
    id: '17',
    title: 'Are any conditions required to be fulfilled if repatriation of sale proceeds is desired?',
    content: [
        'Applications for repatriation of sale proceeds are considered provided the sale takes place after three years from the date of final purchase deed or from the date of payment of final instalment of consideration amount, whichever is later.',
    ]
  },
];

const TwoColumnNRIAccordion = () => {
  const [activeId, setActiveId] = useState('1');
  const [expandedItems, setExpandedItems] = useState({});
  const [overflowItems, setOverflowItems] = useState({});

  const contentRefs = useRef({});

  const handleToggle = (id) => {
    setActiveId(prev => (prev === id ? '' : id));
  };

  const handleReadMoreToggle = (id) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Check overflow after render
  useEffect(() => {
    Object.keys(contentRefs.current).forEach((id) => {
      const contentHeight = contentRefs.current[id]?.scrollHeight || 0;
      if (contentHeight > 725) {
        setOverflowItems(prev => ({ ...prev, [id]: true }));
      }
    });
  }, [activeId]);

  const midpoint = Math.ceil(accordionItems.length / 2);
  const col1Items = accordionItems.slice(0, midpoint);
  const col2Items = accordionItems.slice(midpoint);

  const renderAccordion = (items) => (
    <div className="accordion" id="accordionParent">
      {items.map((item) => {
        const isExpanded = expandedItems[item.id];
        const isOverflow = overflowItems[item.id];
        return (
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
                <div
                  className={`accordion-content ${isOverflow && !isExpanded ? 'collapsed-body' : ''}`}
                  ref={(el) => (contentRefs.current[item.id] = el)}
                >
                  {item.content.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
                {isOverflow && (
                  <button
                    className="read-toggle-btn btn btn-link p-0 mt-2"
                    onClick={() => handleReadMoreToggle(item.id)}
                  >
                    {isExpanded ? 'Read Less' : 'Read More'}
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-6">{renderAccordion(col1Items)}</div>
        <div className="col-md-6">{renderAccordion(col2Items)}</div>
      </div>
    </div>
  );
};

export default TwoColumnNRIAccordion;
