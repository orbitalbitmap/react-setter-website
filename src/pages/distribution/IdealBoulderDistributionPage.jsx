import React from 'react';
import DistributionEditForm from '../../components/distributions/DistributionEditForm';
import Dashboard from '../../components/dashboard/Dashboard';

function IdealBoulderDistributionPage() {
  return (
    <Dashboard>
      <DistributionEditForm
        path="idealBoulderGradesById"
        type="boulders"
      />
    </Dashboard>
  );
}

export default IdealBoulderDistributionPage;
