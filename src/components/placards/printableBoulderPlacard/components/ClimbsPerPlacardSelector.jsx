import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

const ClimbsPerPlacardSelector = ({ numberOfClimbsToDisplay, handleNumberOfClimbChange }) => {
  return (
    <FormControl sx={{ width: '10rem' }}>
      <InputLabel>Climbs Per Placard</InputLabel>
      <Select
        label="Climbs Per Placard"
        labelId="Climbs-Per-Placard"
        value={numberOfClimbsToDisplay}
      >
        <MenuItem
          key={`per-placard-${1}`}
          id={1}
          value="1"
          onClick={handleNumberOfClimbChange}
        >
          1
        </MenuItem>
        <MenuItem
          key={`per-placard-${2}`}
          id={2}
          value="2"
          onClick={handleNumberOfClimbChange}
        >
          2
        </MenuItem>
        <MenuItem
          key={`per-placard-${3}`}
          id={3}
          value="3"
          onClick={handleNumberOfClimbChange}
        >
          3
        </MenuItem>
        <MenuItem
          key={`per-placard-${4}`}
          id={4}
          value="4"
          onClick={handleNumberOfClimbChange}
        >
          4
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default ClimbsPerPlacardSelector;