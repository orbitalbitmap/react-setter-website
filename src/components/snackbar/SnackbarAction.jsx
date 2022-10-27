import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const SnackBarAction = ({ handleClose }) => (
  <IconButton
    size="small"
    aria-label="close"
    color="inherit"
    onClick={handleClose}
  >
    <CloseIcon fontSize="small" />
  </IconButton>
);

export default SnackBarAction;