/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';
import mockFullEmployeeList from '../../mock-data/mockFullEmployeeList';
import mockGymList from '../../mock-data/mockGymList';
import mockCurrentRopeDistribution from '../../mock-data/mockCurrentRopeDistribution';
import mockIdealRopeDistribution from '../../mock-data/mockIdealRopeDistribution';
import mockSingleGym from '../../mock-data/mockSingleGym';
import mockCurrentBoulderDistribution from '../../mock-data/mockCurrentBoulderDistribution';
import mockIdealBoulderDistribution from '../../mock-data/mockIdealBoulderDistribution';

test.beforeEach('mock the necessary api paths before navigating to the AdminDashboard page', async ({ page }) => {
  await page.route('*/**/api/employees', async route => {
    await route.fulfill({ json: mockFullEmployeeList });
  });
  await page.route('*/**/api/gyms', async route => {
    await route.fulfill({ json: mockGymList });
  });
  await page.route(`*/**/api/gymById/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockSingleGym });
  });
  
  page.goto('dashboard');

  const dashboardComponent = page.getByTestId('dashboard-component');
  const sideBarComponent = page.getByTestId('side-bar-component');
  const drawerComponent = page.getByTestId('drawer-component');
  const drawerContentComponent = page.getByTestId('dashboard-content-component');
  const gymTabComponent = page.getByTestId('location-tabs-container');

  await expect(sideBarComponent).toBeVisible();
  await expect(dashboardComponent).toBeVisible();
  await expect(drawerComponent).toBeVisible();
  await expect(drawerContentComponent).toBeVisible();
  await expect(gymTabComponent).toBeVisible();
});

test('make sure the ropes tab panel is visible and the links work as expected', async ({ page, baseURL }) => {
  await page.route(`*/**/api/currentRouteGrades/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockCurrentRopeDistribution });
  });
  await page.route(`*/**/api/routeSections/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockSingleGym.routeSections });
  });
  await page.route(`*/**/api/idealRouteGradesById/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockIdealRopeDistribution });
  });
  

  const ropePanelContent = page.getByTestId('ropes-container').first();
  const currentRopesDistributionLink = page.getByRole('link', { name: 'Current Rope Climbs' }).first();
  const idealRopesDistributionLink = page.getByRole('link', { name: 'Ideal Rope Distribution' }).first();
  const dashboardNavLink = page.getByLabel('Dashboard', { exact: true });
  

  await expect(ropePanelContent).toBeVisible();
  await expect(currentRopesDistributionLink).toBeVisible();
  await currentRopesDistributionLink.click();
  await expect(page.url()).toBe(`${baseURL}/distribution/current/ropes/${mockGymList[0].id}`);

  await expect(dashboardNavLink).toBeVisible();
  await dashboardNavLink.click();
  await expect(idealRopesDistributionLink).toBeVisible();
  await idealRopesDistributionLink.click();
  await expect(page.url()).toBe(`${baseURL}/distribution/ideal/ropes/${mockGymList[0].id}`);
});

test('make sure the boulders tab panel is visible and the links work as expected', async ({ page, baseURL }) => {
  await page.route(`*/**/api/currentBoulderGrades/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockCurrentBoulderDistribution });
  });
  await page.route(`*/**/api/boulderSections/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockSingleGym.boulderSections });
  });
  await page.route(`*/**/api/idealBoulderGradesById/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockIdealBoulderDistribution });
  });

  const bouldersTab = page.getByRole('tab', { name: 'Boulders' }).first();
  const boulderPanelContent = page.getByTestId('boulders-container');
  const currentBoulderDistributionLink = page.getByRole('link', { name: 'Current Boulder Problems' });
  const idealBoulderDistributionLink = page.getByRole('link', { name: 'Ideal Boulder Distribution' });
  const dashboardNavLink = page.getByLabel('Dashboard', { exact: true });

  await expect(bouldersTab).toBeVisible();
  await bouldersTab.click();

  await expect(boulderPanelContent).toBeVisible();
  await expect(currentBoulderDistributionLink).toBeVisible();
  await currentBoulderDistributionLink.click();
  await expect(page.url()).toBe(`${baseURL}/distribution/current/boulders/${mockGymList[0].id}`);

  await expect(dashboardNavLink).toBeVisible();
  await dashboardNavLink.click();
  await expect(bouldersTab).toBeVisible();
  await bouldersTab.click();

  await expect(idealBoulderDistributionLink).toBeVisible();
  await idealBoulderDistributionLink.click();
  await expect(page.url()).toBe(`${baseURL}/distribution/ideal/boulders/${mockGymList[0].id}`);
});

test('make sure the sections tab panel is visible and the links work as expected', async ({ page, baseURL }) => {
  await page.route(`*/**/api/gymWithSections/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockSingleGym });
  });
  

  const sectionsTab = page.getByRole('tab', { name: 'Sections' }).first();
  const sectionsPanelContent = page.getByTestId('sections-container');
  const viewSectionsLink = page.getByRole('link', { name: 'View Sections' });
  const editSectionsLink = page.getByRole('link', { name: 'Edit Sections' });
  const dashboardNavLink = page.getByLabel('Dashboard', { exact: true });
  

  await expect(sectionsTab).toBeVisible();
  await sectionsTab.click();

  await expect(sectionsPanelContent).toBeVisible();
  await expect(viewSectionsLink).toBeVisible();
  await viewSectionsLink.click();
  await expect(page.url()).toBe(`${baseURL}/sections/${mockGymList[0].id}`);

  await expect(dashboardNavLink).toBeVisible();
  await dashboardNavLink.click();
  await expect(sectionsTab).toBeVisible();
  await sectionsTab.click();

  await expect(editSectionsLink).toBeVisible();
  await editSectionsLink.click();
  await expect(page.url()).toBe(`${baseURL}/sections/edit/${mockGymList[0].id}`);
});
