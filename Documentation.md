# Why this?
  To help document what each compnent needs passed to it

## Components - HTML Element Components

### Anchor properties
{
  href:   string, url value to go to when the link is clicked
  text:   string, value to display to the user
}

### Button properties
  {
    onClick:   function, the onClick event handler 
    text:   string, the text displayed to the user
    type:   string, what type of button this is
  }

### Form properties
  {
    action:   string, the URL to direct the form to after submission
    method:   string, POST, GET, etc...
    type:   string, the id for the form
  }
  child Components: components passed as standard child compnents

### Input properties 
  {
    id:   string, html id name,
    className:   string, html class name,
    defaultValue:   string, the value displayed to the user
    form:   string, what form this input is associated with
    name:   string, name for use with label
    placeholder:   string, any placeholder values
    isRequired:   boolean, true or false if the input is required
    isDisabled:   boolean, true of false for when the input should not be editable (ex: full.part time setters shouldn't be able to change their employment role)
    type:   string, what type of input IE text, email, password, etc...
  }


### Label properties
  {
    form:   string, what form this label is associated with
    htmlFor:   string, what element this label is associated with
    text:   string, the text to be displayed to the user
  }

### Option properties
  {
    value:   string, value to be used on the backend
    text:   string, the value displayed to the user
  }

### SelectBox properties
  {
    defaultValue:   string, the default value displayed to the user
    name:   string, name to be used for a label
    optionsList:   array that contains the property objects for the options associated with the select box
      [{
        text: string, value to be displayed to the user,
        value: string, the value to be used in the backend, typically associated with the database values,
      }]
    isDisabled:  boolean, true of false for when the input should not be editable 
    isRequired:   boolean, true or false if the input is required
  }







## Components - Login/Dashboard

### Dashboard
  user:   object, information associated with the user that is retrieved from the database
  {
    firstName:   string, holding the value of the users name retrieved from the database
    lastName:   string, holding the value of the users name retrieved from the database
    gyms:   array of objects, contains the info from the database of gyms associated with the user
      [{
        gymId:   integer, the id of the gym that is retrieved from the database
        name:   string, the name of the gym that is retrieved from the database
      }],
  }

### Login
  options:   array of objects for the input properties


## Components - Employee Components

### EmployeeList
  employees:   array of objects, all info comes from the database for each employee
  [{
    id:   integer, the id associated with the employee in the database
    firstName:   string, first name for the employee retrieved from the database
    lastName:   string, last name for the employee retrieved from the database
  }] 

### SingleEmployee
  employee:   object, all info comes from the database for the employee
  {
    id:   integer, the id associated with the employee in the database
    firstName:   string, first name for the employee retrieved from the database
    lastName:   string, last name for the employee retrieved from the database
    email:   string, the email retrieved from the database
    phoneNumber:   string, phone number retrieved from the database
    gyms:   array of objects, contains the info from the database of gyms associated with the user
      [{
        gymId: i  nteger, the id of the gym that is retrieved from the database
        name:   string, the name of the gym that is retrieved from the database
      }],
  }

### UpdateEmployee
  user:   object, information associated with the user that is retrieved from the database
  {
    firstName:   string, first name for the employee retrieved from the database
    lastName:   string, last name for the employee retrieved from the database
    gyms:   array of objects, contains the info from the database of gyms associated with the user
      [{
        gymId:   integer, the id of the gym that is retrieved from the database
        name:   string, the name of the gym that is retrieved from the database
      }],
  }

## Components - Navbar

### Navbar
user:   object, information associated with the user that is retrieved from the database
{
  id: integer, holding the value of the id associated to a user in the database
  roleId: integer, holding the value of the role id associated to a user in the database
  firstName:   string, holding the value of the users name retrieved from the database
  lastName:   string, holding the value of the users name retrieved from the database
  gyms:   array of objects, contains the info from the database of gyms associated with the user
  [{
    gymId:   integer, the id of the gym that is retrieved from the database
    name:   string, the name of the gym that is retrieved from the database
  }]
}