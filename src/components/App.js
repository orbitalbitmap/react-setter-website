import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

// import './styles.css'
import history from '../history';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import AdminUpdateEmployeePage from '../pages/admin/AdminUpdateEmployeePage';
import AllEmployeesPage from '../pages/employees/AllEmployeesPage';
import AllLocations from '../pages/locations/AllLocationsPage';
import AllLocationsAndSectionsPage from '../pages/sections/AllLocationsAndSectionsPage';
import CurrentBoulderDistributionPage from '../pages/distribution/CurrentBoulderDistributionPage';
import CurrentRopeDistributionPage from '../pages/distribution/CurrentRopeDistributionPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import IdealBoulderDistribution from '../pages/distribution/IdealBoulderDistributionPage';
import IdealRopeDistributionPage from '../pages/distribution/IdealRopeDistributionPage';
import LoginPage from '../pages/login/LoginPage';
import MetricsPage from '../pages/metrics/MetricsPage';
import NewEmployeePage from '../pages/admin/NewEmployeePage';
import NewGymPage from '../pages/admin/NewGymPage';
import PrintableBoulderPlacardPage from '../pages/placards/PrintableBoulderPlacardPage';
import PrintableRoutePlacardPage from '../pages/placards/PrintableRoutePlacardPage';
import SectionsForSpecificGymPage from '../pages/sections/SpecificGymSectionsPage';
import SingleEmployeePage from '../pages/employees/SingleEmployeePage';
import SingleLocationPage from '../pages/locations/SingleLocationPage';
import UpdateEmployeePage from '../pages/employees/UpdateEmployeePage';
import UpdateLocationPage from '../pages/admin/UpdateLocationInfo';
import UpdateSectionsPage from '../pages/sections/UpdateSectionsPage';

// @TODO items: 
//    -- remove all instances of props from the app and call data from redux store
//    -- move data loads to redux actions or custom useEffects instead of calling them directly in the components
//    -- add comment everywhere (make checklist of files beforehand)
//    -- upgrade to typescript

function App() {
  return (
    <div>
      <BrowserRouter history={history}>
        <Routes>
          {/* Home paths */}
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/dashboard" element={<DashboardPage />} />

          {/* Admin paths */}
          <Route exact path="/admin" element={<AdminDashboardPage />} />
          <Route exact path="/admin/employee/new" element={<NewEmployeePage />} />
          <Route exact path="/admin/employee/:id" element={<AdminUpdateEmployeePage />} />
          <Route exact path="/admin/location/new" element={<NewGymPage />} />
          <Route exact path="/admin/location/:id" element={<UpdateLocationPage />} />

          {/* Distribution paths */}

          { /* Current */}
          <Route exact path="/distribution/current/boulders/:id" element={<CurrentBoulderDistributionPage />} />
          <Route exact path="/distribution/current/ropes/:id" element={<CurrentRopeDistributionPage />} />

          {/* Ideal */}
          <Route exact path="/distribution/ideal/boulders/:id" element={<IdealBoulderDistribution />} />
          <Route exact path="/distribution/ideal/ropes/:id" element={<IdealRopeDistributionPage />} />

          {/* Printable Placard paths */}
          <Route exact path="/placard/boulders" element={<PrintableBoulderPlacardPage />} />
          <Route exact path="/placard/ropes" element={<PrintableRoutePlacardPage />} />

          {/* Employee paths */}
          <Route exact path="/employees" element={<AllEmployeesPage />} />
          <Route exact path="/employees/:id" element={<SingleEmployeePage />} />
          <Route exact path="/employees/edit/:id" element={<UpdateEmployeePage />} />

          {/* Metric paths */}
          <Route exact path="/metrics" element={<>Under construction</>} /> {/* @TODO: metrics page for all gyms */}
          <Route exact path="/metrics/:id" element={<MetricsPage />} />

          {/* Location paths */}
          <Route exact path="/locations" element={<AllLocations />} />
          <Route exact path="/locations/:id" element={<SingleLocationPage />} />

          {/* Sections paths */}
          <Route exact path="/sections" element={<AllLocationsAndSectionsPage />} />
          <Route exact path="/sections/:id" element={<SectionsForSpecificGymPage />} />
          <Route exact path="/sections/edit/:id" element={<UpdateSectionsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
