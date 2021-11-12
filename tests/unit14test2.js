// Bring It On 

const {Builder, By, until} = require ('selenium-webdriver');
// const {describe, it, after, before} = require ('selenium-webdriver/testing');
const assert = require ('assert');

async function noNameYet() {
    // Открыть https://pastebin.com  или аналогичный сервис в любом браузере
        // Open the browser
    let driver =  await new Builder().forBrowser('firefox').build();
    await driver.manage().window().maximize();
        // Navigate to the page
    await driver.get('https://pastebin.com');
    
    // Confirm privacy policy (just to see the content of the window) - doesn't pop up in Belarus
        // Wait until element is loaded
    // await driver.wait(until.elementLocated(By.xpath("//button[@class='sc-ifAKCX ljEJIv']"), 10000));

        // Click confirm button
    // await driver.findElement(By.xpath("//button[@class='sc-ifAKCX ljEJIv']")).click();

    // Создать New Paste со следующими деталями:
    // * Код:
    await driver.findElement(By.id('postform-text')).sendKeys(`git config --global user.name  "New Sheriff in Town"
git reset $(git commit-tree HEAD^{tree} -m "Legacy code")
git push origin master --force`);

    //  Close the banner that don't allow to push the button
    await driver.sleep(5000);
    // await driver.wait(until.elementIsVisible(By.css(".active-path"), 10000)); // if it works with click
    await driver.wait(until.elementLocated(By.css(".active-path"), 10000));
    await driver.findElement(By.css('.active-path')).click();

    // * Syntax Highlighting: "Bash"
        //  Make toggle on
    await driver.findElement(By.css(".toggle__control > label:nth-child(2)")).click();

        //  Choose "Bash"
            //  Click the triangle
    await driver.findElement(By.xpath('(//span[@class="select2-selection__arrow"])[1]')).click();
   
            // Choose Bash
    await driver.findElement(By.xpath('(//ul[@class="select2-results__options select2-results__options--nested"]/*[.="Bash"])[1]')).click();
    
    // * Paste Expiration: "10 Minutes"
        // Click to open the dropdown list
    await driver.findElement(By.css("div.form-group.field-postform-expiration span.select2-selection__arrow")).click();

        // Click to choose '10 minutes'
    await driver.findElement(By.xpath('//span[@class="select2-results"]/ul[@class="select2-results__options"]/li[text()="10 Minutes"]')).click();
    
    // * Paste Name / Title: "how to gain dominance among developers"
    await driver.findElement(By.id('postform-name')).sendKeys('how to gain dominance among developers');

    // 3. Сохранить paste:
        //  Push Save button
    await driver.wait(until.elementLocated(By.xpath('//button[@class="btn -big"]'), 10000));
    await driver.findElement(By.xpath('//button[@class="btn -big"]')).click();

    // Confirm privacy policy (just to see the content of the window) - doesn't pop up in Belarus
        // Wait until element is loaded
    // await driver.wait(until.elementLocated(By.xpath('//button[@class="sc-ifAKCX ljEJIv"]'), 10000));
        // Click confirm button
    // await driver.findElement(By.xpath("//button[@class='sc-ifAKCX ljEJIv']")).click();

    //  Проверить следующее:
    // * Заголовок страницы браузера соответствует Paste Name / Title
    // 'Page title should be equal to Paste name'
    // await driver.wait(until.titleIs('how to gain dominance among developers  - Pastebin.com'), 3000);
    let pageTitle = await driver.getTitle().then(function(title) {
        return title;
    }); 
    // await driver.sleep(1000);
    await assert.strictEqual(pageTitle, 'how to gain dominance among developers  - Pastebin.com'); 

    // * Синтаксис подсвечен для bash
    await driver.wait(until.elementLocated(By.xpath('(//a[@class="btn -small h_800"])[1]')));
    let syntaxHighlighting = await driver.findElement(By.xpath('(//a[@class="btn -small h_800"])[1]')).getText().then(function(text) {
        return text;
    });
    await assert.strictEqual(syntaxHighlighting, 'Bash');

    // * Проверить что код соответствует введенному в пункте 2
    await driver.wait(until.elementLocated(By.css('.textarea')));
    let pasteData = await driver.findElement(By.css('.textarea')).getText().then(function(text) {
        return text;
    });
    await assert.strictEqual(pasteData, `git config --global user.name  "New Sheriff in Town"
    git reset $(git commit-tree HEAD^{tree} -m "Legacy code")
    git push origin master --force`);
   

    // Close the browser
    // await driver.sleep(10000);
    // await driver.quit();
}
noNameYet();
