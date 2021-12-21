import React from 'react'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import './styles.css'
import LoginPage from '../pages/LoginPage'
import DashboardPage from '../pages/DashboardPage'
import AdminPage from '../pages/AdminPage'

// 

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/dashboard" element={<DashboardPage />} />
          <Route exact path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App