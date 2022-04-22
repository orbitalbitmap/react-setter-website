import React from 'react';
import Dashboard from '../../components/dashboard/Dashboard';
import DistributionEditForm from '../../components/distributions/DistributionEditForm';

function IdealRopeDistributionPage() {
  return (
    <Dashboard>
      <DistributionEditForm
        path="idealRouteGradesById"
        type="routes"
      />
    </Dashboard>
  );
}

export default IdealRopeDistributionPage;
