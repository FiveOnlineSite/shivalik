import React from 'react';
import CSRTabs from '../../components/molecules/CSRTabs';
import Layout from '../../components/templates/Layout';
import CSRBanner from '../../components/molecules/CSRBanner';
import { useLocation } from 'react-router-dom';
import MetaDataComponent from "../../components/atoms/MetaDataComponent"

const CSR = () => {

  const location = useLocation();
    const currentPath = location.pathname;

  return (
    <Layout>
      <MetaDataComponent/>

      {/* CSR BANNER SECTION START */}
                <CSRBanner/>

      {/* CSR BANNER SECTION CLOSE */}
      <section className='pt-5 pb-5 csr_section'>
<div className='container'>
        <div className='csr-para'>
          <p>Shivalik has a deep commitment to Corporate Social Responsibility (CSR) 
            and thus towards social, economic, and environmental objectives, and 
            sharing the welfare role of the government. The company is aware of its 
            responsibilities towards society and is committed to sustainable social 
            and economic development. Our CSR department is involved in diverse social 
            and economic issues like education, health, infrastructure development, and 
            livelihood generation. It encourages people to participate actively in projects 
            for social and economic empowerment of the community.</p>
        </div>
        <CSRTabs />
    </div>
      </section>
    
    </Layout>
  )
}

export default CSR