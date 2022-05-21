import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

const SectionsList = (props) => {
  return (
  <Box>
    <FormControl sx={{ width: '15rem' }}>
      <InputLabel>Section</InputLabel>
      <Select
        label="Section"
        labelId="Section"
        style={{ color: theme => theme.palette.common.black }}
        value={props.currentSelectedId}
      >
        <MenuItem
          key={0}
          id={0}
          value={0}
          onClick={props.onClick}
          sx={{ color: theme => theme.palette.common.white }}
        >
          Please select a section
        </MenuItem>
        { 
          props.sectionList?.map(section => {
            const isSelected = props.currentSelectedId === section.id ? 'selected' : null
            const sectionId = section.id;
            return (
              <MenuItem
                key={section.id}
                id={section.id}
                value={sectionId}
                className={`section-selectors ${isSelected}`}
                onClick={props.onClick}
                sx={{ color: theme => theme.palette.common.white }}
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
