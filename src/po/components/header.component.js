class HeaderComponent {
    get signInButton() {
        return $('[data-test="nav-sign-in"]');
    }
    get homeButton() {
        return $('[data-test="nav-home"]');
    }
    get categoriesButton() {
        return $('[data-test="nav-categories"]');
    }
    get languageButton() {
        return $('#language');
    }
    get germanLanguage() {
        return $('[data-test="lang-de"]');
    }
    get menuButton() {
        return $('#menu');
    }
    get signOutButton() {
        return $('[data-test="nav-sign-out"]');
    }
    get cartButton() {
        return $('[data-test="nav-cart"]');
    }
    get cartCount() {
        return $('[data-test="cart-quantity"]');
    }
    get handTools() {
        return $('[data-test="nav-hand-tools"]');
    }
    async clickSignIn() {
        await this.signInButton.click();
    }
    async logout() {
        await this.menuButton.click();
        await this.signOutButton.click();
    }
    async openMenu() {
        await this.menuButton.click();
    }
    async goToHomePage() {
        await this.homeButton.click();
    }
    async goToCart() {
        await this.cartButton.click();
    }
    async openCategories() {
        await this.categoriesButton.click();
    }
    async openHandTools() {
        await this.handTools.click();
    }
    async openLanguageMenu() {
        await this.languageButton.click();
    }
    async selectGermanLanguage() {
        await this.germanLanguage.click();
    }
}
module.exports = HeaderComponent;
