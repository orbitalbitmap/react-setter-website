import React from 'react';
import { useSelector } from 'react-redux';
import Gyms from '../../components/locations/Gyms';
import Dashboard from '../../components/dashboard/Dashboard';

const AllLocationsPage = () => {
  const locations = useSelector(state => state.locations)
  return (
    <Dashboard>
      { locations ? <Gyms /> : null }
    </Dashboard>
  );
}

export default AllLocationsPage;
