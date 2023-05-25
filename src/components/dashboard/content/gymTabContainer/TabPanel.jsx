import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const TabPanel = ({ value, index, id, panelInfo, ...other }) => {
  const { links, titles } = panelInfo
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">
            <Grid container spacing={12}>
              <Grid item xs={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'rows',
                    bgcolor: '#fff',
                    color: '#000',
                    mt: '1rem',
                  }}
                >
                  <Link
                    to={`${links.left}${id}`}
                    style={{
                        color:
                        '#000',
                      margin: '0 auto',
                      textDecoration: 'none',
                      fontWeight: 500,
                    }}
                  >
                    {titles.left}
                  </Link>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'rows',
                    bgcolor: '#fff',
                    color: '#000',
                    mt: '1rem',
                  }}
                >
                  <Link
                    to={`${links.right}${id}`}
                    style={{
                        color:
                        '#000',
                      margin: '0 auto',
                      textDecoration: 'none',
                      fontWeight: 500,
                    }}
                  >
                      {titles.right}
                  </Link>
                </Paper>
              </Grid>
            </Grid>
          </Typography>
        </Box>
      )}
    </div>
  );
}

export default TabPanel