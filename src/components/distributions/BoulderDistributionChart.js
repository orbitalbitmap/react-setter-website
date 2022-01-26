import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import DateInput from './DateInput'
import SectionsList from './SectionsList'
import SelectionContainer from './SelectionContainer'


const BoulderDistributionChart = () => {
  const today = new Date()
  const todayFormatted = today.toISOString().split('T')[0]
  const urlParams = useParams()

  const [currentSection, setCurrentSection] = useState(1)
  const [distribution, setDistribution] = useState([])
  const [employeeList, setEmployeeList] = useState([])
  const [gymId, setGymId] = useState(0)
  const [gymName, setGymName] = useState('')
  const [sectionDistribution, setSectionDistribution] = useState([])
  const [sectionList, setSectionList] = useState([])
  const [fullDateChange, setFullDateChange] = useState(todayFormatted)

  const handleSectionChange = (event) => {
    const sectionId = parseInt(event.target.id)
    const filteredDistribution = distribution.filter(climb => climb.sectionId === sectionId)
    const sortedDistribution = filteredDistribution.sort((climbA, climbB) => climbA - climbB)

    setCurrentSection(sectionId)
    setSectionDistribution(sortedDistribution)
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

  const handleChange = async (event) => {
    const value = event.target.name === "sectionId"
      ? parseInt(event.target.value)
      : event.target.value

    const climbId = parseInt(event.target.dataset.climbid)
    let updatedDistribution = [...distribution]
    
    updatedDistribution[climbId - 1][event.target.name] = value
    
    const filteredDistribution = updatedDistribution.filter(climb => climb.sectionId === currentSection)
    const sortedDistribution = filteredDistribution.sort((climbA, climbB) => climbA - climbB)


    setDistribution(updatedDistribution)
    setSectionDistribution(sortedDistribution)
}

  useEffect(() => {
    const getInfo = async () => {
      const climbInfoList = await axios.get(`http://localhost:1337/api/currentBoulderGrades/${urlParams.id}`)
      const sectionList = await axios.get(`http://localhost:1337/api/boulderSections/${urlParams.id}`)
      const gymInfo = await axios.get(`http://localhost:1337/api/gymById/${urlParams.id}`)

      const filteredDistribution = climbInfoList.data.filter(climb => climb.sectionId === currentSection)
      const sortedFilterdDistribution = filteredDistribution.sort((climbA, climbB) => climbA - climbB)

      
      setDistribution(climbInfoList.data)
      setGymId(gymInfo.data.gymId)
      setGymName(gymInfo.data.name)
      setEmployeeList(gymInfo.data.employees)
      setSectionList(sectionList.data)
      setSectionDistribution(sortedFilterdDistribution)
    }

    getInfo()
  }, [currentSection, urlParams])

  return (
    <>
      {/* if (gymName !== null) */}
        <h1 className="centered-text">Distribution Spread for {gymName}</h1>

        <div className="section-selectors-container centered-text">
          {
            sectionList
              ? <SectionsList sectionList={sectionList} onClick={handleSectionChange}/>
              : null
          }
        </div>

        <div className="distribution-holder">
                <form name="distribution-table">
                  <div className="date-udpater-container">
                    <input className="gray-background date-updater" type="date" name="dateSet" onChange={(event) => setFullDateChange(event.target.value)} value={fullDateChange} />
                    <button className="date-updater button" type="button" onClick={handleChangeAllDatesInSection}>
                      Set Current Dates
                    </button>
                  </div>

                  <table className="distribution-table">
                    <thead>
                      <tr className="distribution-tr">
                        <th className="distribution-th"> Grade</th>
                        <th className="distribution-th">Color</th>
                        <th className="distribution-th">Setter</th>
                        <th className="distribution-th">Location</th>
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
                                <td className="distribution-td">
                                  <SelectionContainer
                                    climb={climb}
                                    onChange={handleChange}
                                    name="grade"
                                    list={['VB', 'V0', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'V10', 'V11', 'V12', 'V13', 'V14', 'V15', 'V16', 'V17']}
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
                    <button className="distribution-button"  type="submit">Save Distribution</button>
                    <button className="distribution-button" type="submit" onClick={handleSubmit} >Print Boulder Placards</button>  {/* formAction={`/placards/${gymId}/boulders`} */ }
                    <button className="distribution-button" type="submit" onClick={handleSubmit} >Print Boulder Bash Placard</button>  {/* formAction={`/placards/${gymId}/boulderBash`} */ }
                  </div>
                </form>
        </div>
    </>
  )
}

export default BoulderDistributionChart
