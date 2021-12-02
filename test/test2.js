const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');
const PastebinPage = require('../lib/pastebin_page');
const { Driver } = require('selenium-webdriver/chrome');
const pastebinPage = new PastebinPage();

describe('pastebin page scenarios', function () {
  newPasteText = 'Hello from WebDriver';
  newPasteText2 = `git config --global user.name  "New Sheriff in Town"
    git reset $(git commit-tree HEAD^{tree} -m "Legacy code")
    git push origin master --force`;
  pasteNameText = 'helloweb';
  pasteNameText2 = 'how to gain dominance among developers';

  before(async function () {
    await pastebinPage.launchBrowser('firefox');
    await pastebinPage.open('https://pastebin.com');

    // Confirm privacy policy (just to see the content of the window) - doesn't pop up in Belarus
    await pastebinPage.confirmPrivacyPolicy();

    // Создать New Paste со следующими деталями:
    // * Код:
    await pastebinPage.write(pastebinPage.newPasteElement, newPasteText2);

    //  Close the banner that doesn't allow to push the button
    await pastebinPage.closeAds();

    // * Syntax Highlighting: "Bash"
    //  Make toggle on
    await pastebinPage.clickElement(pastebinPage.syntaxHighlightingToggle);
    //  Choose "Bash"
    await pastebinPage.clickElement(pastebinPage.syntaxHighlightingDropdown);
    await pastebinPage.clickElement(pastebinPage.syntaxHighlightingBash);

    // * Paste Expiration: "10 Minutes"
    await pastebinPage.clickElement(pastebinPage.pasteExpirationDropdown);
    await pastebinPage.clickElement(pastebinPage.pasteExpirationTenMinutes);

    // * Paste Name / Title: "how to gain dominance among developers"
    await pastebinPage.write(pastebinPage.pasteNameElement, pasteNameText2);

    // 3. Сохранить paste:
    await pastebinPage.clickElement(pastebinPage.btnCreateNewPaste);

    // Confirm privacy policy (just to see the content of the window) - doesn't pop up in Belarus
    await pastebinPage.confirmPrivacyPolicy();
  });

  it('Page title should be equal to Paste name', async function () {
    expect(await pastebinPage.getPageTitle()).to.be.equal(
      pasteNameText2 + ' - Pastebin.com'
    );
  });

  it('Syntax should be highlighted for Bash', async function () {
    expect(await pastebinPage.syntaxHighlighting()).to.be.equal('Bash');
  });

  it('Code should be equal to that we have entered to the New Paste', async function () {
    expect(await pastebinPage.pasteData()).to.be.equal(newPasteText2);
  });

  after(async function () {
    await pastebinPage.close();
  });
});
