import axios from 'axios';
import { useEffect, useState } from 'react';
import EmployeeCard from './EmployeeCard';
import { Box, Container, Grid, Typography } from '@mui/material';


const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const getInfo = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_PATH}/employees`);

      setEmployees(data);
    }

    getInfo();
  }, [])

  return (
    <>
      <Box
      sx={{
        bgcolor: theme => theme.palette.primary.main,
        height: '50rem',
        m: '8rem auto 0 auto',
        maxWidth: '75rem',
        px: 2,
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h3"
        className="centered-text"
        sx={{
          py: 2,
          color: theme => theme.palette.primary.contrastText
        }}
      >
        Employees:
      </Typography>
      <Container
        style={{ overflowY: 'scroll', height: '40rem', }}
        sx={{
          color: theme => theme.palette.primary.contrastText,
          bgcolor: theme => theme.palette.primary.light,
          m: '0 auto',
          borderRadius: 2,
        }}>
        <Grid container xs={12} spacing={8} sx={{ m: '0 auto', }}>
          {
            employees.map(employee => {
              return (
                <EmployeeCard key={employee.id} employeeInfo={employee} />
              )
            })
          }
        </Grid>
      </Container>
    </Box>
    </>
  )
}

export default EmployeeList;