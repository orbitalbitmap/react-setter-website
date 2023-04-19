import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Dashboard from '../../components/dashboard/Dashboard';
import DashboardContent from '../../components/dashboard/content/Content';
import { setGymList } from '../../reducers/locationReducers';
import { setEmployeeList } from '../../reducers/employeeReducers';
import { useGetAllEmployeesAndGymsQuery } from '../../services/gym';

import '../../components/styles.css';

const DashboardPage = () => { 
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const {data: testData} = useGetAllEmployeesAndGymsQuery();

  useEffect(() => {
    if (testData?.locationData) {
      dispatch(setGymList({ gyms: testData.locationData }))
    }
    if (testData?.employeeData) {
      dispatch(setEmployeeList({ employees: testData.employeeData }))
    }

  }, [dispatch, testData])

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

export default DashboardPage
