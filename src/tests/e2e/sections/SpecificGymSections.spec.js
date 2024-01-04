/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';
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
});

test('loads expected content', async ({ page }) => {
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
  const emptyBoulderSectionContainer = page.getByTestId('empty-boulder-container');
  const routeSectionsContainer = page.getByTestId('route-section-container');
  const routeSectionNameList = page.getByTestId('route-section-name');
  const emptyRouteSectionContainer = page.getByTestId('empty-route-container');
  const editLink = page.getByRole('link', { name: 'Edit sections' })

  await expect(mainContainer).toBeVisible();
  await expect(sectionContainer).toBeVisible();
  await expect(editLink).toBeVisible();
  await expect(boulderSectionsContainer).toBeVisible();
  await expect(emptyBoulderSectionContainer).not.toBeVisible();
  await expect(boulderSectionNameList).toHaveCount(boulderSections.length);
  await expect(routeSectionsContainer).toBeVisible();
  await expect(emptyRouteSectionContainer).not.toBeVisible();
  await expect(routeSectionNameList).toHaveCount(routeSections.length);
});

test('loads expected content when no sub-sections are found in a section', async ({ page }) => {
  const gymWithEmptySections = {
    ...mockSingleGym,
    boulderSections: [],
    routeSections: [],
  };
  await page.route(`*/**/api/gymWithSections/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: gymWithEmptySections });
  });

  await page.goto(`sections/${mockSingleGym.id}`);
  
  const mainContainer = page.getByTestId('specific-sections-container');
  const sectionContainer = page.getByTestId(`${mockSingleGym.name}-sections-container`);
  const boulderSectionsContainer = page.getByTestId('boulder-section-container');
  const emptyBoulderSectionContainer = page.getByTestId('empty-boulder-container');
  const routeSectionsContainer = page.getByTestId('route-section-container');
  const emptyRouteSectionContainer = page.getByTestId('empty-route-container');


  await expect(mainContainer).toBeVisible();
  await expect(sectionContainer).toBeVisible();
  await expect(emptyBoulderSectionContainer).toBeVisible();
  await expect(boulderSectionsContainer).not.toBeVisible();
  await expect(emptyRouteSectionContainer).toBeVisible();
  await expect(routeSectionsContainer).not.toBeVisible();
});