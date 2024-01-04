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
  await page.route(`*/**/api/gymById/${mockSingleGym.id}`, async route => {
    await route.fulfill({ json: mockSingleGym });
  });

  await page.goto(`locations/${mockSingleGym.id}`);

  const headSetter = mockSingleGym.employees.find(employee => employee.id === mockSingleGym.headSetterId);

  const headSetterFullName = `${headSetter.firstName} ${headSetter.lastName}`;
  const mockFullTimeSetterList = mockSingleGym.employees.filter(employee => employee.roleId < 5 && employee.id !== headSetter.id);
  const mockPartTimeSetterList = mockSingleGym.employees.filter(employee => employee.roleId === 5);
  
  const mainContainer = page.getByTestId('main-container');
  const gymNameHeading = page.getByRole('heading', { name: mockSingleGym.name, exact: true });
  const headSetterContainer = page.getByTestId('head-setter-container');
  const fullTimeSettersContainer = page.getByTestId('full-time-setters-container');
  const fullTimeSettersList = fullTimeSettersContainer.locator('span');
  const partTimeSettersContainer = page.getByTestId('part-time-setters-container');
  const partTimeSettersList = partTimeSettersContainer.locator('span');
  
  await expect(mainContainer).toBeVisible();
  await expect(gymNameHeading).toBeVisible();

  await expect(headSetterContainer).toBeVisible();
  await expect(headSetterContainer).toHaveText(headSetterFullName);

  await expect(fullTimeSettersContainer).toBeVisible();
  await expect(fullTimeSettersList).toHaveCount(mockFullTimeSetterList.length);
  
  await expect(partTimeSettersContainer).toBeVisible();
  await expect(partTimeSettersList).toHaveCount(mockPartTimeSetterList.length);
});