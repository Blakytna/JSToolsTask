const BasePage = require('./base.page');
const { productName } = require('../selectors');

class FavoritesPage extends BasePage {
    get productName() {
        return $(productName);
    }
}
module.exports = FavoritesPage;
