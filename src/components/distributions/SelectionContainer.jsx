import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import React from 'react';

function SelectionContainer({ color, id, list, name, setterId, sx, value, handleChange, }) {
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

  const styles = sx
  ? { maxWidth: '12rem', minWidth: '5rem', ...sx }
  : { maxWidth: '12rem', minWidth: '5rem', }

  let labelText = name

  switch (name) {
    case 'sectionId':
      labelText = 'Location';
      break;
    case 'ropeStyle':
      labelText = 'Rope Type';
      break;
    default:
      const split = name.split('')
      split[0] = split[0].toUpperCase()
      const modifiedName = split.join('')

      labelText = modifiedName;
      break;
  }

  return (
    <div data-setterId={setterId}>
      <FormControl sx={styles}>
        <InputLabel sx={{ color: fontColor, width: sx ? sx.width : 'inherit'}}>{labelText}</InputLabel>
        <Select
          label={name}
          classes={{select: color.toLowerCase}}
          value={value}
          sx={{ color: fontColor, ...sx }}
        >
          {
            list?.map((item) => {
              let component;
              switch (name) {
                case 'color':
                case 'grade':
                  component = <MenuItem sx={{ color: theme => theme.palette.primary.contrastText }} key={`${name}-${item}-${id}`} onClick={handleChange} className={`climb${id} ${color.toLowerCase()}`} id={name} data-index={id-1} data-name={name} value={item}>{item}</MenuItem>
                  break;
                case 'ropeStyle':
                  component = (<MenuItem sx={{ color: theme => theme.palette.primary.contrastText }} key={`${name}-${item}-${id}`} className={`climb${id} ${color.toLowerCase()}`} onClick={handleChange} id={name} data-index={id-1} data-name={name} value={item}>{item}</MenuItem>);
                  break;
                case 'setter':
                  component = item.placardName
                    ? (<MenuItem sx={{ color: theme => theme.palette.primary.contrastText }} key={`${name}-${item.placardName}-${item.id}-${id}`} className={`climb${id} ${color.toLowerCase()}`} onClick={handleChange} id={name} data-index={id-1} data-name={name} value={item.placardName}>{item.placardName}</MenuItem>)
                    : (<MenuItem sx={{ color: theme => theme.palette.primary.contrastText }} key={`${name}-${item.firstName}-${item.id}-${id}`} className={`climb${id} ${color.toLowerCase()}`} onClick={handleChange} id={name} data-index={id-1} data-name={name}  value={item.firstName}>{item.firstName}</MenuItem>);
                  break;
                default:
                  component = (<MenuItem sx={{ color: theme => theme.palette.primary.contrastText }} key={`${name}-${item.name}-${id}`} className={`climb${id} ${color.toLowerCase()}`} onClick={handleChange} id={name} data-index={id-1} data-name={name} value={item.id}>{item.name}</MenuItem>);
                  break;
              }

              return component;
            })
          }
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectionContainer;
