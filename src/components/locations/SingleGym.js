import { Box, Container, List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const SingleGym = () => {
  const urlParams = useParams()

  const [fullTimeEmployeeList, setFullTimeEmployeeList] = useState([]);
  const [gymInfo, setGymInfo] = useState([]);
  const [headSetter, setHeadSetter] = useState({});
  const [partTimeEmployeeList, setPartTimeEmployeeList] = useState([]);

  useEffect(() => {
    const getInfo = async () => {
      const fetchedInfo = (await axios.get(`${process.env.REACT_APP_API_PATH}/gymById/${urlParams.id}`)).data
        setGymInfo(fetchedInfo)
      }

    getInfo()
    }, [urlParams]);

    useEffect(() => {
      setHeadSetter(gymInfo?.employees?.find(employee => employee.id === gymInfo.headSetterId))
      setFullTimeEmployeeList(gymInfo?.employees?.filter(employee => employee.roleId <= 4 && employee.id !== gymInfo.headSetterId && employee.id !== 1))
      setPartTimeEmployeeList(gymInfo?.employees?.filter(employee => employee.roleId === 5))
    }, [gymInfo.employees, gymInfo.headSetterId]);

    return (
      <Box style={{margin: '4rem auto', }}>
        <Typography variant="h3" className="centered-text">{gymInfo.name}</Typography>
        <Container style={{ overflowY: 'scroll', height: '40rem' }}>
          <Typography variant="h6" className="centered-text">{gymInfo.address}</Typography>
          <Typography variant="h6" className="centered-text">{gymInfo.phoneNumber}</Typography>
          <Typography variant="h6" className="centered-text">{`Facebook: ${gymInfo.facebook !== null ? gymInfo.facebook : 'None available'}`}</Typography>
          <Typography variant="h6" className="centered-text">{`Instagram: ${gymInfo.instagram !== null ? gymInfo.instagram : 'None available'}`}</Typography>
          <Typography variant="h6" className="centered-text">{`Twitter: ${gymInfo.twitter !== null ? gymInfo.twitter : 'None available'}`}</Typography>

          <Typography variant="h4" className="centered-text">The Setters:</Typography>
          <Typography variant="h6" className="centered-text">Head Setter:</Typography>
          
          <List className="centered-text" sx={{ bgcolor: theme => theme.palette.common.white}}>
            <ListItem>
              <ListItemText key={headSetter?.id} className="centered-text inside-bullet">
                <Link to={`/employees/${headSetter?.id || ''}`}>{`${headSetter?.firstName || 'Not'} ${headSetter?.lastName || 'Available'}`}</Link>
              </ListItemText>
            </ListItem>
          </List>

          <Typography variant="h6" className="centered-text">Full Time Setters</Typography>
          <List sx={{ bgcolor: theme => theme.palette.common.white}}>
            {
              fullTimeEmployeeList?.map(setter => {
                return (
                  <ListItem>
                    <ListItemText key={`full-time-${setter?.id}`} className="centered-text inside-bullet">
                      <Link to={`/employees/${setter?.id}`}>{`${setter?.firstName} ${setter?.lastName}`}</Link>
                    </ListItemText>
                  </ListItem>
                )
              })
            }
          </List>

          <Typography variant="h6" className="centered-text">Part Time Setters</Typography>
          <List sx={{ bgcolor: theme => theme.palette.common.white}}>
          {
              partTimeEmployeeList?.map(setter => {
                return (
                  <ListItem>
                    <ListItemText key={`part-time-${setter?.id}`} className="centered-text inside-bullet">
                      <Link to={`/employees/${setter?.id}`}>{`${setter?.firstName} ${setter?.lastName}`}</Link>
                    </ListItemText>
                  </ListItem>
                )
              })
            }
          </List>
        </Container>

        <Link class='centered-text' to={`/admin/location/${gymInfo?.id}`}>Edit Gym info</Link>
      </Box>
    );
  }

export default SingleGym;