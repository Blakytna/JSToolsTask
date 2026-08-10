const BasePage = require('./base.page');

class FavoritesPage extends BasePage {
    get productName() {
        return $('[data-test="product-name"]');
    }
}
module.exports = FavoritesPage;
