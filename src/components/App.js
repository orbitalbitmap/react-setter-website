import React from 'react'

import './styles.css'
//eslint-disable-next-line
import Form from './elements/Form'
import Navbar from './navbar/Navbar'
import EditSingleGym from './gyms/EditSingleGym'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {
        firstName: 'Rob',
        lastName: 'Perron',
        SingleGym: [{
          gymId: 1,
          name: 'Worcester',
        }, {
          gymId: 2,
          name: 'Hadley',
        }],
      },
      options: [{
        type: 'email',
        name: 'email',
        isRequired: true,
        placeholder: "Email",
      }, {
        type: 'password',
        name: 'password',
        isRequired: true,
        placeholder: "Password",
      }]
    }
  }
  
  render() {
    return (
      <>
        <Navbar />
        {/* <Form type="employee-form">

        </Form> */}

        <EditSingleGym />
      </>
    )
  }
}

export default App