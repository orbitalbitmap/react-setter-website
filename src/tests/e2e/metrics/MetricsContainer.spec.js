/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';
import mockFullEmployeeList from '../../mock-data/mockFullEmployeeList';
import mockGymList from '../../mock-data/mockGymList';
import mockSingleGym from '../../mock-data/mockSingleGym';
import mockMetrics from '../../mock-data/mockMetrics';

test.beforeEach('mocks out the necessary api paths', async({ page }) => {
  await page.route('*/**/api/employees', async route => {
    await route.fulfill({ json: mockFullEmployeeList });
  });
  await page.route('*/**/api/gyms', async route => {
    await route.fulfill({ json: mockGymList });
  });
});

test('makes sure the MetricsContainer page works as expected when it receives all metrics are received', async ({page}) => {
  await page.route(`*/**/api/metrics/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockMetrics });
  });

  await page.goto(`metrics/${mockSingleGym.id}`);
  
  const bouldersPerSetterContainer = page.getByTestId('boulders-per-setter-container');
  const routesPerSetterContainer = page.getByTestId('routes-per-setter-container');
  const bouldersPerColorContainer = page.getByTestId('boulders-per-color-container');
  const routesPerColorContainer = page.getByTestId('routes-per-color-container');
  const idealVsCurrentBouldersContainer = page.getByTestId('ideal-vs-current-boulder-container');
  const idealVsCurrentRoutesContainer = page.getByTestId('ideal-vs-current-route-container');
  
  await expect(bouldersPerSetterContainer).toBeVisible();
  await expect(bouldersPerSetterContainer).not.toContainText('No Data Found For Setters Per Boulders');
  
  await expect(routesPerSetterContainer).toBeVisible();
  await expect(routesPerSetterContainer).not.toContainText('No Data Found For Setters Per Routes');

  await expect(bouldersPerColorContainer).toBeVisible();
  await expect(bouldersPerColorContainer).not.toContainText('No Data Found For Colors Per Boulders');

  await expect(routesPerColorContainer).toBeVisible();
  await expect(routesPerColorContainer).not.toContainText('No Data Found For Routes Per Colors');

  await expect(idealVsCurrentBouldersContainer).toBeVisible();
  await expect(idealVsCurrentBouldersContainer).not.toContainText('No Data Found For the Ideal vs Current # of Boulders');

  await expect(idealVsCurrentRoutesContainer).toBeVisible();
  await expect(idealVsCurrentRoutesContainer).not.toContainText('No Data Found For the Ideal vs Current # of Routes');
});

test('makes sure the MetricsContainer page works as expected when some metrics are empty', async ({page}) => {
  const semiMissingMetrics = {
    ...mockMetrics,
    metrics: {
      ...mockMetrics.metrics,
      bouldersPerSetter: [],
      routesPerColor: [],
      currentVsIdealRouteGrades: [],
    }
  }
  await page.route(`*/**/api/metrics/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: semiMissingMetrics });
  });

  await page.goto(`metrics/${mockSingleGym.id}`);
  
  const bouldersPerSetterContainer = page.getByTestId('boulders-per-setter-container');
  const routesPerSetterContainer = page.getByTestId('routes-per-setter-container');
  const bouldersPerColorContainer = page.getByTestId('boulders-per-color-container');
  const routesPerColorContainer = page.getByTestId('routes-per-color-container');
  const idealVsCurrentBouldersContainer = page.getByTestId('ideal-vs-current-boulder-container');
  const idealVsCurrentRoutesContainer = page.getByTestId('ideal-vs-current-route-container');
  
  await expect(bouldersPerSetterContainer).toBeVisible();
  await expect(bouldersPerSetterContainer).toContainText('No Data Found For Setters Per Boulders');
  
  await expect(routesPerSetterContainer).toBeVisible();
  await expect(routesPerSetterContainer).not.toContainText('No Data Found For Setters Per Routes');

  await expect(bouldersPerColorContainer).toBeVisible();
  await expect(bouldersPerColorContainer).not.toContainText('No Data Found For Colors Per Boulders');

  await expect(routesPerColorContainer).toBeVisible();
  await expect(routesPerColorContainer).toContainText('No Data Found For Routes Per Colors');

  await expect(idealVsCurrentBouldersContainer).toBeVisible();
  await expect(idealVsCurrentBouldersContainer).not.toContainText('No Data Found For the Ideal vs Current # of Boulders');

  await expect(idealVsCurrentRoutesContainer).toBeVisible();
  await expect(idealVsCurrentRoutesContainer).toContainText('No Data Found For the Ideal vs Current # of Routes');
});

test('makes sure the MetricsContainer page works as expected with no some metrics data', async ({page}) => {
  const semiMissingMetrics = {
    ...mockMetrics,
    metrics: {
      bouldersPerColor: [],
      bouldersPerSetter: [],
      routesPerColor: [],
      routesPerSetter: [],
      currentRoutesPerGrade: [],
      currentVsIdealRouteGrades: [],
      currentVsIdealBoulderGrades: [],
    }
  }
  await page.route(`*/**/api/metrics/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: semiMissingMetrics });
  });

  await page.goto(`metrics/${mockSingleGym.id}`);
  
  const bouldersPerSetterContainer = page.getByTestId('boulders-per-setter-container');
  const routesPerSetterContainer = page.getByTestId('routes-per-setter-container');
  const bouldersPerColorContainer = page.getByTestId('boulders-per-color-container');
  const routesPerColorContainer = page.getByTestId('routes-per-color-container');
  const idealVsCurrentBouldersContainer = page.getByTestId('ideal-vs-current-boulder-container');
  const idealVsCurrentRoutesContainer = page.getByTestId('ideal-vs-current-route-container');
  
  await expect(bouldersPerSetterContainer).toBeVisible();
  await expect(bouldersPerSetterContainer).toContainText('No Data Found For Setters Per Boulders');
  
  await expect(routesPerSetterContainer).toBeVisible();
  await expect(routesPerSetterContainer).toContainText('No Data Found For Setters Per Routes');

  await expect(bouldersPerColorContainer).toBeVisible();
  await expect(bouldersPerColorContainer).toContainText('No Data Found For Boulders Per Color');

  await expect(routesPerColorContainer).toBeVisible();
  await expect(routesPerColorContainer).toContainText('No Data Found For Routes Per Colors');

  await expect(idealVsCurrentBouldersContainer).toBeVisible();
  await expect(idealVsCurrentBouldersContainer).toContainText('No Data Found For the Ideal vs Current # of Boulders');

  await expect(idealVsCurrentRoutesContainer).toBeVisible();
  await expect(idealVsCurrentRoutesContainer).toContainText('No Data Found For the Ideal vs Current # of Routes');
});