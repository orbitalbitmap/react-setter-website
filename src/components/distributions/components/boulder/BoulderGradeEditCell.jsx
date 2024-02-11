import { MenuItem, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setBoulderDistribution } from '../../../../reducers/distribution/distributionReducers';
import { useGridApiContext } from '@mui/x-data-grid';

const BoulderGradeEditCell = ({row, field, id, value, valueOptions}) => {
  const dispatch = useDispatch();
  const apiRef = useGridApiContext();
  const distribution = useSelector(state => state.distribution.boulderDistribution);
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

    const isValid =  await apiRef.current.setEditCellValue({
      id: id,
      field: field,
      value: event.target.value,
    });
  
    if (isValid) {
      dispatch(setBoulderDistribution(newDistribution));
      apiRef.current.stopCellEditMode({ id: id, field: field });
    }
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
        valueOptions?.map((boulderGrade) => (
          <MenuItem key={boulderGrade} value={boulderGrade}>{boulderGrade}</MenuItem>
        ))
      }
    </Select>
  )
}

export default BoulderGradeEditCell;