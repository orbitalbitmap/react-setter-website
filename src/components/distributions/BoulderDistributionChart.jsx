import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, ButtonGroup, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';

import SectionsList from './SectionsList'
import getBoulderColumnDefs from './constants/boulderColumnDefs';
import { setBoulderDistribution, updateDates } from '../../reducers/distribution/distributionReducers';
import { setNotificationAlert } from '../../reducers/notificationsReducers';
import { 
  useGetBoulderDistributionQuery,
  useGetSpecificBoulderSectionsQuery,
  useGetLocationByIdQuery,
  useUpdateBoulderDistributionMutation,
} from '../../services/gym';

const BoulderDistributionChart = () => {
  const dispatch = useDispatch();
  const [
    saveBoulderDistribution,
    { isLoading, isUpdating }
  ] = useUpdateBoulderDistributionMutation();
  const todayFormatted = useMemo(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }, []);
  const urlParams = useParams();
  const gymId = urlParams.id;
  const { data, isFetching: isFetchingDistribution, refetch: refetchDistribution } = useGetBoulderDistributionQuery(gymId);
  const { data: sectionList, } = useGetSpecificBoulderSectionsQuery(gymId);
  const { data: gymInfo, } = useGetLocationByIdQuery(gymId);
  
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
  
  useEffect(() => {
    if(data?.length > 0) {
      dispatch(setBoulderDistribution(data));
    }
  }, [data, dispatch]);


  const distribution = useSelector(state => state.distribution.boulderDistribution);
  const [selectedSectionId, setSelectedSectionId] = useState(1);
  const [fullDateChange, setFullDateChange] = useState(todayFormatted);

  const filteredDistribution = distribution?.filter(climbInfo => climbInfo.sectionId === selectedSectionId);

  const memoizedBoulderColumnDefs = useMemo(() => {
    const boulderColumnDefs = getBoulderColumnDefs(sectionList, employeeList);

    return boulderColumnDefs;
  }, [employeeList, sectionList]);


  const handleSectionChange = (event) => {
    const sectionId = parseInt(event.target.id)

    setSelectedSectionId(sectionId)
  }

  const onDateChange = (event) => {
    dispatch(updateDates({
      type: 'boulderDistribution',
      newDate: fullDateChange,
      sectionIdToUpdate: selectedSectionId,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await saveBoulderDistribution(distribution);
      await refetchDistribution();

      dispatch(setNotificationAlert({
        alertType: 'success',
        messageBody: 'The distribution has been saved!'
      }));
    } catch {
      dispatch(setNotificationAlert({
        alertType: 'error',
        messageBody: 'There was an issue saving the distribution, please try again.'
      }));
    }
  }

  const addNewClimb = () => {
    // @TODO: handle the position better

    const newClimb = {
      id: distribution.length + 1,
      gymId: gymId,
      grade: 'VB',
      color: 'Pink',
      setter: 'Guest',
      holds: null,
      style: null,
      sectionId: selectedSectionId,
      dateSet: todayFormatted,
      position: filteredDistribution.length + 1,
    }

    const newDistribution = [...distribution, newClimb];
    dispatch(setBoulderDistribution(newDistribution));
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
            sectionList?.length > 0
              ? <SectionsList sectionList={sectionList} onClick={handleSectionChange} currentSelectedId={selectedSectionId} />
              : null
          }

          <Box sx={{ mx: '4rem', justifyContent: 'center', }}>
            <ButtonGroup variant="contained" orientation="vertical">
              <Button onClick={addNewClimb}>Add climb</Button>
              <LoadingButton
                loading={isLoading || isFetchingDistribution}
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  borderTop: '1px solid white',
                  borderBottom: '1px solid white',
                }}
              >
                  Save Distribution
              </LoadingButton>
              <Button component={Link}  to="/placard/boulders">
                  Print Boulder Placard
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
          columns={memoizedBoulderColumnDefs}
          disableColumnFilter
          experimentalFeatures={{ newEditingApi: true }} 
          getRowId={row => `${row.id}-${row.gymId}`}
        />
      </Box>
    </Box>
  )
}

export default BoulderDistributionChart
