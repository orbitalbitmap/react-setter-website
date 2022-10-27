import SnackbarMui from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { resetSnackAlert } from '../../reducers/snackbarReducers';
import SnackBarAction from './SnackbarAction';

const Snackbar = () => {
  const dispatch = useDispatch();
  const snackbarDetails = useSelector(state => state.snackbarDetails);

  const handleClose = () => {
    dispatch(resetSnackAlert());
  };
  
  return (
    <SnackbarMui
      open={snackbarDetails.messageBody ? true : false}
      autoHideDuration={3000}
      message={snackbarDetails.messageBody}
      onClose={handleClose}
      action={<SnackBarAction handleClose={handleClose}/>}
      sx={{ bottom: {xs: 16 } }}
    />
  );
}



export default Snackbar;