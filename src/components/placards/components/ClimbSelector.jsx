import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

// @TODO: Figure out why 'Blank'
function ClimbSelector({ climbs, name, selectorType, handleClimbSelector, }) {
  const boulderMenuItem = (climb) => {
    return climb.grade !== null 
    ? <MenuItem key={climb.id} name="climb" value={climb.id}>{`${climb.color} ${climb.grade}`}</MenuItem>
    : <MenuItem name="climb" value="blank">Blank</MenuItem>
  }
  return (
    <Box>
      <FormControl sx={{ width: '12rem'}}>
        <InputLabel>Climb: </InputLabel>
        <Select
          label="Climb: "
          onChange={handleClimbSelector}
          className={`${selectorType}-selectors-box`}
          name={name}
          defaultValue="blank"
          sx={{ height: '1.5rem' }}
        >
          <MenuItem name="climb" value="blank">Blank</MenuItem>
          {
            climbs.map(climb => (
              climb.station
                ? <MenuItem key={climb.id} name="climb" value={climb.id}>{`${climb.station}: ${climb.color} ${climb.grade}`}</MenuItem>
                : boulderMenuItem(climb)
            ))
          }
        </Select>
      </FormControl>
    </Box>
  );
}

export default ClimbSelector;
