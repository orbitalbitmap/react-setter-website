/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';
import mockFullEmployeeList from '../../mock-data/mockFullEmployeeList';
import mockGymList from '../../mock-data/mockGymList';
import mockSingleGym from '../../mock-data/mockSingleGym';
import mockIdealRopeDistribution from '../../mock-data/mockIdealRopeDistribution';

test.beforeEach('mocks the necessary api paths for all the tests', async ({ page }) => {
  await page.route('*/**/api/employees', async route => {
    await route.fulfill({ json: mockFullEmployeeList });
  });
  await page.route('*/**/api/gyms', async route => {
    await route.fulfill({ json: mockGymList });
  });

  await page.route(`*/**/api/idealRouteGradesById/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockIdealRopeDistribution });
  });
  await page.route('*/**/api/saveDistribution/routes', async route => {
    await route.fulfill({ status: 200 });
  });

  // this: { waitUntil: 'networkidle' } was the only solution found so far to allow this test to run properly in headed mode
  // with out this option, the test works in ui mode but doesn't find anything past the form in when not run in ui mode
  await page.goto(`distribution/ideal/ropes/${mockSingleGym.id}`, { waitUntil: 'networkidle' });
});

test('makes sure the IdealRouteDistribution page works as expected', async ({page}) => {
 // since the gymId and gym info are included in the api's return data but not required for the test, they are removed
delete mockIdealRopeDistribution.gymId;
delete mockIdealRopeDistribution.gym;

const keyList = Object.keys(mockIdealRopeDistribution);

  const form = page.getByTestId('routes-distribution-form');
  const formGradeContainerList = page.getByTestId('form-input-container');
  const saveButton = page.getByText('Save Distribution');
  const firstGradeInput = formGradeContainerList.first();
  const snackNotification = page.getByTestId('snackbar-notification');
  
  await expect(form).toBeVisible();
  await expect(formGradeContainerList).toHaveCount(keyList.length);
  await expect(saveButton).toBeVisible();

  await expect(firstGradeInput).toBeVisible();
  // .replace('_', '.')  ->  is used as the returned api value is similar to '5_3' but it gets displayed as '5.3'
  await expect(firstGradeInput.getByText(keyList[0].replace('_', '.'))).toBeVisible();
  await expect(firstGradeInput.locator('input')).toHaveValue(`${mockIdealRopeDistribution[keyList[0]]}`);

  await firstGradeInput.locator('input').fill('999');
  await expect(firstGradeInput.locator('input')).not.toHaveValue(`${mockIdealRopeDistribution[keyList[0]]}`);
  await expect(firstGradeInput.locator('input')).toHaveValue('999');

  await saveButton.click();

  await expect(form).toBeVisible();
  await expect(snackNotification).toBeVisible();
  await expect(snackNotification).toHaveText('The distribution has been saved!');
});