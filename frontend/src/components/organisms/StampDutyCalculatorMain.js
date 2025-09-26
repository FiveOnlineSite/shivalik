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
              If you plan on taking a home loan, do keep in mind that it will lead to additional expenses over and above the cost of the home. For example, one has to pay stamp duty and registration charges to register your new home. Our stamp duty calculator will help you accurately determine the amount of stamp duty you will need to pay for your home, which would then help you calculate the amount required for your home loan.
            </p>
         
          
            <strong className='stap-title'>2. What is Stamp Duty?</strong>
            <p>
              The state government levies a fee called stamp duty for the purchase of any new property. This fee is paid towards registration of your property and you’ll be provided with a legal document validating your ownership of property. Until you have paid stamp duty, you are not considered as the legal owner of the property. 
            </p>
          
          
            <strong className='stap-title'>3. How are stamp duty and registration charges calculated in India?</strong>
            <p className='mb-2'>Typically, the cost of stamp duty is 5-7% of the property’s market value and registration charges are 1% of the property’s market value. These charges will be added to your cost, and you are required to count for these when applying for a home loan. The exact amount of stamp duty is determined by multiple factors such as:</p>
            <ul className='bullet-one'>
              <li>Actual market value of property</li>
              <li>Type of property</li>
              <li>Intended usage – residential or commercial</li>
              <li>Location of the property</li>
              <li>Age and gender of the property owner</li>
            </ul>
          
          
            <strong className='stap-title'>4. Are Stamp Duty and Registration Charges Included in Home Loan?</strong>
            <p>Stamp duty and registration charges are not sanctioned by lenders in the approved home loan amount. This expense has to be borne by the buyer.</p>
          
          
            <strong className='stap-title'>5. Can Stamp Duty Be Claimed as Tax Deduction?</strong>
            <p>Yes, one can claim stamp duty as a tax deduction under Section 80C of the Income Tax Act, up to a maximum limit of Rs. 1,50,000.</p>
          
          
            <strong className='stap-title'>6. Is Stamp Duty Refundable?</strong>
            <p>No, stamp duty is not refundable.</p>
          
          
            <strong className='stap-title'>7. Does Stamp Duty Include GST?</strong>
            <p>Currently, stamp duty and GST are separate charges levied on the sale of a property and thus have no bearing on each other.</p>
          
          
            <strong className='stap-title'>8. How to Pay Stamp Duty?</strong>
            <p className='mb-2'>You can pay stamp duty via one of the following methods:</p>
            <ul className='bullet-one'>
              <li>Physical Stamp Paper:
                <p className='mb-2'>This is the most popular method of paying stamp duty. One can purchase stamp paper from authorised sellers. Details with regards to the property registration or agreement are then written on this paper. Though, if the stamp duty charges are high, you will be required to purchase multiple stamp papers and thus it might become inconvenient.</p>
              </li>
              <li>Franking:
                <p className='mb-2'>You will need to go to an authorised franking agent who will stamp your property documents, certifying that the required stamp duty has been paid. This method has minimum criteria. Further, the agent will levy a franking charge, which is then deducted from the overall stamp duty to be paid. This service is offered to home buyers by most banks.</p>
              </li>
              <li>E-stamping:
                <p className='mb-2'>This is the most convenient way to pay stamp duty charges. Log on to the SHCIL (Stock Holding Corporation of India) website, select the state in which your property is located, complete the application form and submit it to a collected centre along with the required funds. Once the amount has been paid, you will get an e-stamp certificated with a Unique Identification Number (UIN).</p>
              </li>
              
            </ul>
          
      
      </div>
    </div>
     </section>
    </>
  )
}

export default StampDutyCalculatorMain