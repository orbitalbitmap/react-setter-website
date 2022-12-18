# Things to get working
  ## src/components/distributions
  Fix distribution tables back to working order
    -- Route and Boulder chart:
      -- Fix the Color Picker (there's got to be a better way to edit the row and color picker cells)
      -- Fix the api's returned values
      For the boulders, handle the position of a climb
  Fix backend to update previous setter placard names and/or first names to new ones (what did I mean by this?)

  ## Redo css
  Turn the main big file into little files that are on a per component basis
    This also means reworking the MUI custom theme
    IMPORTANT: This includes dealing with any instance of '!important'


# Upgrades to work on after
Move data fetches to redux actions instead of calling them directly in the components
Add comments everywhere (make checklist of files beforehand)
Move useEffects out to custom hooks
Move all `submit` functions out to DRY the code up more (`handleSubmit = (url, htmlBody) => {}`) 
Add tests, E2E (playwright) and unit (jest)
Upgrade to typescript

  ## src/history.js
  Implement back to working order

  ## src/services/gym.js (rtk api creator)
  Should this continue to be developed?

  # Login notification
  Failure notification is not working

  ## src/components/placards/boulderBashCard.pug
  Make this a component and not a template file

  # @TODOs
  Take care of remaining @TODOs

  ## src/App.js
  Metrics page for all gyms url and page

  ## src/component/metrics/allGym Metrics
  This needs to be implemented at some point

  ## src/components/employees/UpdateEmployee
  Uncontrolled input warning

  ## Transitions, Loaders, and Styling
  Add transitions on tab components
  Create and implement loading status bars
  Continue working on refining the styling