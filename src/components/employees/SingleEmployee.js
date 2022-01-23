import axios from 'axios'
import {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

const SingleEmployee = (props) => {
  const urlParams = useParams()
  const [employee, setEmployee] = useState({})

  useEffect(() => {
    const getInfo = async () => {
      const { data } = await axios.get(`http://localhost:1337/api/employees/${urlParams.id}`)

      setEmployee(data)
    }

    getInfo()
  }, [urlParams])

  const renderList = () => {
    if (!employee.id) {
      return (
        <h2>Loading....</h2>
      )
    }
    return (
      <div>
        <h1 className="centered-text">{`${employee.firstName} ${employee.lastName}`}</h1>
        <h3 className="centered-text">{employee.email}</h3>
        <h3 className="centered-text">{employee.phoneNumber}</h3>

        <h2 className="centered-text"> Gyms:</h2>
        <ul className="centered-text inside-bullet">
          {employee.gyms.map(gym => {
            return (
              <li key={gym.name}>
                <Link to={`/locations/${gym.id}`}>{gym.name}</Link>
              </li>
            )
          }
          )}
        </ul>

        { 
          props.user.roleId <= 3
            ? <Link to={`/admin/employee/${employee.id}`}>Edit Employee</Link>
            : null
        }
      </div>
    )
  }

  return (
    <div>
      {renderList()}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps, {})(SingleEmployee)