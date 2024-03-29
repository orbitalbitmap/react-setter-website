import React from 'react';
import BoulderDistributionChart from '../../components/distributions/BoulderDistributionChart';
import Dashboard from '../../components/dashboard/Dashboard';

function CurrentBoulderDistribution() {
  return (
    <Dashboard>
      <BoulderDistributionChart />
    </Dashboard>
  );
}

export default CurrentBoulderDistribution;
