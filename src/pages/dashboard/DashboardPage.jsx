import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from '../../components/dashboard/Dashboard'
import DashboardContent from '../../components/dashboard/content/Content'
import '../../components/styles.css'
import { setGymList } from '../../reducers/locationReducers';

const DashboardPage = () => { 
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()


  useEffect(() => {
    const fetchLocations = async () => {
      const { data } = await axios({ 
        url: `${process.env.REACT_APP_API_PATH}/gyms`,
        method: 'GET',
      })
  
      dispatch(setGymList({gyms: data}))
    }

    fetchLocations()
  }, [dispatch])


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
