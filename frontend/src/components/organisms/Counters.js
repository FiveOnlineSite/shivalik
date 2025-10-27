import React, { useEffect, useState, useRef } from 'react';
import homestyles from '../../style/Home.module.css';
import axios from 'axios';
import Odometer from 'odometer';
import 'odometer/themes/odometer-theme-default.css';

const Counters = () => {
  const [counters, setCounters] = useState([]);
  const odometerRefs = useRef({});

  useEffect(() => {
    const fetchCounters = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/counter`);
        const counterData = response.data.counters;
        setCounters(counterData);
      } catch (error) {
        console.error("Error fetching counters:", error);
      }
    };

    fetchCounters();
  }, []);

  useEffect(() => {
    // Initialize odometers when counters are loaded
    counters.forEach((counter) => {
      const numberPart = extractNumber(counter.number);
      const element = odometerRefs.current[counter._id];

      if (element && numberPart !== null) {
        const od = new Odometer({
          el: element,
          value: 0,
          duration: 2000
        });
        // Animate to target number
        setTimeout(() => {
          od.update(numberPart);
        }, 500);
      }
    });
  }, [counters]);

  // Extract number from text (e.g. "23 Lakhs" -> 23)
  const extractNumber = (text) => {
    const match = text.match(/\d+(\.\d+)?/);
    return match ? parseFloat(match[0]) : null;
  };

  // Extract non-numeric suffix (e.g. "23 Lakhs" -> "Lakhs")
  const extractText = (text) => {
    const match = text.match(/[a-zA-Z]+.*/);
    return match ? match[0].trim() : '';
  };

  return (
    <section className='pt-3 pb-5'>
      <div className='container'>
        <div className='row'>
          {counters && counters.map((counter) => {
            const numberText = extractNumber(counter.number);
            const suffixText = extractText(counter.number);

            return (
              <div className='col-lg-3 col-6 text-center' key={counter._id}>
                <div className={homestyles.counterBox}>
                  <h2>
                    <span ref={(el) => (odometerRefs.current[counter._id] = el)}>
                      {numberText ?? 0}
                    </span> {suffixText}
                  </h2>
                  <div className='counter-text'>
                  <div dangerouslySetInnerHTML={{ __html: counter.title }}></div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Counters;
