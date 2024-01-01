/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';

// render test
test('loads expected content', async ({page}) => {
  await page.goto('metrics/1');
  
  const bouldersPerSetterContainer = page.getByTestId('boulders-per-setter-container');
  const routesPerSetterContainer = page.getByTestId('routes-per-setter-container');
  const bouldersPerColorContainer = page.getByTestId('boulders-per-color-container');
  const routesPerColorContainer = page.getByTestId('routes-per-color-container');
  const idealVsCurrentBouldersContainer = page.getByTestId('ideal-vs-current-boulder-container');
  const idealVsCurrentRoutesContainer = page.getByTestId('ideal-vs-current-route-container');
  
  await expect(bouldersPerSetterContainer).toBeVisible();
  await expect(routesPerSetterContainer).toBeVisible();
  await expect(bouldersPerColorContainer).toBeVisible();
  await expect(routesPerColorContainer).toBeVisible();
  await expect(idealVsCurrentBouldersContainer).toBeVisible();
  await expect(idealVsCurrentRoutesContainer).toBeVisible();
});