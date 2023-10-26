# Upgrades to work
E2E (playwright)

Add comments everywhere (make checklist of files beforehand)
Change currentLocationNameList to a employeeLocationsList
Upgrade to typescript

  ## src/components/distributions
  Double check that the functionality still works
    For the boulders, handle the position of a climb
      -- Fix the api's returned values

  ## src/components/placards/boulderBashCard.pug
  Make this a component and not a template file

  ## Fix the drawer
  Currently the drawer covers somethings up when its opened, the actual function should be that the main content shrinks a little so the view has both the main content and side bar completely visible to the user.

  ## src/App.js
  Metrics page for all gyms url and page

  ## src/component/metrics/allGym Metrics
  This needs to be implemented at some point

  ## Redo css
  Turn the main big file into little files that are on a per component basis (maybe switch to SASS/LESS)
  This also means reworking the MUI custom theme
  IMPORTANT: This includes dealing with any instance of `!important`

  ## Transitions and Loaders
  Create and implement loading status bars
  Add transitions on tab components