import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import { DataGrid, } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';

import SectionsList from './SectionsList';
import { setRouteDistribution, updateRouteDistribution } from '../../reducers/distributionReducers';
import ropeColumnDefs from './constants/ropeColumnDefs';
import { setSnackAlert } from '../../reducers/snackbarReducers';


const RouteDistributionChart = () => {
  const todayFormatted = useMemo(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]
}, []);
  const urlParams = useParams();
  const gymId = urlParams.id;
  const dispatch = useDispatch();
  const distribution = useSelector(state => state.distribution.routeDistribution);
  const [selectedSectionId, setSelectedSectionId] = useState(1);
  const [sectionList, setSectionList] = useState([]);
  const [gymName, setGymName] = useState('');
  const [fullDateChange, setFullDateChange] = useState(todayFormatted);
  
  const columns = useMemo(() => ropeColumnDefs, []);

  useEffect(() => {
    const getInfo = async () => {
      const climbInfoList = await axios.get(`${process.env.REACT_APP_API_PATH}/currentRouteGrades/${gymId}`);
      const sectionList = await axios.get(`${process.env.REACT_APP_API_PATH}/routeSections/${gymId}`);
      const gymInfo = await axios.get(`${process.env.REACT_APP_API_PATH}/gymById/${gymId}`);

      setGymName(gymInfo.data.name);
      setSectionList(sectionList.data);
      dispatch(setRouteDistribution(climbInfoList.data));
    }

    getInfo()
  }, [gymId, dispatch])

  const filteredDistribution = useMemo(() =>
    distribution?.filter(climbInfo => climbInfo.sectionId === selectedSectionId), [distribution, selectedSectionId]);

  const handleSectionChange = (event) => {
    const sectionId = parseInt(event.target.id)

    setSelectedSectionId(sectionId)
  }

  const addNewClimb = () => {
    const station = filteredDistribution.length
      ? filteredDistribution[filteredDistribution.length - 1].station
      : 1
  
    const newClimb = {
      id: distribution.length + 1,
      gymId: gymId,
      sectionId: selectedSectionId,
      station,
      ropeStyle: 'Top Rope Only',
      grade: '5.5',
      color: 'Pink',
      setter: 'Guest',
      climbName: '',
      dateSet: todayFormatted,
    }
  
    const newDistribution = [...distribution, newClimb];
    dispatch(setRouteDistribution(newDistribution));
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await axios.post(`${process.env.REACT_APP_API_PATH}/saveDistribution/currentRoutes`, {distribution})
      dispatch(setSnackAlert({
        alertType: 'Success',
        messageBody: 'The distribution has been saved!'
      }));
    } catch {
      dispatch(setSnackAlert({
        alertType: 'Alert',
        messageBody: 'There was an issue saving teh distribution, please try again.'
      }));
    }
  }

  const handleChangeAllDatesInSection = (event) => {
    const currentDistribution = [...filteredDistribution]

    const newDistribution = currentDistribution.map( climb => {
      if (climb.sectionId === selectedSectionId) {
        climb.dateSet = fullDateChange
      }
      return climb
    })
    
    dispatch(setRouteDistribution(newDistribution));
  }

  return (
    <Box sx={{ m: '0 auto', mt: '5rem', width: '80rem' }}>
      <Box sx={{  position: 'fixed', top: '4rem', bgcolor: theme => theme.palette.common.white, zIndex: 999, textAlign: 'center', mx: 'auto', width: '100%'}}>
        <Typography  variant="h4" sx={{ mb: 4 }} className="centered-text">Distribution Spread for {gymName}</Typography>

        <Box sx={{ mx: 'auto', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          {
            sectionList.length > 0
              ? <SectionsList sectionList={sectionList} onClick={handleSectionChange} currentSelectedId={selectedSectionId} />
              : null
          }

          <Box sx={{ mx: '4rem' }}>
            <Button variant="contained" className="distribution-button" onClick={handleSubmit} type="submit">Save Distribution</Button>
            <Button variant="outlined" sx={{ mx: 4, height: '2.5rem', }} onClick={addNewClimb}>Add climb</Button>
            <Link to="/placard/ropes" state={{ distribution }} style={{ textDecoration: 'none'}}>
              <Button variant="outlined" className="distribution-button" type="button">
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
    
      
      <Box className="distribution-holder" sx={{ height: '40rem', mt: '15rem', }}>
        <DataGrid
          editMode='row'
          rows={filteredDistribution || []}
          columns={columns}
          disableColumnFilter
          experimentalFeatures={{ newEditingApi: true }} 
          processRowUpdate={(newRow, oldRow) => {
            dispatch(updateRouteDistribution(newRow));
            dispatch(setSnackAlert({
              alertType: 'Success',
              messageBody: `A climb at station #${newRow.station} has been updated!`,
            }))
            return newRow;
          }}
          onProcessRowUpdateError={() => {
            dispatch(setSnackAlert({
              alertType: 'Error',
              messageBody: 'There was an issue updating the climb, please try again.',
            }));
          }}
        />
      </Box>
    </Box>
  )
}

export default RouteDistributionChart
