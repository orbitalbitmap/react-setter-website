import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Paper, Typography, List, ListItem, ListItemText  } from '@mui/material';

const SectionCardsContainer = ({ boulderSections, routeSections, gymName, gymId }) => {
  const [stateFlexDirection, setStateFlexDirection] = useState('row')
  const renderSections = (sectionList, sectionType) => {
    return ( 
      <List sx={{ bgcolor: theme=> theme.palette.common.white,  }}>
        <ListItem>
          <Typography variant="h6" sx={{ margin: '0 auto'}}>{sectionType}s:</Typography>
        </ListItem>
        {
          sectionList?.map(section => (
            <Typography variant="body1" key={section.id} className="centered-text" sx={{pt: 2}}>
              {section.name}
            </Typography>
          ))
        }
      </List>
    )
  }

  const renderNoSection = (sectionType) => {
    if (stateFlexDirection !== "column") setStateFlexDirection('column');
    return (
      <List sx={{ bgcolor: theme=> theme.palette.common.white, }}>
        <ListItem style={{ marginBottom: '.25rem' }}>
          <ListItemText sx={{color: theme => theme.palette.common.black, textAlign: 'center', }}>
            No {sectionType.toLowerCase()} sections found.
          </ListItemText>
        </ListItem>
      </List>
    )
  }

  const getRenderedSections = (sectionList, sectionType) => {
    return sectionList.length ? renderSections(boulderSections, sectionType) : renderNoSection(sectionType)
  }

  console.log()
  
  return (
      <Box
        sx={{
          bgcolor: theme => theme.palette.primary.main,
          borderRadius: 2,
          mt: 12,
          mx: 'auto',
          p: 1,
          width: '50%',
        }}
        style={{
        }}
      >    
        <Link to={`/locations/${gymId}`} style={{ textDecoration: 'none' }}>
          <Typography variant="h4" sx={{
            textAlign: 'center',
            color: theme => theme.palette.primary.contrastText}}
          >
            {gymName}
          </Typography>
        </Link>

        <Paper sx={{ m: 2, py: 1 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: stateFlexDirection,
              flexGrow: 1,
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
              textAlign: 'center',
            }}
          >
            {
              getRenderedSections(boulderSections, "Boulder")
            }
            {
              getRenderedSections(routeSections, "Route")
            }
          </div>
        </Paper>
      </Box>
  )
}

export default SectionCardsContainer;