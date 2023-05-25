# CURRENT
Fixing the notifications system which has caused a need to update the logic for updating an employee
Fix RTK Query to auto re-fetch when mutations are done
Move todayFormatted variable to redux
Updates save properly but the redux state does not reflect the changes

# Upgrades to work
Add reset functionality when leaving/entering a page (IE if persisting redux state I shouldn't see data for Worcester's metrics if I'm looking at another gym)
MUI's LoadingButton
Move useEffects out to custom hooks
Upgrade to typescript
Add comments everywhere (make checklist of files beforehand)
Move all `submit` functions out to DRY the code up more (`handleSubmit = (url, htmlBody) => {}`) 
Add tests, E2E (playwright) and unit (jest)

  ## src/components/distributions
  Fix distribution tables back to working order
    -- Route and Boulder chart:
      -- Fix the api's returned values
      For the boulders, handle the position of a climb

  ## src/history.js
  Implement back to working order

  ## src/components/placards/boulderBashCard.pug
  Make this a component and not a template file

  ## @TODOs
  Take care of remaining @TODOs

  ## src/App.js
  Metrics page for all gyms url and page

  ## src/component/metrics/allGym Metrics
  This needs to be implemented at some point

  ## Redo css
  Turn the main big file into little files that are on a per component basis
  This also means reworking the MUI custom theme
  IMPORTANT: This includes dealing with any instance of `!important`

  ## Transitions, Loaders, and Styling
  Add transitions on tab components
  Create and implement loading status bars
  Continue working on refining the styling
  Make sure there is no need for any css with the `!important` flag