import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function AreteSelector({ name, onChange, }) {
  return (
      <FormControl sx={{ width: '12rem', textAlign: 'center', mx: 'auto', my: '1rem', }}>
        <InputLabel>Arete: </InputLabel>
        <Select
          label="Arete: "
          onChange={onChange}
          name={name}
          defaultValue="1"
          sx={{ height: '1.5rem' }}
          data-testid="arete-selector"
        >
          <MenuItem value="1">None</MenuItem>
          <MenuItem value="2">On</MenuItem>
          <MenuItem value="3">Off</MenuItem>
        </Select>
      </FormControl>
  );
}

export default AreteSelector;
