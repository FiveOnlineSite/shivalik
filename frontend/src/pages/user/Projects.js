import React from 'react'
import Layout from '../../components/templates/Layout'
import InnerBanner from '../../components/atoms/InnerBanner'
import ProjectsTabSection from '../../components/templates/ProjectsTabSection'
import { useLocation } from 'react-router-dom'
import MetaDataComponent from "../../components/atoms/MetaDataComponent"

const Projects = () => {

  const location = useLocation();
    const currentPath = location.pathname;
    
  return (
    <Layout>
      <MetaDataComponent/>

      {/* PROJECTS BANNER SECTION START */}
        <InnerBanner page={currentPath}/>
      {/* PROJECTS BANNER SECTION CLOSE */}

      {/* PROJECTS TAB SECTION START */}
      <ProjectsTabSection /> 
      {/* PROJECTS TAB SECTION CLOSE */}
    </Layout>
  )
}

export default Projects
