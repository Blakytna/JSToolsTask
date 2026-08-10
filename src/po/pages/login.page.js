const BasePage = require('./base.page');

class LoginPage extends BasePage {
    get loginEmailInput() {
        return $('#email');
    }
    get loginPasswordInput() {
        return $('#password');
    }
    get loginButton() {
        return $('[data-test="login-submit"]');
    }
    get registerLink() {
        return $('[data-test="register-link"]');
    }
    async login(user) {
        await this.loginButton.waitForDisplayed({
            timeout: 10000,
            timeoutMsg: 'Login page was not loaded within 10 seconds.',
        });
        await this.loginEmailInput.setValue(user.email);
        await this.loginPasswordInput.setValue(user.password);
        await this.loginButton.click();
    }
    async goToRegistration() {
        await this.registerLink.click();
    }
}
module.exports = LoginPage;
