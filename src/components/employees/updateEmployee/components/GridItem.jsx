import { Grid, TextField, } from '@mui/material';

const GridItem = ({ label, inputProps, name, required, value, handleChange }) => {

  return (
    <Grid item>
      <TextField
        label={label}
        name={name}
        value={value}
        onChange = {handleChange}
        required={required}
        inputProps={inputProps}
      />
    </Grid>
  )
};

export default GridItem;