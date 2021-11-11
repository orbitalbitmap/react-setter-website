import React from 'react'

class EmployeeCreated extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      newEmployee: {
        firstName: 'Rob',
        lastName: 'Perron',
        email: 'robp@centralrockgym.com',
        phoneNumber: '508-3335-6195',
      }
    }
  }

  componentDidMount() {
    setTimeout(() => {
      window.location.href = `/dashboard`;
    }, 5000);
  }

  render() {
    return (
      <>
        <h1 className="centered-text">New employee successfully created!</h1>
        <h2 className="centered-text">Name: {this.state.newEmployee.firstName} {this.state.newEmployee.lastName}</h2>
        <h3 className="centered-text">Email address: {this.state.newEmployee.email}</h3>
        <h3 className="centered-text">Phone number: {this.state.newEmployee.phoneNumber}</h3>

        <h5 className="centered-text">(You will automatically be redirected to the dashboard within 5 seconds.)</h5>
      </>
    )
  }
}

export default EmployeeCreated