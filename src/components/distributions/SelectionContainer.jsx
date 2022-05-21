import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import React from 'react';

function SelectionContainer(props) {
  const { handleChange } = props

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
    <FormControl sx={{ maxWidth: '15rem', }}>
      <InputLabel sx={{ color: fontColor, }}>{props.name}</InputLabel>
      <Select
        label={props.name}
        classes={{select: props.color.toLowerCase}}
        value={props.value}
        sx={{ color: fontColor }}
      >
        {
          props.list?.map((item) => {
            let component;
            switch (props.name) {
              case 'color':
              case 'grade':
                component = <MenuItem sx={{ color: theme => theme.palette.primary.contrastText }} key={`${props.name}-${item}-${props.id}`} onClick={handleChange} className={`climb${props.id} ${props.color.toLowerCase()}`} id={props.name} data-index={props.id-1} data-name={props.name} value={item}>{item}</MenuItem>
                break;
              case 'ropeStyle':
                component = (<MenuItem sx={{ color: theme => theme.palette.primary.contrastText }} key={`${props.name}-${item}-${props.id}`} className={`climb${props.id} ${props.color.toLowerCase()}`} onClick={props.onChange} id={props.name} data-index={props.id-1} data-name={props.name} value={item[props.valueKey]}>{item}</MenuItem>);
                break;
              case 'setter':
                component = item.placardName
                  ? (<MenuItem sx={{ color: theme => theme.palette.primary.contrastText }} key={`${props.name}-${item.placardName}-${item.id}-${props.id}`} className={`climb${props.id} ${props.color.toLowerCase()}`} onClick={handleChange} id={props.name} data-index={props.id-1} data-name={props.name} value={item.placardName}>{item.placardName}</MenuItem>)
                  : (<MenuItem sx={{ color: theme => theme.palette.primary.contrastText }} key={`${props.name}-${item.firstName}-${item.id}-${props.id}`} className={`climb${props.id} ${props.color.toLowerCase()}`} onClick={handleChange} id={props.name} data-index={props.id-1} data-name={props.name}  value={item.firstName}>{item.firstName}</MenuItem>);
                break;
              default:
                component = (<MenuItem sx={{ color: theme => theme.palette.primary.contrastText }} key={`${props.name}-${item.name}-${props.id}`} className={`climb${props.id} ${props.color.toLowerCase()}`} onClick={handleChange} id={props.name} data-index={props.id-1} data-name={props.name} value={item.id}>{item.name}</MenuItem>);
                break;
            }

            return component;
          })
        }
      </Select>
    </FormControl>
  );
}

export default SelectionContainer;
