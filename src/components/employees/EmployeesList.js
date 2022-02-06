import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const EmployeeList = () => {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    const getInfo = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_PATH}/employees`)

      setEmployees(data)
    }

    getInfo()
  }, [])

  const renderList = () => {
      return employees.map(employee => {
        return (
          <h3 key={employee.id} className="centered-text">
            <Link to={`/employees/${employee.id}`}>
              {`${employee.firstName} ${employee.lastName}`}
            </Link>
          </h3>
        )
      })
  }

  return (
    <div>
      <h1 className="centered-text">Employees</h1>
      {renderList()}
    </div>
  )
}

export default EmployeeList