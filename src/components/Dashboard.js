import React from 'react'
import { Link } from 'react-router-dom'

class Dashboard extends React.Component {
  renderList() {
    return this.props.user.gyms.map(gym => {
      return (
        <ul key={`user-gym-list-${gym.name}`}>
          <li key={gym.gymId}>
            <h3> 
              <Link to={`/locations/${gym.id}`}>{gym.name}</Link>
            </h3>
            <ul key={`sections-${gym.gymId}`}>
              <li key={`list-${gym.gymId}`}>
                <h4>Sections</h4>
                <ul key={`section-list-${gym.gymId}`}>
                  <li key={`all-sections-${gym.gymId}`}>
                    <Link to={`/gymSections/view/${gym.gymId}`}> All Sections</Link>
                  </li>
                  <li key={`boulder-sections-${gym.gymId}`}>
                    <Link to={`/gymSections/view/boulders/${gym.gymId}`}> Boulder Sections</Link>
                  </li>
                  <li key={`rope-sections-${gym.gymId}`}>
                    <Link to={`/gymSections/view/routes/${gym.gymId}`}> Rope Sections</Link>
                  </li>
                  <li key={`edit-sections-${gym.gymId}`}>
                    <Link to={`/gymSections/edit/${gym.gymId}`}> Edit All Section Names</Link>
                  </li>
                </ul>
              </li>
            </ul>
            <ul key={`distribution-${gym.gymId}`}>
              <li key={`ideal-distribution-${gym.gymId}`}>
                <h4>Ideal</h4>
                <ul key={`ideal-distribution-list-${gym.gymId}`}>
                  <li key={`ideal-route-distribution-${gym.gymId}`}>
                    <Link to={`/distribution/routes/${gym.gymId}`}> Route Distribution</Link>
                  </li>
                  <li key={`ideal-boulder-distribution-${gym.gymId}`}>
                    <Link to={`/distribution/boulders/${gym.gymId}`}>Boulder Distribution</Link>
                  </li>
                </ul>
              </li>
              <li key={`current-distribution-${gym.gymId}`}>
                <h4>Current</h4>
                <ul key={`current-distribution-list-${gym.gymId}`}>
                  <li key={`current-route-distribution-${gym.gymId}`}>
                    <Link to={`/distribution/view/routes/${gym.gymId}`}>Current Route Distribution</Link>
                  </li>
                  <li key={`current-boulder-distribution-${gym.gymId}`}>
                    <Link to={`/distribution/view/boulders/${gym.gymId}`}>Current Boulder Distribution</Link>
                  </li>
                </ul>
              </li>
              </ul>
          </li>
        </ul>
        ) 
      }
    )
  }

  render() {
    return (
      <div className="main-content">
      <h1 className="centered-text"> Welcome {this.props.user.firstName} {this.props.user.lastName}!</h1>
      <h2>Your main work locations are:</h2>
        {this.renderList()}
      </div>
    )
  }
}

export default Dashboard