import React from 'react'

import EditSingleGym from '../../components/admin/EditSingleGym'
import Navbar from '../../components/navbar/Navbar'


const UpdateLocationPage = () => {
  return (
    <>
      <Navbar />
      <div className="centered-text">
        <EditSingleGym />
      </div>
    </>
  )
}

export default UpdateLocationPage