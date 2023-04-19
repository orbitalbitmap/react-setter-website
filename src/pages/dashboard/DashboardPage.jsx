import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Dashboard from '../../components/dashboard/Dashboard';
import DashboardContent from '../../components/dashboard/content/Content';
import { setGymList } from '../../reducers/locationReducers';
import { setEmployeeList } from '../../reducers/employeeReducers';
import { useGetAllEmployeesAndGymsQuery } from '../../services/gym';

import '../../components/styles.css';

const DashboardPage = () => { 
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const {data} = useGetAllEmployeesAndGymsQuery();

  useEffect(() => {
    if (data) {
      dispatch(setGymList({ gyms: data.locationData }));
      dispatch(setEmployeeList({ employees: data.employeeData }));
    }
  }, [dispatch, data]);

  return (
    <>
      {
        user?.loggedIn
          ? <Dashboard>
              <DashboardContent />
            </Dashboard>
          : <div>Log in failed</div> // create loading component />
      }
    </>
  )
}

export default DashboardPage;
