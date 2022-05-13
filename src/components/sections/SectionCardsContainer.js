import { Link } from 'react-router-dom';
import { Box, Grid, Paper, Typography, List, ListItem, ListItemText  } from '@mui/material';

const SectionCardsContainer = ({ boulderSections, routeSections, gymName }) => {
  return (
    <Box
      sx={{
        bgcolor: theme => theme.palette.primary.main,
        borderRadius: 2,
        mt: 12,
        mx: 'auto',
        width: '40%',
      }}
    >    
      <Typography variant="h5" sx={{
        textAlign: 'center',
        color: theme => theme.palette.primary.contrastText}}
      >
        {gymName}
      </Typography>
      <Paper sx={{ mb: 2, mt: 8, mx: 1, }}>
        <Grid key={gymName} item xs={6} sx={{ py: 2 }}>
          Boulders:
          {
            boulderSections?.map(section => (
              <Typography variant="body1" key={section.id} className="centered-text" sx={{pt: 2}}>
                {section.name}
              </Typography>
            ))
          }
          Ropes:
          {
            routeSections?.map(section => (
              <Typography variant="body1" key={section.id} className="centered-text" sx={{pt: 2}}>
                {section.name}
              </Typography>
            ))
          }
        </Grid>
      </Paper>
    </Box>
  )
}

export default SectionCardsContainer;