/* eslint-disable testing-library/prefer-screen-queries */
import dayjs from 'dayjs';
import { test, expect } from '@playwright/test';
import mockSingleGym from '../../mock-data/mockSingleGym';
import mockGymList from '../../mock-data/mockGymList';
import mockFullEmployeeList from '../../mock-data/mockFullEmployeeList';
import mockBoulderSections from '../../mock-data/mockBoulderSections';
import mockCurrentBoulderDistribution from '../../mock-data/mockCurrentBoulderDistribution';

test.beforeEach('mock the necessary api paths before navigating to the Dashboard page', async ({ page }) => {
  await page.route('*/**/api/gyms', async route => {
    await route.fulfill({ json: mockGymList });
  });
  await page.route('*/**/api/employees', async route => {
    await route.fulfill({ json: mockFullEmployeeList });
  });
  await page.route(`*/**/api/boulderSections/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockBoulderSections });
  });
  await page.route(`*/**/api/currentBoulderGrades/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockCurrentBoulderDistribution });
  });

  await page.goto(`placard/boulders/${mockSingleGym.id}`);
});

test('makes sure the PrintableBoulderPlacard page loads expected content', async ({page}) => {
  const climbsPerPlacardSelector = page.getByTestId('climbs-per-placard-container');
  const climbSelectorContainerList = page.getByTestId('climb-selector-container');
  const sectionSelectorContainer = page.getByTestId('section-selector-container');
  const topPlacardContainer = page.getByTestId('top-placard-container');
  const bottomPlacardContainer = page.getByTestId('bottom-placard-container');
  
  await expect(climbsPerPlacardSelector).toBeVisible();
  await expect(climbSelectorContainerList).toHaveCount(6);
  await expect(sectionSelectorContainer).toBeVisible();

  await expect(topPlacardContainer).toBeVisible();
  // default total boulder-slot-grid should be 3
  await expect(topPlacardContainer.locator('.boulder-slot-grid')).toHaveCount(3);
  await expect(bottomPlacardContainer).toBeVisible();
  // default total boulder-slot-grid should be 3 
  await expect(bottomPlacardContainer.locator('.boulder-slot-grid')).toHaveCount(3);
});

test('makes sure the ClimbsPerPlacard component works as expected', async ({page}) => {
  const climbsPerPlacardSelector = page.getByTestId('climbs-per-placard-container');
  const topPlacardContainer = page.getByTestId('top-placard-container');
  const bottomPlacardContainer = page.getByTestId('bottom-placard-container');
  
  await expect(climbsPerPlacardSelector).toBeVisible();
  await expect(topPlacardContainer).toBeVisible();
  // default total boulder-slot-grid should be 3
  await expect(topPlacardContainer.locator('.boulder-slot-grid')).toHaveCount(3);
  await expect(bottomPlacardContainer).toBeVisible();
  // default total boulder-slot-grid should be 3
  await expect(bottomPlacardContainer.locator('.boulder-slot-grid')).toHaveCount(3);

  await climbsPerPlacardSelector.click();
  await page.getByRole('option', { name: '1' }).click();
  await expect(topPlacardContainer.locator('.boulder-slot-grid')).toHaveCount(1);
  await expect(bottomPlacardContainer.locator('.boulder-slot-grid')).toHaveCount(1);

  await climbsPerPlacardSelector.click();
  await page.getByRole('option', { name: '2' }).click();
  await expect(topPlacardContainer.locator('.boulder-slot-grid')).toHaveCount(2);
  await expect(bottomPlacardContainer.locator('.boulder-slot-grid')).toHaveCount(2);

  await climbsPerPlacardSelector.click();
  await page.getByRole('option', { name: '3' }).click();
  await expect(topPlacardContainer.locator('.boulder-slot-grid')).toHaveCount(3);
  await expect(bottomPlacardContainer.locator('.boulder-slot-grid')).toHaveCount(3);
  
  await climbsPerPlacardSelector.click();
  await page.getByRole('option', { name: '4' }).click();
  await expect(topPlacardContainer.locator('.boulder-slot-grid')).toHaveCount(4);
  await expect(bottomPlacardContainer.locator('.boulder-slot-grid')).toHaveCount(4);
});

