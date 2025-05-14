const { Builder, By, until } = require('selenium-webdriver');
require('geckodriver');

const fileUnderTest = 'file://' + __dirname.replaceAll(/ /g, '%20').replaceAll(/\\/g, '/') + '/../dist/index.html';
const defaultTimeout = 10000;
let driver;

jest.setTimeout(1000 * 60 * 5); // 5 minuter

beforeAll(async () => {
  console.log(fileUnderTest);
  driver = await new Builder().forBrowser('firefox').build();
  await driver.get(fileUnderTest);
});

afterAll(async() => {
  await driver.quit();
}, defaultTimeout);

test('Push button should update stack display with correct value', async () => {
  // Hämtar värdet på stacken som ligger främst
  let initialValue = await driver.findElement(By.id('top_of_stack')).getText();
  
  // Klicka på push-knappen
  let pushButton = await driver.findElement(By.id('push'));
  await pushButton.click();
  
  // Hanterar en prompt dialog
  let alert = await driver.switchTo().alert();
  await alert.sendKeys("TestValue");
  await alert.accept();
  
  // Hämtar det nya värdet på stacken
  let newValue = await driver.findElement(By.id('top_of_stack')).getText();
  
  // Värdet förväntas ändras till det vi angav
  expect(newValue).not.toBe(initialValue);
  //testrad för att se att testet misslyckas
  expect(newValue).toBe("DettaVärdeStämmerInte");
});