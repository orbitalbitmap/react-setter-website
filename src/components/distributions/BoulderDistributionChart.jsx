import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';

import DateInput from './DateInput'
import SectionsList from './SectionsList'
import SelectionContainer from './SelectionContainer'
import { setBoulderDistribution } from '../../reducers/distribution';
import { useDispatch } from 'react-redux';

const BoulderDistributionChart = () => {
  const today = new Date();
  const todayFormatted = today.toISOString().split('T')[0];
  const urlParams = useParams();
  const gymId = urlParams.id;
  const dispatch = useDispatch()

  const [currentSection, setCurrentSection] = useState(0);
  const [distribution, setDistribution] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [gymName, setGymName] = useState('');
  const [sectionDistribution, setSectionDistribution] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const [fullDateChange, setFullDateChange] = useState(todayFormatted);
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

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
    const {index, name, value } = event.target.dataset;
    const [...newDistribution] = distribution

    newDistribution[parseInt(index)][name] = name ==='sectionId' ? parseInt(value): value;

    setDistribution(newDistribution)
}

const handleInputChange = async (event) => {
  const { index, name} = event.target.dataset;
  const { value } = event.target;

  let [...newDistribution] = distribution
  newDistribution[parseInt(index)][name] = name ==='station'
    ? parseInt(value)
    : value;
    
  setDistribution(newDistribution)
}

const handleDateSetChange = async (event, index) => {
  const { name, value } = event.target;
  const [...newDistribution] = distribution

  newDistribution[parseInt(index)][name] = value;

  setDistribution(newDistribution)
}

