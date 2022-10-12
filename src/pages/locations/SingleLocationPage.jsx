import React from 'react'
import SingleGym from '../../components/locations/SingleGym'
import Dashboard from '../../components/dashboard/Dashboard'
import { useSelector } from 'react-redux'

const SingleLocationPage = (props) => {
  const locations = useSelector(state => state.locations)

  return (
    <Dashboard>
      { locations ? <SingleGym /> : null }
    </Dashboard>
  )
}

export default SingleLocationPage;