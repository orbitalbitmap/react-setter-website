import React from 'react'

class UpdateEmployee extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      inputAndLabelPropertiesList: [
        {
          className: null,
          defaultValue: "employee.placard !== null? employee.placardName : ''",
          form: null,
          formAction: null,
          labelText: "Name on placard:",
          name: "placardName",
          placeholder: null,
          type: "text",
        }, {
          className: null,
          defaultValue: "employee.email",
          form: null,
          formAction: null,
          labelText: "Email:",
          name: "email",
          placeholder: null,
          type: "text",
        }, {
          className: null,
          defaultValue: "employee.password",
          form: null,
          formAction: null,
          labelText: "Password:",
          name: "password",
          placeholder: null,
          type: "password",
        }, {
          className: null,
          defaultValue: "employee.phoneNumber",
          form: null,
          formAction: null,
          labelText: "Phone #:",
          name: "phoneNumber",
          placeholder: null,
          type: "tel",
        },
      ],
      selectAndOptionProperties: {
        defaultValue: "1",
        isDisabled: false, // employee.roleId <= 3 ? false : true,
        labelText: "Role:",
        name: "roleId",
        optionsList: [
          {
            text: "Director of Routesetting",
            value: "1",
          }, {
            text: "Regional Head Setter",
            value: "2",
          }, {
            text: "Head Setter",
            value: "3",
          }, {
            text: "Full Time Setter",
            value: "4",
          }, {
            text: "Part Time Setter",
            value: "5",
          },
        ],
        isRequired: true,
      },
      checkBoxProperties: {

      },
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('hi')
  }

  renderElements() {
    return this.state.inputAndLabelPropertiesList.map(element => {
      return (
        <React.Fragment key={`${element.name}-fragment`}>
          <label htmlFor={element.name} form={element.form} >{element.labelText}</label> 
          <input 
            id={element.id ? element.id : null}
            className={element.className ? element.className : null}
            defaultValue={element.defaultValue ? element.defaultValue : null}
            disabled={element.isDisabled ? element.isDisabled : null}
            form={element.form ? element.form : null}
            name={element.name ? element.name : null}
            placeholder={element.placeholder ? element.placeholder : null}
            required={element.isRequired ? true : false}  // WHY THE FUCK CAN I NOT DO A TERNARY, OR THIS, HERE????????????
            type={element.type ? element.type : null}
          />
        </React.Fragment>
      )
    })
  }
  
  render() {
    return (
      <>
        <div className="employee-form-grid">
          <input className="hidden" name="id" defaultValue="employee.id" />
          {this.renderElements()}

          <label 
            htmlFor={this.state.selectAndOptionProperties.name}>
            {this.state.selectAndOptionProperties.labelText}
          </label>
          
          <select 
            name={this.state.selectAndOptionProperties.name}
            defaultValue={this.state.selectAndOptionProperties.defaultValue}
            disabled={this.state.selectAndOptionProperties.isDisabled} 
            required={this.state.selectAndOptionProperties.required}
          >
            {this.state.selectAndOptionProperties.optionsList.map(item => {
              return (
                <option key={item.value} value={item.value}>
                  {item.text}
                </option>
              )
            }) }
          </select>
        </div>

        <h3 className="centered-text">Locations:</h3>
        <div className="checkbox-grid">
          {
            this.props.user.gyms.map(gym => {
              // REFACTOR THESE TO STATE
              let properties = {
                className: "checkbox",
                defaultValue: `${gym.gymId}:`,
                form:"employee-form",
                id: gym.name,
                name:"gyms",
                type: "checkbox",
              }
              
              return (
              <div key={gym.gymId}>
                <label htmlFor="gyms" form="employee-form">{`${gym.name}:`}</label> 
                <input 
                  id={properties.id ? properties.id : null}
                  className={properties.className ? properties.className : null}
                  defaultValue={properties.defaultValue ? properties.defaultValue : null}
                  disabled={properties.isDisabled ? properties.isDisabled : null}
                  form={properties.form ? properties.form : null}
                  name={properties.name ? properties.name : null}
                  placeholder={properties.placeholder ? properties.placeholder : null}
                  required={properties.isRequired ? true : false}  // WHY THE FUCK CAN I NOT DO A TERNARY, OR THIS, HERE????????????
                  type={properties.type ? properties.type : null}
                />
              </div>
              )
            })
          }
        </div>
      </>

    )
  }
}

export default UpdateEmployee