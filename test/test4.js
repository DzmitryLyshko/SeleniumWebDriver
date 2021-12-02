const { Builder, By, until, Key } = require('selenium-webdriver');
const { expect } = require('chai');
const PricingCalculatorPage = require('../lib/pricing_calculator_page');
const pricingCalculatorPage = new PricingCalculatorPage();
const YopmailPage = require('../lib/yopmail_page');
const yopmailPage = new YopmailPage();
const Page = require('../lib/base_page');
const page = new Page();

describe('pricing calculator page scenarios', function () {
  let searchQuery = 'Google Cloud Platform Pricing Calculator';

  before(async function () {
    await page.launchBrowser('firefox');
    await pricingCalculatorPage.open('https://cloud.google.com/');

    // Нажав кнопку поиска по порталу вверху страницы, ввести в поле поиска"Google Cloud Platform Pricing Calculator"
    await pricingCalculatorPage.write(
      pricingCalculatorPage.searchField,
      searchQuery
    );
    await pricingCalculatorPage.write(
      pricingCalculatorPage.searchField,
      Key.ENTER
    );

    // В результатах поиска кликнуть "Google Cloud Platform Pricing Calculator" и перейти на страницу калькулятора.
    await pricingCalculatorPage.clickElement(
      pricingCalculatorPage.searchResultPricingCalculator
    );
    await pricingCalculatorPage.confirmCookies();

    // Switch to iFrame
    await pricingCalculatorPage.switchToIFrame(0);

    // Заполнить форму следующими данными:
    //     * Number of instances: 4
    await pricingCalculatorPage.clickElement(
      pricingCalculatorPage.numberOfInstances
    );
    await pricingCalculatorPage.write(
      pricingCalculatorPage.numberOfInstances,
      '4'
    );

    //     * Instance type: n1-standard-8    (vCPUs: 8, RAM: 30 GB)
    // Click the triangle
    await pricingCalculatorPage.clickElement(
      pricingCalculatorPage.instanceSeriesDropdown
    );
    // Choose Series N1
    await pricingCalculatorPage.clickElement(
      pricingCalculatorPage.instanceSeries
    );
    // Click the triangle
    await pricingCalculatorPage.clickElement(
      pricingCalculatorPage.instanceMachineTypeDropdown
    );
    // Choose Series n1-standard-8    (vCPUs: 8, RAM: 30 GB)
    await pricingCalculatorPage.clickElement(
      pricingCalculatorPage.instanceMachineType
    );

    //     * Выбрать Add GPUs
    await pricingCalculatorPage.scrollTo(
      pricingCalculatorPage.btnAddToEstimate
    );
    await pricingCalculatorPage.clickElement(
      pricingCalculatorPage.checkboxAddGPUs
    );

    //     * GPU type: NVIDIA Tesla V100
    await pricingCalculatorPage.clickElement(
      pricingCalculatorPage.gpuTypeDropdown
    );
    await pricingCalculatorPage.clickElement(pricingCalculatorPage.gpuType);

    //     * Number of GPUs: 1
    await pricingCalculatorPage.clickElement(
      pricingCalculatorPage.numberOfGPUsDropdown
    );
    await pricingCalculatorPage.clickElement(
      pricingCalculatorPage.numberOfGPUs
    );

    //     * Local SSD: 2x375 Gb
    await pricingCalculatorPage.clickElement(
      pricingCalculatorPage.localSSDDropdown
    );
    await pricingCalculatorPage.clickElement(pricingCalculatorPage.localSSD);

    //     * Datacenter location: Frankfurt (europe-west3)
    await pricingCalculatorPage.clickElement(
      pricingCalculatorPage.datacenterLocationDropdown
    );
    await pricingCalculatorPage.clickElement(
      pricingCalculatorPage.datacenterLocation
    );

    //     * Commited usage: 1 Year
    await pricingCalculatorPage.clickElement(
      pricingCalculatorPage.commitedUsageDropdown
    );
    await pricingCalculatorPage.clickElement(
      pricingCalculatorPage.commitedUsage
    );

    // Нажать Add to Estimate
    await pricingCalculatorPage.clickElement(
      pricingCalculatorPage.btnAddToEstimate
    );

    // В новой вкладке открыть https://yopmail.com/ или аналогичный сервис для генерации временных email'ов
    await pricingCalculatorPage.switchToDefaultContent();
    await pricingCalculatorPage.switchToNewTab();

    await yopmailPage.open('https://yopmail.com/');

    await yopmailPage.clickElement(yopmailPage.acceptCookiesBtn);
    await yopmailPage.clickElement(yopmailPage.generateRandomEmailBtn);

    // Скопировать почтовый адрес сгенерированный в yopmail.com
    let emailAdress = await yopmailPage.getGeneratedEmail();

    // Вернуться в калькулятор, в поле Email ввести адрес из предыдущего пункта
    await pricingCalculatorPage.clickElement(By.css('#email_quote'));
    await pricingCalculatorPage.scrollTo(pricingCalculatorPage.btnSendEmail);
    await pricingCalculatorPage.write(
      pricingCalculatorPage.emailAdressInput,
      emailAdress
    );

    // Нажать SEND EMAIL
    await pricingCalculatorPage.clickElement(
      pricingCalculatorPage.btnSendEmail
    );

    // Дождаться письма с рассчетом стоимости и проверить что Total Estimated Monthly Cost в письме совпадает с тем, что отображается в калькуляторе
    await yopmailPage.clickElement(yopmailPage.btnCheckEmail);
    await yopmailPage.switchToIFrame('ifmail');
  });

  it('проверить что Total Estimated Monthly Cost в письме совпадает с тем, что отображается в калькуляторе', async function () {
    expect(await pricingCalculatorPage.actualEstimatedCost()).to.be.equal(
      await yopmailPage.recievedBill()
    );
  });

  after(async function () {
    await pricingCalculatorPage.close();
  });
});
