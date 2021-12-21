import axios from 'axios'
import React from 'react'

class Gyms extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      gymsList: []
    }
  }

  async componentDidMount() {
    const { data } = await axios.get('http://localhost:1337/api/gyms')

    this.setState({
      gymsList: data
    })
  }

  render() {
    return (
      <>
        <h1 className="centered-text">Locations:</h1>
        {
          this.state.gymsList.map(gym => {
            return (
              <h3 key={gym.name} className="centered-text">
                <a href={`/gyms/${gym.id}`}>{gym.name}</a>
              </h3>
            )
          })
        }
      </>
    )
  }
}

export default Gyms