const { Given, When, Then } = require('@cucumber/cucumber');

const expect = require('chai').expect;

const { AccountPage } = require('../../po');
const { createRandomUser } = require('../testData/userData');
const { registerUser, loginUser } = require('../helpers/auth');

const accountPage = new AccountPage();

let currentUser;

Given('the user is on the home page', async function () {
    await browser.url('/');
});

When('the user registers a new account', async function () {
    currentUser = createRandomUser();

    await registerUser(currentUser);
});

When('the user logs in with the created credentials', async function () {
    await loginUser(currentUser);
});

Then('the user should be redirected to the account page', async function () {
    await accountPage.waitUntilUrlContains('/account');

    expect(await browser.getUrl()).to.include('/account');
});
