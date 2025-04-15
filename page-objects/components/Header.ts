import { Page } from '@playwright/test';

export class Header {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickLogo() {
        const logo = this.page.locator('img[alt="Liverpool Logo"]');
        await logo.click();
    }

    async productCategoryList() {
        const categoryList = this.page.locator('ul[class="m-navDesktop__menuList"');
        await categoryList.click();
    }


    async searchProduct(productName: string) {
        const searchInput = this.page.locator('input[id="mainSearchbar"]');
        await searchInput.fill(productName);
        await searchInput.press('Enter');

    }
    async loginField() {
        // Localiza y haz clic en el botón "Iniciar sesión"
        const loginButton = this.page.locator('p.user-button');
        await loginButton.click();

        // Verifica que el menú desplegable esté visible
        const dropdownMenu = this.page.locator('div.dropdownMenu-opt');
        await dropdownMenu.waitFor({ state: 'visible' });
        return dropdownMenu.isVisible();
    }

    async favoritesField() {
        // Localiza el botón de favoritos
        const favoritesButton = this.page.locator('a.wishlistLink');

        // Espera a que el botón esté visible antes de interactuar
        await favoritesButton.waitFor({ state: 'visible' });

        // Haz clic en el botón de favoritos
        await favoritesButton.click();

    }

    async cartField() {
        // Localiza el botón del carrito de compras
        const cartButton = this.page.locator('button[class="a-header__bag LP"]');

        // Espera a que el botón esté visible antes de interactuar
        await cartButton.waitFor({ state: 'visible' });

        // Haz clic en el botón del carrito de compras
        await cartButton.click();
    }




}