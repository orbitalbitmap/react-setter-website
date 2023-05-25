import { MenuItem, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setBoulderDistribution } from '../../../../reducers/distribution/distributionReducers';
import { useGridApiContext } from '@mui/x-data-grid';

const BoulderSetterEditCell = ({row, field, id, value, valueOptions, formattedValue}) => {
  const dispatch = useDispatch();
  const apiRef = useGridApiContext();
  const distribution = useSelector(state => state.distribution.boulderDistribution);
  const currentClimb = { ...row };
  
  const handleChange = async (event) => {
    const newClimb = {
      ...currentClimb,
      [field]: event.target.value,
    }

    const tempDist = distribution.filter(climb => climb.id !== newClimb.id)

    const newDistribution = [
      ...tempDist,
      newClimb
    ]

    newDistribution.sort((climbA, climbB) => climbA.id - climbB.id);

    const isValid =  await apiRef.current.setEditCellValue({
      id,
      field,
      value: event.target.value,
    });
    
    if (isValid) {
      dispatch(setBoulderDistribution(newDistribution));
      apiRef.current.stopCellEditMode({ id, field });
    }
  }


  return (
    <Select
      value={value}
      renderValue={() => formattedValue}
      onChange={handleChange}
      sx={{
        m: 0,
        p: 0,
        width: '100px',
      }}
    >
      {
        valueOptions?.map((setterInfo) => {
          const displayName = setterInfo.placardName !== null ? setterInfo.placardName : setterInfo.firstName
          return (
            <MenuItem key={setterInfo.id} value={displayName}>{displayName}</MenuItem>
          )
        })
      }
    </Select>
  )
}

export default BoulderSetterEditCell;