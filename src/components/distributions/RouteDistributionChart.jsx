import { Link, } from 'react-router-dom';
import { Box, Button, ButtonGroup, Typography } from '@mui/material';
import { DataGrid, } from '@mui/x-data-grid';
import { LoadingButton } from '@mui/lab';

import SectionsList from './SectionsList';
import DateUpdater from './components/DateUpdater';
import useRouteDistributionChart from './hooks/useRouteDistributionChart';


const RouteDistributionChart = () => {
  const {
    columns,
    filteredDistribution,
    fullDateChange,
    gymId,
    gymName,
    loading,
    selectedSectionId,
    sectionList,
    addNewClimb,
    handleSectionChange,
    handleSubmit,
    onDateChange,
    setFullDateChange,
    
  } = useRouteDistributionChart();

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

          <Box sx={{ mx: '4rem', justifyContent: 'center', }} data-testid="button-container">
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
              <Button component={Link}  to={`/placard/ropes/${gymId}`}>
                  Print Route Placard
                </Button>
            </ButtonGroup>
          </Box>

          <DateUpdater
            fullDateChange={fullDateChange}
            onDateChange={onDateChange}
            setFullDateChange={setFullDateChange}
          />
        </Box>
      </Box>
    
      
      <Box
        className="distribution-container"
        sx={{ width: '80rem', height: '40rem', mt: '15rem', mx: 'auto', justifyContent: 'center', }}
        data-testid="distribution-container"
      >
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