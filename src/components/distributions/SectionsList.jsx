import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'

const SectionsList = ({ currentSelectedId, sectionList, onClick, }) => {
  return (
  <Box data-testid="sections-list">
    <FormControl sx={{ width: '15rem' }}>
      <InputLabel>Section</InputLabel>
      <Select
        label="Section"
        labelId="Section"
        style={{ color: theme => theme.palette.common.black }}
        value={currentSelectedId}
      >
        <MenuItem
          key={0}
          id={0}
          value={0}
          onClick={onClick}
        >
          Please select a section
        </MenuItem>
        { 
          sectionList?.map(section => {
            const isSelected = currentSelectedId === section.id ? 'selected' : null
            const sectionId = section.id;
            return (
              <MenuItem
                key={section.id}
                id={section.id}
                value={sectionId}
                className={`section-selectors ${isSelected}`}
                onClick={onClick}
              >
                {section?.name}
              </MenuItem>
            )
          })
        }
      </Select>
    </FormControl>
  </Box>
  )
}

export default SectionsList
