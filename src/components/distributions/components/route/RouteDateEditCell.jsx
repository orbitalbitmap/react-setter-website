import { DatePicker } from "@mui/x-date-pickers";
import { useDispatch, useSelector } from 'react-redux';
import { setBoulderDistribution } from '../../../../reducers/distribution/distributionReducers';
import { useGridApiContext } from '@mui/x-data-grid';
import dayjs from "dayjs";



const RouteDateEditCell = ({row, field, id, value, valueOptions}) => {
  const dispatch = useDispatch();
  const apiRef = useGridApiContext();
  const distribution = useSelector(state => state.distribution.boulderDistribution);
  const currentClimb = { ...row };
  const editableValue = field;
  
  const handleChange = async (newValue) => {
    const newDate = newValue.format('YYYY-MM-DD');
    
    const newClimb = {
      ...currentClimb,
      [editableValue]: newDate,
    }

    const tempDist = distribution.filter(climb => climb.id !== newClimb.id)

    const newDistribution = [
      ...tempDist,
      newClimb
    ]

    newDistribution.sort((climbA, climbB) => climbA.id - climbB.id);

    await apiRef.current.setEditCellValue({
      id: id,
      field: field,
      value: newDate,
    });
  
      dispatch(setBoulderDistribution(newDistribution));
      apiRef.current.stopCellEditMode({ id: id, field: field });
  }

  return (
      <DatePicker
        label=""
        value={dayjs(value)}
        onChange={handleChange}
      />
  )
}

export default RouteDateEditCell;