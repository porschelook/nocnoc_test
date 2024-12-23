// @ts-check
const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/home.page');
const { ProductPage } = require('../pages/product.page');

const Urlhome = 'https://nocnoc.com/';
const UrlProductPage = 'https://nocnoc.com/p/Televisions/LG-4K-Smart-TV-webOS-%E0%B8%A3%E0%B8%B8%E0%B9%88%E0%B8%99-55UQ/12290669';
test('has title', async ({ page }) => {
  await page.goto(Urlhome);

  await expect(page).toHaveTitle(/NocNoc/);
});

[{ input: '0981231232' }, { input: 'porschelook@gmail.com' }].forEach(({ input }) => {
  test(`TestCase-(001,005,006) - Login with input: ${input}`, async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.checkLogin();    
    await homePage.login("0981231232");
    expect(await page.getByAltText('ยืนยันเบอร์มือถือ').isVisible()).toBeTruthy();
  });
});


[{ input: 'Alice' }, { input: '123' }, { input: 'nocnoc@m' }, { input: '%*&' }, { input: '097775a778' }].forEach(({ input }) => {
 test(`TestCase-007(Incorrect-Input) - Login with input: ${input}`, async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.checkLogin();
  await homePage.login('123123123')
  expect( await page.getByAltText('กรอกเบอร์โทรศัพท์หรืออีเมลที่ถูกต้อง').isVisible());


 });
});


test('TestCase-002(Cart Button)', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  homePage.checkCart();
  await expect(page).toHaveURL('https://nocnoc.com/cart?area=nav&entryPoint=Navigation%20Bar');
});

test('TestCase-003(External Links)', async ({ page }) => {
  await page.goto(Urlhome);
  const BtnHelp = 'help';
   
  const [newPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByTestId(BtnHelp).click(),
     
])
 
await expect(newPage).toHaveURL('https://support.nocnoc.com/hc/th');
 
});

test('TestCase-004 (TH/ENG)', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.checkLanguage();
  await expect(page.getByText('Recommended for You')).toBeVisible();
});


 

UrlProductPage
test('TestCase-009(Cart Page - Increase Item Count)', async ({ page }) => {
  const productPage = new ProductPage(page);

  await productPage.goto();

  let check = await productPage.checkPlusDisable();
  while (check == true) {
    await productPage.IncreaseItems();
    check = await productPage.checkPlusDisable(); 
  }

  await productPage.checkTrueValue();

  await productPage.checkValueNoMoreThanStocks();
});


UrlProductPage
test('TestCase-010(Cart Page - Decrease Item Count)', async ({ page }) => {
  const productPage = new ProductPage(page);

  await productPage.goto();

  let check = await productPage.checkMinusDisable();
  while (check == false) {
    await productPage.DecreaseItems();
    check = await productPage.checkMinusDisable(); 
  }

  await productPage.checkTrueValue();

  await productPage.checkValueNoLessThanMinimum();
});

test('TestCase-008(Cart Page - WishList)', async ({ page }) => {
  const productPage = new ProductPage(page);

  await productPage.goto();
  // await productPage.checkWishList();
  await productPage.checkRating();
   
 });

