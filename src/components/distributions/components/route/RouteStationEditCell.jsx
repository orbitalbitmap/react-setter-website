import { TextField, IconButton, ButtonGroup } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setRouteDistribution } from '../../../../reducers/distribution/distributionReducers';
import { useGridApiContext } from '@mui/x-data-grid';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react';

const RouteStationEditCell = ({row, field, id, value,}) => {
  const dispatch = useDispatch();
  const apiRef = useGridApiContext();
  const distribution = useSelector(state => state.distribution.routeDistribution);
  const currentClimb = { ...row };
  const editableValue = field;
  const [displayValue, setDisplayValue] = useState(value);
  
  const handleSave = async () => {
    const newClimb = {
      ...currentClimb,
      [editableValue]: displayValue,
    }

    const tempDist = distribution.filter(climb => climb.id !== newClimb.id)

    const newDistribution = [
      ...tempDist,
      newClimb
    ]

    newDistribution.sort((climbA, climbB) => climbA.id - climbB.id);

    apiRef.current.setEditCellValue({
      id: id,
      field: field,
      value: displayValue,
    });
  
      dispatch(setRouteDistribution(newDistribution));
      apiRef.current.stopCellEditMode({ id: id, field: field });
  }

  const handleCancel = () => {
    apiRef.current.stopCellEditMode({ id, field })
  }

  const handleChange = (event) => { setDisplayValue(event.target.value); }

  return (
    <TextField
      type="number"
      sx={{
        height: '50px',
        m: 0,
        p: 0,
      }}
      value={displayValue}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <ButtonGroup>
            <IconButton
              sx={{ height:  '12px', width:  '12px', p: 1, fontSize: "1rem"}}
              onClick={handleSave}
            >
              <CheckIcon fontSize="1rem" />
            </IconButton>
            <IconButton
              sx={{ height:  '12px', width:  '12px', p: 1, fontSize: "1rem"}}
              onClick={handleCancel}
            >
              <CloseIcon fontSize="1rem" />
            </IconButton>
          </ButtonGroup>
        )
      }}
    />
  )
}

export default RouteStationEditCell;