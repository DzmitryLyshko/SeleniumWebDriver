const {Builder, By, until, Key} = require ('selenium-webdriver');
const {expect} = require('chai');
const PricingCalculatorPage = require('../lib/pricing_calculator_page');
const pricingCalculatorPage = new PricingCalculatorPage();
const YopmailPage = require('../lib/yopmail_page');
const yopmailPage = new YopmailPage();
const Page = require('../lib/base_page');
const page = new Page();

describe('pricing calculator page scenarios', function() {
    
    let searchQuery = "Google Cloud Platform Pricing Calculator";

    before(async function() {
        await page.launchBrowser('firefox');
        await pricingCalculatorPage.open('https://cloud.google.com/');
        /*
        // 2. Нажав кнопку поиска по порталу вверху страницы, ввести в поле поиска"Google Cloud Platform Pricing Calculator"     
        // await pricingCalculatorPage.clickElement(pricingCalculatorPage.searchField); //  not necessary
        await pricingCalculatorPage.write(pricingCalculatorPage.searchField, searchQuery);
        await pricingCalculatorPage.write(pricingCalculatorPage.searchField, Key.ENTER);

        // 4. В результатах поиска кликнуть "Google Cloud Platform Pricing Calculator" и перейти на страницу калькулятора.
        await pricingCalculatorPage.clickElement(pricingCalculatorPage.searchResultPricingCalculator);
    
        await pricingCalculatorPage.confirmCookies();

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
        */
        // 9. В новой вкладке открыть https://yopmail.com/ или аналогичный сервис для генерации временных email'ов
        await pricingCalculatorPage.switchToDefaultContent();
        await pricingCalculatorPage.switchToNewTab(); 
        // await yopmailPage.launchBrowser('firefox');
        await yopmailPage.open('https://yopmail.com/');
     
        // run yopmail driver ???????
        await yopmailPage.driver.sleep(5000);
        // await pricingCalculatorPage.driver.wait(until.titleIs('YOPmail - Disposable Email Address'), 10000);
        

        await yopmailPage.clickElement(yopmailPage.acceptCookiesBtn); // close cookies
        await yopmailPage.clickElement(yopmailPage.generateRandomEmailBtn); // generate a random email adress
        // 10. Скопировать почтовый адрес сгенерированный в yopmail.com
        let emailAdress = await yopmailPage.getGeneratedEmail(); // get and store the adress
        // 11. Вернуться в калькулятор, в поле Email ввести адрес из предыдущего пункта

        // switch to calculator ??????????????
        
        await pricingCalculatorPage.clickElement(By.css('#email_quote'));   // click email estimate button
        await pricingCalculatorPage.scrollTo(pricingCalculatorPage.btnSendEmail);   // scroll down
        await pricingCalculatorPage.write(pricingCalculatorPage.emailAdressInput, yopmailPage.emailAdress)    // sendKeys(emailAdress) to #input_547

        // 12. Нажать SEND EMAIL
        await pricingCalculatorPage.clickElement(pricingCalculatorPage.btnSendEmail);   //  click send email button
        // 13. Дождаться письма с рассчетом стоимости и проверить что Total Estimated Monthly Cost в письме совпадает с тем, что отображается в калькуляторе

        // switch to yopmail tab ?????????????
        
        await yopmailPage.clickElement(yopmailPage.btnCheckEmail);   // click check the email //div[@class="tooltip"]//button[@class="md but text f24 egenbut"]
        // switch to iframe //iframe[@id="ifmail"]
        // cost in email //h2
    });

    it('проверить что Total Estimated Monthly Cost в письме совпадает с тем, что отображается в калькуляторе', async function() {
        expect(await pricingCalculatorPage.actualEstimatedCost()).to.be.equal(await yopmailPage.recievedBill());
    });

    after(async function() {
        // await pricingCalculatorPage.close();
    });
    
}) 
 
  



