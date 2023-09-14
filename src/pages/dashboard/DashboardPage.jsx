import { useSelector } from 'react-redux';
import Dashboard from '../../components/dashboard/Dashboard';
import DashboardContent from '../../components/dashboard/content/Content';

const DashboardPage = () => { 
  const user = useSelector(state => state.user);

  return (
    <>
      {
        user?.loggedIn
          ? <Dashboard>
              <DashboardContent />
            </Dashboard>
          : <div>Log in failed</div> // TODO: create loading component
      }
    </>
  )
}

export default DashboardPage;
