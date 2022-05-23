import React from 'react';
import Dashboard from '../../components/dashboard/Dashboard';
import RouteDistributionChart from '../../components/distributions/RouteDistributionChart';

function CurrentRopeDistribution() {
  return (
    <Dashboard>
      <RouteDistributionChart />
    </Dashboard>
  );
}

export default CurrentRopeDistribution;
