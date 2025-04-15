import { test, expect } from '@playwright/test';
import { Home } from '../../page-objects/pages/Home';

test.describe('Home Page Tests', () => {
    let sharedPage: any; // Página compartida
    let home: Home; // Instancia de la clase Home

    test.beforeAll(async ({ browser }) => {
        // Crear un contexto y una página compartida antes de todas las pruebas
        const context = await browser.newContext();
        sharedPage = await context.newPage();
        home = new Home(sharedPage); // Inicializar la clase Home con la página compartida
    });

    test.afterAll(async () => {
        // Cerrar la página y el contexto después de todas las pruebas
        await sharedPage.context().close();
    });

    test('should load the homepage and verify the title', async () => {
        await home.navigateToHomePage(); // Método para navegar a la página de inicio
        const isTitleCorrect = await home.verifyTitle(); // Verifica el título
        expect(isTitleCorrect).toBeTruthy();
    });

    test('the header should be visible', async () => {
        const header = home.getHeader(); // Obtiene la instancia de Header
        // Aquí puedes agregar validaciones para verificar que el encabezado sea visible
    });

    test('should click the Liverpool logo', async () => {
        await home.clickLogo(); // Método para hacer clic en el logo
    });

    test('category list should be visible', async () => {
        const header = home.getHeader(); // Obtiene la instancia de Header
        await header.productCategoryList(); // Método para interactuar con la lista de categorías
    });

    test('the serch field should be visible and usable', async () => {
        const header = home.getHeader(); // Obtiene la instancia de Header
        await header.searchProduct('laptop'); // Método para buscar un producto
    });
});

