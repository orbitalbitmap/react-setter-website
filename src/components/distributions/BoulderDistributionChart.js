import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import DateInput from './DateInput'
import SectionsList from './SectionsList'
import SelectionContainer from './SelectionContainer'


const BoulderDistributionChart = () => {
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
  const [open, setOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const snackBarAction = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  )

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

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await axios.post(`${process.env.REACT_APP_API_PATH}/saveDistribution/currentBoulders`, {sectionDistribution})
      setOpen(true)
      setSnackbarMessage('Distribution has been saved!')
    } catch {
      setOpen(true)
      setSnackbarMessage('Oops! Looks like something went wrong. Please Try again.')
    }
  }

  const handleChange = async (event) => {
    const value = event.target.name === "sectionId"
      ? parseInt(event.target.value)
      : event.target.value

    const climbId = parseInt(event.target.dataset.climbid)
    let updatedDistribution = [...distribution]
    
    updatedDistribution[climbId - 1][event.target.name] = value

    setDistribution(updatedDistribution)
}

  useEffect(() => {
    const getInfo = async () => {
      const climbInfoList = await axios.get(`${process.env.REACT_APP_API_PATH}/currentBoulderGrades/${gymId}`)
      const sectionList = await axios.get(`${process.env.REACT_APP_API_PATH}/boulderSections/${gymId}`)
      const gymInfo = await axios.get(`${process.env.REACT_APP_API_PATH}/gymById/${gymId}`)
      
      setDistribution(climbInfoList.data)
      setGymName(gymInfo.data.name)
      setEmployeeList(gymInfo.data.employees)
      setSectionList(sectionList.data)
    }

    getInfo()
  }, [gymId])

  useEffect(() => {
    const filteredDistribution = distribution.filter(climb => climb.sectionId === currentSection)
    const sortedFilteredDistribution = filteredDistribution.sort((climbA, climbB) => climbA - climbB)

    setSectionDistribution(sortedFilteredDistribution)
  }, [distribution, currentSection])

  return (
    <>
        <h1 className="centered-text">Distribution Spread for {gymName}</h1>

        <div className="section-selectors-container centered-text">
          {
            sectionList
              ? <SectionsList sectionList={sectionList} onClick={handleSectionChange} currentSelectedId={currentSection} />
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
                        <tr className={`climb${climb.id} distribution-tr ${climb?.color.toLowerCase()}`}>
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
                          <td className={`climb${climb.id} distribution-td ${climb?.color.toLowerCase()}`}>{Math.floor((today - Date.parse(climb.dateSet)) / (86400000))}</td>
                        </tr>
                      </React.Fragment>
                    )
                  })
                }
              </tbody>
            </table>

            <div className="distribution-button-container">
              <button className="distribution-button" onClick={handleSubmit} type="submit">Save Distribution</button>
              <button className="distribution-button" type="submit">
                <Link to="/placard/boulders" state={{ distribution: sectionDistribution}} style={{color: 'white', textDecoration: 'none'}}>
                  Print Boulder Placard
                </Link>
              </button>
              <button className="distribution-button" onClick={() => console.log('not yet implemented')} type="submit" >Print Boulder Bash Placard</button>
            </div>
          </form>
        </div>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          message={snackbarMessage}
          onClose={handleClose}
          action={snackBarAction}
          sx={{ bottom: {xs: 16 } }}
        />
    </>
  )
}

export default BoulderDistributionChart
