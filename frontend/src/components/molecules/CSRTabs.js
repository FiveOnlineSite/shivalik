import React, { useEffect, useState } from 'react'
import womenCampData from '../molecules/womenCampData';
import educationCampData from '../molecules/educationCampData';
import axios from 'axios';


const CSRTabs = () => {

  const [CSR, setCSR] = useState([])

  useEffect(() => {
      const fetchCSR = async () => {
        try {
          const apiUrl = process.env.REACT_APP_API_URL;
          const response = await axios.get(`${apiUrl}/api/csr`);
          const CSRData = response.data.csr;
          setCSR(CSRData)
  
        } catch (error) {
          console.error("Error fetching csr data:", error);
        } 
      };
  
      fetchCSR();
    }, []);
  
  return (
   <>
      <div className='tabs-one-box'>
        {/* Scrollable Horizontal Tabs */}
        <div className="tabs-scroll-wrapper">
          <ul className="nav nav-pills mb-3 flex-nowrap" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="pills-health-tab" data-bs-toggle="pill" data-bs-target="#pills-health" type="button" role="tab" aria-controls="pills-health" aria-selected="true">Health Camp</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="pills-women-tab" data-bs-toggle="pill" data-bs-target="#pills-women" type="button" role="tab" aria-controls="pills-women" aria-selected="false">Women Empowerment</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="pills-education-tab" data-bs-toggle="pill" data-bs-target="#pills-education" type="button" role="tab" aria-controls="pills-education" aria-selected="false">Educational</button>
            </li>
          </ul>
        </div>

        <div className="tab-content" id="pills-tabContent">
              <div className="tab-pane fade show active" id="pills-health" role="tabpanel" aria-labelledby="pills-health-tab" tabIndex="0">
               <div dangerouslySetInnerHTML={{__html: CSR.health_camp_description }}></div>
              </div>
              <div className="tab-pane fade" id="pills-women" role="tabpanel" aria-labelledby="pills-women-tab" tabIndex="0">
               
                               <div dangerouslySetInnerHTML={{__html: CSR.women_empowerment_description }}></div>

              </div>
              <div className="tab-pane fade" id="pills-education" role="tabpanel" aria-labelledby="pills-education-tab" tabIndex="0">
                                      <div dangerouslySetInnerHTML={{__html: CSR.educational_description }}></div>

              </div>
            </div>
      </div>
    </>
  )
}

export default CSRTabs