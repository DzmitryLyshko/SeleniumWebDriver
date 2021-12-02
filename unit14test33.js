// Hurt Me Plenty 

const {Builder, By, until, Key} = require ('selenium-webdriver');

async function noNameYet() {
    // 1. Открыть https://cloud.google.com/
        // Open the browser
    let driver = await new Builder().forBrowser('firefox').build();
    // let driver = await new Builder().forBrowser('MicrosoftEdge').build();
    await driver.manage().window().maximize();

        // Navigate to the page
    await driver.get('https://cloud.google.com/');    
    // await driver.wait(until.elementIsVisible(By.xpath()));
    // 2. Нажав кнопку поиска по порталу вверху страницы, ввести в поле поиска"Google Cloud Platform Pricing Calculator"
    await driver.findElement(By.css(".devsite-search-field")).click();  //  not nesessary
    await driver.findElement(By.css(".devsite-search-field")).sendKeys("Google Cloud Platform Pricing Calculator", Key.ENTER);  
   
    // 3. Запустить поиск, нажав кнопку поиска.
        // There are no Search button... Pressed ENTER in previous step instead
    
    // 4. В результатах поиска кликнуть "Google Cloud Platform Pricing Calculator" и перейти на страницу калькулятора.
    await driver.wait(until.elementLocated(By.xpath('//div[@class="gs-title"]//*[text()="Google Cloud Platform Pricing Calculator"]'), 10000));
    await driver.findElement(By.xpath('//div[@class="gs-title"]//*[text()="Google Cloud Platform Pricing Calculator"]')).click();

    // await driver.wait(until.elementLocated(By.xpath('(//a[@class="gs-title" and contains(text(), "Pricing")])[1]'), 10000));
    // await driver.findElement(By.xpath('(//a[@class="gs-title" and contains(text(), "Pricing")])[1]')')).click();

    // await driver.wait(until.elementLocated(By.xpath(' (//*[contains(text(), "Pricing")])[9]'), 10000));
    // await driver.findElement(By.xpath('(//*[contains(text(), "Pricing")])[9]')).click();
   
 
      // Switch to iFrame
    // const iframe = driver.findElement(By.xpath('//devsite-iframe/iframe'));
    // await driver.wait(until.ableToSwitchToFrame(iframe), 10000, 'Could not locate the required iFrame.');
    // await driver.switchTo().frame(iframe);
    // await driver.wait(until.ableToSwitchToFrame('myFrame'), 10000, 'Could not locate the required iFrame.');
    // await driver.switchTo().frame('myFrame');
    await driver.wait(until.ableToSwitchToFrame(0), 10000, 'Could not locate the required iFrame.');
    await driver.switchTo().frame(0);


    // 5. Активировать раздел COMPUTE ENGINE вверху страницы
        // Он активириван по умолчанию
    // await driver.wait(until.elementLocated(By.css('md-tab-item.md-tab:nth-child(1) > div:nth-child(1) > div:nth-child(1)'), 10000));
    // await driver.findElement(By.css("md-tab-item.md-tab:nth-child(1) > div:nth-child(1) > div:nth-child(1)")).click();
    

    // 6. Заполнить форму следующими данными:
        //     * Number of instances: 4
    await driver.wait(until.elementLocated(By.xpath('//input[@id="input_74"]'), 10000));
    await driver.findElement(By.xpath('//input[@id="input_74"]')).click();
    await driver.findElement(By.xpath('//input[@id="input_74"]')).sendKeys('4');

        //     * What are these instances for?: оставить пустым
            // By default


        //     * Operating System / Software: Free: Debian, CentOS, CoreOS, Ubuntu, or other User Provided OS
            // By default


        //     * VM Class: Regular
            // By default


        //     * Instance type: n1-standard-8    (vCPUs: 8, RAM: 30 GB)
            // Click the triangle
        await driver.wait(until.elementLocated(By.xpath('(//span[@class="md-select-icon"])[4]'), 10000));
        await driver.findElement(By.xpath('(//span[@class="md-select-icon"])[4]')).click();

            // Choose Series N1
        await driver.wait(until.elementLocated(By.css('#select_option_214 > div:nth-child(1)'), 10000));
        await driver.findElement(By.css('#select_option_214 > div:nth-child(1)')).click();

            // Click the triangle
        await driver.wait(until.elementLocated(By.xpath('(//span[@class="md-select-icon"])[5]'), 10000));
        await driver.findElement(By.xpath('(//span[@class="md-select-icon"])[5]')).click();

            // Choose Series n1-standard-8    (vCPUs: 8, RAM: 30 GB)
        await driver.wait(until.elementLocated(By.css('#select_option_417 > div:nth-child(1)'), 10000));
        await driver.findElement(By.css('#select_option_417 > div:nth-child(1)')).click();
        //md-select-value[@id="select_value_label_70"]//div[@class="md-text ng-binding"]

        //     * Выбрать Add GPUs
        const checkboxAddGPUs = driver.findElement(By.xpath('(//div[@class="md-container md-ink-ripple"])[2]'));
        const btnAddToEstimate = driver.findElement(By.xpath('(//button[@aria-label="Add to Estimate"])[1]'));
        // checkboxAddGPUs.scrollIntoView(true);
        await driver.executeScript("arguments[0].scrollIntoView(false)",btnAddToEstimate);
        // const checkboxAddGPUs = driver.findElement(By.xpath('(//div[@class="md-icon"])[2]'));
        // const actions = driver.actions({async:true});
        // const kb = actions.keyboard();
        // const mouse = actions.mouse();
        // await actions.move({origin: checkboxAddGPUs}).click();
        // await actions.move({origin: checkboxAddGPUs}).press().release().perform();
        // await actions({bridge:true}).move({origin:checkboxAddGPUs}).perform();
        // await actions.move({origin:checkboxAddGPUs}).perform();

        // await driver.actions({bridge: true}).move({x: 0, y: 0, origin: checkboxAddGPUs}).clickAndHold().perform();

        await driver.wait(until.elementLocated(By.xpath('(//div[@class="md-container md-ink-ripple"])[2]')));
        await driver.findElement(By.xpath('(//div[@class="md-container md-ink-ripple"])[2]')).click();
        
        // await driver.wait(until.elementLocated(By.xpath('(//div[@class="md-icon"])[2]'), 10000));
        // await driver.findElement(By.xpath('(//div[@class="md-icon"])[2]')).click();


        //     * GPU type: NVIDIA Tesla V100

        await driver.wait(until.elementLocated(By.xpath('//*[@id="select_450"]')));
        await driver.findElement(By.xpath('//*[@id="select_450"]')).click();

        await driver.wait(until.elementLocated(By.css('#select_option_457 > div:nth-child(1)'), 10000));
        await driver.findElement(By.css('#select_option_457 > div:nth-child(1)')).click();


        // //     * Number of GPUs: 1
        // await driver.wait(until.elementLocated(By.xpath('//md-select-value[@id="select_value_label_505"]//div[@class="md-text ng-binding"]')));
        // await driver.findElement(By.xpath('//md-select-value[@id="select_value_label_505"]//div[@class="md-text ng-binding"]')).sendKeys('1');
        
        await driver.wait(until.elementLocated(By.css('#select_value_label_449 > span:nth-child(2)'), 10000));
        await driver.findElement(By.css('#select_value_label_449 > span:nth-child(2)')).click();

        await driver.wait(until.elementLocated(By.css('#select_option_461'), 10000));
        await driver.findElement(By.css('#select_option_461')).click();
        
 
        //     * Local SSD: 2x375 Gb        
        await driver.wait(until.elementLocated(By.css('#select_value_label_411 > span:nth-child(2)'), 10000));
        await driver.findElement(By.css('#select_value_label_411 > span:nth-child(2)')).click();

        await driver.wait(until.elementLocated(By.css('#select_option_438 > div:nth-child(1)'), 10000));
        await driver.findElement(By.css('#select_option_438 > div:nth-child(1)')).click();

        //     * Datacenter location: Frankfurt (europe-west3)
        // await driver.wait(until.elementLocated(By.css('#select_value_label_72 > span:nth-child(2)'), 10000));
        // await driver.findElement(By.css('#select_value_label_72 > span:nth-child(2)')).click();

        // await driver.wait(until.elementLocated(By.css('#select_option_474 > div:nth-child(1)'), 10000));
        // await driver.findElement(By.css('#select_option_474 > div:nth-child(1)')).click();


        await driver.wait(until.elementLocated(By.css('#select_value_label_72 > span:nth-child(1) > div:nth-child(1)'), 10000));
        await driver.findElement(By.css('#select_value_label_72 > span:nth-child(1) > div:nth-child(1)')).click();
        await driver.wait(until.elementLocated(By.css('#select_option_235 > div:nth-child(1)'), 10000));
        await driver.findElement(By.css('#select_option_235 > div:nth-child(1)')).click();

        //     * Commited usage: 1 Year
        await driver.wait(until.elementLocated(By.css('#select_value_label_73 > span:nth-child(2)'), 10000));
        await driver.findElement(By.css('#select_value_label_73 > span:nth-child(2)')).click();

        await driver.wait(until.elementLocated(By.css('#select_option_112 > div:nth-child(1)'), 10000));
        await driver.findElement(By.css('#select_option_112 > div:nth-child(1)')).click();



    // 7. Нажать Add to Estimate

        await driver.wait(until.elementLocated(By.xpath('(//button[@aria-label="Add to Estimate"])[1]')));
        await driver.findElement(By.xpath('(//button[@aria-label="Add to Estimate"])[1]')).click();

    // 8. Проверить соответствие данных следующих полей: VM Class, Instance type, Region, local SSD, commitment term



    // 9. Проверить что сумма аренды в месяц совпадает с суммой получаемой при ручном прохождении теста.

    

}
noNameYet();