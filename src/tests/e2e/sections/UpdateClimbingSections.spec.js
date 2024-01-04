/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';
import mockFullEmployeeList from '../../mock-data/mockFullEmployeeList';
import mockGymList from '../../mock-data/mockGymList';
import mockSingleGym from '../../mock-data/mockSingleGym';

test.beforeEach('mocks out the necessary api paths before navigating to the UpdateClimbingSections page', async({ page }) => {
  await page.route('*/**/api/employees', async route => {
    await route.fulfill({ json: mockFullEmployeeList });
  });
  await page.route('*/**/api/gyms', async route => {
    await route.fulfill({ json: mockGymList });
  });
});

test('makes sure the UpdateClimbingSections rope portion works as expected', async ({ page }) => {
  await page.route(`*/**/api/gymWithSections/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockSingleGym });
  });

  await page.goto(`sections/edit/${mockSingleGym.id}`);

  const routeSections = mockSingleGym.routeSections;
  const newSectionName = 'Test Section';
  
  const mainContainer = page.getByTestId('main-container');
  const ropeSectionContainer = page.getByTestId('rope-sections-container');
  const ropeSectionInputList = page.getByTestId('route-section-input');
  const ropeButtonContainer = page.getByTestId('rope-buttons-container');
  const newSectionButton = ropeButtonContainer.getByRole('button', { name: 'Add New Section' });
  const submitSectionButton = ropeButtonContainer.getByRole('button', { name: 'Save Info' });
  const snackNotification = page.getByTestId('snackbar-notification');

  await expect(mainContainer).toBeVisible();

  await expect(ropeSectionContainer).toBeVisible();
  await expect(snackNotification).not.toBeVisible();
  await expect(ropeSectionInputList).toHaveCount(routeSections.length);
  await expect(ropeSectionInputList.nth(0)).toHaveValue(routeSections[0].name);
  await ropeSectionInputList.nth(0).fill(newSectionName);
  await expect(ropeSectionInputList.nth(0)).toHaveValue(newSectionName);
  await expect(ropeButtonContainer).toBeVisible();

  await newSectionButton.click();
  await expect(ropeSectionInputList).toHaveCount(routeSections.length + 1);
  
  await submitSectionButton.click();
  await expect(snackNotification).toBeVisible();
  await expect(snackNotification).toHaveText('The sections info has been saved!');
});

test('makes sure the UpdateClimbingSections boulder portion works as expected', async ({ page }) => {
  await page.route(`*/**/api/gymWithSections/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockSingleGym });
  });

  await page.goto(`sections/edit/${mockSingleGym.id}`);

  const boulderSections = mockSingleGym.boulderSections;
  const newSectionName = 'Test Section';
  
  const mainContainer = page.getByTestId('main-container');
  const boulderSectionContainer = page.getByTestId('boulder-sections-container');
  const boulderSectionInputList = page.getByTestId('boulder-section-input');
  const boulderButtonContainer = page.getByTestId('boulder-buttons-container');
  const newSectionButton = boulderButtonContainer.getByRole('button', { name: 'Add New Section' });
  const submitSectionButton = boulderButtonContainer.getByRole('button', { name: 'Save Info' });
  const snackNotification = page.getByTestId('snackbar-notification');

  
  await expect(mainContainer).toBeVisible();

  await expect(boulderSectionContainer).toBeVisible();
  await expect(boulderSectionInputList).toHaveCount(boulderSections.length);
  await expect(boulderSectionInputList.nth(0)).toHaveValue(boulderSections[0].name);
  await boulderSectionInputList.nth(0).fill(newSectionName);
  await expect(boulderSectionInputList.nth(0)).toHaveValue(newSectionName);
  await expect(boulderButtonContainer).toBeVisible();
  
  await newSectionButton.click();
  await expect(boulderSectionInputList).toHaveCount(boulderSections.length + 1);
  
  await submitSectionButton.click();
  await expect(snackNotification).toBeVisible();
  await expect(snackNotification).toBeVisible();
});

test('makes sure the UpdateClimbingSections works as expected when no sub-sections are found', async ({ page }) => {
  const gymWithEmptySections = {
    ...mockSingleGym,
    boulderSections: [],
    routeSections: [],
  };
  await page.route(`*/**/api/gymWithSections/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: gymWithEmptySections });
  });

  await page.goto(`sections/edit/${mockSingleGym.id}`);
  
  const mainContainer = page.getByTestId('main-container');
  const ropeSectionContainer = page.getByTestId('rope-sections-container');
    const ropeSectionInputList = page.getByTestId('route-section-input');
  const boulderSectionContainer = page.getByTestId('boulder-sections-container');
    const boulderSectionInputList = page.getByTestId('boulder-section-input');

  await expect(mainContainer).toBeVisible();

  await expect(ropeSectionContainer).toBeVisible();
  await expect(ropeSectionInputList).not.toBeVisible();
  await expect(boulderSectionContainer).toBeVisible();
  await expect(boulderSectionInputList).not.toBeVisible();
});