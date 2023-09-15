import {
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';

const GymSelector = ({ currentLocationNameList, employeeLocationNameList, handleCheckbox }) => {
  return (
    <Grid sx={{m: 1}} >
      <FormControl>
        <InputLabel id="demo-multiple-checkbox-label">Employee's gyms</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={employeeLocationNameList}
          onChange={handleCheckbox}
          input={<OutlinedInput label="Employee's gyms" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {currentLocationNameList.map((gym, index) => {
            return (
            <MenuItem key={`${index}-${gym}`} value={gym}>
              <Checkbox sx={{ '&.Mui-checked': { color: '#fff'} }}
                checked={employeeLocationNameList?.includes(gym)}
              />
              <ListItemText primary={gym} />
            </MenuItem>
            )}
          )}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default GymSelector