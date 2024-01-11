/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';
import mockFullEmployeeList from '../../mock-data/mockFullEmployeeList';
import mockGymList from '../../mock-data/mockGymList';
import mockSingleGym from '../../mock-data/mockSingleGym';
import mockIdealBoulderDistribution from '../../mock-data/mockIdealBoulderDistribution';

test.beforeEach('mocks the necessary api paths for all the tests', async ({ page }) => {
  await page.route('*/**/api/employees', async route => {
    await route.fulfill({ json: mockFullEmployeeList });
  });
  await page.route('*/**/api/gyms', async route => {
    await route.fulfill({ json: mockGymList });
  });
});

// test passes when run in ui mode but not in headless mode
test('makes sure the IdealBoulderDistribution page works as expected', async ({page}) => {
  await page.route(`*/**/api/idealBoulderGradesById/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockIdealBoulderDistribution });
  });
  await page.route('*/**/api/saveDistribution/boulders', async route => {
    await route.fulfill({ status: 200 });
  });
  await page.goto(`distribution/ideal/boulders/${mockSingleGym.id}`);

  // removes two keys we don't need to test in this file
  delete mockIdealBoulderDistribution.gymId;
  delete mockIdealBoulderDistribution.gym;

  const keyList = await Object.keys(mockIdealBoulderDistribution);

  const form = page.getByTestId('boulders-distribution-form');
  const formGradeContainerList = page.getByTestId('form-input-container');
  const saveButton = page.getByText('Save Distribution');
  const firstGradeInput = formGradeContainerList.first();
  const snackNotification = page.getByTestId('snackbar-notification');

  await expect(form).toBeVisible();
  // since the gymId and gym info are included in the api's return data, we do not want to include it in the total displayed input count
  await expect(formGradeContainerList).toHaveCount(keyList.length);
  await expect(saveButton).toBeVisible();

  await expect(firstGradeInput).toBeVisible();
  await expect(firstGradeInput.getByText(keyList[0])).toBeVisible();
  await expect(firstGradeInput.locator('input')).toHaveValue(`${mockIdealBoulderDistribution[keyList[0]]}`);

  await firstGradeInput.locator('input').fill('999');
  await expect(firstGradeInput.locator('input')).not.toHaveValue(`${mockIdealBoulderDistribution[keyList[0]]}`);
  await expect(firstGradeInput.locator('input')).toHaveValue('999');

  await saveButton.click();

  await expect(form).toBeVisible();
  await expect(snackNotification).toBeVisible();
  await expect(snackNotification).toHaveText('The distribution has been saved!');
});