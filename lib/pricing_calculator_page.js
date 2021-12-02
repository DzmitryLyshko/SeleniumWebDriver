const { Builder, By, until } = require('selenium-webdriver');
const Page = require('../lib/base_page');

class PricingCalculatorPage extends Page {
  constructor() {
    super();
    this.searchField = By.css('.devsite-search-field');
    this.searchResultPricingCalculator = By.xpath(
      '//div[@class="gs-title"]//*[text()="Google Cloud Platform Pricing Calculator"]'
    );
    this.numberOfInstances = By.xpath('//input[@id="input_75"]');
    this.instanceSeriesDropdown = By.xpath(
      '(//span[@class="md-select-icon"])[4]'
    );
    this.instanceSeries = By.css('#select_option_215 > div:nth-child(1)');

    this.instanceMachineTypeDropdown = By.xpath(
      '(//span[@class="md-select-icon"])[5]'
    );

    this.instanceMachineType = By.css('#select_option_418 > div:nth-child(1)');
    //md-select-value[@id="select_value_label_70"]//div[@class="md-text ng-binding"]

    this.checkboxAddGPUs = By.xpath(
      '(//div[@class="md-container md-ink-ripple"])[2]'
    );
    this.btnAddToEstimate = By.xpath(
      '(//button[@aria-label="Add to Estimate"])[1]'
    );
    this.gpuTypeDropdown = By.xpath('//*[@id="select_451"]');
    this.gpuType = By.css('#select_option_458 > div:nth-child(1)');
    this.numberOfGPUsDropdown = By.css(
      '#select_value_label_450 > span:nth-child(2)'
    );
    this.numberOfGPUs = By.css('#select_option_462');
    this.localSSDDropdown = By.css(
      '#select_value_label_412 > span:nth-child(2)'
    );
    this.localSSD = By.css('#select_option_439 > div:nth-child(1)');
    this.datacenterLocationDropdown = By.css(
      '#select_value_label_73 > span:nth-child(1) > div:nth-child(1)'
    );
    this.datacenterLocation = By.css('#select_option_236 > div:nth-child(1)');
    this.commitedUsageDropdown = By.css(
      '#select_value_label_74 > span:nth-child(2)'
    );
    this.commitedUsage = By.css('#select_option_113 > div:nth-child(1)');

    this.emailAdressInput = By.css('#input_547');
  }
  async switchToIFrame(iframe) {
    await this.driver.wait(
      until.ableToSwitchToFrame(iframe),
      this.explicitWaitMS,
      'Could not locate the required iFrame.'
    );
    await this.driver.switchTo().frame(iframe);
  }
  async confirmCookies() {
    let cookiesWindow = await this.driver.findElement(
      By.xpath('//button[@class="devsite-snackbar-action"]')
    );
    await this.driver.wait(
      until.elementIsVisible(cookiesWindow),
      this.explicitWaitMS
    );
    await cookiesWindow.click();
  }
  async scrollTo(element) {
    await this.driver.executeScript(
      'arguments[0].scrollIntoView(false)',
      this.driver.findElement(element)
    );
  }
  async actualVMClass() {
    await this.driver.wait(
      until.elementLocated(
        By.css('md-list-item.md-1-line:nth-child(8) > div:nth-child(1)')
      )
    );
    return await this.driver
      .findElement(
        By.css('md-list-item.md-1-line:nth-child(8) > div:nth-child(1)')
      )
      .getText();
  }
  async actualInstanceType() {
    await this.driver.wait(
      until.elementLocated(
        By.css('md-list-item.md-1-line:nth-child(10) > div:nth-child(1)')
      )
    );
    return await this.driver
      .findElement(
        By.css('md-list-item.md-1-line:nth-child(10) > div:nth-child(1)')
      )
      .getText();
  }
  async actualRegion() {
    await this.driver.wait(
      until.elementLocated(
        By.css('md-list-item.md-1-line:nth-child(2) > div:nth-child(1)')
      )
    );
    return await this.driver
      .findElement(
        By.css('md-list-item.md-1-line:nth-child(2) > div:nth-child(1)')
      )
      .getText();
  }
  async actualLocalSSD() {
    await this.driver.wait(
      until.elementLocated(
        By.css('md-list-item.md-1-line:nth-child(14) > div:nth-child(1)')
      )
    );
    return await this.driver
      .findElement(
        By.css('md-list-item.md-1-line:nth-child(14) > div:nth-child(1)')
      )
      .getText();
  }
  async actualCommitmentTerm() {
    await this.driver.wait(
      until.elementLocated(
        By.css('md-list-item.md-1-line:nth-child(6) > div:nth-child(1)')
      )
    );
    return await this.driver
      .findElement(
        By.css('md-list-item.md-1-line:nth-child(6) > div:nth-child(1)')
      )
      .getText();
  }
  async actualEstimatedCost() {
    await this.driver.wait(
      until.elementLocated(By.css('h2.md-title:nth-child(2) > b:nth-child(1)'))
    );
    return await this.driver
      .findElement(By.css('h2.md-title:nth-child(2) > b:nth-child(1)'))
      .getText();
  }
  async switchToDefaultContent() {
    await this.driver.switchTo().defaultContent();
  }
  async switchToNewTab() {
    await this.driver.switchTo().newWindow('tab');
  }
}
module.exports = PricingCalculatorPage;
