import React from 'react'
import Layout from '../../components/templates/Layout'
import NewsTabsSection from '../../components/templates/NewsTabsSection'
import MetaDataComponent from "../../components/atoms/MetaDataComponent"

const News = () => {
  return (
    <Layout>
      <MetaDataComponent/>

      <NewsTabsSection />
    </Layout>
  )
}

export default News

