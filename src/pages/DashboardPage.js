import { connect } from 'react-redux'

import '../components/styles.css'
import Navbar from '../components/navbar/Navbar'
import Dashboard from '../components/Dashboard'
import { getLocations } from '../actions'

const DashboardPage = (props) => {  
  console.log('render')
  return (
    <>
      <Navbar />
      {
        props.user?.id
          ? <Dashboard user={props.user} />
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
