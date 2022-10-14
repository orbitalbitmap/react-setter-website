import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Paper, Typography, List, ListItem, ListItemText  } from '@mui/material';

// @TODO: remove props
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
      <List sx={{ bgcolor: theme=> theme.palette.common.white, p: 0, }}>
        <ListItem style={{ marginBottom: '.25rem' }}>
          <ListItemText className="centered-text" sx={{color: theme => theme.palette.common.black, }}>
            No {sectionType.toLowerCase()} sections found.
          </ListItemText>
        </ListItem>
      </List>
    )
  }

  const getRenderedSections = (sectionList, sectionType) => {
    return sectionList.length ? renderSections(sectionList, sectionType) : renderNoSection(sectionType)
  }
  
  return (
    <Box
      sx={{
        bgcolor: theme => theme.palette.primary.main,
        borderRadius: 2,
        mt: 2,
        pb: 1,
      }}
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
        <span style={{ position: 'relative', margin: 0, left: '0.75rem', }}>
          <Link to={`/sections/edit/${gymId}`}>Edit sections</Link>
        </span>
        <div
          style={{
            display: 'flex',
            flexDirection: stateFlexDirection,
            justifyContent: 'space-evenly',
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