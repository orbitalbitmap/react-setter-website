import { Box, Typography } from "@mui/material";

const AdminTabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`full-width-tabpanel-${index}`}
    aria-labelledby={`full-width-tab-${index}`}
    {...other}
  >
    {value === index && (
      <Box sx={{ p: 3 }}>
        <Typography component="div">{children}</Typography>
      </Box>
    )}
  </div>
);

export default AdminTabPanel;