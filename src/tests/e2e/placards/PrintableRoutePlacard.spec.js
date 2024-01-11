/* eslint-disable testing-library/prefer-screen-queries */
import dayjs from 'dayjs';
import { test, expect } from '@playwright/test';
import mockSingleGym from '../../mock-data/mockSingleGym';
import mockGymList from '../../mock-data/mockGymList';
import mockFullEmployeeList from '../../mock-data/mockFullEmployeeList';
import mockCurrentRopeDistribution from '../../mock-data/mockCurrentRopeDistribution';

test.beforeEach('mock the necessary api paths before navigating to the Dashboard page', async ({ page }) => {
  await page.route('*/**/api/gyms', async route => {
    await route.fulfill({ json: mockGymList });
  });
  await page.route('*/**/api/employees', async route => {
    await route.fulfill({ json: mockFullEmployeeList });
  });
  await page.route(`*/**/api/currentRouteGrades/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockCurrentRopeDistribution });
  });

  await page.goto(`placard/ropes/${mockSingleGym.id}`);
});

test('makes sure the PrintableRoutePlacard page loads expected content', async ({page}) => {
  const climbSelectorContainerList = page.getByTestId('climb-selector-container');
  const slotContainerList = page.locator('.route-slot-grid');
  const gradeElementList = page.locator('.route-grade-value');
  const routeNameElementList = page.locator('.route-name');
  const areteInfoElementList = page.locator('.route-arete');
  const ropeStyleElementList = page.locator('.route-style');
  const dateSetElementList = page.locator('.route-date-set');
  const setterElementList = page.locator('.route-setter');
  
  // three elements for the three selectors and the three slots in the placard
  await expect(climbSelectorContainerList).toHaveCount(3);
  await expect(slotContainerList).toHaveCount(3);
  await expect(gradeElementList).toHaveCount(3);
  await expect(routeNameElementList).toHaveCount(3);
  await expect(areteInfoElementList).toHaveCount(3);
  await expect(ropeStyleElementList).toHaveCount(3);
  await expect(dateSetElementList).toHaveCount(3);
  await expect(setterElementList).toHaveCount(3);
});

test('makes sure the ClimbSelector and AreteSelector components works as expected', async ({page}) => {
  const firstRouteOptionString =
    `${mockCurrentRopeDistribution[0].station}: ${mockCurrentRopeDistribution[0].color} ${mockCurrentRopeDistribution[0].grade}`;
  const secondRouteOptionString =
    `${mockCurrentRopeDistribution[1].station}: ${mockCurrentRopeDistribution[1].color} ${mockCurrentRopeDistribution[1].grade}`;
  const thirdRouteOptionString = 
    `${mockCurrentRopeDistribution[2].station}: ${mockCurrentRopeDistribution[2].color} ${mockCurrentRopeDistribution[2].grade}`;
  
  const climbSelectorList = page.getByTestId('climb-selector');
  const areteSelectorList = page.getByTestId('arete-selector');
  const slotContainerList = page.locator('.route-slot-grid');
  const gradeElementList = page.locator('.route-grade-value');
  const routeNameElementList = page.locator('.route-name');
  const areteInfoElementList = page.locator('.route-arete');
  const ropeStyleElementList = page.locator('.route-style');
  const dateSetElementList = page.locator('.route-date-set');
  const setterElementList = page.locator('.route-setter');
  
  const firstClimbOption = page.getByRole('option', { name: firstRouteOptionString });
  const secondClimbOption = page.getByRole('option', { name: secondRouteOptionString });
  const thirdClimbOption = page.getByRole('option', { name: thirdRouteOptionString });


  await expect(climbSelectorList.first()).toBeVisible();
  // default total Route-slot-grid should be 3
  await expect(slotContainerList).toHaveCount(3);

  // checks the top placard component works as expected
  // first placard slot
  await climbSelectorList.nth(0).click();
  await expect(firstClimbOption).toBeVisible();
  await expect(secondClimbOption).toBeVisible();
  await expect(thirdClimbOption).toBeVisible();
  
  await firstClimbOption.click();
  
  await areteSelectorList.nth(0).click();
  await page.getByRole('option', { name: 'None' }).click();

  // checks that the first placard slot contains the correct info
  await expect(gradeElementList.nth(0)).toContainText(mockCurrentRopeDistribution[0].grade);
  await expect(routeNameElementList.nth(0)).toContainText(mockCurrentRopeDistribution[0].climbName);
  await expect(areteInfoElementList.nth(0)).toContainText("");
  await expect(ropeStyleElementList.nth(0)).toContainText(mockCurrentRopeDistribution[0].ropeStyle);
  await expect(dateSetElementList.nth(0)).toContainText(dayjs(mockCurrentRopeDistribution[0].dateSet).format('MM/DD/YYYY'));
  await expect(setterElementList.nth(0)).toContainText(mockCurrentRopeDistribution[0].setter);
  
  // second placard slot
  await climbSelectorList.nth(1).click();
  await secondClimbOption.click();
  await areteSelectorList.nth(1).click();
  await page.getByRole('option', { name: 'On', exact: true, }).click();
  // checks that the second placard slot contains the correct info
  await expect(gradeElementList.nth(1)).toContainText(mockCurrentRopeDistribution[1].grade);
  await expect(routeNameElementList.nth(1)).toContainText(mockCurrentRopeDistribution[1].climbName);
  await expect(areteInfoElementList.nth(1)).toContainText("Arete on");
  await expect(ropeStyleElementList.nth(1)).toContainText(mockCurrentRopeDistribution[1].ropeStyle);
  await expect(dateSetElementList.nth(1)).toContainText(dayjs(mockCurrentRopeDistribution[1].dateSet).format('MM/DD/YYYY'));
  await expect(setterElementList.nth(1)).toContainText(mockCurrentRopeDistribution[1].setter);

  // third placard slot
  await climbSelectorList.nth(2).click();
  await thirdClimbOption.click();
  await areteSelectorList.nth(2).click();
  await page.getByRole('option', { name: 'Off' }).click();
  // checks that the placard third slot contains the correct info
  await expect(gradeElementList.nth(2)).toContainText(mockCurrentRopeDistribution[2].grade);
  await expect(routeNameElementList.nth(2)).toContainText(mockCurrentRopeDistribution[2].climbName);
  await expect(areteInfoElementList.nth(2)).toContainText("Arete off");
  await expect(ropeStyleElementList.nth(2)).toContainText(mockCurrentRopeDistribution[2].ropeStyle);
  await expect(dateSetElementList.nth(2)).toContainText(dayjs(mockCurrentRopeDistribution[2].dateSet).format('MM/DD/YYYY'));
  await expect(setterElementList.nth(2)).toContainText(mockCurrentRopeDistribution[2].setter);
});