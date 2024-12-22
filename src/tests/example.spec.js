// @ts-check
const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/home.page');
const Urlhome = 'https://nocnoc.com/';
const UrlProductPage = 'https://nocnoc.com/';
// test('has title', async ({ page }) => {
//   await page.goto(Urlhome);

//   await expect(page).toHaveTitle(/NocNoc/);
// });

test('TestCase-(001,005,006)(Login Button)', async ({ page }) => {
  // await page.goto(Urlhome);
  // await page.getByTestId('login-btn').click();

  // await expect(page.getByTestId( 'email-phone' )).toBeVisible();

  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.checkLogin();
  await homePage.login('123123123')

  // await homePage.fillPhoneNumber('123456789');
  // await expect(page.getByTestId( 'email-phone' )).toBeVisible();

 });

 test('TestCase-007(Incorrect-Input)', async ({ page }) => {
  // await page.goto(Urlhome);
  // await page.getByTestId('login-btn').click();

  // await expect(page.getByTestId( 'email-phone' )).toBeVisible();

  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.checkLogin();
  await homePage.login('123123123')

  // await homePage.fillPhoneNumber('123456789');
  // await expect(page.getByTestId( 'email-phone' )).toBeVisible();

 });

// test('TestCase-002(Cart Button)', async ({ page }) => {
//   const homePage = new HomePage(page);
//   await homePage.goto();
//   homePage.checkCart();
//   await expect(page).toHaveURL('https://nocnoc.com/cart?area=nav&entryPoint=Navigation%20Bar');
// });

// test('TestCase-003(External Links)', async ({ page }) => {
//   // const homePage = new HomePage(page);
//   // await homePage.goto();
//   await page.goto(Urlhome);
//   const BtnHelp = 'help';
   
//   const [newPage] = await Promise.all([
//     page.waitForEvent('popup'),
//     page.getByTestId(BtnHelp).click(),
     
// ])
 
// await expect(newPage).toHaveURL('https://support.nocnoc.com/hc/th');
 
// });

// // test('TestCase-004(TH/ENG)', async ({ page }) => {
// //   const homePage = new HomePage(page);
// //   await homePage.goto();
// //   homePage.checkLanguage();
  
// //   await expect(page.getByText('Recommended for You')).toBeVisible();

// //   });


// [
//   { name: 'Alice', expected: 'Hello, Alice!' },
//   { name: 'Bob', expected: 'Hello, Bob!' },
//   { name: 'Charlie', expected: 'Hello, Charlie!' },
// ].forEach(({ name, expected }) => {
//   // You can also do it with test.describe() or with multiple tests as long the test name is unique.
//   test(`testing with ${name}`, async ({ page }) => {
//     await page.goto(`https://example.com/greet?name=${name}`);
//     await expect(page.getByRole('heading')).toHaveText(expected);
//   });
// });