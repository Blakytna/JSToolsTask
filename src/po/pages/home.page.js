const BasePage = require('./base.page');

class HomePage extends BasePage {
    async open() {
        await super.open('/');
    }
    get product() {
        return $('[data-test="product-name"]');
    }
}
module.exports = HomePage;
