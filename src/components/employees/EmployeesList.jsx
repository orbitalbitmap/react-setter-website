import { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import EmployeeCardContainer from './EmployeeCardContainer';
import { useGetAllEmployeesQuery } from '../../services/gym';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const {data: allEmployees} = useGetAllEmployeesQuery();

  useEffect(() => {
    setEmployees(allEmployees);
  }, [allEmployees])

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
        <EmployeeCardContainer employees={employees} />
      </Container>
    </Box>
    </>
  )
}

export default EmployeeList;