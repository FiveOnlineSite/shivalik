import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CSRTabs = () => {
  const [CSR, setCSR] = useState([]);

  useEffect(() => {
    const fetchCSR = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/csr`);
        const CSRData = response.data.csr;
        setCSR(CSRData);
      } catch (error) {
        console.error("Error fetching csr data:", error);
      }
    };

    fetchCSR();
  }, []);

  return (
    <div className='tabs-one-box'>
      {/* Scrollable Horizontal Tabs */}
      <div className="tabs-scroll-wrapper">
        <ul className="nav nav-pills mb-3 flex-nowrap" id="pills-tab" role="tablist">
          {CSR.map((csr, index) => (
            <li className="nav-item" role="presentation" key={csr._id}>
              <button
                className={`nav-link ${index === 0 ? 'active' : ''}`}
                id={`pills-${csr._id}-tab`}
                data-bs-toggle="pill"
                data-bs-target={`#pills-${csr._id}`}
                type="button"
                role="tab"
                aria-controls={`pills-${csr._id}`}
                aria-selected={index === 0 ? "true" : "false"}
              >
                {csr.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab Content */}
      <div className="tab-content" id="pills-tabContent">
        {CSR.map((csr, index) => (
          <div
            className={`tab-pane fade ${index === 0 ? 'show active' : ''}`}
            id={`pills-${csr._id}`}
            role="tabpanel"
            aria-labelledby={`pills-${csr._id}-tab`}
            key={csr._id}
          >
            <div dangerouslySetInnerHTML={{ __html: csr.description }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CSRTabs;
