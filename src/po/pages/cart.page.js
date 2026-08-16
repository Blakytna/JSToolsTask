const BasePage = require('./base.page');
const { successMessage } = require('../selectors');

class CartPage extends BasePage {
    get successMessage() {
        return $(successMessage);
    }
    get quantityField() {
        return $('[data-test="product-quantity"]');
    }
    get price() {
        return $('[data-test="product-price"]');
    }
    get total() {
        return $('[data-test="line-price"]');
    }
}
module.exports = CartPage;
