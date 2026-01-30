import React from 'react'
import Layout from '../../components/templates/Layout'
import Banner from '../../components/molecules/Banner'
import Counters from '../../components/organisms/Counters'
import AboutUsSection from '../../components/templates/AboutUsSection'
import ProjectsSection from '../../components/templates/ProjectsSection'
import KeyFeaturesSection from '../../components/templates/KeyFeaturesSection'
import BlogsSection from '../../components/templates/BlogsSection'
import TestimonialsSection from '../../components/templates/TestimonialsSection'
import MetaDataComponent from "../../components/atoms/MetaDataComponent"

const Home = () => {

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
      <AboutUsSection />
      {/* You’re in good hands section close */}

      {/* Projects Section Start */}
      <ProjectsSection />
      {/* Projects Section Close */}

      {/* Key Features Section Start */}
      <KeyFeaturesSection />
      {/* Key Features Section Close */}

      {/* Key Features Section Start */}
      <TestimonialsSection />
      {/* Key Features Section Close */}

      {/* Blogs section start */}
      {/* <BlogsSection /> */}
      {/* Blogs section close */}

    </Layout>
  )
}

export default Home
