const { Before, After } = require('@cucumber/cucumber');

const { HeaderComponent } = require('../../po');

const { registerAndLoginUser } = require('../helpers/auth');

const header = new HeaderComponent();

Before({ tags: '@authenticated' }, async function () {
    await registerAndLoginUser();
});

After({ tags: '@authenticated' }, async function () {
    await header.logout();
});

Before({ tags: '@public' }, async function () {
    await browser.url('/');
    await browser.deleteCookies();
    await browser.execute(() => {
        localStorage.clear();
        sessionStorage.clear();
    });
    await browser.url('/');
});
