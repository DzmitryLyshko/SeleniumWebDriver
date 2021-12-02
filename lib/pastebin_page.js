const { Builder, By, until } = require('selenium-webdriver');
const Page = require('../lib/base_page');

class PastebinPage extends Page {
  constructor() {
    super();
    this.newPasteElement = By.xpath('//*[@id="postform-text"]');
    this.pasteExpirationDropdown = By.css(
      'div.form-group.field-postform-expiration span.select2-selection__arrow'
    );
    this.pasteExpirationTenMinutes = By.xpath(
      '//span[@class="select2-results"]/ul[@class="select2-results__options"]/li[text()="10 Minutes"]'
    );
    this.pasteNameElement = By.id('postform-name');
    this.syntaxHighlightingToggle = By.css(
      '.toggle__control > label:nth-child(2)'
    );
    this.syntaxHighlightingDropdown = By.xpath(
      '(//span[@class="select2-selection__arrow"])[1]'
    );
    this.syntaxHighlightingBash = By.xpath(
      '(//ul[@class="select2-results__options select2-results__options--nested"]/*[.="Bash"])[1]'
    );
    this.btnCreateNewPaste = By.xpath('//button[@class="btn -big"]');
  }
  async confirmPrivacyPolicy() {
    await this.driver.wait(
      until.elementLocated(
        By.xpath("//button[@class='sc-ifAKCX ljEJIv']"),
        this.explicitWaitMS
      )
    );
    await this.driver
      .findElement(By.xpath("//button[@class='sc-ifAKCX ljEJIv']"))
      .click();
  }
  async closeAds() {
    let ads = await this.driver.findElement(By.css('.active-path'));
    await this.driver.wait(until.elementIsVisible(ads), this.explicitWaitMS);
    ads.click(); // await???
  }
  async syntaxHighlighting() {
    await this.driver.wait(
      until.elementLocated(By.xpath('(//a[@class="btn -small h_800"])[1]'))
    );
    return await this.driver
      .findElement(By.xpath('(//a[@class="btn -small h_800"])[1]'))
      .getText();
  }
  async getPageTitle() {
    return await this.driver.getTitle();
  }
  async pasteData() {
    await this.driver.wait(until.elementLocated(By.css('.textarea')));
    return await this.driver.findElement(By.css('.textarea')).getText();
  }
}
module.exports = PastebinPage;
