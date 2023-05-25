import { MenuItem, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setRouteDistribution } from '../../../../reducers/distribution/distributionReducers';
import { useGridApiContext } from '@mui/x-data-grid';

const RouteStyleEditCell = ({row, field, id, value, valueOptions}) => {
  const dispatch = useDispatch();
  const apiRef = useGridApiContext();
  const distribution = useSelector(state => state.distribution.routeDistribution);
  const currentClimb = { ...row };
  const editableValue = field;
  
  const handleChange = async (event) => {
    const newClimb = {
      ...currentClimb,
      [editableValue]: event.target.value,
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
      value: event.target.value,
    });
  
      dispatch(setRouteDistribution(newDistribution));
      apiRef.current.stopCellEditMode({ id: id, field: field });
  }


  return (
    <Select
      value={value}
      onChange={handleChange}
      sx={{
        m: 0,
        p: 0,
        width: '100px',
      }}
    >
      {
        valueOptions?.map((ropeStyle) => {
          console.log({ropeStyle})
          return (
          <MenuItem key={ropeStyle} value={ropeStyle}>{ropeStyle}</MenuItem>
        )})
      }
    </Select>
  )
}

export default RouteStyleEditCell;