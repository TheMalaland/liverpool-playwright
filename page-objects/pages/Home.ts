import { Page } from '@playwright/test';
import { Header } from '../components/Header';

export class Home {
    readonly page: Page;
    readonly header: Header;

    constructor(page: Page) {
        this.page = page;
        this.header = new Header(this.page);
    }

    async navigateToHomePage() {
        await this.page.goto('https://www.liverpool.com.mx/tienda/home', {
            headers: {
                'Accept-Language': 'es-MX',
                'Referer': 'https://www.google.com/',
            },
        });
    }

    async verifyTitle() {
        const title = await this.page.title();
        return title === 'Liverpool | Envío gratis en todas tus compras.';
    }

    async liverpoolLogo() {
        const logo = await this.header.liverpoolLogo();
        return logo;
    }

    async clickLogo() {
        await this.header.clickLogo();
        const currentUrl = await this.page.url();
        return currentUrl === 'https://www.liverpool.com.mx/tienda/home';
    }

    async searchProduct(productName: string) {
        await this.header.searchProduct(productName);
    }

    async loginfield() {
        const loginfield = await this.header.loginFieldVisible();
        return loginfield;
    }

    async loginFieldclick() {
        const loginField = await this.header.loginFieldClickable();
        return loginField;
    }

    async openLoginDropdown() {
        const isDropdownVisible = await this.header.loginFieldVisibleDropdownList();
        return isDropdownVisible;
    }

    async openFavorites() {
        await this.header.favoritesField();
    }

    async openCart() {
        await this.header.cartField();
    }

    getHeader() {
        return this.header;
    }
}

export default Home;