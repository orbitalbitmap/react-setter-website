import React from 'react'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import './styles.css'
import LoginPage from '../pages/LoginPage'
import DashboardPage from '../pages/DashboardPage'
import AdminDashboardPage from '../pages/admin/AdminDashboardPage'
import MetricsPage from '../pages/MetricsPage'
import AllLocationsAndSectionsPage from '../pages/sections/AllLocationsAndSectionsPage'
import SectionsForSpecificGymPage from '../pages/sections/SectionsForSpecificGymPage'
import UpdateSectionsPage from '../pages/sections/UpdateSectionsPage'


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Home paths */}
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/dashboard" element={<DashboardPage />} />
          
          {/* Admin paths */}
          <Route exact path="/admin" element={<AdminDashboardPage />} />
          
          {/* Metric paths */}
          <Route exact path="/metrics/:id" element={<MetricsPage />} />
          
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