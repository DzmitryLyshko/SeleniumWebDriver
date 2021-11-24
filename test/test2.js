const {Builder, By, until} = require ('selenium-webdriver');
const {expect} = require('chai');
const PastebinPage = require('../lib/base_page');
const pastebinPage = new PastebinPage();

describe('pastebin page scenarios', function() {
        
    before(async function() {
        await pastebinPage.driver.manage().setTimeouts( { implicit: 10000 } );
        await pastebinPage.driver.manage().window().maximize();
        await pastebinPage.open('https://pastebin.com');

        // Создать New Paste со следующими деталями:
        // * Код:
        await pastebinPage.write(pastebinPage.newPasteElement, pastebinPage.newPasteText2);

        //  Close the banner that doesn't allow to push the button
        await pastebinPage.closeAds();
    
        // * Syntax Highlighting: "Bash"
            //  Make toggle on
        await pastebinPage.clickOn(pastebinPage.syntaxHighlightingToggle);
            //  Choose "Bash"
        await pastebinPage.clickOn(pastebinPage.syntaxHighlightingDropdown);
        await pastebinPage.clickOn(pastebinPage.syntaxHighlightingBash);
        
        // * Paste Expiration: "10 Minutes"
        await pastebinPage.clickOn(pastebinPage.pasteExpirationDropdown);
        await pastebinPage.clickOn(pastebinPage.pasteExpirationTenMinutes);
        
        // * Paste Name / Title: "how to gain dominance among developers"
        await pastebinPage.write(pastebinPage.pasteNameElement, pastebinPage.pasteNameText2);
    
        // 3. Сохранить paste:
        await pastebinPage.clickOn(pastebinPage.btnCreateNewPaste);
    });

    after(async function() {
        await pastebinPage.close();
    });

    it('Page title should be equal to Paste name', async function() {
        expect(pastebinPage.pageTitle.to.be.equal(pastebinPage.pasteNameText2 + ' - Pastebin.com'));
    });

    it('Syntax should be highlighted for Bash', async function() {
        expect(pastebinPage.syntaxHighlighting.to.be.equal('Bash'));
    });

    it('Code should be equal to that we have entered to the New Paste', async function() {
        expect(pastebinPage.pasteData.to.be.equal(pastebinPage.newPasteText2));
    });

})