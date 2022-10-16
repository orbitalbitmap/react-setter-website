# Things to get working
This is the list of thing to get working before new things should be worked on

  ## src/components/dashboard/sidebar/ListItems
  Remove props?

  ## src/components/distributions/DateInput
  Remove props?

  ## src/components/distributions/DistributionEditForm
  Remove props?

  ## src/components/placards/BoulderPlacard
  Remove props

  ## src/components/placards/BoulderSlot
  Remove props

  ## src/components/placards/ClimbSelector
  Remove props

  ## src/components/placards/PlacardSelectors
  Remove props

  ## src/components/placards/PrintableBoulderCard
  Remove props

  ## src/components/placards/PrintableRouteCard
  Remove props

  ## src/components/placards/RoutePlacard
  Remove props

  ## src/components/sections/SectionCardsContainer
  Remove props

  ## src/history.js
  Implement back to working order

  ## src/actions/index
  Make sure this file can be removed and get rid of it

  ## src/components/admin/AdminUpdateEmployee
  Update to jsx
  Remove props

  ## src/components/distributions/SectionsList
  Should this update to not require props?

  ## src/components/distributions/SelectionContainer
  Should this update to not require props?

  ## src/components/employees/EmployeeCardContainer
  Break the getLocationString function out to its own file

  ## src/components/employees/SingleEmployee
  Only display the 'Edit Employee' button when the user is a manager

  ## src/components/employees/UpdateEmployee
  Uncomment axios import & fix the handleSubmit so it sends the updated info to the db 
  Clean the file up
  Get the snackbar working again and then turn it into a global snackbar component, not page specific 

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


# Upgrades to work on after
Remove all instances of props from the app and call data from redux store
Move data loads to redux actions or custom useEffects instead of calling them directly in the components
Add comment everywhere (make checklist of files beforehand)
Upgrade to typescript

  ## src/App.js
  Metrics page for all gyms url and page

  ## src/component/metrics/allGym Metrics
  This need to be implemented at some point