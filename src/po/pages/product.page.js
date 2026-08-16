const BasePage = require('./base.page');
const { productName, successMessage } = require('../selectors');

class ProductPage extends BasePage {
    get productName() {
        return $(productName);
    }
    get addToFavoritesButton() {
        return $('#btn-add-to-favorites');
    }
    get successMessage() {
        return $(successMessage);
    }
    get addToCartButton() {
        return $('#btn-add-to-cart');
    }
    async addToFavorites() {
        await this.addToFavoritesButton.click();
        await this.successMessage.waitForDisplayed();
    }
    async addToCart() {
        await this.addToCartButton.click();
    }
}
module.exports = ProductPage;
