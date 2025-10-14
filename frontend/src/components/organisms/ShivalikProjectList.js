import React from 'react';
import ProjectByShivalik from '../molecules/ProjectByShivalik';
import { ArrowRightAlt } from '@mui/icons-material';
import styles from '../../style/Common.module.css';

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
