import React from 'react'

import Navbar from '../../components/navbar/Navbar'
import UpdateClimbingSections from '../../components/sections/UpdateClimbingSections'

const UpdateSectionsPage = () => {
  return (
    <>
      <Navbar />
      <div className="centered-text">
        <UpdateClimbingSections /> 
      </div>
    </>
  )
}

export default UpdateSectionsPage