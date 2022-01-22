import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'

const SingleGym = (props) => {
  const urlParams = useParams()

      const [fullTimeEmployeeList, setFullTimeEmployeeList] = useState([])
      const [gymInfo, setGymInfo] = useState([])
      const [headSetter, setHeadSetter] = useState({})
      const [partTimeEmployeeList, setPartTimeEmployeeList] = useState([])

  useEffect( () => {
    const getInfo = async () => {
      const fetchedInfo = (await axios.get(`http://localhost:1337/api/gymById/${urlParams.id}`)).data
        setGymInfo(fetchedInfo)
      }

    getInfo()
    }, [urlParams])

    useEffect(() => {
      setHeadSetter(gymInfo?.employees?.find(employee => employee.id === gymInfo.headSetterId))
      setFullTimeEmployeeList(gymInfo?.employees?.filter(employee => employee.roleId <= 4 && employee.id !== gymInfo.headSetterId && employee.id !== 1))
      setPartTimeEmployeeList(gymInfo?.employees?.filter(employee => employee.roleId === 5))
    }, [gymInfo.employees, gymInfo.headSetterId])

    console.log('rendered')
      return (
        <>
          <h1 className="centered-text">{gymInfo.name}</h1>
          <h3 className="centered-text">{gymInfo.address}</h3>
          <h3 className="centered-text">{gymInfo.phoneNumber}</h3>
          <h3 className="centered-text">{`Facebook: ${gymInfo.facebook !== null ? gymInfo.facebook : 'None available'}`}</h3>
          <h3 className="centered-text">{`Instagram: ${gymInfo.instagram !== null ? gymInfo.instagram : 'None available'}`}</h3>
          <h3 className="centered-text">{`Twitter: ${gymInfo.twitter !== null ? gymInfo.twitter : 'None available'}`}</h3>

          <h2 className="centered-text">The Setters:</h2>
          <h3 className="centered-text">Head Setter:</h3>
          <ul className="centered-text">
            <li key={headSetter?.id} className="centered-text inside-bullet">
              <a href={`/employees/${headSetter?.id}`}>{`${headSetter?.firstName} ${headSetter?.lastName}`}</a>
            </li>
          </ul>
          <h3 className="centered-text">Full Time Setters</h3>
          <ul>
            {
              fullTimeEmployeeList?.map(setter => {
                return (
                  <li key={`full-time-${setter?.id}`} className="centered-text inside-bullet">
                    <a href={`/employees/${setter?.id}`}>{`${setter?.firstName} ${setter?.lastName}`}</a>
                  </li>
                )
              })
            }
          </ul>

          <h3 className="centered-text">Part Time Setters</h3>
          <ul>
          {
              partTimeEmployeeList?.map(setter => {
                return (
                  <li key={`part-time-${setter?.id}`} className="centered-text inside-bullet">
                    <a href={`/employees/${setter?.id}`}>{`${setter?.firstName} ${setter?.lastName}`}</a>
                  </li>
                )
              })
            }
          </ul>

          <a href={`/admin/location/${gymInfo?.id}`}>Edit Gym info</a>
        </>
      )
  }

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps, {})(SingleGym)