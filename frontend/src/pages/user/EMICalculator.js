import React from 'react'
import Layout from '../../components/templates/Layout'
import EMICalculatorBox from '../../components/organisms/EMICalculatorBox'
import MetaDataComponent from "../../components/atoms/MetaDataComponent"

const EMICalculator = () => {
  return (
    <Layout>
      <MetaDataComponent/>

      <EMICalculatorBox />
    </Layout>
  )
}

export default EMICalculator
