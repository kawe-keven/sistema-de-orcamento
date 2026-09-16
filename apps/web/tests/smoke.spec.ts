import { test, expect } from '@playwright/test';
test('dashboard loads', async ({ page }) => { await page.goto('/dashboard'); await expect(page.getByRole('heading', { name: /Olá, Marina/ })).toBeVisible(); });
