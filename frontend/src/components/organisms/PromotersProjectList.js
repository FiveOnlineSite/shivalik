// import React from 'react';
// import { ArrowRightAlt } from '@mui/icons-material';
// import styles from '../../style/Common.module.css';
// import ProjectByPromoters from '../molecules/ProjectByPromoters';

// const projectData = [
//   {
//     image: 'images/project1-p.jpg',
//     title: 'Vision Crest',
//     location: 'Plot No. 746, D.S. Babrekar Marg, Dadar West, Mumbai - 400 028',
//     tag: 'Completed 2011',
//     // buttonLink: '/projects/gulmohar-avenue',
//     // buttonText: 'Explore Now',
//   },
//   {
//     image: 'images/project2-p.jpg',
//     title: 'Garden Court',
//     location: 'Naigaun cross lane, M.M.G.S. Road, Dadar East, Mumbai - 400 014',
//     tag: 'Completed 2014',
//   },
//   {
//     image: 'images/project3-p.jpg',
//     title: 'Vishal Villa',
//     location: 'Road No. 5, Pandurang Naik Marg, Mahim West, Mumbai - 400 028',
//     tag: 'Completed 2005',
//   },
//   {
//     image: 'images/project4-p.jpg',
//     title: 'Ameya Building',
//     location: 'Gaikwad Building, Pavwala street, Girgaon, Mumbai - 400 004',
//     tag: 'Completed 2007',
//   },
//   {
//     image: 'images/project5-p.jpg',
//     title: 'JV House',
//     location: 'Plot No. 746, D.S. Babrekar Marg, Dadar West, Mumbai - 400 028',
//     tag: 'Completed 2009',
//   },
//   {
//     image: 'images/project6-p.jpg',
//     title: 'Civic Centre',
//     location: 'Lokmanya Tilak Colony, Dadar East, Mumbai- 400 014',
//     tag: 'Completed 2014',
//   },
//   {
//     image: 'images/project7-p.jpg',
//     title: 'Rehab',
//     location: 'C.T.S. 13(pt) of Village Bandra (East), Mumbai - 400 055.',
//     tag: 'Completed 2013',
//   },
// ];

// const PromotersProjectList = () => {
//   return (
//     <div className='row border-custom'>
//       {projectData.map((project, index) => {
//         const hasButton = project.buttonText && project.buttonLink;
//         return (
//           <ProjectByPromoters
//             key={index}
//             image={project.image}
//             title={project.title}
//             location={project.location}
//             tag={project.tag}
//             buttonElement={
//               hasButton && (
//                 <a
//                   href={project.buttonLink}
//                   className={styles.commonBlueButton}
//                 >
//                   {project.buttonText} <ArrowRightAlt />
//                 </a>
//               )
//             }
//           />
//         );
//       })}
//     </div>
//   );
// };

// export default PromotersProjectList;
