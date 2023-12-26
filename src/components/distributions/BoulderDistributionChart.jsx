import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, ButtonGroup, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import SectionsList from './SectionsList'
import useBoulderDistributionChart from './hooks/useBoulderDistributionChart';


const BoulderDistributionChart = () => {
  const {
    filteredDistribution,
    fullDateChange,
    gymName,
    loading,
    memoizedBoulderColumnDefs,
    sectionList,
    selectedSectionId,
    addNewClimb,
    handleSectionChange,
    handleSubmit,
    onDateChange,
    setFullDateChange,
  } = useBoulderDistributionChart();

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
                loading={loading}
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
    
      
      <Box className="distribution-container" sx={{ width: '80rem', height: '40rem', mt: '15rem', mx: 'auto', justifyContent: 'center', }}>
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
