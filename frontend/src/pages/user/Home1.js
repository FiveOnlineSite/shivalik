import React from 'react'
import Layout from '../../components/templates/Layout'
import Banner from '../../components/molecules/Banner'
import Counters from '../../components/organisms/Counters'
import AboutUsSection1 from '../../components/templates/AboutUsSection1'
import ProjectsSection1 from '../../components/templates/ProjectsSection1'
import KeyFeaturesSection from '../../components/templates/KeyFeaturesSection'
import BlogsSection from '../../components/templates/BlogsSection'
import TestimonialsSection1 from '../../components/templates/TestimonialsSection1'
import MetaDataComponent from "../../components/atoms/MetaDataComponent"

const Home1 = () => {

  return (
    <Layout>
      
    <MetaDataComponent/>

      {/* banner section start */}
      <Banner />
      {/* banner section close */}

      {/* Counter section start */}
      <Counters />
      {/* Counter section close */}

      {/* You’re in good hands section start */}
      <AboutUsSection1 />
      {/* You’re in good hands section close */}

      {/* Projects Section Start */}
      <ProjectsSection1 />
      {/* Projects Section Close */}

      {/* Key Features Section Start */}
      <KeyFeaturesSection />
      {/* Key Features Section Close */}

      {/* Key Features Section Start */}
      <TestimonialsSection1 />
      {/* Key Features Section Close */}

      {/* Blogs section start */}
      {/* <BlogsSection /> */}
      {/* Blogs section close */}

    </Layout>
  )
}

export default Home1
