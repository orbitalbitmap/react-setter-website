/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';
import dayjs from 'dayjs';
import mockCurrentRouteDistribution from '../../mock-data/mockCurrentRopeDistribution'
import mockFullEmployeeList from '../../mock-data/mockFullEmployeeList';
import mockGymList from '../../mock-data/mockGymList';
import mockSingleGym from '../../mock-data/mockSingleGym';


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
  await page.route(`*/**/api/routeSections/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockSingleGym.routeSections });
  });
});

test('makes sure the RouteDistributionChart page loads the expected content', async ({ page }) => {
  await page.route(`*/**/api/currentRouteGrades/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockCurrentRouteDistribution });
  });
  await page.goto(`distribution/current/ropes/${mockSingleGym.id}`);
  
  const sectionsList = page.getByTestId('sections-list');
  const buttonContainer = page.getByTestId('button-container');
  const addClimbButton = buttonContainer.getByRole('button', { name: "Add Climb"});
  const saveDistributionButton = buttonContainer.getByRole('button', { name: "Save Distribution"});
  const printClimbsButton = buttonContainer.getByRole('link', { name: "Print Route Placard"});
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

test('makes sure the sections dropdown works as expected', async ({ page }) => {
  await page.route(`*/**/api/currentRouteGrades/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockCurrentRouteDistribution });
  });
  await page.goto(`distribution/current/ropes/${mockSingleGym.id}`);

  const firstSectionInfo = mockSingleGym.routeSections[0];
  const firstSectionClimbs = mockCurrentRouteDistribution.filter(climbInfo => climbInfo.sectionId === mockSingleGym.routeSections[0].id);
  const secondSectionInfo = mockSingleGym.routeSections[1];
  const secondSectionClimbs = mockCurrentRouteDistribution.filter(climbInfo => climbInfo.sectionId === mockSingleGym.routeSections[1].id);
  const sectionsList = page.getByTestId('sections-list');
  const distributionContainer = page.getByTestId('distribution-container');
  const displayedClimbList = distributionContainer.locator('.MuiDataGrid-row');
  
  await expect(sectionsList).toBeVisible();
  await expect(displayedClimbList).toHaveCount(firstSectionClimbs.length);
  
  await sectionsList.click();
  await page.getByRole('option', { name: secondSectionInfo.name }).click();
  await expect(displayedClimbList).toHaveCount(secondSectionClimbs.length);

  await sectionsList.click();
  await page.getByRole('option', { name: firstSectionInfo.name }).click();
  await expect(displayedClimbList).toHaveCount(firstSectionClimbs.length);
});

test('makes sure the add climb button works as expected', async ({ page }) => {
  await page.route(`*/**/api/currentRouteGrades/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockCurrentRouteDistribution });
  });
  await page.goto(`distribution/current/ropes/${mockSingleGym.id}`);

  const firstSectionClimbs = mockCurrentRouteDistribution.filter(climbInfo => climbInfo.sectionId === mockSingleGym.routeSections[0].id);

  const buttonContainer = page.getByTestId('button-container');
  const addClimbButton = buttonContainer.getByRole('button', { name: "Add Climb"});
  const distributionContainer = page.getByTestId('distribution-container');
  const displayedClimbList = distributionContainer.locator('.MuiDataGrid-row');

  await expect(buttonContainer).toBeVisible();
  await expect(distributionContainer).toBeVisible();
  await expect(addClimbButton).toBeVisible();
  
  await expect(displayedClimbList).toHaveCount(firstSectionClimbs.length);
  await addClimbButton.click()
  await expect(displayedClimbList).toHaveCount(firstSectionClimbs.length + 1);
});

test('makes sure the save distribution button works as expected', async ({ page }) => {
  await page.route(`*/**/api/currentRouteGrades/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockCurrentRouteDistribution });
  });

  await page.route('*/**/api/saveDistribution/currentRoutes', async route => {
    await route.fulfill({ status: 200 });
  });
  await page.goto(`distribution/current/ropes/${mockSingleGym.id}`);
  
  const buttonContainer = page.getByTestId('button-container');
  const saveDistributionButton = buttonContainer.getByRole('button', { name: "Save Distribution"});
  const snackNotification = page.getByTestId('snackbar-notification');
  
  await expect(buttonContainer).toBeVisible();
  await expect(saveDistributionButton).toBeVisible();
  await expect(snackNotification).not.toBeVisible();

  await saveDistributionButton.click();

  await expect(snackNotification).toBeVisible();
  await expect(snackNotification).toHaveText('The distribution has been saved!');
});

test('makes sure the print route placard button works as expected', async ({ page, baseURL }) => {
  await page.route(`*/**/api/currentRouteGrades/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockCurrentRouteDistribution });
  });
  await page.goto(`distribution/current/ropes/${mockSingleGym.id}`);
  
  const buttonContainer = page.getByTestId('button-container');
  const printClimbsButton = buttonContainer.getByRole('link', { name: "Print Route Placard"});

  await expect(buttonContainer).toBeVisible();
  await expect(printClimbsButton).toBeVisible();

  await expect(page.url()).toBe(`${baseURL}/distribution/current/ropes/${mockSingleGym.id}`);
  await printClimbsButton.click();
  await expect(page.url()).toBe(`${baseURL}/placard/ropes/${mockSingleGym.id}`);
});

