const {Builder, By, until} = require ('selenium-webdriver');

class Page {
    constructor() {
		this.driver = new Builder().forBrowser('firefox').build();
        // await this.driver.manage().window().maximize();

        // this.driver.manage().timeouts().implicitlyWait(10000);
		// page load timeout implicit wait
        this.explicitWaitMS = 10000;
	}

    async open (url) {
        await this.driver.get(url);
    }

    async close () {
        await this.driver.quit();
    }
    
    async find (element) {
        await this.driver.wait(until.elementLocated(element), this.explicitWaitMS);
        await this.driver.findElement(element);
    }

    async write (element, text) {
        await this.driver.wait(until.elementLocated(element), this.explicitWaitMS);
        await this.driver.findElement(element).sendKeys(text);
    }

    async clickOn (element) {
        this.find(element).click();
    }
}

class PastebinPage extends Page {
    constructor() {
        super();
        this.newPasteElement = By.xpath('//*[@id="postform-text"]');
        this.newPasteText = 'Hello from WebDriver';
        this.newPasteText2 = `git config --global user.name  "New Sheriff in Town"
        git reset $(git commit-tree HEAD^{tree} -m "Legacy code")
        git push origin master --force`;
        this.pageTitle = this.driver.getTitle().then(function(title) {
            return title;
        });
        this.pasteExpirationDropdown = By.css("div.form-group.field-postform-expiration span.select2-selection__arrow");
        this.pasteExpirationTenMinutes = By.xpath('//span[@class="select2-results"]/ul[@class="select2-results__options"]/li[text()="10 Minutes"]');
        this.pasteNameElement = By.id('postform-name');
        this.pasteNameText = 'helloweb';
        this.pasteNameText2 = 'how to gain dominance among developers';
        this.syntaxHighlightingToggle = By.css(".toggle__control > label:nth-child(2)");
        this.syntaxHighlightingDropdown = By.xpath('(//span[@class="select2-selection__arrow"])[1]');
        this.syntaxHighlightingBash = By.xpath('(//ul[@class="select2-results__options select2-results__options--nested"]/*[.="Bash"])[1]');
        this.btnCreateNewPaste = By.xpath('//button[@class="btn -big"]');
        this.syntaxHighlighting = this.driver.findElement(By.xpath('(//a[@class="btn -small h_800"])[1]')).getText().then(function(text) {
            return text;
        // this.syntaxHighlighting = this.find(By.xpath('(//a[@class="btn -small h_800"])[1]')).getText().then(function(text) {
            // return text;
        });
        this.pasteData = this.driver.findElement(By.css('.textarea')).getText().then(function(text) {
            return text;
        });
    }
    async closeAds () {
        await this.driver.wait(until.elementLocated(By.xpath('//button[@class="sc-ifAKCX ljEJIv"]'), this.explicitWaitMS));
        await this.driver.findElement(By.xpath('//button[@class="sc-ifAKCX ljEJIv"]')).click();
    } 
}
module.exports = PastebinPage;