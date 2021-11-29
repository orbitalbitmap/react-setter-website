import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Routes,
  Route,
  // Link
} from "react-router-dom";


import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<LoginPage />} />
      <Route exact path="/dashboard" element={<DashboardPage />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
)