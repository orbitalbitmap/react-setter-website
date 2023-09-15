import { Box, Button, Container, Typography} from '@mui/material';

import SectionForm from './components/SectionForm';
import { LoadingButton } from '@mui/lab';
import useUpdateClimbingSection from './hooks/useUpdateClimbingSection';

const UpdateClimbingSections = () => {
  const { 
    gym,
    loading,
    addNewSection,
    handleChange,
    handleSubmit,
  } = useUpdateClimbingSection()

  return (
    <Container maxWidth="lg" sx={{ bgcolor: theme => theme.palette.primary.main, mt: 12, mb: 6, minHeight: '40rem', borderRadius: '8px', p: 3}}>
      <Typography variant="h2" className="centered-text" sx={{ color: theme => theme.palette.common.white, mb: 2, }}>{gym?.name}</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', bgcolor: theme => theme.palette.common.white, p: 2 }}>
        <Container className="centered-text">
          <Typography variant="h3" sx={{ mb: 2, }}>Ropes</Typography>
          <Box className="section-details" id="route-sections">
            {
              gym?.routeSections
                ? SectionForm(gym?.routeSections, 'route', handleChange)
                : (<h2>No Route Sections Found.</h2>)
            }
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <Button variant="contained" type="button" onClick={(event) => { addNewSection(event, 'routeSections') }} sx={{ mr: '0.75rem', mt: '1rem', }}>Add New Section</Button>
            <Button variant="contained" name="Route" onClick={handleSubmit} type="submit" sx={{ mt: '1rem', }}>Save Info</Button>
          </Box>
        </Container>

        <Container className="centered-text">
          <Typography variant="h3" sx={{ mb: 2, }}>Boulders</Typography>
          <Box className="section-details" id="boulder-sections">
            {
              gym?.boulderSections
                ? SectionForm(gym?.boulderSections, 'boulder', handleChange)
                : (<h2>No Boulder Sections Found.</h2>)
            }
          </Box>
          <Box className="centered-text">
            <Button variant="contained" onClick={(event) => { addNewSection(event, 'boulderSections') }} sx={{ mr: '0.75rem', mt: '1rem', }}>Add New Section</Button>
            <LoadingButton
              loading={loading}
              name="Boulder"
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: '1rem', }}
            >
                Save Info
            </LoadingButton>
          </Box>
        </Container>
      </Box>
    </Container>
  );
}

export default UpdateClimbingSections;
