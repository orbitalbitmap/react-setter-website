import { Link } from 'react-router-dom'

const Dashboard = (props) => {
  const renderList = () => {
    return props.user.gyms.map(gym => {
      return (
        <ul key={`user-gym-list-${gym.name}`}>
          <li key={gym.id}>
            <h3> 
              <Link to={`/locations/${gym.id}`}>{gym.name}</Link>
            </h3>
            <ul key={`sections-${gym.id}`}>
              <li key={`list-${gym.id}`}>
                <h4>Sections</h4>
                <ul key={`section-list-${gym.id}`}>
                  <li key={`all-sections-${gym.id}`}>
                    <Link to={`/sections/${gym.id}`}> All Sections</Link>
                  </li>
                  <li key={`boulder-sections-${gym.id}`}>
                    <Link to={`/gymSections/view/boulders/${gym.id}`}> Boulder Sections</Link>
                  </li>
                  <li key={`rope-sections-${gym.id}`}>
                    <Link to={`/gymSections/view/routes/${gym.id}`}> Rope Sections</Link>
                  </li>
                  <li key={`edit-sections-${gym.id}`}>
                    <Link to={`/gymSections/edit/${gym.id}`}> Edit All Section Names</Link>
                  </li>
                </ul>
              </li>
            </ul>
            <ul key={`distribution-${gym.id}`}>
              <li key={`ideal-distribution-${gym.id}`}>
                <h4>Ideal</h4>
                <ul key={`ideal-distribution-list-${gym.id}`}>
                  <li key={`ideal-route-distribution-${gym.id}`}>
                    <Link to={`/distribution/ideal/routes/${gym.id}`}> Route Distribution</Link>
                  </li>
                  <li key={`ideal-boulder-distribution-${gym.id}`}>
                    <Link to={`/distribution/ideal/boulders/${gym.id}`}>Boulder Distribution</Link>
                  </li>
                </ul>
              </li>
              <li key={`current-distribution-${gym.id}`}>
                <h4>Current</h4>
                <ul key={`current-distribution-list-${gym.id}`}>
                  <li key={`current-route-distribution-${gym.id}`}>
                    <Link to={`/distribution/current/routes/${gym.id}`}>Current Route Distribution</Link>
                  </li>
                  <li key={`current-boulder-distribution-${gym.id}`}>
                    <Link to={`/distribution/current/boulders/${gym.id}`}>Current Boulder Distribution</Link>
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

  return (
    <div className="main-content">
    <h1 className="centered-text"> Welcome {props.user.firstName} {props.user.lastName}!</h1>
    <h2>Your main work locations are:</h2>
      {renderList()}
    </div>
  )
}

export default Dashboard