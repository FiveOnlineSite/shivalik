import React, { useEffect, useState } from 'react';
import homestyles from '../../style/Home.module.css';
import styles from '../../style/Common.module.css';
import { ArrowRightAlt } from '@mui/icons-material';
import axios from 'axios';

const BlogListBox = () => {

  const [Blogs, setBlogs] = useState([]);
  
    useEffect(() => {
      const fetchBlogs = async () => {
        try {
          const apiUrl = process.env.REACT_APP_API_URL;
          const response = await axios.get(`${apiUrl}/api/blog`);
          const BlogsData = response.data.Blogs;
  
          setBlogs(BlogsData);
          
        } catch (error) {
          console.error("Error fetching Blogs:", error);
        } 
      };
  
      fetchBlogs();
    }, []);

  return (
    <>
        {Blogs && Blogs.map((blog) => (
          <div className='col-xl-4 col-lg-6 col-md-6 mb-4' key={blog._id}>
             <div className={`${styles.blogsmPack} position-relative`}>
           {blog.image[0].filepath && (
         <div className={homestyles.blogImg}>
           <img src={blog.image[0].filepath} alt={blog.alt} width="100%" />
         </div>
           )}
         
         <div className={homestyles.blogLink}>
           <a className={`${styles.commonBlogSmBtn}`} href={`/blog/${blog.title
                 .toLowerCase()
                  .trim()
                  .replace(/&/g, "and")
                  .replace(/['’]/g, "")   // remove apostrophes
                  .replace(/\//g, "-")
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-+|-+$/g, "")
                  
                }`} end>
             <ArrowRightAlt className="m-0" />
           </a>
         </div>
         
         <a className={styles.blogListTitLink} href={`/${blog.title
                  .toLowerCase()
  .trim()
  .replace(/&/g, "and")
  .replace(/['’]/g, "")   // remove apostrophes
  .replace(/\//g, "-")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "")
                }`} end><h4 className="mt-3">{blog.title}</h4></a>
       </div>
          </div>
        
       ))}
       </>
  )
}

export default BlogListBox
