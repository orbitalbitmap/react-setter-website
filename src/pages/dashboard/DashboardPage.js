import { connect } from 'react-redux'

import '../../components/styles.css'
import Dashboard from '../../components/dashboard/Dashboard'
import { getLocations } from '../../actions'
import DashboardContent from '../../components/dashboard/content/Content'

const DashboardPage = (props) => {  
  return (
    <>
      {
        props.user?.id
          ? <Dashboard><DashboardContent /></Dashboard>
          : null // create loading component />
      }
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    gyms: state.gyms
  }
}

export default connect(mapStateToProps, { getLocations })(DashboardPage)