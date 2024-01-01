/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';


// render test
test('loads expected content', async ({page}) => {
  await page.goto('distribution/ideal/boulders/1');
  
  const form = page.getByTestId('boulders-distribution-form');
  const saveButton = page.getByText('Save Distribution');
  
  await expect(form).toBeVisible();
  await expect(saveButton).toBeVisible();
});