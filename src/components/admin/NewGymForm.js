import React from 'react'

class NewGymForm extends React.Component {
  render() {
    return ( 
      <>
        <h1 className="centered-text">New's Gym Information</h1>

        <form action="/api/updateGymInfo" method="post" id="editable-gym-form">
          <div className="employee-form-grid">
            <input className="hidden" name="id" value="" />
            <input className="hidden" name="name" value="" />
            <label htmlFor="address">Address:</label>
            <input name="address" value="" />
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input name="phoneNumber" value="" />
            
            {/* For selecting a head setter */}
            {/* //- label(htmlFor="headSetterId") Head Setter:
            //- select(name="headSetterId")
            //-   each employee in  gym.employees
            //-     option(value=employee.id selected= employee.id === gym.headSetterId ? true : false)= `${employee.firstName} ${employee.lastName}` */}
            <label htmlFor="facebook">Facebook Page:</label>
            <input name="facebook" value="" />
            <label htmlFor="instagram">Instagram Account:</label>
            <input name="instagram" value="" />
            <label htmlFor="twitter">Twitter Account:</label>
            <input name="twitter" value="" />
          </div>
          <button type="submit">Update Info</button>
        </form>
      </>
    )
  }
}

export default NewGymForm