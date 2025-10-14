import React from 'react';
import Logo from '../../components/atoms/Logo';
import Layout from '../../components/templates/Layout';
import StampDutyCalculatorMain from '../../components/organisms/StampDutyCalculatorMain';
import MetaDataComponent from "../../components/atoms/MetaDataComponent"

const StampDutyCalculator = () => {
  return (
    <Layout>
      <MetaDataComponent/>

      <StampDutyCalculatorMain />
    </Layout>
  )
}

export default StampDutyCalculator
