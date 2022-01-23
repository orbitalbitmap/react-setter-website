import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import './styles.css'
import history from '../history';
import LoginPage from '../pages/LoginPage'
import DashboardPage from '../pages/DashboardPage'
import AdminDashboardPage from '../pages/admin/AdminDashboardPage'
import MetricsPage from '../pages/MetricsPage'
import AllLocationsAndSectionsPage from '../pages/sections/AllLocationsAndSectionsPage'
import SectionsForSpecificGymPage from '../pages/sections/SpecificGymSectionsPage'
import UpdateSectionsPage from '../pages/sections/UpdateSectionsPage'
import CurrentRopeDistributionPage from '../pages/distribution/CurrentRopeDistributionPage'
import CurrentBoulderDistributionPage from '../pages/distribution/CurrentBoulderDistributionPage'
import AllLocations from '../pages/locations/AllLocationsPage';
import SingleLocationPage from '../pages/locations/SingleLocationPage';
import AllEmployeeesPage from '../pages/employees/AllEmployeesPage'
import SingleEmployeePage from '../pages/employees/SingleEmployeePage'
import NewGymPage from '../pages/admin/NewGymPage';
import NewEmployeePage from '../pages/admin/NewEmployeePage';
import UpdateEmployeePage from '../pages/employees/UpdateEmployeePage';
import AdminUpdateEmployeePage from '../pages/admin/AdminUpdateEmployeePage';
import IdealBoulderDistribution from '../pages/distribution/IdealBoulderDistributionPage';
import IdealRopeDistributionPage from '../pages/distribution/IdealRopeDistributionPage';
import UpdateLocationPage from '../pages/admin/UpdateLocationInfo';

const App = () => {
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


          {/* Employee paths */}
          <Route exact path="/employees" element={<AllEmployeeesPage />} />
          <Route exact path="/employees/:id" element={<SingleEmployeePage />} />
          <Route exact path="/employees/edit" element={<UpdateEmployeePage />} />


          {/* Metric paths */}
          <Route exact path="/metrics/:id" element={<MetricsPage />} />


          {/* Locatation paths */}
          <Route exat path="/locations" element={<AllLocations />} />
          <Route exat path="/locations/:id" element={<SingleLocationPage />} />
          
          {/* Sections paths */}
          <Route exact path="/sections" element={<AllLocationsAndSectionsPage />} />
          <Route exact path="/sections/:id" element={<SectionsForSpecificGymPage />} />
          <Route exact path="/sections/edit/:id" element={<UpdateSectionsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App