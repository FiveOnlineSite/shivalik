import React from 'react';
import ProjectByShivalik from '../molecules/ProjectByShivalik';
import { ArrowRightAlt } from '@mui/icons-material';
import styles from '../../style/Common.module.css';

// const projectData = [
//   {
//     image: 'images/project2.jpg',
//     title: 'Prabhat Darshan',
//     location: 'Building No 60, Opp Khar Foot Over Bridge, Khar East, Bandra Village, Mumbai - 400 052',
//     tag: 'Completed 2022',
//     buttonLink: 'prabhat-darshan',
//     buttonText: 'View More',
//   },
//   {
//     image: 'images/dummy-image1.png',
//     title: 'Jay Hanuman SRA co-op Housing Society',
//     location: 'Building No.30, CTS No. 30(pt), Village -Bandra,Taluka -Andheri, Golibar Road, Santacruz (East), Mumbai 400 055',
//     tag: 'Completed 2022',
//   },
//   {
//     image: 'images/dummy-image1.png',
//     title: 'Paramount SRA CHS Ltd',
//     location: 'Building No.12, CTS No. 27(pt)and 30(pt), Village -Bandra ,Taluka -Andheri , Golibar Road, Santacruz(East), Mumbai 400 055',
//     tag: 'Completed 2022',
//   },
//   {
//     image: 'images/dummy-image1.png',
//     title: 'Shree Saibaba SRA CHS Ltd. & Sanjivani SRA CHS Ltd',
//     location: 'Building No.7A / 7B, CTS No. 13(pt), Village -Bandra Taluka -Andheri, Golibar Road, Santacruz (East),Mumbai 400 055',
//     tag: 'Completed 2022',
//   }
// ];


const groupBy = (arr, key) =>
  arr.reduce((acc, item) => {
    const group = item[key] || "Uncategorized";
    acc[group] = acc[group] || [];
    acc[group].push(item);
    return acc;
  }, {});


const ShivalikProjectList = ({data}) => {

   const grouped = groupBy(data, "news_category");
   
  return (
    <>
 {Object.entries(grouped).map(([category, items]) => (
       
          <div  key={category} className='row border-custom'>
            {items.map((item, index) => (
          <ProjectByShivalik
            key={index}
             item={item}
             index = {index}
          />
            ))}
        
     
    </div>
 ))}
    </>
      
  );
};

export default ShivalikProjectList;
