import { Link } from 'react-router-dom';
import { Box, Paper, Typography, } from '@mui/material';
import { getRenderedSections, } from './utils/getRenderedSections';

const SectionCardsContainer = ({ boulderSections, routeSections, gymName, gymId }) => {
  return (
    <Box
      sx={{
        bgcolor: theme => theme.palette.primary.main,
        borderRadius: 2,
        mt: 2,
        pb: 1,
      }}
      data-testid={`${gymName}-sections-container`}
    >    
      <Link to={`/locations/${gymId}`} style={{ textDecoration: 'none' }}>
        <Typography
          variant="h4"
          className="centered-text"
          sx={{
            pt: 1,
            color: theme => theme.palette.primary.contrastText
          }}
        >
          {gymName}
        </Typography>
      </Link>

      <Paper sx={{ m: 2, py: 1 }}>
        <Box style={{ position: 'relative', margin: 0, left: '0.75rem', }}>
          <Link to={`/sections/edit/${gymId}`}>Edit sections</Link>
        </Box>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
        >
          {
            getRenderedSections(boulderSections, "Boulder")
          }
          {
            getRenderedSections(routeSections, "Route")
          }
        </Box>
      </Paper>
    </Box>
  )
}

export default SectionCardsContainer;