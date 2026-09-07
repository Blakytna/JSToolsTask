const { Given, When, Then } = require('@cucumber/cucumber');
const expect = require('chai').expect;

const { HeaderComponent, HomePage, ProductPage, CartPage, CategoryPage } = require('../../po');

const header = new HeaderComponent();
const homePage = new HomePage();
const productPage = new ProductPage();
const cartPage = new CartPage();
const categoryPage = new CategoryPage();

let initialUnitPrice = 0;

async function goToProductPage() {
    await homePage.open();
    await homePage.product.waitForDisplayed();
    await homePage.openProduct();
}

async function addProductToCart() {
    await goToProductPage();
    await productPage.addToCart();
}

Given('the user is on the product page', async function () {
    await goToProductPage();
});

When('the user clicks the "Add to cart" button', async function () {
    await productPage.addToCart();
});

Then('the product should be added to the cart', async function () {
    await cartPage.successMessage.waitForDisplayed();
});

Then('the message "Product added to shopping cart." should appear', async function () {
    expect(await cartPage.successMessage.getText()).to.equal('Product added to shopping cart.');
});

Then('the cart badge should display "1" item', async function () {
    expect(await header.cartCount.getText()).to.equal('1');
});

Given('the user has added a product to the cart', async function () {
    await addProductToCart();
});

Given('the user is on the cart page', async function () {
    await header.goToCart();
});

When('the user updates the quantity of the item to "2"', async function () {
    const priceText = await cartPage.price.getText();
    initialUnitPrice = Number(priceText.replace('$', ''));

    await cartPage.quantityField.click();
    await browser.keys(['Control', 'a']);
    await browser.keys('2');
    await browser.keys('Tab');
});

Then('the total price should be recalculated', async function () {
    await browser.waitUntil(async () => {
        return (await cartPage.successMessage.getText()) === 'Product quantity updated.';
    });

    const totalText = await cartPage.total.getText();
    const totalValue = Number(totalText.replace('$', ''));

    expect(totalValue).to.equal(initialUnitPrice * 2);
});

Then('the message "Product quantity updated." should appear', async function () {
    expect(await cartPage.successMessage.getText()).to.equal('Product quantity updated.');
});

When('the user clicks "Categories" button', async function () {
    await header.openCategories();
});

When('the user selects the "Hand Tools" product category', async function () {
    await header.openHandTools();
});

Then('the category page title should be "Category: Hand Tools"', async function () {
    expect(await categoryPage.pageTitle.getText()).to.equal('Category: Hand Tools');
});

When('the user clicks on the language menu', async function () {
    await header.openLanguageMenu();
});

When('the user selects the "German" language', async function () {
    await header.selectGermanLanguage();
});

Then('the sign-in button text should change to "Einloggen"', async function () {
    await browser.waitUntil(async () => {
        return (await header.signInButton.getText()) === 'Einloggen';
    });
    expect(await header.signInButton.getText()).to.equal('Einloggen');
});
