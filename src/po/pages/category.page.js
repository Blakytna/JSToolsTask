const BasePage = require('./base.page');

class CategoryPage extends BasePage {
    get pageTitle() {
        return $('[data-test="page-title"]');
    }
}
module.exports = CategoryPage;
