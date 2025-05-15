const { Builder, By, until } = require('selenium-webdriver');
require('geckodriver');

// Här anger vi var testfilen ska hämtas. De konstiga replaceAll-funktionerna ersätter
// mellanslag med URL-säkra '%20' och backslash (\) på Windows med slash (/).
const fileUnderTest = 'file://' + __dirname.replaceAll(/ /g, '%20').replaceAll(/\\/g, '/') + '/../dist/index.html';
const defaultTimeout = 10000;
let driver;
jest.setTimeout(1000 * 60 * 5); // 5 minuter

// Det här körs innan vi kör testerna för att säkerställa att Firefox är igång
beforeAll(async () => {
console.log(fileUnderTest);
    driver = await new Builder().forBrowser('firefox').build();
    await driver.get(fileUnderTest);
});

// Allra sist avslutar vi Firefox igen
afterAll(async() => {
    await driver.quit();
}, defaultTimeout);

test('The stack should be empty in the beginning', async () => {
    let stack = await driver.findElement(By.id('top_of_stack')).getText();
    expect(stack).toEqual("n/a");
});

describe('Clicking "Pusha till stacken"', () => {
    it('should open a prompt box', async () => {
        let push = await driver.findElement(By.id('push'));
        await push.click();
        let alert = await driver.switchTo().alert();
        await alert.sendKeys("Bananer");
        await alert.accept();
    });
});



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
    //korrekt förväntat värde
    expect(newValue).toBe("TestValue");
  });