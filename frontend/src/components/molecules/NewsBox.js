// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// const NewsBox = ({ item, index, onClick }) => {

//   const [NewsWorthy, setNewsWorthy] = useState([]);
   
//     useEffect(() => {
//       const fetchNewsWorthy = async () => {
//         try {
//           const apiUrl = process.env.REACT_APP_API_URL;
//           const response = await axios.get(`${apiUrl}/api/news-worthy-mention`);
//           const NewsWorthyData = response.data.NewsWorthyMentions;
  
//           setNewsWorthy(NewsWorthyData);
//        } catch (error) {
//           console.error("Error fetching news and worthy mention:", error);
//         }
//       };
  
//       fetchNewsWorthy();
//     }, []);
  
//   return (
//     <>
//     {NewsWorthy && NewsWorthy.map((news) => (
//       <div className='col-lg-4 col-md-6 col-sm-6 mb-5' key={news._id}>
//       <div className='news-box-tb position-relative'>
        
//            <div className='news-b-img position-relative'>
//          {news.image?.[0]?.filepath && (
          
//           <img
//             src={news.image?.[0]?.filepath}
//             alt={news.alt}
//             onClick={() => onClick(index)}
//             style={{ cursor: 'pointer' }}
//           />
//          )}

//         </div>
        
       

//         {/* arrow-ico link stays functional without triggering modal */}
//         <div className='arrow-ico'>
//           {news.link && (
//             <Link to={news.link} className='img-arrow' onClick={(e) => e.stopPropagation()}>
//               <svg fill="#F58634" width={"25px"} className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-q7mezt" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
//                 <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"></path>
//               </svg>
//             </Link>
//           )}
//         </div>

//         {/* title link */}
//         <Link to={news.link} className='title-link'>
//           <h6>{news.title}</h6>
//         </Link>

//         <div className='news-txt'>
//           <p className='news-head'>{news.publisher_name}</p>
//           <p className='news-date'>{news.date}</p>
//         </div>
//       </div>
//     </div>
//     ))}
//     </>
//   )
// }

// export default NewsBox

import React from "react";
import { Link } from "react-router-dom";

const NewsBox = ({ item, index, onClick }) => {
  if (!item) return null;

  return (
    <div className="col-lg-4 col-md-6 col-sm-6 mb-5" key={item._id}>
      <div className="news-box-tb position-relative">
        <div className="news-b-img position-relative">
          {item.image?.[0]?.filepath && (
            <img
              src={item.image[0].filepath}
              alt={item.alt}
              onClick={() => onClick(index)}
              style={{ cursor: "pointer" }}
            />
          )}
        </div>

        {/* arrow icon → does not trigger modal */}
        <div className="arrow-ico">
          {item.link && (
            <Link
              to={item.link}
              className="img-arrow"
              onClick={(e) => e.stopPropagation()}
            >
              <svg
                fill="#F58634"
                width="25px"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"></path>
              </svg>
            </Link>
          )}
        </div>

        {/* title link */}
        {item.link ? (
          <Link to={item.link} className="title-link">
            <h6>{item.title}</h6>
          </Link>
        ) : (
          <h6>{item.title}</h6>
        )}

        <div className="news-txt">
          <p className="news-head">{item.publisher_name}</p>
          <p className="news-date">{new Date(
                            item.date
                          ).toLocaleDateString("en-UK", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsBox;
