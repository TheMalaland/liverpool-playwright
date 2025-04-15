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
        //here im just testing the page locators to see if they are correct

        //const categoryList = this.page.locator('text="Categorías"');
        //const categoryList = this.page.locator('.a-header__strongLink.nav-desktop-menu-action.pr-3');
        //const categoryList = this.page.locator('span:has-text("Categorías")')

        const categoryList = this.page.locator("div.o-navDesktop ul li span.a-header__strongLink");
        // Espera a que el elemento esté visible antes de hacer clic
        await categoryList.click();
    }


    async searchProduct(productName: string) {
        const searchInput = this.page.locator('input[label="Buscar..."]');
        await searchInput.fill(productName);
        await searchInput.press('Enter');
        // Espera a que la página de resultados de búsqueda se cargue
        await this.page.waitForNavigation({ waitUntil: 'networkidle' });
        // Verifica que la URL contenga el nombre del producto buscado
        const currentUrl = this.page.url();
        if (!currentUrl.includes(productName)) {
            throw new Error(`La búsqueda de "${productName}" no se realizó correctamente. URL actual: ${currentUrl}`);
        }
        // Verifica que el título de la página contenga el nombre del producto buscado  
        const title = await this.page.title();
        if (!title.toLowerCase().includes(productName.toLowerCase())) {
            throw new Error(`El título de la página no contiene "${productName}". Título actual: ${title}`);
        }
        // Verifica que el campo de búsqueda contenga el texto buscado
        const searchValue = await searchInput.inputValue();
        if (searchValue !== productName) {
            throw new Error(`El campo de búsqueda no contiene "${productName}". Valor actual: ${searchValue}`);
        }
        
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