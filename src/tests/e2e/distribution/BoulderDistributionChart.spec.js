/* eslint-disable testing-library/prefer-screen-queries */
import dayjs from 'dayjs';
import { test, expect } from '@playwright/test';
import mockSingleGym from '../../mock-data/mockSingleGym';
import mockFullEmployeeList from '../../mock-data/mockFullEmployeeList';
import mockGymList from '../../mock-data/mockGymList';
import mockCurrentBoulderDistribution from '../../mock-data/mockCurrentBoulderDistribution';

test.beforeEach('mocks the necessary api paths for all the tests', async ({ page }) => {
  await page.route('*/**/api/employees', async route => {
    await route.fulfill({ json: mockFullEmployeeList });
  });
  await page.route('*/**/api/gyms', async route => {
    await route.fulfill({ json: mockGymList });
  });
  await page.route(`*/**/api/gymById/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockSingleGym });
  });
  await page.route(`*/**/api/boulderSections/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockSingleGym.boulderSections });
  });
});

test('makes sure the BoulderDistributionChart page loads the expected', async ({ page }) => {
  await page.route(`*/**/api/currentBoulderGrades/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockCurrentBoulderDistribution });
  });
  await page.goto(`distribution/current/boulders/${mockSingleGym.id}`);
  
  const sectionsList = page.getByTestId('sections-list');
  const buttonContainer = page.getByTestId('button-container');
  const addClimbButton = buttonContainer.getByRole('button', { name: "Add Climb"});
  const saveDistributionButton = buttonContainer.getByRole('button', { name: "Save Distribution"});
  const printClimbsButton = buttonContainer.getByRole('link', { name: "Print Boulder Placard"});
  const distributionContainer = page.getByTestId('distribution-container');
  const dateUpdateContainer = page.getByTestId('date-updater-container');
  const dateUpdateButton = dateUpdateContainer.getByRole('button', { name: "Set Current Dates"});

  await expect(sectionsList).toBeVisible();
  await expect(buttonContainer).toBeVisible();
  await expect(distributionContainer).toBeVisible();
  await expect(dateUpdateContainer).toBeVisible();

  await expect(addClimbButton).toBeVisible();
  await expect(saveDistributionButton).toBeVisible();
  await expect(printClimbsButton).toBeVisible();
  await expect(dateUpdateButton).toBeVisible();
});

test('makes sure the BoulderDistributionChart works as expected', async ({ page }) => {
  await page.route(`*/**/api/currentBoulderGrades/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockCurrentBoulderDistribution });
  });
  await page.goto(`distribution/current/boulders/${mockSingleGym.id}`);

  const firstSectionClimbs = mockCurrentBoulderDistribution.filter(climbInfo => climbInfo.sectionId === mockSingleGym.boulderSections[0].id);
  const secondSectionClimbs = mockCurrentBoulderDistribution.filter(climbInfo => climbInfo.sectionId === mockSingleGym.boulderSections[1].id);
  const today = dayjs();
  const climbToCheck = secondSectionClimbs[0];
  const secondClimbDayDiff = `${today.diff(climbToCheck.dateSet, 'day')}`;
  
  const sectionsList = page.getByTestId('sections-list');
  const buttonContainer = page.getByTestId('button-container');
  const addClimbButton = buttonContainer.getByRole('button', { name: "Add Climb"});
  const saveDistributionButton = buttonContainer.getByRole('button', { name: "Save Distribution"});
  const printClimbsButton = buttonContainer.getByRole('link', { name: "Print Boulder Placard"});
  const distributionContainer = page.getByTestId('distribution-container');
  const dateUpdateContainer = page.getByTestId('date-updater-container');
  const dateUpdateButton = dateUpdateContainer.getByRole('button', { name: "Set Current Dates"});
  const displayedClimbList = distributionContainer.locator('.MuiDataGrid-row');
  
  await expect(sectionsList).toBeVisible();
  await sectionsList.click();
  await page.getByRole('option', { name: mockSingleGym.boulderSections[0].name }).click();
  await expect(displayedClimbList).toHaveCount(firstSectionClimbs.length);

  await sectionsList.click();
  await page.getByRole('option', { name: mockSingleGym.boulderSections[1].name }).click();
  await expect(displayedClimbList).toHaveCount(secondSectionClimbs.length);

  await expect(displayedClimbList.nth(0)).toContainText(climbToCheck.grade);
  await expect(displayedClimbList.nth(0)).toContainText(mockSingleGym.boulderSections[1].name);
  await expect(displayedClimbList.nth(0)).toContainText(climbToCheck.color);
  await expect(displayedClimbList.nth(0)).toContainText(climbToCheck.setter);
  await expect(displayedClimbList.nth(0)).toContainText(climbToCheck.dateSet);
  await expect(displayedClimbList.nth(0)).toContainText(secondClimbDayDiff);

  await expect(buttonContainer).toBeVisible();
  await expect(distributionContainer).toBeVisible();
  await expect(dateUpdateContainer).toBeVisible();

  await expect(addClimbButton).toBeVisible();
  await expect(saveDistributionButton).toBeVisible();
  await expect(printClimbsButton).toBeVisible();
  await expect(dateUpdateButton).toBeVisible();
});