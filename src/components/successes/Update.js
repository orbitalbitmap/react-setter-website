import React from 'react'

class Update extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      type: 'boulders',
    }
  }

  componentDidMount() {
    setTimeout(() => {
      window.location.href = `/distribution/${this.state.type}/1`
    }, 2000)
  }

  render() {
    return (
      <>
        <h1>Update to the {this.state.type} complete!</h1>
        <p>You will be redirected in a few seconds.</p>
      </>
    )
  }
}
export default Update
