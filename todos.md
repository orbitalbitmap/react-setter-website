# Things to get working
This is the list of thing to get working before new things should be worked on

  ## src/components/employees/UpdateEmployee
  Uncomment axios import & fix the handleSubmit so it sends the updated info to the db 
  Clean the file up
  Get the snackbar working again and then turn it into a global snackbar component, not page specific 

  ## src/components/distributions
  Fix distribution tables back to working order
  'Can't update rea only property' error message

  ## src/components/employees/EmployeeCardContainer
  Break the getLocationString function out to its own file

  ## src/components/login/Login
  Add log in error alerts

  ## src/components/metrics/MetricsContainer
  Move data to redux store and then change from using props grabbing the data from the redux store

  ## src/components/placards/boulderBashCard.pug
  Make this a component and not a template file

  ## src/components/dashboard/content/gymTabContainer/GymTabPanel
  Clean this up

  ## src/services/gym.js (rtk api creator)
  Should this continue to be developed?

  ## src/history.js
  Implement back to working order


# Upgrades to work on after
Remove all instances of props from the app and call data from redux store
Move data loads to redux actions or custom useEffects instead of calling them directly in the components
Add comment everywhere (make checklist of files beforehand)
Upgrade to typescript

  ## src/App.js
  Metrics page for all gyms url and page

  ## src/component/metrics/allGym Metrics
  This need to be implemented at some point