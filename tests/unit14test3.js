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
    // await driver.wait(until.elementLocated(By.css("div.gsc-result:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1) > b:nth-child(1)"), 10000));
    // await driver.findElement(By.css("div.gsc-result:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1) > b:nth-child(1)")).click();
    await driver.wait(until.elementLocated(By.xpath('(//*[text()="Google Cloud Platform Pricing Calculator"])[2]'), 10000));
    await driver.findElement(By.xpath('(//*[text()="Google Cloud Platform Pricing Calculator"])[2]')).click();
 
    // await driver.sleep(10000);    

    // Switch to iFrame
    const iframe = driver.findElement(By.xpath('/html/body/section/section/main/devsite-content/article/div[2]/article/devsite-iframe/iframe'));
    await driver.switchTo().frame(iframe);
    //  await driver.sleep(5000); 
    await driver.switchTo().frame('myFrame');


    // 5. Активировать раздел COMPUTE ENGINE вверху страницы
        // Он активириван по умолчанию
    // await driver.wait(until.elementLocated(By.css('md-tab-item.md-tab:nth-child(1) > div:nth-child(1) > div:nth-child(1)'), 10000));
    // await driver.findElement(By.css("md-tab-item.md-tab:nth-child(1) > div:nth-child(1) > div:nth-child(1)")).click();
    

    // 6. Заполнить форму следующими данными:
        //     * Number of instances: 4
    await driver.wait(until.elementLocated(By.xpath('//input[@id="input_74"]'), 10000));
    // await driver.findElement(By.xpath('//input[@id="input_74"]')).click();
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


        //     * Выбрать Add GPUs
        await driver.wait(until.elementLocated(By.xpath('(//div[@class="md-container md-ink-ripple"])[2]')));
        await driver.findElement(By.xpath('(//div[@class="md-container md-ink-ripple"])[2]')).click();


        //     * Number of GPUs: 1
        await driver.wait(until.elementLocated(By.xpath('//md-select-value[@id="select_value_label_505"]//div[@class="md-text ng-binding"]')));
        await driver.findElement(By.xpath('//md-select-value[@id="select_value_label_505"]//div[@class="md-text ng-binding"]')).sendKeys('1');

        //     * GPU type: NVIDIA Tesla V100



        //     * Local SSD: 2x375 Gb



        //     * Datacenter location: Frankfurt (europe-west3)



        //     * Commited usage: 1 Year




    // 7. Нажать Add to Estimate



    // 8. Проверить соответствие данных следующих полей: VM Class, Instance type, Region, local SSD, commitment term



    // 9. Проверить что сумма аренды в месяц совпадает с суммой получаемой при ручном прохождении теста.

    

}
noNameYet();