test('makes sure the SectionSelector component works as expected', async ({page}) => {
  const climbsPerPlacardSelector = page.getByTestId('climbs-per-placard-container');
  const sectionSelectorContainer = page.getByTestId('section-selector-container');
  const sectionSelector = page.getByTestId('section-selector');
  const topPlacardContainer = page.getByTestId('top-placard-container');
  const topPlacardClimbSelectorList = topPlacardContainer.getByTestId('climb-selector');
  const bottomPlacardContainer = page.getByTestId('bottom-placard-container');
  const bottomPlacardClimbSelectorList = bottomPlacardContainer.getByTestId('climb-selector');
  
  const firstBoulderSectionDistribution = mockCurrentBoulderDistribution.filter(climbInfo => climbInfo.sectionId === mockBoulderSections[0].id);
  const firstBoulderOptionString = `${firstBoulderSectionDistribution[0].color} ${firstBoulderSectionDistribution[0].grade}`;
  const secondBoulderSectionDistribution = mockCurrentBoulderDistribution.filter(climbInfo => climbInfo.sectionId === mockBoulderSections[1].id);
  const secondBoulderOptionString = `${secondBoulderSectionDistribution[0].color} ${secondBoulderSectionDistribution[0].grade}`;
  
  await expect(climbsPerPlacardSelector).toBeVisible();
  await expect(sectionSelectorContainer).toBeVisible();
  await expect(sectionSelector).toBeVisible();
  
  await sectionSelector.click();
  await page.getByRole('option', { name: mockBoulderSections[0].name }).click();
  await expect(sectionSelector).toContainText(mockBoulderSections[0].name);
  await expect(sectionSelector).not.toContainText(mockBoulderSections[1].name);


  await expect(topPlacardContainer).toBeVisible();
  // default total boulder-slot-grid should be 3
  await expect(topPlacardContainer.locator('.boulder-slot-grid')).toHaveCount(3);
  await expect(bottomPlacardContainer).toBeVisible();
  // default total boulder-slot-grid should be 3
  await expect(bottomPlacardContainer.locator('.boulder-slot-grid')).toHaveCount(3);

  
  // checks the top placard component updated as expected
  await topPlacardClimbSelectorList.nth(0).click();
  await expect(page.getByRole('option', { name: firstBoulderOptionString })).toBeVisible();
  await expect(page.getByRole('option', { name: secondBoulderOptionString })).not.toBeVisible();

  // closes the options menu
  await page.keyboard.press('Escape');
  await expect(page.getByRole('option')).toHaveCount(0);

  // checks the bottom placard component updated as expected
  await bottomPlacardClimbSelectorList.nth(0).click();
  await expect(page.getByRole('option', { name: firstBoulderOptionString })).toBeVisible();
  await expect(page.getByRole('option', { name: secondBoulderOptionString })).not.toBeVisible();

  // closes the options menu
  await page.keyboard.press('Escape');
  await expect(page.getByRole('option')).toHaveCount(0);

  // changes the section again to make sure it still works as expected
  await sectionSelector.click();
  await page.getByRole('option', { name: mockBoulderSections[1].name }).click();
  await expect(sectionSelector).toContainText(mockBoulderSections[1].name);
  await expect(sectionSelector).not.toContainText(mockBoulderSections[0].name);

  // checks the top placard component updated as expected
  await topPlacardClimbSelectorList.nth(0).click();
  await expect(page.getByRole('option', { name: firstBoulderOptionString })).not.toBeVisible();
  await expect(page.getByRole('option', { name: secondBoulderOptionString })).toBeVisible();

  // closes the options menu
  await page.keyboard.press('Escape');
  await expect(page.getByRole('option')).toHaveCount(0);

  // checks the bottom placard component updated as expected
  await bottomPlacardClimbSelectorList.nth(0).click();
  await expect(page.getByRole('option', { name: firstBoulderOptionString })).not.toBeVisible();
  await expect(page.getByRole('option', { name: secondBoulderOptionString })).toBeVisible();

  // closes the options menu
  await page.keyboard.press('Escape');
  await expect(page.getByRole('option')).toHaveCount(0);
});

