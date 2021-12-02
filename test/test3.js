const { Builder, By, until, Key } = require('selenium-webdriver');
const { expect } = require('chai');
const PricingCalculatorPage = require('../lib/pricing_calculator_page');
const pricingCalculatorPage = new PricingCalculatorPage();

describe('pricing calculator page scenarios', function () {
  let searchQuery = 'Google Cloud Platform Pricing Calculator';

  before(async function () {
    await pricingCalculatorPage.launchBrowser('firefox');
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
  });

  it('Проверить соответствие данных следующих полей: VM Class', async function () {
    expect(await pricingCalculatorPage.actualVMClass()).to.be.equal(
      'VM class: regular'
    );
  });

  it('Проверить соответствие данных следующих полей: Instance type', async function () {
    expect(await pricingCalculatorPage.actualInstanceType()).to.include(
      'n1-standard-8'
    );
  });

  it('Проверить соответствие данных следующих полей: Region', async function () {
    expect(await pricingCalculatorPage.actualRegion()).to.be.equal(
      'Region: Frankfurt'
    );
  });

  it('Проверить соответствие данных следующих полей: local SSD', async function () {
    expect(await pricingCalculatorPage.actualLocalSSD()).to.include(
      'Local SSD: 2x375 GiB'
    );
  });

  it('Проверить соответствие данных следующих полей: commitment term', async function () {
    expect(await pricingCalculatorPage.actualCommitmentTerm()).to.be.equal(
      'Commitment term: 1 Year'
    );
  });

  it('Проверить что сумма аренды в месяц совпадает с суммой получаемой при ручном прохождении теста', async function () {
    expect(await pricingCalculatorPage.actualEstimatedCost()).to.be.equal(
      'Total Estimated Cost: USD 1,082.77 per 1 month'
    );
  });

  after(async function () {
    await pricingCalculatorPage.close();
  });
});
