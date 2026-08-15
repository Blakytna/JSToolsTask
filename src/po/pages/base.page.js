class BasePage {
    async open(path = '') {
        await browser.url(path);
    }

    async waitUntilUrlContains(path) {
        await browser.waitUntil(async () => (await browser.getUrl()).includes(path), {
            timeout: 10000,
            timeoutMsg: `URL does not contain "${path}".`,
        });
    }
}

module.exports = BasePage;