test('makes sure the ClimbSelector and AreteSelector components works as expected', async ({page}) => {
  const boulderSectionDistribution = mockCurrentBoulderDistribution.filter(climbInfo => climbInfo.sectionId === mockBoulderSections[0].id);
  const firstBoulderOptionString = `${boulderSectionDistribution[0].color} ${boulderSectionDistribution[0].grade}`;
  const secondBoulderOptionString = `${boulderSectionDistribution[1].color} ${boulderSectionDistribution[1].grade}`;
  const thirdBoulderOptionString = `${boulderSectionDistribution[2].color} ${boulderSectionDistribution[2].grade}`;

  const climbsPerPlacardSelector = page.getByTestId('climbs-per-placard-container');
  const sectionSelectorContainer = page.getByTestId('section-selector-container');
  const sectionSelector = page.getByTestId('section-selector');
  const topPlacardContainer = page.getByTestId('top-placard-container');
  const topPlacardClimbSelectorList = topPlacardContainer.getByTestId('climb-selector');
  const topPlacardAreteSelectorList = topPlacardContainer.getByTestId('arete-selector');
  const bottomPlacardContainer = page.getByTestId('bottom-placard-container');
  const bottomPlacardClimbSelectorList = bottomPlacardContainer.getByTestId('climb-selector');
  const bottomPlacardAreteSelectorList = bottomPlacardContainer.getByTestId('arete-selector');
  const firstClimbOption = page.getByRole('option', { name: firstBoulderOptionString });
  const secondClimbOption = page.getByRole('option', { name: secondBoulderOptionString });
  const thirdClimbOption = page.getByRole('option', { name: thirdBoulderOptionString });

  const gradeElementList = page.locator('.boulder-grade-value');
  const areteElementList = page.locator('.boulder-arete');
  const dateElementList = page.locator('.boulder-date-value');
  const setterElementList = page.locator('.boulder-setter-value');
  
  await expect(climbsPerPlacardSelector).toBeVisible();
  await expect(sectionSelectorContainer).toBeVisible();
  await expect(sectionSelector).toBeVisible();
  await expect(topPlacardAreteSelectorList).toHaveCount(3);
  await expect(bottomPlacardAreteSelectorList).toHaveCount(3);
  
  await sectionSelector.click();
  await page.getByRole('option', { name: mockBoulderSections[0].name }).click();
  await expect(sectionSelector).toContainText(mockBoulderSections[0].name);
  await expect(sectionSelector).not.toContainText(mockBoulderSections[1].name);

  await expect(topPlacardContainer).toBeVisible();
  // default total boulder-slot-grid should be 3
  await expect(topPlacardContainer.locator('.boulder-slot-grid')).toHaveCount(3);
  await expect(bottomPlacardContainer).toBeVisible();
  // default total boulder-slot-grid should be 3
  await expect(bottomPlacardContainer.locator('.boulder-slot-grid')).toHaveCount(3);

  // checks the top placard component works as expected
  // first placard slot
  await topPlacardClimbSelectorList.nth(0).click();
  await expect(firstClimbOption).toBeVisible();
  await expect(secondClimbOption).toBeVisible();
  await expect(thirdClimbOption).toBeVisible();
  
  await firstClimbOption.click();
  
  await topPlacardAreteSelectorList.nth(0).click();
  await page.getByRole('option', { name: 'None' }).click();

  // checks that the first placard slot contains the correct info
  await expect(gradeElementList.nth(0)).toContainText(boulderSectionDistribution[0].grade);
  await expect(areteElementList.nth(0)).toContainText("");
  await expect(dateElementList.nth(0)).toContainText(dayjs(boulderSectionDistribution[0].dateSet).format('MM/DD/YYYY'));
  await expect(setterElementList.nth(0)).toContainText(boulderSectionDistribution[0].setter);
  
  // second placard slot
  await topPlacardClimbSelectorList.nth(1).click();
  await secondClimbOption.click();
  await topPlacardAreteSelectorList.nth(1).click();
  await page.getByRole('option', { name: 'On', exact: true, }).click();
  // checks that the second placard slot contains the correct info
  await expect(gradeElementList.nth(1)).toContainText(boulderSectionDistribution[1].grade);
  await expect(areteElementList.nth(1)).toContainText("Arete on");
  await expect(dateElementList.nth(1)).toContainText(dayjs(boulderSectionDistribution[1].dateSet).format('MM/DD/YYYY'));
  await expect(setterElementList.nth(1)).toContainText(boulderSectionDistribution[1].setter);

  // third placard slot
  await topPlacardClimbSelectorList.nth(2).click();
  await thirdClimbOption.click();
  await topPlacardAreteSelectorList.nth(2).click();
  await page.getByRole('option', { name: 'Off' }).click();
  // checks that the placard third slot contains the correct info
  await expect(gradeElementList.nth(2)).toContainText(boulderSectionDistribution[2].grade);
  await expect(areteElementList.nth(2)).toContainText("Arete off");
  await expect(dateElementList.nth(2)).toContainText(dayjs(boulderSectionDistribution[2].dateSet).format('MM/DD/YYYY'));
  await expect(setterElementList.nth(2)).toContainText(boulderSectionDistribution[2].setter);


  // checks the bottom placard component works as expected
  // first placard slot
  await bottomPlacardClimbSelectorList.nth(0).click();
  await expect(firstClimbOption).toBeVisible();
  await expect(secondClimbOption).toBeVisible();
  await expect(thirdClimbOption).toBeVisible();

  await firstClimbOption.click();
  await bottomPlacardAreteSelectorList.nth(0).click();
  await page.getByRole('option', { name: 'Off' }).click();
  // checks that the first placard slot contains the correct info
  await expect(gradeElementList.nth(3)).toContainText(boulderSectionDistribution[0].grade);
  await expect(areteElementList.nth(3)).toContainText("Arete off");
  await expect(dateElementList.nth(3)).toContainText(dayjs(boulderSectionDistribution[0].dateSet).format('MM/DD/YYYY'));
  await expect(setterElementList.nth(3)).toContainText(boulderSectionDistribution[0].setter);
  
  // second placard slot
  await bottomPlacardClimbSelectorList.nth(1).click();
  await secondClimbOption.click();
  await bottomPlacardAreteSelectorList.nth(1).click();
  await page.getByRole('option', { name: 'None' }).click();
  // checks that the second placard slot contains the correct info
  await expect(gradeElementList.nth(4)).toContainText(boulderSectionDistribution[1].grade);
  await expect(areteElementList.nth(4)).toContainText("");
  await expect(dateElementList.nth(4)).toContainText(dayjs(boulderSectionDistribution[1].dateSet).format('MM/DD/YYYY'));
  await expect(setterElementList.nth(4)).toContainText(boulderSectionDistribution[1].setter);

  // third placard slot
  await bottomPlacardClimbSelectorList.nth(2).click();
  await thirdClimbOption.click();
  await bottomPlacardAreteSelectorList.nth(2).click();
  await page.getByRole('option', { name: 'On', exact: true, }).click();
  // checks that the placard third slot contains the correct info
  await expect(gradeElementList.nth(5)).toContainText(boulderSectionDistribution[2].grade);
  await expect(areteElementList.nth(5)).toContainText("Arete on");
  await expect(dateElementList.nth(5)).toContainText(dayjs(boulderSectionDistribution[2].dateSet).format('MM/DD/YYYY'));
  await expect(setterElementList.nth(5)).toContainText(boulderSectionDistribution[2].setter);
});