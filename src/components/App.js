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


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/dashboard" element={<DashboardPage />} />
          <Route exact path="/admin" element={<AdminDashboardPage />} />
          <Route exact path="/metrics/:id" element={<MetricsPage />} />
          <Route exact path="/sections" element={<AllLocationsAndSectionsPage />} />
          <Route exact path="/sections/:id" element={<SectionsForSpecificGymPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App