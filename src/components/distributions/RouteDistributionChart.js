import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import DateInput from './DateInput'
import SectionsList from './SectionsList'
import SelectionContainer from './SelectionContainer'


const RouteDistributionChart = () => {
  const today = new Date()
  const todayFormatted = today.toISOString().split('T')[0]
  const urlParams = useParams()
  const gymId = urlParams.id

  const [currentSection, setCurrentSection] = useState(1)
  const [distribution, setDistribution] = useState([])
  const [employeeList, setEmployeeList] = useState([])
  const [gymName, setGymName] = useState('')
  const [sectionDistribution, setSectionDistribution] = useState([])
  const [sectionList, setSectionList] = useState([])
  const [fullDateChange, setFullDateChange] = useState(todayFormatted)



  const handleSectionChange = (event) => {
    const sectionId = parseInt(event.target.id)

    setCurrentSection(sectionId)
  }

  const handleChangeAllDatesInSection = (event) => {
    const currentDistribution = [...sectionDistribution]

    const newDistribution = currentDistribution.map( climb => {
      if (climb.sectionId === currentSection) {
        climb.dateSet = fullDateChange
      }
      return climb
    })
    
    setSectionDistribution(newDistribution)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    console.log(distribution)
  }

  const handleChange = (event) => {
    const value = event.target.name === "sectionId" || event.target.name === 'station'
      ? parseInt(event.target.value)
      : event.target.value

    const climbId = parseInt(event.target.dataset.climbid)
    let updatedDistribution = [...distribution]
    
    updatedDistribution[climbId - 1][event.target.name] = value

    setDistribution(updatedDistribution)
}

  useEffect(() => {
    const getInfo = async () => {
      const climbInfoList = await axios.get(`http://localhost:1337/api/currentRouteGrades/${gymId}`)
      const sectionList = await axios.get(`http://localhost:1337/api/routeSections/${gymId}`)
      const gymInfo = await axios.get(`http://localhost:1337/api/gymById/${gymId}`)
      
      setDistribution(climbInfoList.data)
      setGymName(gymInfo.data.name)
      setEmployeeList(gymInfo.data.employees)
      setSectionList(sectionList.data)
    }

    getInfo()
  }, [gymId])

  useEffect(() => {
    const filteredDistribution = distribution.filter(climb => climb.sectionId === currentSection)
    const sortedFilterdDistribution = filteredDistribution.sort((climbA, climbB) => climbA - climbB)

    setSectionDistribution(sortedFilterdDistribution)
  }, [distribution, currentSection])

  return (
    <>
        <h1 className="centered-text">Distribution Spread for {gymName}</h1>

        <div className="section-selectors-container centered-text">
          {
            sectionList
              ? <SectionsList sectionList={sectionList} onClick={handleSectionChange}/>
              : null
          }
        </div>

        <div className="distribution-holder">
                <form action="/api/saveDistribution/currentRoutes" method="POST" name="distribution-table">
                  <div className="date-udpater-container">
                    <input className="gray-background date-updater" type="date" name="dateSet" onChange={(event) => setFullDateChange(event.target.value)} value={fullDateChange} />
                    <button className="date-updater button" type="button" onClick={handleChangeAllDatesInSection}>
                      Set Current Dates
                    </button>
                  </div>

                  <table className="distribution-table">
                    <thead>
                      <tr className="distribution-tr">
                      <th className="distribution-th">Station</th>
                      <th className="distribution-th">Location</th>
                      <th className="distribution-th">Rope Style</th>
                      <th className="distribution-th">Grade</th>
                      <th className="distribution-th">Color</th>
                      <th className="distribution-th">Setter</th>
                      <th className="distribution-th">Name</th>
                      <th className="distribution-th">Date</th>
                      <th className="distribution-th">Days Old</th>
                      </tr>
                    </thead>
                    
                    <tbody>
                      {
                        sectionDistribution.map(climb => {
                          return (
                            <React.Fragment key={`table-row-${climb.id}`}>
                              <tr className={`climb${climb.id} distribution-tr ${climb.color.toLowerCase()}`}>
                                <td className={`distribution-td climb${climb.id} ${climb.color.toLowerCase()}`}>
                                  <input
                                    className="centered-text gray-background station-size"
                                    data-climbid={climb.id}
                                    name="station"
                                    onChange={handleChange}
                                    value={climb.station}
                                  />
                                </td>
                              
                              <td className="distribution-td">
                                  <SelectionContainer
                                    climb={climb}
                                    onChange={handleChange}
                                    name="sectionId"
                                    list={sectionList}
                                    textKey="name"
                                    valueKey="id"
                                  />
                                </td>

                                <td className="distribution-td">
                                  <SelectionContainer
                                    climb={climb}
                                    onChange={handleChange}
                                    name="ropeStyle"
                                    list={['Top Rope Only', 'Lead Only', 'Auto Belay Only', 'TR/Lead']}
                                    textKey="ropeStyle"
                                    valueKey="ropeStyle"
                                  />
                                </td>
                                
                                <td className="distribution-td">
                                  <SelectionContainer
                                    climb={climb}
                                    onChange={handleChange}
                                    name="grade"
                                    list={['Ungraded', '5.3', '5.4', '5.5', '5.6', '5.7', '5.8', '5.9', '5.10-', '5.10', '5.10+', '5.11-', '5.11', '5.11+', '5.12-', '5.12', '5.12+', '5.13-', '5.13', '5.13+', '5.14-', '5.14', '5.14+', '5.15-', '5.15', '5.15+']}
                                    textKey="grade"
                                    valueKey="grade"
                                  />
                                </td>

                                <td className="distribution-td">
                                  <SelectionContainer
                                    climb={climb}
                                    onChange={handleChange}
                                    name="color"
                                    list={['White', 'Green', 'Black', 'Orange', 'Blue', 'Yellow', 'Red', 'Purple', 'Tan', 'Pink']}
                                    textKey="color"
                                    valueKey="color"
                                  />
                                </td>

                                <td className="distribution-td">
                                  <SelectionContainer
                                    climb={climb}
                                    onChange={handleChange}
                                    name="setter"
                                    list={employeeList}
                                    textKey="setter"
                                    valueKey="setter"
                                  />
                                </td>

                                <td className={`distribution-td climb${climb.id} ${climb.color.toLowerCase()}`}>
                                  <input
                                    className="centered-text gray-background"
                                    data-climbid={climb.id}
                                    name="climbName"
                                    onChange={handleChange}
                                    value={climb.climbName}
                                  />
                                </td>

                                <td className="distribution-td">
                                  <DateInput climb={climb} onChange={handleChange}/>
                                </td>

                                {/* //- 86400000 milliseconds in a day */}
                                <td className={`climb${climb.id} distribution-td ${climb.color.toLowerCase()}`}>{Math.floor((today - Date.parse(climb.dateSet)) / (86400000))}</td>
                              </tr>
                            </React.Fragment>
                          )
                        })
                      }
                    </tbody>
                  </table>
                  <div className="distribution-button-container">
                    <button className="distribution-button" onClick={handleSubmit} type="submit">Save Distribution</button>
                    <button className="distribution-button" onClick={handleSubmit} type="submit" >
                      <Link to="/placard/ropes" state={{ distribution }} style={{color: 'white', textDecoration: 'none'}} >
                        Print Routes Placards
                      </Link>
                    </button>
                  </div>
                </form>
        </div>
    </>
  )
}           

export default RouteDistributionChart
