import React, { useEffect, useState } from 'react';
import Layout from '../../components/templates/Layout';
import styles from '../../style/Common.module.css';
import BlogDetailFaqs from '../../components/molecules/BlogDetailFaqsOne';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const BlogDetailOne = () => {

  const [blog, setBlog] = useState([]);

  const {title} = useParams()
  
       useEffect(() => {
          const fetchBlogByTitle = async () => {
            try {
              const apiUrl = process.env.REACT_APP_API_URL;
              const response = await axios.get(`${apiUrl}/api/blog/title/${title}`);
              const blogData = response.data.blog;
      
              setBlog(blogData);
           } catch (error) {
              console.error("Error fetching blog:", error);
            } 
          };
      
          fetchBlogByTitle();
        }, [title]);

  return (
    <Layout>

  {/* BLOG BANNER SECTION START */}
  <section className='mb-3 mt-5'>
    <div className='container'>
      <div className='row'>
        <div className='col-lg-12 mb-3'>
          <h1>{blog.title}</h1>
        </div>
        <div className='col-lg-12'>
          <div className={`${styles.blogInnerBanner} position-relative`}>
           <div className='position-relative'>
            {blog.image?.[0]?.filepath && (
            <img src={blog.image?.[0]?.filepath} width='100%' alt={blog.alt}/>
            )}
            </div>
           
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* BLOG BANNER SECTION CLOSE */}

  {/* BLOG DETAIL SECTION START */}
    <section className={`${styles.blogDetailContent} mb-5`}>
      <div className='container'>
        <div className='row'>
         <div className='col-lg-12' dangerouslySetInnerHTML={{__html: blog.content}}></div>
        
          <BlogDetailFaqs />
        </div>
      </div>
    </section>
  {/* BLOG DETAIL SECTION START */}
  
 </Layout>
  )
}

export default BlogDetailOne;
