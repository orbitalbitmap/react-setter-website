import Dashboard from '../../components/dashboard/Dashboard';
import DashboardContent from '../../components/dashboard/content/Content';
import useSetGymAndEmployeeLists from '../../components/dashboard/hooks/useSetGymAndEmployeeLists';
import useGetUserInfo from '../../hooks/useGetUserInfo';


const DashboardPage = () => { 
  const {userRoleId} = useGetUserInfo()

  useSetGymAndEmployeeLists();

  return userRoleId ? 
    (
      <Dashboard>
        <DashboardContent />
      </Dashboard>
    )
    : <>Loading...</>
}

export default DashboardPage;