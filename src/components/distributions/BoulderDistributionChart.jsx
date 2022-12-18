import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, ButtonGroup, TextField, Typography } from '@mui/material';
import SectionsList from './SectionsList'
import { setBoulderDistribution, updateBoulderDistribution, updateDates } from '../../reducers/distribution/distributionReducers';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackAlert } from '../../reducers/snackbarReducers';
import getBoulderColumnDefs from './constants/boulderColumnDefs';

const BoulderDistributionChart = () => {
  const todayFormatted = useMemo(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]
  }, []);
  const urlParams = useParams();
  const gymId = urlParams.id;
  const dispatch = useDispatch();
  const distribution = useSelector(state => state.distribution.boulderDistribution);
  const [selectedSectionId, setSelectedSectionId] = useState(1);
  const [sectionList, setSectionList] = useState([]);
  const [gymName, setGymName] = useState('');
  const [fullDateChange, setFullDateChange] = useState(todayFormatted);
  const [employeeList, setEmployeeList] = useState([]);

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
      await axios.post(`${process.env.REACT_APP_API_PATH}/saveDistribution/currentBoulders`, {distribution})
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

  useEffect(() => {
    const getInfo = async () => {
      // @TODO: fix the returned backend values for ropes and boulders
      const climbInfoList = await axios.get(`${process.env.REACT_APP_API_PATH}/currentBoulderGrades/${gymId}`)
      const sectionList = await axios.get(`${process.env.REACT_APP_API_PATH}/boulderSections/${gymId}`)
      const gymInfo = await axios.get(`${process.env.REACT_APP_API_PATH}/gymById/${gymId}`)
      
      setGymName(gymInfo.data.name)
      setEmployeeList(gymInfo.data.employees)
      setSectionList(sectionList.data)
      dispatch(setBoulderDistribution(climbInfoList.data))
    }

    getInfo()
  }, [gymId, dispatch])

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
          editMode='row'
          rows={filteredDistribution || []}
          columns={memoizedBoulderColumnDefs}
          disableColumnFilter
          experimentalFeatures={{ newEditingApi: true }} 
          processRowUpdate={(newRow, oldRow) => {
            // @TODO: find a better way of handling the update with the color picker
            // this might be useful: https://mui.com/x/react-data-grid/state/
            const updatedRow = { ...newRow, color: distribution[newRow.id-1].color}

            dispatch(updateBoulderDistribution(updatedRow));
            return updatedRow;
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

export default BoulderDistributionChart
