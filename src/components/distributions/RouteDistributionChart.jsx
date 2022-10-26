import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';

import DateInput from './DateInput';
import SectionsList from './SectionsList';
import SelectionContainer from './SelectionContainer';
import { setRouteDistribution } from '../../reducers/distribution';
import { useDispatch } from 'react-redux';

const RouteDistributionChart = () => {
  const today = new Date();
  const todayFormatted = today.toISOString().split('T')[0];
  const urlParams = useParams();
  const gymId = urlParams.id;
  const dispatch = useDispatch();

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
      await axios.post(`${process.env.REACT_APP_API_PATH}/saveDistribution/currentRoutes`, {sectionDistribution})
      setOpen(true)
      setSnackbarMessage('Distribution has been saved!')
    } catch {
      setOpen(true)
      setSnackbarMessage('Oops! Looks like something went wrong. Please Try again.')
    }
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

  const handleChange = async (event) => {
    const { index, name, value } = event.target.dataset;
    let [...newDistribution] = distribution
    newDistribution[parseInt(index)][name] = name ==='sectionId'
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
  const station = sectionDistribution.length
    ? sectionDistribution[sectionDistribution.length - 1].station
    : 1

  const newClimb = {
    id: distribution.length + 1,
    gymId: gymId,
    sectionId: currentSection,
    station,
    ropeStyle: 'Top Rope Only',
    grade: '5.5',
    color: 'Pink',
    setter: 'Guest',
    climbName: '',
    dateSet: todayFormatted,
  }

  const newDistribution = [...distribution, newClimb];
  setDistribution(newDistribution);
}

  useEffect(() => {
    const getInfo = async () => {
      const climbInfoList = await axios.get(`${process.env.REACT_APP_API_PATH}/currentRouteGrades/${gymId}`);
      const sectionList = await axios.get(`${process.env.REACT_APP_API_PATH}/routeSections/${gymId}`);
      const gymInfo = await axios.get(`${process.env.REACT_APP_API_PATH}/gymById/${gymId}`);
      
      setDistribution(climbInfoList.data);
      setGymName(gymInfo.data.name);
      setEmployeeList(gymInfo.data.employees);
      setSectionList(sectionList.data);
      dispatch(setRouteDistribution(climbInfoList.data));
    }

    getInfo()
  }, [gymId, dispatch])

  useEffect(() => {
    const filteredDistribution = distribution.filter(climb => climb.sectionId === currentSection);
    const sortedFilteredDistribution = filteredDistribution.sort((climbA, climbB) => climbA.station - climbB.station);

    setSectionDistribution(sortedFilteredDistribution);
  }, [distribution, currentSection])

  useEffect(() => {
    setTimeout(() => { setCurrentSection(1)}, 500)
  }, []);

  return (
    <Box sx={{ m: '0 auto', mt: '5rem', width: '95rem' }}>
      <Box sx={{ mx: 'auto', position: 'fixed', top: '4rem', bgcolor: theme => theme.palette.common.white, width: "90%", zIndex: 999}}>
        <Typography  variant="h4" sx={{ mb: 4 }} className="centered-text">Distribution Spread for {gymName}</Typography>

        <Box sx={{ display: 'flex', flexDirection: 'row', }}>
          <Box className="section-selectors-container centered-text">
            {
              sectionList.length > 0
                ? <SectionsList sectionList={sectionList} onClick={handleSectionChange} currentSelectedId={currentSection} />
                : null
            }
          </Box>

          <Box sx={{ mx: 'auto', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Button variant="contained" sx={{ mx: 2, }} className="distribution-button" onClick={handleSubmit} type="submit">Save Distribution</Button>
            <Button variant="outlined" sx={{ mx: 2, height: '2.5rem', }} onClick={addNewClimb}>Add climb</Button>
            <Link to="/placard/ropes" state={{ distribution }} style={{ textDecoration: 'none'}}>
              <Button variant="outlined" sx={{ mx: 2, }} className="distribution-button" type="button">
                Print Route Placard
              </Button>
            </Link>
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
      
      <Box className="distribution-holder" sx={{ height: '100%', mt: '11rem' }}>
        <form name="distribution-table">
          <Table className="distribution-table">
            <TableHead>
              <TableRow className="distribution-tr">
                <TableCell className="distribution-th" sx={{ color: 'white', textAlign: 'center', fontSize: '1.25rem',  }}> Station</TableCell>
                <TableCell className="distribution-th" sx={{ color: 'white', textAlign: 'center', fontSize: '1.25rem',  }}> Name</TableCell>
                <TableCell className="distribution-th" sx={{ color: 'white', textAlign: 'center', fontSize: '1.25rem',  }}> Location</TableCell>
                <TableCell className="distribution-th" sx={{ color: 'white', textAlign: 'center', fontSize: '1.25rem',  }}> Rope Style</TableCell>
                <TableCell className="distribution-th" sx={{ color: 'white', textAlign: 'center', fontSize: '1.25rem',  }}> Grade</TableCell>
                <TableCell className="distribution-th" sx={{ color: 'white', textAlign: 'center', fontSize: '1.25rem',  }}>Color</TableCell>
                <TableCell className="distribution-th" sx={{ color: 'white', textAlign: 'center', fontSize: '1.25rem',  }}>Setter</TableCell>
                <TableCell className="distribution-th" sx={{ color: 'white', textAlign: 'center', fontSize: '1.25rem',  }}>Date</TableCell>
                <TableCell className="distribution-th" sx={{ color: 'white', textAlign: 'center', fontSize: '1.25rem',  }}>Days Old</TableCell>
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
                        <TableCell className="distribution-td">
                          <TextField
                            label="Station"
                            id={`${climb.id}`}
                            sx={{ color: fontColor, width: '4rem', textAlign: 'center', }}
                            variant="outlined"
                            value={climb.station}
                            onChange={handleInputChange}
                            inputProps={{ 
                              'data-name': 'station',
                              'data-index': climb.id - 1,
                              sx: { color: fontColor }
                            }}
                            InputLabelProps={{
                              sx: { color: fontColor}
                            }}
                          />
                        </TableCell>

                        <TableCell className="distribution-td">
                          <TextField
                            label="Name"
                            id={`${climb.id}`}
                            sx={{ color: fontColor, width: '12rem', textAlign: 'center', }}
                            variant="outlined"
                            value={climb.climbName}
                            onChange={handleInputChange}
                            inputProps={{ 
                              'data-name': 'climbName',
                              'data-index': climb.id - 1,
                              sx: { color: fontColor }
                            }}
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
                          <SelectionContainer
                            handleChange={handleChange}
                            value={climb.ropeStyle}
                            name="ropeStyle"
                            list={['Top Rope Only', 'Lead Only', 'Auto Belay Only', 'TR/Lead']}
                            id={climb.id}
                            color={climb.color}
                          />
                        </TableCell>
                        
                        <TableCell className="distribution-td">
                          <SelectionContainer
                            handleChange={handleChange}
                            value={climb.grade}
                            name="grade"
                            list={['Ungraded', '5.3', '5.4', '5.5', '5.6', '5.7', '5.8', '5.9', '5.10-', '5.10', '5.10+', '5.11-', '5.11', '5.11+', '5.12-', '5.12', '5.12+', '5.13-', '5.13', '5.13+', '5.14-', '5.14', '5.14+', '5.15-', '5.15', '5.15+']}
                            id={climb.id}
                            color={climb.color}
                            sx={{ width: '6rem' }}
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
                            sx={{ width: '6.5rem' }}
                          />
                        </TableCell>

                        <TableCell className="distribution-td">
                          <SelectionContainer
                            value={climb.setter}
                            handleChange={handleChange}
                            name="setter"
                            list={[{firstName: 'Guest'}, ...employeeList]}
                            id={climb.id}
                            color={climb.color}
                            sx={{ width: '6rem' }}
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
        </form>
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

export default RouteDistributionChart
