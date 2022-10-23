import React from 'react';
import { TextField} from '@mui/material'

function DateInput({ id, color, value, onChange }) {
  let fontColor = 'black';

  switch(color) {
    case 'Green':
    case 'Blue':
    case 'Purple':
    case 'Black':
      fontColor = '#fff';
      break;
    default:
      fontColor = 'black';
      break;
  }

  return (
    <TextField
      label="Date"
      type="date"
      name="dateSet"
      value={value}
      onChange={(event) => { onChange(event, id-1) }}
      sx={{ width: '11rem', }}
      InputLabelProps={{
        shrink: true,
        sx: { color: fontColor }
      }}
      inputProps={{
        sx: { color: fontColor }
      }}
    />
    );
  }
export default DateInput;
