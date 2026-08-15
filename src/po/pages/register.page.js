const BasePage = require('./base.page');

class RegisterPage extends BasePage {
    get firstNameField() {
        return $('#first_name');
    }
    get lastNameField() {
        return $('#last_name');
    }
    get dateOfBirthField() {
        return $('#dob');
    }
    get countryList() {
        return $('#country');
    }
    get postalCodeField() {
        return $('#postal_code');
    }
    get houseNumberField() {
        return $('#house_number');
    }
    get phoneField() {
        return $('#phone');
    }
    get registrationEmailInput() {
        return $('#email');
    }
    get registrationPasswordInput() {
        return $('#password');
    }
    get registerButton() {
        return $('[data-test="register-submit"]');
    }
    async register(user) {
        await this.firstNameField.setValue(user.firstName);
        await this.lastNameField.setValue(user.lastName);
        await this.dateOfBirthField.setValue(user.dateOfBirth);
        await this.countryList.selectByVisibleText('Ukraine');
        await this.postalCodeField.setValue(user.postalCode);
        await this.houseNumberField.setValue(user.houseNumber);
        await this.phoneField.setValue(user.phone);
        await this.registrationEmailInput.setValue(user.email);
        await this.registrationPasswordInput.setValue(user.password);
        await this.registerButton.click();
    }
}
module.exports = RegisterPage;