test('makes sure the full date change container works as expected', async ({ page }) => {
  await page.route(`*/**/api/currentRouteGrades/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockCurrentRouteDistribution });
  });
  await page.goto(`distribution/current/ropes/${mockSingleGym.id}`);

  const today = dayjs();
  const newDate = today.date() < 20 ? today.add(5, 'day') : today.subtract(5, 'day');
  const firstSectionClimbs = mockCurrentRouteDistribution.filter(climbInfo => climbInfo.sectionId === mockSingleGym.routeSections[0].id);

  const distributionContainer = page.getByTestId('distribution-container');
  const displayedClimbList = distributionContainer.locator('.MuiDataGrid-row');
  const dateUpdateContainer = page.getByTestId('date-updater-container');
  const dateUpdateButton = dateUpdateContainer.getByRole('button', { name: "Set Current Dates"});

  await expect(distributionContainer).toBeVisible();
  await expect(dateUpdateContainer).toBeVisible();
  await dateUpdateContainer.getByLabel('Choose date').click();
  await page.getByRole('gridcell', { name: newDate.date(), exact: true }).click();
  await expect(displayedClimbList.nth(0)).toContainText(firstSectionClimbs[0].dateSet);
  await expect(displayedClimbList.nth(0)).not.toContainText(newDate.format('YYYY-MM-DD'));

  
  await expect(dateUpdateButton).toBeVisible();
  await dateUpdateButton.click();

  await expect(displayedClimbList.nth(0)).not.toContainText(firstSectionClimbs[0].dateSet);
  await expect(displayedClimbList.nth(0)).toContainText(newDate.format('YYYY-MM-DD'));
});

test('makes sure the RouteDistributionChart grade updates as expected', async ({ page }) => {
  await page.route(`*/**/api/currentRouteGrades/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockCurrentRouteDistribution });
  });
  await page.goto(`distribution/current/ropes/${mockSingleGym.id}`);

  const climbToCheck = mockCurrentRouteDistribution[0];
  const distributionContainer = page.getByTestId('distribution-container');
  const displayedClimbList = distributionContainer.locator('.MuiDataGrid-row');

  // interacts with the grade cell to change the grade of climb
  await expect(displayedClimbList.nth(0)).toContainText(climbToCheck.grade);
  // opens up the edit functionality for the grade cell
  await displayedClimbList.nth(0).getByText(climbToCheck.grade).dblclick();
  // opens up the grades list options to select from
  await displayedClimbList.nth(0).getByText(climbToCheck.grade).click();
  await page.getByRole('option', { name: '5.7'}).click();
  await expect(displayedClimbList.nth(0)).not.toContainText(climbToCheck.grade);
  await expect(displayedClimbList.nth(0)).toContainText('5.7');
});

