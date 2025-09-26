// import axios from 'axios';
// import React, { useEffect, useState } from 'react'

// const NewsListBanner = () => {

//   const [NewsWorthy, setNewsWorthy] = useState([]);
       
//         useEffect(() => {
//           const fetchNewsWorthy = async () => {
//             try {
//               const apiUrl = process.env.REACT_APP_API_URL;
//               const response = await axios.get(`${apiUrl}/api/news-worthy-mention`);
//               const NewsWorthyData = response.data.NewsWorthyMentions[0];
      
//               setNewsWorthy(NewsWorthyData);
//            } catch (error) {
//               console.error("Error fetching news and worthy mention:", error);
//             }
//           };
      
//           fetchNewsWorthy();
//         }, []);

//   return (
//     <>
//         <div className="award-card-container">
//           {NewsWorthy && NewsWorthy.map((news) => (
//             <>
//             {news.image[0].filepath} && (
//                <img src={news.image[0].filepath} alt={news.alt} width='100%' className="award-image"/>
//             )
           
//             <div className="award-info-box">
//             <h2 className="award-heading">{news.title}</h2>
//             <div className="award-meta">
//                 <span className="award-label">{news.publisher_name}</span>
//                 <span className="award-date">{news.date}</span>
//             </div>
//             </div>
//             </>
             
//           ))}
           
//         </div>
//     </>
//   )
// }

// export default NewsListBanner;