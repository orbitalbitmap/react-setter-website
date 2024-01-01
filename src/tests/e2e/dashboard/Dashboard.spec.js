/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test';


// render test
test('loads expected content', async ({ page }) => {
  await page.goto('/dashboard');

  const heading = page.getByRole('heading', { name: 'Dashboard' });
  const sideBarComponent = page.getByTestId('side-bar-component');
  const dashboardComponent = page.getByTestId('dashboard-component');
  const drawerComponent = page.getByTestId('drawer-component');
  const drawerContentComponent = page.getByTestId('dashboard-content-component');
  const gymTabComponent = page.getByTestId('location-tabs-container');

  await expect(heading).toBeVisible();
  await expect(sideBarComponent).toBeVisible();
  await expect(dashboardComponent).toBeVisible();
  await expect(drawerComponent).toBeVisible();
  await expect(drawerContentComponent).toBeVisible();
  await expect(gymTabComponent).toBeVisible();
});
