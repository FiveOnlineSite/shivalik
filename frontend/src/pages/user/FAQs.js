import React from 'react';
import Layout from '../../components/templates/Layout';
import InnerBanner from '../../components/atoms/InnerBanner';
import FaqsSection from '../../components/templates/FaqsLoanSection';
import FaqsLoanSection from '../../components/templates/FaqsLoanSection';
import FaqsNRIPIOHelpSection from '../../components/templates/FaqsNRIPIOHelpSection';
import { useLocation } from 'react-router-dom';
import MetaDataComponent from "../../components/atoms/MetaDataComponent"

const FAQs = () => {

  const location = useLocation();
    const currentPath = location.pathname;

  return (
    <Layout>
      <MetaDataComponent/>

      {/* FAQS BANNER SECTION START */}
        <InnerBanner page={currentPath}
/>
      {/* FAQS BANNER SECTION CLOSE */}

      {/* FAQs SECTION START */}
        <FaqsLoanSection />
      {/* FAQs SECTION CLOSE */}

      {/* FAQs NRI and PIO Help Section START */}
{/* <FaqsNRIPIOHelpSection /> */}
      {/* FAQs NRI and PIO Help Section CLOSE */}

    </Layout>
  )
}

export default FAQs
