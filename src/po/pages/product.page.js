const BasePage = require('./base.page');

class ProductPage extends BasePage {
    get productName() {
        return $('[data-test="product-name"]');
    }
    get addToFavoritesButton() {
        return $('#btn-add-to-favorites');
    }
    get successMessage() {
        return $('[role="alert"].toast-message');
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
