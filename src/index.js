import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


import RoutePlacard from './components/placards/PrintableRouteCard';
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<LoginPage />} />
      <Route exact path="/dashboard" element={<DashboardPage />} />
      <Route exact path="/placard" element={<RoutePlacard />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
)