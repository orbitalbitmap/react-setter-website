import React from 'react'
import DistributionEditForm from '../../components/distributions/DistributionEditForm'
import Dashboard from '../../components/dashboard/Dashboard'

const IdealBoulderDistributionPage = () => {
  return (
    <Dashboard>
      <DistributionEditForm
        path="idealBoulderGradesById"
        type="boulders"
      />
    </Dashboard>
  )
}

export default IdealBoulderDistributionPage