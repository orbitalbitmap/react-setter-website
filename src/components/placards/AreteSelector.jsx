import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'

function AreteSelector({ name, onChange, }) {
  return (
    <Box sx={{ mx: 'auto', left: '1rem' }}>
      <FormControl sx={{ width: '15rem', textAlign: 'center', mx: 'auto', my: '1rem', }}>
        <InputLabel>Arete: </InputLabel>
        <Select
          label="Arete: "
          onChange={onChange}
          name={name}
          defaultValue="1"
          sx={{ height: '1.5rem' }}
        >
          <MenuItem sx={{ color: theme => theme.palette.common.white }} value="1">None</MenuItem>
          <MenuItem sx={{ color: theme => theme.palette.common.white }} value="2">On</MenuItem>
          <MenuItem sx={{ color: theme => theme.palette.common.white }} value="3">Off</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default AreteSelector;
