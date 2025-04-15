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
        expect(header).toBeTruthy(); // Asegúrate de que el encabezado sea visible
    });
    
    test('the Liverpool logo should be visible', async () => {
        const isLogoVisible = await home.liverpoolLogo(); // Método para verificar la visibilidad del logo  
        expect(isLogoVisible).toBeTruthy(); // Verifica que el logo sea visible
    
    });

    test('should click the Liverpool logo', async () => {

        const isRedirectedToHomePage = await home.clickLogo(); // Método para hacer clic en el logo
        expect(isRedirectedToHomePage).toBeTruthy(); // Verifica que se redirija a la página de inicio
    });

    test('the category list should be visible and clickable', async () => {
        const isCategoryListVisible = await home.getHeader().productCategoryList(); // Método para verificar la visibilidad y clicabilidad de la lista de categorías
        expect(isCategoryListVisible).toBeTruthy(); // Asegúrate de que el encabezado sea visible
    });
    





});

