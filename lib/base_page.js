const { Builder, By, until } = require('selenium-webdriver');

class Page {
  constructor() {
    this.explicitWaitMS = 10000;
  }
  async launchBrowser(browserType) {
    this.driver = new Builder().forBrowser(browserType).build();
    await this.driver.manage().setTimeouts({ implicit: 10000 });
    await this.driver.manage().window().maximize();
  }

  async open(url) {
    await this.driver.get(url);
  }

  async close() {
    await this.driver.quit();
  }

  async findWebElement(element) {
    await this.driver.wait(until.elementLocated(element), this.explicitWaitMS);
    await this.driver.findElement(element);
  }

  async write(element, text) {
    await this.driver.wait(until.elementLocated(element), this.explicitWaitMS);
    await this.driver.findElement(element).sendKeys(text);
  }

  async clickElement(element) {
    await this.driver.wait(until.elementLocated(element), this.explicitWaitMS);
    await this.driver.findElement(element).click();
  }
}

module.exports = Page;
