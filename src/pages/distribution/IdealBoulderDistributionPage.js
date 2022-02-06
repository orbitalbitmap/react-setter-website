import React from 'react'

import Navbar from '../../components/navbar/Navbar'
import DistributionEditForm from '../../components/distributions/DistributionEditForm'

const IdealBoulderDistributionPage = () => {
  return (
    <>
      <Navbar />
      <DistributionEditForm
        path="idealBoulderGradesById"
        type="boulders"
      />
    </>
  )
}

export default IdealBoulderDistributionPage