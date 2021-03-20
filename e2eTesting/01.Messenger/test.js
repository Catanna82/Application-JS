const { chromium } = require('playwright-chromium');
const { assert } = require('chai');

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


        await page.click('text="Refresh"');
        const data = (await page.$$eval('textarea[id="messages"]', (el) => el.map(s => s.value)))[0].split('\n');
        
        const e = 'Spami: Hello, are you there?';
        
        assert.equal(data.includes(e), true, 'Search for static data');
    });
    it('send message', async () => {
        await page.goto('http://localhost:3000');
        
        page.$$eval('input[id="content"]', t => t.value = 'Hello, Anna!');
        page.$$eval('input[id="author"]', t => t.value = 'Jan');
        
        await page.click('text=Send');
        await page.click('text=Refresh');
        const data = (await page.$$eval('textarea[id="messages"]', (el) => el.map(s => s.value)))[0].split('\n');
        const e = 'Jan: Hello, Anna!';

        assert.equal(data.includes(e), true, 'Search for new data');
    });

});

