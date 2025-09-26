// import axios from 'axios';
// import React, { useEffect, useState } from 'react';


// const TwoColumnAccordion = () => {
//   const [activeId, setActiveId] = useState('1'); // Default open item

//   const handleToggle = (id) => {
//     setActiveId(prev => (prev === id ? '' : id));
//   };

//    const [FAQContent, setFAQContent] = useState([]);

//     useEffect(() => {
//       const fetchFAQContent = async () => {
//         try {
//           const apiUrl = process.env.REACT_APP_API_URL;
  
//           // const response = await axios.get("/api/user/allUsers");
//           const response = await axios({
//             method: "GET",
//             baseURL: `${apiUrl}/api/`,
//             url: "faq-content",
//           });
  
//           setFAQContent(response.data.Contents);
//           console.log("contents", response.data.Contents);
//         } catch (error) {
//           console.error("Error fetching faq content:", error);
//         }
//       };
  
//       fetchFAQContent();
//     }, []);


//   // Split items into two columns
//   const midpoint = Math.ceil(FAQContent.length / 2);
//   const col1Items = FAQContent.slice(0, midpoint);
//   const col2Items = FAQContent.slice(midpoint);

  
//  const renderAccordion = (items) => (
//   <div className="accordion" id="accordionParent">
//     {items && items.map((faq) => (
//       <div className="accordion-item" key={faq._id}>
//         <h2 className="accordion-header" id={`heading${faq._id}`}>
//           <button
//             className={`accordion-button ${activeId === faq._id ? '' : 'collapsed'}`}
//             type="button"
//             onClick={() => handleToggle(faq._id)}
//             aria-expanded={activeId === faq._id}
//             aria-controls={`collapse${faq._id}`}
//           >
//             {faq.question}
//           </button>
//         </h2>
//         <div
//           id={`collapse${faq._id}`}
//           className={`accordion-collapse collapse ${activeId === faq._id ? 'show' : ''}`}
//           aria-labelledby={`heading${faq._id}`}
//           data-bs-parent="#accordionParent"
//         >
//           <div className="accordion-body">
//             <div dangerouslySetInnerHTML={{ __html: faq.answer }}></div>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// );


//   return (
//     <div className="container my-4">
//       <div className="row">
//         <div className="col-md-6">{renderAccordion(col1Items)}</div>
//         <div className="col-md-6">{renderAccordion(col2Items)}</div>
//       </div>
//     </div>
//   );
// };

// export default TwoColumnAccordion;
