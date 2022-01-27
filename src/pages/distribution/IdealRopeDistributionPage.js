import React from 'react'

import Navbar from '../../components/navbar/Navbar'
import DistributionEditForm from '../../components/distributions/DistributionEditForm'

const IdealRopeDistributionPage = () => {
  return (
    <>
      <Navbar />
      <DistributionEditForm 
        path="idealRouteGradesById"
      />
    </>
  )
}

export default IdealRopeDistributionPage