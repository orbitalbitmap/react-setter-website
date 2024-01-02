import {Alert, Snackbar} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { resetNotificationAlert } from '../../reducers/notificationsReducers';
import NotificationAction from './NotificationSnackbarAction';

const NotificationSnackbar = () => {
  const dispatch = useDispatch();
  const notificationsDetails = useSelector(state => state.notificationsDetails);

  const handleClose = () => {
    dispatch(resetNotificationAlert());
  };
  
  return (
    <Snackbar
      open={notificationsDetails.messageBody ? true : false}
      autoHideDuration={3000}
      message={notificationsDetails.messageBody}
      onClose={handleClose}
      action={<NotificationAction handleClose={handleClose}/>}
      sx={{ bottom: {xs: 16 } }}
      data-testid="snackbar-notification"
    >
      <Alert
        onClose={handleClose}
        severity={notificationsDetails.alertType} sx={{ width: '100%' }}
      >
        {notificationsDetails.messageBody}
      </Alert>
    </Snackbar>
  );
}



export default NotificationSnackbar;