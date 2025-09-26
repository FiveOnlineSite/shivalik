import React from 'react';
import BlogListing from '../../components/organisms/BlogListing';
import Layout from '../../components/templates/Layout';
import styles from '../../style/Common.module.css';

const Blogs = () => {
  return (
 <Layout>

  {/* BLOG BANNER SECTION START */}
  <section className='mb-5 mt-5 pb-5'>
    <div className='container'>
      <div className='row'>
        <div className='col-lg-12'>
          <div className={`${styles.blogInnerBanner} position-relative`}>
           <div className='position-relative'><img src='images/blog-list-banner.jpg' width='100%' /></div>
           <div className={styles.blogInnerTitle}>
            <div className={styles.blogInTitleBox}>
              <h4>Shivalik Realty Blog – Homebuying Made Simple</h4>
            </div>
           </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* BLOG BANNER SECTION CLOSE */}

  {/* BLOG LISTING SECTION START */}
    <section>
      <div className='container'>
        <div className='row justify-content-center'>
          <BlogListing />
        </div>
      </div>
    </section>
  {/* BLOG LISTING SECTION START */}
  
 </Layout>
  )
}

export default Blogs
