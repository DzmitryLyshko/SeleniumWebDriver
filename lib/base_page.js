const {Builder, By, until} = require ('selenium-webdriver');

// class HomePage {

// }


const Page = function() {
    this.driver = new Builder().forBrowser('firefox').build();
    const driver = this.driver;

    this.visit = function(url) {
        return driver.get(url);
    }

    this.quit = function() {
        return driver.quit();
    }

    this.findBy = function(el) {
        driver.wait(until.elementLocated(By.el), 10000);
        return driver.findElement(By.el);
    }

    this.write = function(el, txt) {
        return this.findBy(el).sendKeys(txt);
    }
}

module.exports = Page;