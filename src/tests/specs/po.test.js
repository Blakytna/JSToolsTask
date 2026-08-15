const expect = require('chai').expect;

const {
    AccountPage,
    CartPage,
    CategoryPage,
    FavoritesPage,
    HomePage,
    LoginPage,
    ProductPage,
    ProfilePage,
    RegisterPage,
    HeaderComponent,
} = require('../../po');

const { createRandomUser } = require('../testData/userData');

async function registerAndLoginUser() {
    const user = createRandomUser();

    const header = new HeaderComponent();
    const loginPage = new LoginPage();
    const registerPage = new RegisterPage();
    const accountPage = new AccountPage();

    await browser.url('/');
    await header.clickSignIn();
    await loginPage.goToRegistration();

    await registerPage.register(user);
    await loginPage.login(user);

    await accountPage.waitUntilUrlContains('/account');

    return user;
}

describe('User sign-up and sign-in', () => {
    afterEach(async () => {
        const header = new HeaderComponent();

        await header.logout();
    });

    it('should register a new user and log in successfully', async () => {
        await registerAndLoginUser();

        expect(await browser.getUrl()).to.include('/account');
    });
});

describe('Authenticated user actions', () => {
    beforeEach(async () => {
        await registerAndLoginUser();
    });
    afterEach(async () => {
        const header = new HeaderComponent();

        await header.logout();
    });

    it('should update phone number successfully', async () => {
        const accountPage = new AccountPage();
        const profilePage = new ProfilePage();

        const newPhone = createRandomUser().phone;

        await accountPage.profileButton.click();
        await profilePage.updatePhone(newPhone);

        expect(await profilePage.successMessage.getText()).to.equal(
            'Your profile is successfully updated!',
        );

        expect(await profilePage.profilePhoneField.getValue()).to.equal(newPhone);
    });
    it('should add the product to favorites', async () => {
        const header = new HeaderComponent();
        const homePage = new HomePage();
        const productPage = new ProductPage();
        const accountPage = new AccountPage();
        const favoritesPage = new FavoritesPage();

        await header.homeButton.click();
        await homePage.product.click();

        const productName = await productPage.productName.getText();

        await productPage.addToFavorites();
        await header.menuButton.click();
        await accountPage.myFavoritesButton.click();

        expect(await favoritesPage.productName.getText()).to.equal(productName);
    });
});

describe('Public user actions', () => {
    async function addProductToCart() {
        const homePage = new HomePage();
        const productPage = new ProductPage();

        await homePage.open();
        await homePage.product.waitForDisplayed();
        await homePage.product.click();
        await productPage.addToCart();
    }
    it('should add the product to the cart', async () => {
        const cartPage = new CartPage();
        const header = new HeaderComponent();

        await addProductToCart();
        await cartPage.successMessage.waitForDisplayed();

        expect(await cartPage.successMessage.getText()).to.equal('Product added to shopping cart.');

        expect(await header.cartCount.getText()).to.equal('1');
    });
    it('should change quantity in the cart', async () => {
        const header = new HeaderComponent();
        const cartPage = new CartPage();

        await addProductToCart();
        await header.cartButton.click();

        const priceValue = Number((await cartPage.price.getText()).replace('$', ''));

        await cartPage.quantityField.setValue('2');
        await browser.keys('Tab');

        expect(await cartPage.quantityField.getValue()).to.equal('2');

        await browser.waitUntil(async () => {
            return (await cartPage.successMessage.getText()) === 'Product quantity updated.';
        });

        expect(await cartPage.successMessage.getText()).to.equal('Product quantity updated.');

        const totalValue = Number((await cartPage.total.getText()).replace('$', ''));
        expect(totalValue).to.equal(priceValue * 2);
    });
    it('should open product category', async () => {
        const header = new HeaderComponent();
        const categoryPage = new CategoryPage();

        await browser.url('/');
        await header.categoriesButton.click();
        await header.handTools.click();

        expect(await categoryPage.pageTitle.getText()).to.equal('Category: Hand Tools');
    });
    it('should change the language', async () => {
        const header = new HeaderComponent();

        await browser.url('/');
        await header.languageButton.click();
        await header.germanLanguage.click();

        await browser.waitUntil(async () => {
            return (await header.signInButton.getText()) === 'Einloggen';
        });

        expect(await header.signInButton.getText()).to.equal('Einloggen');
    });
});
