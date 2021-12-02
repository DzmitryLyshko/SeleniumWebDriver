const {Builder, By, until, Key} = require ('selenium-webdriver');
const {expect} = require('chai');
const PricingCalculatorPage = require('../lib/pricing_calculator_page');
const pricingCalculatorPage = new PricingCalculatorPage();
/*
describe('pricing calculator page scenarios', function() {
    
    let searchQuery = "Google Cloud Platform Pricing Calculator";

    before(async function() {
        await pricingCalculatorPage.launchBrowser('firefox');
        await pricingCalculatorPage.open('https://cloud.google.com/');

        // 2. Нажав кнопку поиска по порталу вверху страницы, ввести в поле поиска"Google Cloud Platform Pricing Calculator"     
        // await pricingCalculatorPage.clickElement(pricingCalculatorPage.searchField); //  not nesessary
        await pricingCalculatorPage.write(pricingCalculatorPage.searchField, searchQuery);
        await pricingCalculatorPage.write(pricingCalculatorPage.searchField, Key.ENTER);

        // 4. В результатах поиска кликнуть "Google Cloud Platform Pricing Calculator" и перейти на страницу калькулятора.
        await pricingCalculatorPage.clickElement(pricingCalculatorPage.searchResultPricingCalculator);
    
            // Switch to iFrame
        await pricingCalculatorPage.switchToIFrame(0);
 
        // 5. Активировать раздел COMPUTE ENGINE вверху страницы
            // Он активириван по умолчанию
        // await driver.wait(until.elementLocated(By.css('md-tab-item.md-tab:nth-child(1) > div:nth-child(1) > div:nth-child(1)'), 10000));
        // await driver.findElement(By.css("md-tab-item.md-tab:nth-child(1) > div:nth-child(1) > div:nth-child(1)")).click();


        // 6. Заполнить форму следующими данными:
            //     * Number of instances: 4
        await pricingCalculatorPage.clickElement(pricingCalculatorPage.numberOfInstances);
        await pricingCalculatorPage.write(pricingCalculatorPage.numberOfInstances, '4');

        //     * What are these instances for?: оставить пустым
            // By default


        //     * Operating System / Software: Free: Debian, CentOS, CoreOS, Ubuntu, or other User Provided OS
            // By default


        //     * VM Class: Regular
            // By default



        // await pricingCalculatorPage.clickElement(pricingCalculatorPage.btnConfirn);



        //     * Instance type: n1-standard-8    (vCPUs: 8, RAM: 30 GB)
            // Click the triangle
        await pricingCalculatorPage.clickElement(pricingCalculatorPage.instanceSeriesDropdown);
            // Choose Series N1
        await pricingCalculatorPage.clickElement(pricingCalculatorPage.instanceSeries);
            // Click the triangle
        await pricingCalculatorPage.clickElement(pricingCalculatorPage.instanceMachineTypeDropdown);
            // Choose Series n1-standard-8    (vCPUs: 8, RAM: 30 GB)
        await pricingCalculatorPage.clickElement(pricingCalculatorPage.instanceMachineType);

        //     * Выбрать Add GPUs
        await pricingCalculatorPage.scrollTo(pricingCalculatorPage.btnAddToEstimate);
        await pricingCalculatorPage.clickElement(pricingCalculatorPage.checkboxAddGPUs);
          
        //     * GPU type: NVIDIA Tesla V100
        await pricingCalculatorPage.clickElement(pricingCalculatorPage.gpuTypeDropdown);
        await pricingCalculatorPage.clickElement(pricingCalculatorPage.gpuType);

        //     * Number of GPUs: 1
        await pricingCalculatorPage.clickElement(pricingCalculatorPage.numberOfGPUsDropdown);
        await pricingCalculatorPage.clickElement(pricingCalculatorPage.numberOfGPUs);

        //     * Local SSD: 2x375 Gb       
        await pricingCalculatorPage.clickElement(pricingCalculatorPage.localSSDDropdown);
        await pricingCalculatorPage.clickElement(pricingCalculatorPage.localSSD);

        //     * Datacenter location: Frankfurt (europe-west3)
        await pricingCalculatorPage.clickElement(pricingCalculatorPage.datacenterLocationDropdown);
        await pricingCalculatorPage.clickElement(pricingCalculatorPage.datacenterLocation);

        //     * Commited usage: 1 Year
        await pricingCalculatorPage.clickElement(pricingCalculatorPage.commitedUsageDropdown);
        await pricingCalculatorPage.clickElement(pricingCalculatorPage.commitedUsage);

        // 7. Нажать Add to Estimate
        await pricingCalculatorPage.clickElement(pricingCalculatorPage.btnAddToEstimate);
        
    });

    it('Проверить соответствие данных следующих полей: VM Class', async function() {

    });

    it('Проверить соответствие данных следующих полей: Instance type', async function() {

    });

    it('Проверить соответствие данных следующих полей: Region', async function() {

    });

    it('Проверить соответствие данных следующих полей: local SSD', async function() {

    });

    it('Проверить соответствие данных следующих полей: commitment term', async function() {

    });

    it('Проверить что сумма аренды в месяц совпадает с суммой получаемой при ручном прохождении теста', async function() {

    });

    // after(async function() {
    //     await pricingCalculatorPage.close();
    // });
    
}) 
 
  

*/
