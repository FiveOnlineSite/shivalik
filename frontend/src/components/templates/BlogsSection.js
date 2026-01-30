import React from 'react'
import BlogBox from '../molecules/BlogBox';
import GradientLine from '../atoms/GradientLine';
import styles from '../../style/Common.module.css'
import BlogHomeList from '../organisms/BlogHomeList';

const BlogsSection = () => {
  return (
    
    <section className='pt-5 pb-5 bg-grey blog-list-none'>
        
      <div className='container'>
        <div className='row justify-content-left mb-3'>
                    <div className='col-lg-10 mt-5'>
                        <GradientLine />
                        <h3 className={`${styles.sectionTitle}`}>Our Blogs</h3>
                    </div>
                </div>
        {/*  */}
        <BlogHomeList />
        {/*  */}
      </div>
    </section>
  )
}

export default BlogsSection
