const BasePage = require('./base.page');

class CartPage extends BasePage {
    get successMessage() {
        return $('[role="alert"].toast-message');
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
