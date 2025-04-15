import { test, expect } from '@playwright/test';

test.describe('Liverpool Playwright Tests', () => {
    let sharedPage: any;

    test.beforeAll(async ({ browser }) => {
        // Crear un contexto y una página compartida antes de todas las pruebas
        const context = await browser.newContext();
        sharedPage = await context.newPage();
    });

    test.afterAll(async () => {
        // Cerrar la página y el contexto después de todas las pruebas
        await sharedPage.context().close();
    });

    test('should load the homepage', async () => {
        await sharedPage.goto('https://www.liverpool.com.mx/tienda/home', {
            headers: {
                'Accept-Language': 'es-MX',
                'Referer': 'https://www.google.com/',
            },
        });
        const title = await sharedPage.title();
        expect(title).toBe('Liverpool | Envío gratis en todas tus compras.');
    });

    test('the liverpool logo should be visible', async () => {
        const logo = sharedPage.locator('img[alt="Liverpool Logo"]');
        await expect(logo).toBeVisible();
    });
});