const { Given, When, Then } = require('@cucumber/cucumber');
const expect = require('chai').expect;

const {
    HeaderComponent,
    HomePage,
    AccountPage,
    ProfilePage,
    ProductPage,
    FavoritesPage,
} = require('../../po');
const { createRandomUser } = require('../testData/userData');

const header = new HeaderComponent();
const accountPage = new AccountPage();
const profilePage = new ProfilePage();
const homePage = new HomePage();
const productPage = new ProductPage();
const favoritesPage = new FavoritesPage();

let newPhone;
let savedProductName;

Given('the user is on the profile page', async function () {
    await accountPage.goToProfile();
});

When('the user updates the phone number', async function () {
    newPhone = createRandomUser().phone;

    await profilePage.updatePhone(newPhone);
});

Then('the phone number should be updated in the profile', async function () {
    expect(await profilePage.profilePhoneField.getValue()).to.equal(newPhone);
});

Then('the message "Your profile is successfully updated!" should appear', async function () {
    expect(await profilePage.successMessage.getText()).to.equal(
        'Your profile is successfully updated!',
    );
});

Given('the authenticated user is on the product page', async function () {
    await header.goToHomePage();
    await homePage.openProduct();
    savedProductName = await productPage.productName.getText();
});

When('the user clicks the "Add to favourites" button', async function () {
    await productPage.addToFavorites();
});

Then('the product should be added to favourites list', async function () {
    await header.openMenu();
    await accountPage.goToFavorites();
    expect(await favoritesPage.productName.getText()).to.equal(savedProductName);
});