test('makes sure the RouteDistributionChart section updates as expected', async ({ page }) => {
  await page.route(`*/**/api/currentRouteGrades/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockCurrentRouteDistribution });
  });
  await page.goto(`distribution/current/ropes/${mockSingleGym.id}`);

  const firstSectionInfo = mockSingleGym.routeSections[0];
  const firstSectionClimbs = mockCurrentRouteDistribution.filter(climbInfo => climbInfo.sectionId === mockSingleGym.routeSections[0].id);
  const secondSectionInfo = mockSingleGym.routeSections[1];
  const secondSectionClimbs = mockCurrentRouteDistribution.filter(climbInfo => climbInfo.sectionId === mockSingleGym.routeSections[1].id);
  const sectionsList = page.getByTestId('sections-list');
  const distributionContainer = page.getByTestId('distribution-container');
  const displayedClimbList = distributionContainer.locator('.MuiDataGrid-row');
  
  await expect(sectionsList).toBeVisible();
  await sectionsList.click();
  await page.getByRole('option', { name: secondSectionInfo.name }).click();
  await expect(displayedClimbList).toHaveCount(secondSectionClimbs.length);

  // interacts with the route section cell to change the section of climb
  await expect(displayedClimbList.nth(0)).toContainText(secondSectionInfo.name);
  // opens up the edit functionality for the section cell
  await displayedClimbList.nth(0).getByText(secondSectionInfo.name).dblclick();
  // opens up the grades list options to select from
  await displayedClimbList.nth(0).getByText(secondSectionInfo.name).click();

  // checks that current displayed list is now one item less than when started
  await page.getByRole('option', { name: firstSectionInfo.name}).click();
  await expect(displayedClimbList).toHaveCount(secondSectionClimbs.length - 1);

  // checks that current displayed list is now one item more than when started
  await sectionsList.click();
  await page.getByRole('option', { name: firstSectionInfo.name }).click();
  await expect(displayedClimbList).toHaveCount(firstSectionClimbs.length + 1);
});

test('makes sure the RouteDistributionChart color updates as expected', async ({ page }) => {
  await page.route(`*/**/api/currentRouteGrades/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockCurrentRouteDistribution });
  });
  await page.goto(`distribution/current/ropes/${mockSingleGym.id}`);

  const climbToCheck = mockCurrentRouteDistribution[0];
  const distributionContainer = page.getByTestId('distribution-container');
  const displayedClimbList = distributionContainer.locator('.MuiDataGrid-row');
  const newColor = climbToCheck.color === 'Blue' ? 'Green' : 'Blue';

  // interacts with the color cell to change the color of climb
  await expect(displayedClimbList.nth(0)).toContainText(climbToCheck.color);
  // opens up the edit functionality for the color cell
  await displayedClimbList.nth(0).getByText(climbToCheck.color).dblclick();
  // opens up the colors list options to select from
  await displayedClimbList.nth(0).getByText(climbToCheck.color).click();
  await page.getByRole('option', { name: newColor }).click();
  await expect(displayedClimbList.nth(0)).not.toContainText(climbToCheck.color);
  await expect(displayedClimbList.nth(0)).toContainText(newColor);
});

test('makes sure the RouteDistributionChart setter updates as expected', async ({ page }) => {
  await page.route(`*/**/api/currentRouteGrades/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockCurrentRouteDistribution });
  });
  await page.goto(`distribution/current/ropes/${mockSingleGym.id}`);

  const climbToCheck = mockCurrentRouteDistribution[0];
  const distributionContainer = page.getByTestId('distribution-container');
  const displayedClimbList = distributionContainer.locator('.MuiDataGrid-row');
  const newSetterName = mockSingleGym.employees[0].placardName;

  // interacts with the setter cell to change the setter of climb
  await expect(displayedClimbList.nth(0)).toContainText(climbToCheck.setter);
  // opens up the edit functionality for the setter cell
  await displayedClimbList.nth(0).getByText(climbToCheck.setter).dblclick();
  // opens up the setters list options to select from
  await displayedClimbList.nth(0).getByText(climbToCheck.setter).click();
  await page.getByRole('option', { name: newSetterName }).click();
  await expect(displayedClimbList.nth(0)).not.toContainText(climbToCheck.setter);
  await expect(displayedClimbList.nth(0)).toContainText(newSetterName);
});

test('makes sure the RouteDistributionChart date set updates as expected', async ({ page }) => {
  await page.route(`*/**/api/currentRouteGrades/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockCurrentRouteDistribution });
  });
  await page.goto(`distribution/current/ropes/${mockSingleGym.id}`);

  const today = dayjs();
  const newDate = today.date() < 20 ? today.add(5, 'day') : today.subtract(5, 'day');

  const climbToCheck = mockCurrentRouteDistribution[0];
  const distributionContainer = page.getByTestId('distribution-container');
  const displayedClimbList = distributionContainer.locator('.MuiDataGrid-row');

  // interacts with the date set cell to change the date set of climb
  await expect(displayedClimbList.nth(0)).toContainText(climbToCheck.dateSet);
  // opens up the edit functionality for the date set cell
  await displayedClimbList.nth(0).getByText(climbToCheck.dateSet).dblclick();
  await displayedClimbList.nth(0).getByLabel('Choose date').click();
  await page.getByRole('gridcell', { name: newDate.date(), exact: true }).click();

  await expect(displayedClimbList.nth(0)).not.toContainText(climbToCheck.dateSet);
  await expect(displayedClimbList.nth(0)).toContainText(newDate.format('YYYY-MM-DD'));
});