const addNewClimb = () => {
  const newClimb = {
    id: distribution.length + 1,
    gymId: gymId,
    grade: 'VB',
    color: 'Pink',
    setter: 'Guest',
    holds: null,
    style: null,
    sectionId: currentSection,
    dateSet: todayFormatted,
    position: sectionDistribution.length + 1,
  }

  const newDistribution = [...distribution, newClimb];
  setDistribution(newDistribution);
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
      dispatch(setBoulderDistribution(climbInfoList.data))
    }

    getInfo()
  }, [gymId, dispatch])

  useEffect(() => {
    const filteredDistribution = distribution.filter(climb => climb.sectionId === currentSection)
    const sortedFilteredDistribution = filteredDistribution.sort((climbA, climbB) => climbA.position - climbB.position)

    setSectionDistribution(sortedFilteredDistribution)
  }, [distribution, currentSection])

  useEffect(() => {
    setTimeout(() => { setCurrentSection(1)}, 500)
  }, []);

  return (
    <Box sx={{ m: '0 auto', mt: '5rem', width: '90rem' }}>
      <Box sx={{ mx: 'auto', position: 'fixed', top: '4rem', bgcolor: theme => theme.palette.common.white, width: "85%", zIndex: 999}}>
        <Typography  variant="h4" sx={{ mt: 2, mb: 4 }} className="centered-text">Distribution Spread for {gymName}</Typography>

        <Box sx={{ display: 'flex', flexDirection: 'row', }}>
          <Box className="section-selectors-container centered-text" sx={{ my: 'auto', }}>
            {
              sectionList.length > 0
                ? <SectionsList sectionList={sectionList} onClick={handleSectionChange} currentSelectedId={currentSection} />
                : null
            }
          </Box>

          <Box sx={{ mx: 'auto', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Button variant="contained" sx={{ mx: 2, height: '2.5rem', }} onClick={handleSubmit} type="submit">Save Distribution</Button>
            <Button variant="outlined" sx={{ mx: 2, height: '2.5rem', }} onClick={addNewClimb}>Add climb</Button>
          
            <Link to="/placard/boulders" style={{ color: 'white', textDecoration: 'none', }}>
              <Button variant="outlined" sx={{ mx: 2, height: '2.5rem', }} className="distribution-button" type="button">
                Print Boulder Placard
              </Button>
            </Link>
            {/* <Button variant="outlined" sx={{ mx: 2, height: '2.5rem', }} onClick={() => console.log('not yet implemented')} type="button" >Print Boulder Bash Placard</Button> */}
          </Box>

          <Box className="date-updater-container">
            <TextField
              id="date"
              label="Date"
              type="date"
              name="dateSet"
              value={fullDateChange}
              onChange={(event) => setFullDateChange(event.target.value)}
              sx={{ width: '11rem' }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button variant="contained" className="date-updater button" type="button" onClick={handleChangeAllDatesInSection}>
              Set Current Dates
            </Button>
          </Box>
        </Box>
      </Box>

      <Box className="distribution-holder" sx={{ mt: '12rem', height: '100%', }}>
        <Table className="distribution-table">
          <TableHead>
            <TableRow className="distribution-tr">
              <TableCell className="distribution-th" sx={{ color: 'white', textAlign: 'center', fontSize: '1.25rem', }}>Position</TableCell>
              <TableCell className="distribution-th" sx={{ color: 'white', textAlign: 'center', fontSize: '1.25rem', }}>Grade</TableCell>
              <TableCell className="distribution-th" sx={{ color: 'white', textAlign: 'center', fontSize: '1.25rem', }}>Color</TableCell>
              <TableCell className="distribution-th" sx={{ color: 'white', textAlign: 'center', fontSize: '1.25rem', }}>Setter</TableCell>
              <TableCell className="distribution-th" sx={{ color: 'white', textAlign: 'center', fontSize: '1.25rem', }}>Location</TableCell>
              <TableCell className="distribution-th" sx={{ color: 'white', textAlign: 'center', fontSize: '1.25rem', }}>Date</TableCell>
              <TableCell className="distribution-th" sx={{ color: 'white', textAlign: 'center', fontSize: '1.25rem', }}>Days Old</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {
              sectionDistribution.map((climb) => {
                let fontColor = 'black';
                switch(climb.color) {
                  case 'Green':
                  case 'Blue':
                  case 'Purple':
                  case 'Black':
                    fontColor = '#fff';
                    break;
                  default:
                    fontColor = 'black';
                    break;
                }

                return (
                  <React.Fragment key={`table-row-${climb.id}`}>
                    <TableRow className={`climb${climb.id} distribution-tr ${climb?.color.toLowerCase()}`}>
                        <TableCell className="distribution-td" style={{ textAlign: 'center', }} >
                          <TextField
                            label="Position"
                            id={`${climb.id}`}
                            sx={{ color: fontColor, width: '5rem', }}
                            variant="outlined"
                            value={climb.position}
                            onChange={handleInputChange}
                            inputProps={{ 
                              'data-name': 'position',
                              'data-index': climb.id - 1,
                              sx: { color: fontColor, textAlign: 'center' }
                            }}
                            InputLabelProps={{
                              sx: { color: fontColor}
                            }}
                          />
                        </TableCell>
                      <TableCell className="distribution-td">
                        <SelectionContainer
                          handleChange={handleChange}
                          value={climb.grade}
                          name="grade"
                          list={['VB', 'V0', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'V10', 'V11', 'V12', 'V13', 'V14', 'V15', 'V16', 'V17']}
                          id={climb.id}
                          color={climb.color}
                        />
                      </TableCell>

                      <TableCell className="distribution-td">
                        <SelectionContainer
                          handleChange={handleChange}
                          value={climb.color}
                          name="color"
                          list={['White', 'Green', 'Black', 'Orange', 'Blue', 'Yellow', 'Red', 'Purple', 'Tan', 'Pink']}
                          id={climb.id}
                          color={climb.color}
                        />
                      </TableCell>

                      <TableCell className="distribution-td">
                        <SelectionContainer
                          value={climb.setter}
                          handleChange={handleChange}
                          name="setter"
                          list={[{placardName: 'Guest'}, ...employeeList]}
                          id={climb.id}
                          color={climb.color}
                        />
                      </TableCell>

                      <TableCell className="distribution-td">
                        <SelectionContainer
                          value={climb.sectionId}
                          handleChange={handleChange}
                          name="sectionId"
                          list={sectionList}
                          id={climb.id}
                          color={climb.color}
                        />
                      </TableCell>

                      <TableCell className="distribution-td">
                        <DateInput id={climb.id} color={climb.color} name="dateSet" value={climb.dateSet} onChange={handleDateSetChange}/>
                      </TableCell>

                      {/* //- 86400000 milliseconds in a day */}
                      <TableCell
                        className={`climb${climb.id} distribution-td ${climb?.color.toLowerCase()}`}
                        sx={{ minWidth: '4rem', textAlign: 'center', }}
                        classes={{ TableCell: { root: { color: 'white'} }}}
                      >
                        <Box sx={{ color: fontColor }}>{ Math.floor((today - Date.parse(climb.dateSet)) / (86400000)) }</Box>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                )
              })
            }
          </TableBody>
        </Table>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        message={snackbarMessage}
        onClose={handleClose}
        action={snackBarAction}
        sx={{ bottom: {xs: 16 } }}
      />
    </Box>
  )
}

export default BoulderDistributionChart
