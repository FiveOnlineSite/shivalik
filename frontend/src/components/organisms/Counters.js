import React, { useEffect, useState } from 'react';
import homestyles from '../../style/Home.module.css';
import axios from 'axios';

const Counters = () => {

     const [counters, setCounters] = useState([]);
    
    useEffect(() => {
        const fetchCounters = async () => {
          try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await axios.get(`${apiUrl}/api/counter`);
            const counterData = response.data.counters;
    
            setCounters(counterData);
            console.log(counterData)
          } catch (error) {
            console.error("Error fetching counters:", error);
          }
        };
    
        fetchCounters();
      }, []);
    
  return (
    <section className='pt-3 pb-5'>
      <div className='container'>
        <div className='row'>
            {counters && counters.map((counter) => (
                <div className='col-lg-3 col-6 text-center' key={counter._id}>
                <div className={homestyles.counterBox}>
                    <h2>{counter.number}</h2>
                    <div dangerouslySetInnerHTML={{__html: counter.title}}></div>
                </div>
            </div>
            ))}
            
        </div>
      </div>
    </section>
  )
}

export default Counters
