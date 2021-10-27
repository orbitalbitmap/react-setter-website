import React from 'react'

class Form extends React.Component {  
  constructor(props) {
    super(props)

    this.state = {
      buttonProperties: [
        {
          key: "login",
          onClick: this.handleSubmit,
          text: "Login",
          type: "submit",
        },
      ],
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('hi')
  }

  render() {
    return (
      <div>
        <h1 className="centered-text" >Welcome</h1>
        <form action="" id={this.props.type} method="">
          {this.props.children}
          {
            this.state.buttonProperties.map(button => {
              return (
                <button key={button.key}onClick={button.onClick} type={button.type}>{button.text}</button>
              )
            })
          }
        </form>
      </div>
    )
  }
}

export default Form