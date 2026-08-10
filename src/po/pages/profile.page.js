const BasePage = require('./base.page');

class ProfilePage extends BasePage {
    get profilePhoneField() {
        return $('#phone');
    }

    get updateProfileButton() {
        return $('[data-test="update-profile-submit"]');
    }

    get successMessage() {
        return $('.alert-success');
    }

    async updatePhone(phone) {
        await browser.waitUntil(async () => (await this.profilePhoneField.getValue()) !== '', {
            timeout: 10000,
            timeoutMsg: 'Phone field was not loaded.',
        });

        await this.profilePhoneField.setValue(phone);
        await this.updateProfileButton.click();
        await this.successMessage.waitForDisplayed();
    }
}
module.exports = ProfilePage;
