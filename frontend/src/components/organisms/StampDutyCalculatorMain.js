import React from 'react';
import CalculatorBox from '../molecules/CalculatorBox';
import GradientLineTwo from '../atoms/GradientLineTwo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StampDutyCalculatorMain = () => {
  return (
    <>
    <section className='pt-5 pb-5 sdcalc_section'>

   
    <GradientLineTwo />
    <CalculatorBox/>
    <div class="stap-sec">
      <div className='container'>
      
         
            <strong className='stap-title'>1. Stamp Duty and Registration Charges Calculator.</strong>
            <p>
              If you’re planning to buy a flat in Bandra or invest in a new residential project in Bandra, and intend to take a home loan, remember that it involves extra costs beyond the property price. For instance, you’ll need to pay stamp duty and registration charges when registering your new home. Our stamp duty calculator helps you accurately estimate these costs, making it easier to plan your home loan and total investment in your property in Bandra.
            </p>
         
          
            <strong className='stap-title'>2. What is Stamp Duty?</strong>
            <p>
             When buying a flat in Bandra or any new residential property in Mumbai, you are required to pay a fee called stamp duty to the state government. This fee is essential for registering your property, and once paid, you’ll receive legal documents that confirm your ownership. Until the stamp duty and registration charges are cleared, the property isn’t legally considered yours.
            </p>
          
          
            <strong className='stap-title'>3. How are stamp duty and registration charges calculated in India?</strong>
            <p className='mb-2'>When buying a flat in Bandra or any new residential property in Mumbai, you’ll need to pay stamp duty and registration charges in addition to the property’s price. Typically, stamp duty costs around 5–7% of the property’s market value, while registration charges are about 1%. These expenses should be included when calculating your total budget or applying for a home loan.</p>
            <p className='mb-2'>The exact amount of stamp duty and registration charges depends on several factors, including:</p>
            <ul className='bullet-one'>
              <li>Actual market value of property</li>
              <li>Type of property (flat, house, or commercial space)</li>
              <li>Usage – residential or commercial</li>
              <li>Property location</li>
              <li>Age and gender of the property owner</li>
            </ul>
          
            <strong className='stap-title'>4. Are Stamp Duty and Registration Charges Included in Home Loan?</strong>
            <p>No, stamp duty and registration charges are not covered in the approved home loan amount. Whether you’re purchasing a 1 BHK or 2 BHK flat in Bandra, these costs must be paid separately by the buyer.</p>

            <strong className='stap-title'>5. Can Stamp Duty Be Claimed as Tax Deduction?</strong>
            <p>Yes, you can claim a tax deduction on stamp duty under Section 80C of the Income Tax Act, for an amount up to ₹1,50,000.</p>
          
            <strong className='stap-title'>6. Is Stamp Duty Refundable?</strong>
            <p>No, stamp duty is not refundable.</p>
          
          
            <strong className='stap-title'>7. Does Stamp Duty Include GST?</strong>
            <p>Currently, stamp duty and GST are separate charges levied on the sale of a property and thus have no bearing on each other.</p>
          
          
            <strong className='stap-title'>8. How to Pay Stamp Duty?</strong>
            <p className='mb-2'>You can pay stamp duty via one of the following methods:</p>
            <ul className='bullet-one'>
              <li>Physical Stamp Paper:
                <p className='mb-2'>This is a common method used by many home buyers in Mumbai. You can purchase stamp paper from authorised sellers, and the property registration or agreement details are written on it. However, if the stamp duty amount is high, you may need multiple stamp papers, which can be inconvenient for buyers registering new residential projects in Bandra.</p>
              </li>
              <li>Franking:
                <p className='mb-2'> In this method, you must visit an authorised franking agent who stamps your property documents, confirming that the stamp duty has been paid. The agent charges a small franking fee, which is deducted from the total stamp duty amount. Many banks offering home loans in Mumbai also provide franking services for buyers of property in Bandra and nearby areas.</p>
              </li>
              <li>E-stamping:
                <p className='mb-2'>This is the most convenient and preferred method today. You can log in to the SHCIL (Stock Holding Corporation of India) website, select the state where your property is located, complete the online application, and make the payment. Once processed, you’ll receive an e-stamp certificate with a Unique Identification Number (UIN), making the process fast, secure, and paperless.</p>
              </li>
              
            </ul>
          
      
      </div>
    </div>
     </section>
    </>
  )
}

export default StampDutyCalculatorMain