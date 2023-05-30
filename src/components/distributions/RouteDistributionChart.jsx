import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Button, ButtonGroup, TextField, Typography } from '@mui/material';
import { DataGrid, } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';

import SectionsList from './SectionsList';
import { setRouteDistribution, updateDates, } from '../../reducers/distribution/distributionReducers';
import getRopeColumnDefs from './constants/ropeColumnDefs';
import { setNotificationAlert } from '../../reducers/notificationsReducers';
import {
  useGetLocationByIdQuery,
  useGetRouteDistributionQuery,
  useGetSpecificRouteSectionsQuery,
  useUpdateRouteDistributionMutation,
} from '../../services/gym';


const RouteDistributionChart = () => {
  const todayFormatted = useMemo(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]
}, []);
  const urlParams = useParams();
  const gymId = urlParams.id;
  const dispatch = useDispatch();
  const [
    saveRouteDistribution,
    { isLoading, isUpdating }
  ] = useUpdateRouteDistributionMutation();

  const { data } = useGetRouteDistributionQuery(gymId);
  const { data: sectionList } = useGetSpecificRouteSectionsQuery(gymId);
  const { data: gymInfo } = useGetLocationByIdQuery(gymId);
  const {employeeList, gymName} = useMemo(() => {
    let employeeList = [];
    let gymName = '';

    if (gymInfo?.id) {
      employeeList = gymInfo?.employees;
      gymName = gymInfo?.name;
    }
    return {
      employeeList,
      gymName,
    }
  }, [gymInfo]);

  const distribution = useSelector(state => state.distribution.routeDistribution);
  const [selectedSectionId, setSelectedSectionId] = useState(1);
  const [fullDateChange, setFullDateChange] = useState(todayFormatted);
  
  const columns = useMemo(() => {
    const ropeColumnDefs = getRopeColumnDefs(sectionList, employeeList);
    return ropeColumnDefs;
}, [sectionList, employeeList]);


  useEffect(() => {
    if(data?.length > 0) {
      dispatch(setRouteDistribution(data));
    }
  }, [data, dispatch]);

  const filteredDistribution = distribution?.filter(climbInfo => climbInfo.sectionId === selectedSectionId);

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
      await saveRouteDistribution(distribution);
      dispatch(setNotificationAlert({
        alertType: 'success',
        messageBody: 'The distribution has been saved!'
      }));
    } catch {
      dispatch(setNotificationAlert({
        alertType: 'error',
        messageBody: 'There was an issue saving teh distribution, please try again.'
      }));
    }
  };

  const onDateChange = (event) => {
    dispatch(updateDates({
      type: 'routeDistribution',
      newDate: fullDateChange,
      sectionIdToUpdate: selectedSectionId,
    }));
  };

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
            sectionList?.length > 0
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
          rows={filteredDistribution || []}
          columns={columns}
          disableColumnFilter
          experimentalFeatures={{ newEditingApi: true }} 
          getRowId={row => `${row.id}-${row.gymId}`}
        />
      </Box>
    </Box>
  )
}

export default RouteDistributionChart
