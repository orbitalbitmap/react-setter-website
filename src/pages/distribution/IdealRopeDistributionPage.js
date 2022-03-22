import React from 'react'
import Dashboard from '../../components/dashboard/Dashboard'
import DistributionEditForm from '../../components/distributions/DistributionEditForm'

const IdealRopeDistributionPage = () => {
  return (
    <Dashboard>
      <DistributionEditForm 
        path="idealRouteGradesById"
        type="routes"
      />
    </Dashboard>
  )
}

export default IdealRopeDistributionPage