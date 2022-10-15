import React from 'react';
import { TextField} from '@mui/material'

function DateInput(props) {
  let fontColor = 'black';

  switch(props.color) {
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
      value={props.value}
      onChange={(event) => { props.onChange(event, props.id-1) }}
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
