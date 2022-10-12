import React from 'react';
import { connect, useSelector } from 'react-redux';
import Gyms from '../../components/locations/Gyms';
import Dashboard from '../../components/dashboard/Dashboard';

const AllLocationsPage = (props) => {
  const locations = useSelector(state => state.locations)
  return (
    <Dashboard>
      {locations ? <Gyms /> : null}
    </Dashboard>
  );
}

export default AllLocationsPage;
