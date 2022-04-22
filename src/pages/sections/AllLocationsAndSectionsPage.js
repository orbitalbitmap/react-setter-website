import React from 'react';
import { connect } from 'react-redux';
import AllClimbingSections from '../../components/sections/AllClimbingSections';
import Dashboard from '../../components/dashboard/Dashboard';

function AllLocationsAndSections(props) {
  return (
    <Dashboard>
      {props.gyms ? <AllClimbingSections /> : null}
    </Dashboard>
  );
}

const mapStateToProps = state => ({
  user: state.user,
  gyms: state.gyms,
});

export default connect(mapStateToProps, {})(AllLocationsAndSections);
