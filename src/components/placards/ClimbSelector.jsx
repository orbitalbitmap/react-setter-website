import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

function ClimbSelector(props) {
  return (
    <Box>
      <FormControl sx={{ width: '15rem'}}>
        <InputLabel>Climb: </InputLabel>
        <Select
          label="Climb: "
          onChange={props.handleClimbSelector}
          className={`${props.selectorType}-selectors-box`}
          name={props.name}
          defaultValue="blank"
          sx={{ height: '1.5rem' }}
        >
          <MenuItem sx={{ color: theme => theme.palette.primary.contrastText }}name="climb" value="blank">Blank</MenuItem>
          {
            props.climbs.map(climb => (
              climb.station
                ? <MenuItem key={climb.id} name="climb" sx={{ color: theme => theme.palette.primary.contrastText }}value={climb.id}>{`${climb.station}: ${climb.color} ${climb.grade}`}</MenuItem>
                : <MenuItem key={climb.id} name="climb" sx={{ color: theme => theme.palette.primary.contrastText }}value={climb.id}>{`${climb.color} ${climb.grade}`}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </Box>
  );
}

export default ClimbSelector;
