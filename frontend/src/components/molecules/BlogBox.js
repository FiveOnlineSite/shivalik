import React, { useEffect, useState } from 'react';
import homestyles from '../../style/Home.module.css';
import styles from '../../style/Common.module.css';
import { ArrowRightAlt } from '@mui/icons-material';
import axios from 'axios';

const BlogBox = () => {

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
     {Blogs && Blogs.slice(0, 2).map((blog) => (
              <div className="col-lg-6 mb-4" key={blog._id}>
      
      <div className={`${homestyles.blogPack} position-relative`}>
        {blog.image[0].filepath && (
      <div className={homestyles.blogImg}>
        <img src={blog.image[0].filepath} alt={blog.alt} width="100%" />
      </div>
        )}
      
      <div className={homestyles.blogLink}>
        <a className={`${styles.commonBlogButton}`} href={`/blog/${blog.title
               .toLowerCase()
                .trim()
                .replace(/&/g, "and")
                .replace(/['’]/g, "")   // remove apostrophes
                .replace(/\//g, "-")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "")
             }`}>
          <ArrowRightAlt className="m-0" />
        </a>
      </div>
      
      <a className={styles.blogListTitLink} href={`/blog/${blog.title
              .toLowerCase()
              .trim()
              .replace(/&/g, "and")
              .replace(/['’]/g, "")   // remove apostrophes
              .replace(/\//g, "-")
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-+|-+$/g, "")
           }`}>
              <h4 className="mt-3">{blog.title}</h4></a>
    </div>
    </div>
    ))}
    </>
    
  );
};

export default BlogBox;
