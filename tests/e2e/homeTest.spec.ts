import { test, expect } from '@playwright/test';
import { Home } from '../../page-objects/pages/Home';

test.describe('Home Page Tests', () => {
    test('should load the homepage and verify the title', async ({ page }) => {
        const home = new Home(page); // Usa la clase Home
        await home.navigateToHomePage(); // Método para navegar a la página de inicio
        const isTitleCorrect = await home.verifyTitle(); // Verifica el título
        expect(isTitleCorrect).toBeTruthy();
    });
});

