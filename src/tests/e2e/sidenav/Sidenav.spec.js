/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';
import mockGymList from '../../mock-data/mockGymList';
import mockFullEmployeeList from '../../mock-data/mockFullEmployeeList';
import mockMetrics from '../../mock-data/mockMetrics';
import mockSingleGym from '../../mock-data/mockSingleGym';


test.beforeEach('mock the necessary api paths before navigating to the Dashboard page', async ({ page }) => {
  await page.route('*/**/api/gyms', async route => {
    await route.fulfill({ json: mockGymList });
  });
  await page.route('*/**/api/employees', async route => {
    await route.fulfill({ json: mockFullEmployeeList });
  });
  await page.goto('dashboard');
  
  const heading = page.getByRole('heading', { name: 'Dashboard' });
  await expect(heading).toBeVisible();
});

test('loads expected content', async ({ page }) => {
  const adminDashboardLink = page.getByLabel('Admin Dashboard', { exact: true });
  const dashboardLink = page.getByLabel('Dashboard', { exact: true });
  const locationsLink = page.getByLabel('Locations', { exact: true });
  const employeesLink = page.getByLabel('Employees');
  const metricsLink = page.getByLabel('Metrics');
  const profileLink = page.getByLabel('Profile');
  const logoutLink = page.getByLabel('Logout');

  
  await expect(adminDashboardLink).toBeVisible();
  await expect(dashboardLink).toBeVisible();
  await expect(locationsLink).toBeVisible();
  await expect(employeesLink).toBeVisible();
  await expect(metricsLink).toBeVisible();
  await expect(profileLink).toBeVisible();
  await expect(logoutLink).toBeVisible();
});

test('will show/hide content for the collapsable location list when clicked and can navigate to correct page when a list item is clicked', async ({ page, baseURL }) => {  
  await page.route(`*/**/api/gymById/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockSingleGym });
  });

  const locationsLink = page.getByLabel('Locations', { exact: true });
  const locationsListContainer = page.getByTestId('locations-list');

  await expect(locationsListContainer).not.toBeVisible();
  // expands the list
  await locationsLink.click();
  await expect(locationsListContainer).toBeVisible();
  // closes the list
  await locationsLink.click();
  await expect(locationsListContainer).not.toBeVisible();

  // expands to test the list item's link to the all locations page
  await locationsLink.click();
  await expect(locationsListContainer).toBeVisible();

  const allLocationsLink = locationsListContainer.getByLabel("All Locations");
  await allLocationsLink.click();
  await expect(page.url()).toBe(`${baseURL}/locations`);

  // expands to test the list item's link to ta specific location's page
  await locationsLink.click();
  await expect(locationsListContainer).toBeVisible();

  const singleLocationLink = locationsListContainer.getByLabel(mockGymList[0].name, { exact: true, });
  await singleLocationLink.click();
  await expect(page.url()).toBe(`${baseURL}/locations/1`);
});

test('will show/hide content for the collapsable metrics list when clicked and can navigate to correct page when a list item is clicked', async ({ page, baseURL }) => {
  await page.route(`*/**/api/metrics/${mockGymList[0].id}`, async route => {
    await route.fulfill({ json: mockMetrics });
  });
  
  const metricsLink = page.getByLabel('Metrics', { exact: true });
  const metricsListContainer = page.getByTestId('metrics-list');

  await expect(metricsListContainer).not.toBeVisible();

  await metricsLink.click();
  await expect(metricsListContainer).toBeVisible();

  await metricsLink.click();
  await expect(metricsListContainer).not.toBeVisible();

  await metricsLink.click();
  await expect(metricsListContainer).toBeVisible();

  await page.getByLabel('CRG Cragstead', { exact: true }).click();

  await expect(page.url()).toBe(`${baseURL}/metrics/${mockGymList[0].id}`)
});

test('will load the correct page when a side nav link is clicked, for the non-expandable lists', async ({ page, baseURL }) => {
  const adminDashboardLink = page.getByLabel('Admin Dashboard', { exact: true });
  const dashboardLink = page.getByLabel('Dashboard', { exact: true });
  const employeesLink = page.getByLabel('Employees');
  const profileLink = page.getByLabel('Profile');
  const logoutLink = page.getByLabel('Logout');

  await adminDashboardLink.click();
  await expect(page.url()).toBe(`${baseURL}/admin`);

  await dashboardLink.click();
  await expect(page.url()).toBe(`${baseURL}/dashboard`);

  await employeesLink.click();
  await expect(page.url()).toBe(`${baseURL}/employees`);

  await profileLink.click();
  await expect(page.url()).toBe(`${baseURL}/employees/edit/1`);

  await logoutLink.click();
  await expect(page.url()).toBe(`${baseURL}/`);
});