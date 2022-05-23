import React from 'react'

import NewEmployeeForm from '../../components/admin/NewEmployeeForm'
import Navbar from '../../components/navbar/Navbar'


const NewEmployeePage = () => {
  return (
    <>
      <Navbar />
      <div className="centered-text">
        <NewEmployeeForm />
      </div>
    </>
  )
}

export default NewEmployeePage