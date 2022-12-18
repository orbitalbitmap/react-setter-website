import { Grid } from "@mui/material";
import useEmployeeInfo from "../../../../hooks/useEmployeeInfo";
import GridItem from "./GridItem";

const EmployeeInfoGrid = ({ urlId, }) => {
  const { employee, handleChange, } = useEmployeeInfo(urlId);

  return (
    <Grid container columnSpacing="4rem" rowSpacing="1rem" sx={{ pl: '1.5rem' }}>
      <GridItem
        label="First Name"
        name="firstName"
        required
        value={employee.firstName}
        handleChange={handleChange}
      />

      <GridItem
        label="Last Name"
        name="lastName"
        required
        value={employee.lastName}
        handleChange={handleChange}
      />  
      
      <GridItem
        label="Name on placard"
        name="placardName"
        value={employee.placardName}
        handleChange={handleChange}
      />  
      
      <GridItem
        label="Email"
        name="email"
        required
        value={employee.email}
        handleChange={handleChange}
        inputProps={{
          autoComplete: 'off'
        }}
      />  

      <GridItem
        label="Password"
        name="password"
        required
        value={employee.password}
        handleChange={handleChange}
      />

      <GridItem
        label="Phone Number #"
        name="phoneNumber"
        value={employee.phoneNumber}
        handleChange={handleChange}
      /> 
    </Grid>
  );
};

export default EmployeeInfoGrid;