const {Builder, By, until} = require ('selenium-webdriver');
const Page = require('../lib/base_page');

class YopmailPage extends Page {
    constructor() {
        super();
        this.acceptCookiesBtn = By.xpath('//button[@id="accept"]');
        this.generateRandomEmailBtn = By.css('#listeliens > a:nth-child(1) > div:nth-child(2) > b:nth-child(1)');
        this.btnCheckEmail = By.xpath('/div[@class="tooltip"]//button[@class="md but text f24 egenbut"]');
    }
    
    // async acceptCookies() {
    //     let cookiesWindow = await this.driver.findElement(By.xpath('//button[@id="accept"]'));
    //     await this.driver.wait(until.elementIsVisible(cookiesWindow), this.explicitWaitMS);
    //     await cookiesWindow.click();
    // }
    async getGeneratedEmail() {
        await this.driver.wait(until.elementLocated(By.css('#egen')));
        return await this.driver.findElement(By.css('#egen')).getText();
    }
    async recievedBill() {
        await this.driver.wait(until.elementLocated(By.xpath('//h2')));
        return await this.driver.findElement(By.xpath('//h2')).getText();
    }
    // async confirmCookies() {
    //     let cookiesWindow = await this.driver.findElement(By.xpath('//button[@class="devsite-snackbar-action"]'));
    //     await this.driver.wait(until.elementIsVisible(cookiesWindow), this.explicitWaitMS);
    //     await cookiesWindow.click();
    // }
    // async scrollTo(element) {
    //     await this.driver.executeScript("arguments[0].scrollIntoView(false)", this.driver.findElement(element));
    // }
    // async actualVMClass() {
    //     await this.driver.wait(until.elementLocated(By.css('md-list-item.md-1-line:nth-child(8) > div:nth-child(1)')));
    //     return await this.driver.findElement(By.css('md-list-item.md-1-line:nth-child(8) > div:nth-child(1)')).getText();
    // }
   
}
module.exports = YopmailPage;