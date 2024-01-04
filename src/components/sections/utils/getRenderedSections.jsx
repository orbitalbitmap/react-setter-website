import { List, ListItem, ListItemText, Typography } from "@mui/material"

const renderSections = (sectionList, sectionType) => {
  let sortedSectionList = [...sectionList];

  sortedSectionList = sortedSectionList.sort((a,b) => a.id - b.id)
  return ( 
    <List sx={{ bgcolor: theme => theme.palette.common.white,  }} data-testid={`${sectionType.toLowerCase()}-section-container`}>
      <ListItem>
        <Typography variant="h6" sx={{ margin: '0 auto'}}>{sectionType.toLowerCase()}s:</Typography>
      </ListItem>
      {
        sortedSectionList?.map(section => (
          <Typography variant="body1" key={section.id} className="centered-text" sx={{pt: 2}} data-testid={`${sectionType.toLowerCase()}-section-name`}>
            {section.name}
          </Typography>
        ))
      }
    </List>
  )
}

const renderNoSection = (sectionType) => {
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

export const getRenderedSections = (sectionList, sectionType) => {
  return sectionList.length ? renderSections(sectionList, sectionType) : renderNoSection(sectionType)
}
