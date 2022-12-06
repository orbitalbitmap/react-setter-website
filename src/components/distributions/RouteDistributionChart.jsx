import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Button, ButtonGroup, TextField, Typography } from '@mui/material';
import { DataGrid, } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';

import SectionsList from './SectionsList';
import { setRouteDistribution, updateDates, updateRouteDistribution } from '../../reducers/distribution/distributionReducers';
import ropeColumnDefs from './constants/ropeColumnDefs';
import { setSnackAlert } from '../../reducers/snackbarReducers';

import ColorPicker from './components/ColorPicker';


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

  const onDateChange = (event) => {
    dispatch(updateDates({
      type: 'routeDistribution',
      newDate: fullDateChange,
      sectionIdToUpdate: selectedSectionId,
    }));
  }

  return (
    <Box sx={{ mx: 'auto', mt: '5rem', width: '100%' }}>
      <Box sx={{ 
        position: 'fixed',
        top: '5rem',
        bgcolor: theme => theme.palette.common.white,
        zIndex: 900,
        textAlign: 'center',
        mx: 'auto',
        width: '100%'
        }}
      >
        <Typography  variant="h4" sx={{ mb: 4 }} className="centered-text">Distribution Spread for {gymName}</Typography>

        <Box sx={{ width: '100%', mx: 'auto', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
          {
            sectionList.length > 0
              ? <SectionsList sectionList={sectionList} onClick={handleSectionChange} currentSelectedId={selectedSectionId} />
              : null
          }

          <Box sx={{ mx: '4rem', justifyContent: 'center', }}>
            <ButtonGroup variant="contained" orientation="vertical">
              <Button onClick={addNewClimb}>Add climb</Button>
              <Button
                onClick={handleSubmit}
                type="submit"
                sx={{
                  borderTop: '1px solid white',
                  borderBottom: '1px solid white',
                }}
              >
                Save Distribution
              </Button>
              <Button component={Link}  to="/placard/ropes">
                  Print Route Placard
                </Button>
            </ButtonGroup>
          </Box>

          <Box className="date-updater-container">
            <TextField
              id="date"
              label="Date"
              type="date"
              name="dateSet"
              value={fullDateChange}
              onChange={(event) => setFullDateChange(event.target.value)}
              sx={{ width: '11rem',  }}
              inputProps={{ height: '15rem', }}
            />
            <Button
              variant="contained"
              className="date-updater button"
              type="button"
              onClick={onDateChange}
              sx={{ height: '15rem', }}
            >
              Set Current Dates
            </Button>
          </Box>
        </Box>
      </Box>
    
      
      <Box className="distribution-holder" sx={{ width: '80rem', height: '40rem', mt: '15rem', mx: 'auto', justifyContent: 'center', }}>
        <DataGrid
          editMode='row'
          rows={filteredDistribution || []}
          columns={columns}
          disableColumnFilter
          experimentalFeatures={{ newEditingApi: true }} 
          processRowUpdate={(newRow, oldRow) => {
            console.log({
              newRow
            })
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
      <ColorPicker />
    </Box>
  )
}

export default RouteDistributionChart
