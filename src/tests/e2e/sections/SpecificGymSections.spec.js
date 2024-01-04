/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';
import mockFullEmployeeList from '../../mock-data/mockFullEmployeeList';
import mockGymList from '../../mock-data/mockGymList';
import mockSingleGym from '../../mock-data/mockSingleGym';

// render test
test('loads expected content', async ({page}) => {
  await page.route('*/**/api/employees', async route => {
    await route.fulfill({ json: mockFullEmployeeList });
  });
  await page.route('*/**/api/gyms', async route => {
    await route.fulfill({ json: mockGymList });
  });
  await page.route(`*/**/api/gymWithSections/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockSingleGym });
  });

  await page.goto(`sections/${mockSingleGym.id}`);

  const boulderSections = mockSingleGym.boulderSections;
  const routeSections = mockSingleGym.routeSections;
  
  const mainContainer = page.getByTestId('specific-sections-container');
  const sectionContainer = page.getByTestId(`${mockSingleGym.name}-sections-container`);
  const boulderSectionsContainer = page.getByTestId('boulder-section-container');
  const boulderSectionNameList = page.getByTestId('boulder-section-name');
  const routeSectionsContainer = page.getByTestId('route-section-container');
  const routeSectionNameList = page.getByTestId('route-section-name');

  
  await expect(mainContainer).toBeVisible();
  await expect(sectionContainer).toBeVisible();
  await expect(boulderSectionsContainer).toBeVisible();
  await expect(boulderSectionNameList).toHaveCount(boulderSections.length);
  await expect(routeSectionsContainer).toBeVisible();
  await expect(routeSectionNameList).toHaveCount(routeSections.length);
});