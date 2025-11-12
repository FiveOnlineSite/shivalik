import React, { useEffect } from 'react';
import { useState } from 'react';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const CalculatorBox = () => {
  const [propertyValue, setPropertyValue] = useState('');
  const [gender, setGender] = useState(''); // Start with blank
  const [error, setError] = useState('');
  const state = 'Maharashtra';
  const maxValue = 1000000000;

  const handleChange = (e) => {
    const value = e.target.value;
    const isValid = /^\d*\.?\d*$/.test(value);

    if (value === '') {
      setPropertyValue('');
      setError('');
    } else if (!isValid || value.startsWith('+') || value.startsWith('-')) {
      setError('Only positive numeric values are allowed.');
    } else if (parseFloat(value) <= 0) {
      setError('Value must be greater than zero.');
    } else if (value.length > 10) {
      setError('Value must be a maximum of 10 digits.');
    } else if (parseFloat(value) > maxValue) {
      setError('Property value cannot exceed 100 crores (₹ 100,00,00,000).');
    } else {
      setError('');
    }

    setPropertyValue(value);
  };

  const calculateStampDuty = () => {
    const value = parseFloat(propertyValue);
    if (!value || value <= 0 || !gender) return 0;

    const rate = gender === 'male' ? `${stampDuty.male}`/100 : `${stampDuty.female}`/100;

    return (value * rate).toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    });
  };

  const [stampDuty, setStampDuty] = useState("")

   useEffect(() => {
      const fetchStampDuty = async () => {
        try {
          const apiUrl = process.env.REACT_APP_API_URL;
          const response = await axios.get(`${apiUrl}/api/stamp-duty`);
          const StampDutyData = response.data.StampDuty;
  setStampDuty(StampDutyData)
      } catch (error) {
          console.error("Error fetching stamp duty data:", error);
        } 
      };
  
      fetchStampDuty();
    }, []);

  const getRate = () => (gender === 'male' ? `${stampDuty.male}%` : `${stampDuty.female}%`);


  return (
    <>
      <div className='container'>
        <h1 className='sta-head-one mb-lg-5 mb-4'>Stamp Duty Calculator</h1>
         <div className='row'>
        <div className='col-lg-12'>
          <div className='row'>
            {/* State Dropdown */}
            <div className='col-lg-4'>
              <div className='mb-3'>
                <label htmlFor="formState" className="form-label stp-txt">State</label>
                <select className="form-select form-select-lg calculator-select" disabled>
                  <option selected>{state}</option>
                </select>
              </div>
            </div>

            {/* Property Value Input */}
            <div className='col-lg-4'>
              <div className='mb-3 input-one'>
                <label className="form-label stp-txt">Property Value</label>
                <div className='rupee_box'>
                  <div className='rupee_icon'><FontAwesomeIcon icon={faIndianRupeeSign} /></div>
                  <div className='calc_number'>
                    <input
                      type="text"
                      className="form-control dis-btn"
                      placeholder="Enter amount"
                      value={propertyValue}
                      onChange={handleChange}
                      maxLength={10}
                    />
                  </div>
                </div>
                {error && <small className="text-danger ms-3">{error}</small>}
              </div>
            </div>

            {/* Gender Dropdown */}
            <div className='col-lg-4'>
              <div className='mb-3'>
                <label className="form-label stp-txt">Gender</label>
                <select
                  className="form-select dis-btn calculator-select"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>
            </div>
          </div>

          {/* Result Section */}
          
            {propertyValue && gender ? (
              <>
              <div className='sta-box'>
                <p className='mb-1'>
                  Stamp Duty of your property is Rs. <span>{calculateStampDuty()}</span>.
                </p>
                <p className='mb-1'>
                  Stamp Duty Rate in <span>{state}</span> is <span>{getRate()}</span> of Property value for <strong>{gender.charAt(0).toUpperCase() + gender.slice(1)}</strong>.
                </p>
              </div>
              </>
            ) : propertyValue && !gender ? (
              <p className='text-danger'>Please select a gender to calculate stamp duty.</p>
            ) : null}
         
        </div>
      </div>
      </div>
        
    </>
  )
}

export default CalculatorBox;