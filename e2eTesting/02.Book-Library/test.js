const { chromium } = require('playwright-chromium');
const { assert, expect } = require('chai');

let browser;
let page;

describe('e2e tests', function () {
    this.timeout(60000);
    before(async () => {
        browser = await chromium.launch({ headless: false, slowMo: 1500 });
    });
    after(async () => { browser.close() });
    beforeEach(async () => { page = await browser.newPage() });
    afterEach(async () => { await page.close() });

    it('load static page', async () => {
        await page.goto('http://localhost:3000');
        await page.screenshot({ path: 'index.png' });

        await page.click('text="LOAD ALL BOOKS"');

        const content = await page.textContent('tbody');
        expect(content).to.contains("C# Fundamentals");
        expect(content).to.contains("Svetlin Nakov");
        expect(content).to.contains("Edit");
        expect(content).to.contains("Delete");

    });
    it('add book', async () => {
        await page.goto('http://localhost:3000');

        const title = 'Hello, Anna';
        const author = 'Jan'
        await page.fill('[name="title"]', title);
        await page.fill('[name="author"]', author);

        await page.click('text=Submit');
        await page.click('text="LOAD ALL BOOKS"');

        const content = await page.textContent('tbody');
        expect(content).to.contains(title);
        expect(content).to.contains(author);
        expect(content).to.contains("Edit");
        expect(content).to.contains("Delete");
        
    });
    it('edit book', async () => {
        await page.goto('http://localhost:3000');

        await page.click('text="LOAD ALL BOOKS"');

        await page.click('tbody tr:first-child .editBtn');
        
        const titleInput = 'form#editForm input[name=title]';
        const authorInput = 'form#editForm input[name=author]';
        // const removedTitle = await page.textContent('tbody tr td:first-child');
        // const removedAuthor = await page.textContent('tbody tr td:nth-child(2)');
        const title = 'Hello, Petkanka!';
        const author = 'Pavlinka';
        await page.fill(titleInput, title);
        await page.fill(authorInput, author);
        await page.click('text=Save');
        await page.click('text="LOAD ALL BOOKS"');

        const content = await page.textContent('tbody');
        expect(content).to.contains(title);
        expect(content).to.contains(author);
        expect(content).to.contains("Edit");
        expect(content).to.contains("Delete");

        // expect(content).to.not.contain(removedTitle);
        // expect(content).to.not.contain(removedAuthor);
        
    });
    it('delete book', async () => {
        await page.goto('http://localhost:3000');

        await page.click('text="LOAD ALL BOOKS"');

        const removedTitle = await page.textContent('tbody tr td:first-child');
        const removedAuthor = await page.textContent('tbody tr td:nth-child(2)');
        page.on('dialog', dialog => dialog.accept());
        await page.click('tbody tr:first-child .deleteBtn');
        await page.click('text="LOAD ALL BOOKS"');

        const content = await page.textContent('tbody');

        expect(content).to.not.contain(removedTitle);
        expect(content).to.not.contain(removedAuthor);
        
    });

});
