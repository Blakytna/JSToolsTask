const BasePage = require('./base.page');
const { productName } = require('../selectors');

class HomePage extends BasePage {
    async open() {
        await super.open('/');
    }
    get product() {
        return $(productName);
    }
    async openProduct() {
        await this.product.click();
    }
}
module.exports = HomePage;
