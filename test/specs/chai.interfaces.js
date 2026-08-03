const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();

const { createRandomUser } = require('../testData/userData');

async function registerAndLoginUser() {
    const user = createRandomUser();

    const signInButton = $('[data-test="nav-sign-in"]');
    const registerLink = $('[data-test="register-link"]');
    const firstNameField = $('#first_name');
    const lastNameField = $('#last_name');
    const dateOfBirthField = $('#dob');
    const countryList = $('#country');
    const postalCodeField = $('#postal_code');
    const houseNumberField = $('#house_number');
    const phoneField = $('#phone');
    const registrationEmailInput = $('#email');
    const registrationPasswordInput = $('#password');
    const registerButton = $('[data-test="register-submit"]');

    const loginEmailInput = $('#email');
    const loginPasswordInput = $('#password');
    const loginButton = $('[data-test="login-submit"]');

    await browser.url('/');
    await signInButton.click();
    await registerLink.click();
    await firstNameField.setValue(user.firstName);
    await lastNameField.setValue(user.lastName);
    await dateOfBirthField.setValue(user.dateOfBirth);
    await countryList.selectByVisibleText('Ukraine');
    await postalCodeField.setValue(user.postalCode);
    await houseNumberField.setValue(user.houseNumber);
    await phoneField.setValue(user.phone);
    await registrationEmailInput.setValue(user.email);
    await registrationPasswordInput.setValue(user.password);
    await registerButton.click();

    await loginButton.waitForDisplayed({
        timeout: 10000,
        timeoutMsg: 'Login page was not loaded within 10 seconds.',
    });
    await loginEmailInput.setValue(user.email);
    await loginPasswordInput.setValue(user.password);
    await loginButton.click();

    await browser.waitUntil(async () => (await browser.getUrl()).includes('/account'), {
        timeout: 10000,
        timeoutMsg: 'Account page was not loaded.',
    });

    return user;
}

describe('User sign-up and sign-in', () => {
    afterEach(async () => {
        const menuButton = $('#menu');
        const signOutButton = $('[data-test="nav-sign-out"]');

        await menuButton.click();
        await signOutButton.click();
    });

    it('should register a new user and log in successfully', async () => {
        await registerAndLoginUser();

        assert.include(await browser.getUrl(), '/account');
    });
});

describe('Authenticated user actions', () => {
    beforeEach(async () => {
        await registerAndLoginUser();
    });
    afterEach(async () => {
        const menuButton = $('#menu');
        const signOutButton = $('[data-test="nav-sign-out"]');

        await menuButton.click();
        await signOutButton.click();
    });

    it('should update phone number successfully', async () => {
        const profileButton = $('[data-test="nav-profile"]');
        const profilePhoneField = $('#phone');
        const newPhone = createRandomUser().phone;
        const updateProfileButton = $('[data-test="update-profile-submit"]');
        const successMessage = $('.alert-success');

        await profileButton.click();
        await browser.waitUntil(async () => (await profilePhoneField.getValue()) !== '', {
            timeout: 10000,
            timeoutMsg: 'Phone field was not loaded.',
        });
        await profilePhoneField.setValue(newPhone);
        await updateProfileButton.click();
        await successMessage.waitForDisplayed();

        expect(await successMessage.getText()).to.equal('Your profile is successfully updated!');
        expect(await profilePhoneField.getValue()).to.equal(newPhone);
    });
    it('should add the product to favorites', async () => {
        const homeButton = $('[data-test="nav-home"]');
        const product = $('[data-test="product-name"]');
        const addToFavoritesButton = $('#btn-add-to-favorites');
        const successMessage = $('[role="alert"].toast-message');
        const menuButton = $('#menu');
        const myFavoritesButton = $('[data-test="nav-my-favorites"]');

        await homeButton.click();
        await product.click();

        const productName = await product.getText();

        await addToFavoritesButton.click();
        await successMessage.waitForDisplayed();

        expect(await successMessage.getText()).to.equal('Product added to your favorites list.');

        await menuButton.click();
        await myFavoritesButton.click();

        expect(await product.getText()).to.equal(productName);
    });
});

describe('Public user actions', () => {
    async function addProductToCart() {
        const product = $('[data-test="product-name"]');
        const addToCartButton = $('#btn-add-to-cart');

        await browser.url('/');
        await product.waitForDisplayed();
        await product.click();
        await addToCartButton.click();
    }
    it('should add the product to the cart', async () => {
        const successMessage = $('[role="alert"].toast-message');
        const cartCount = $('[data-test="cart-quantity"]');

        await addProductToCart();
        await successMessage.waitForDisplayed();

        (await successMessage.getText()).should.equal('Product added to shopping cart.');
        (await cartCount.getText()).should.equal('1');
    });
    it('should change quantity in the cart', async () => {
        const cartButton = $('[data-test="nav-cart"]');
        const quantityField = $('[data-test="product-quantity"]');
        const price = $('[data-test="product-price"]');
        const total = $('[data-test="line-price"]');
        const successMessage = $('[role="alert"].toast-message');

        await addProductToCart();
        await cartButton.click();

        const priceValue = Number((await price.getText()).replace('$', ''));

        await quantityField.setValue('2');
        await browser.keys('Tab');

        const totalValue = Number((await total.getText()).replace('$', ''));

        assert.strictEqual(await quantityField.getValue(), '2');
        assert.strictEqual(totalValue, priceValue * 2);

        await browser.waitUntil(async () => {
            return (await successMessage.getText()) === 'Product quantity updated.';
        });

        assert.strictEqual(await successMessage.getText(), 'Product quantity updated.');
    });
    it('should open product category', async () => {
        const categoriesButton = $('[data-test="nav-categories"]');
        const handTools = $('[data-test="nav-hand-tools"]');
        const pageTitle = $('[data-test="page-title"]');

        await browser.url('/');
        await categoriesButton.click();
        await handTools.click();

        (await pageTitle.getText()).should.equal('Category: Hand Tools');
    });
    it('should change the language', async () => {
        const languageButton = $('#language');
        const germanLanguage = $('[data-test="lang-de"]');
        const signInButton = $('[data-test="nav-sign-in"]');

        await browser.url('/');
        await languageButton.click();
        await germanLanguage.click();

        await browser.waitUntil(async () => {
            return (await signInButton.getText()) === 'Einloggen';
        });

        (await signInButton.getText()).should.equal('Einloggen');
    });
});
