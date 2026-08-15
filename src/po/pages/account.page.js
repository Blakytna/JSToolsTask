const BasePage = require('./base.page');

class AccountPage extends BasePage {
    get profileButton() {
        return $('[data-test="nav-profile"]');
    }
    get myFavoritesButton() {
        return $('[data-test="nav-my-favorites"]');
    }
}
module.exports = AccountPage;
