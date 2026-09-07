const { HeaderComponent, LoginPage, RegisterPage, AccountPage } = require('../../po');

const { createRandomUser } = require('../testData/userData');

const header = new HeaderComponent();
const loginPage = new LoginPage();
const registerPage = new RegisterPage();
const accountPage = new AccountPage();

async function registerUser(user) {
    await header.clickSignIn();
    await loginPage.goToRegistration();

    await registerPage.register(user);
}

async function loginUser(user) {
    await loginPage.login(user);
}

async function registerAndLoginUser() {
    const user = createRandomUser();

    await browser.url('/');
    await registerUser(user);
    await loginUser(user);

    await accountPage.waitUntilUrlContains('/account');

    return user;
}

module.exports = {
    registerUser,
    loginUser,
    registerAndLoginUser,
};
