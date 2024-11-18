import { test, expect } from '@playwright/test';

test("Open home page and verify titile", async ({page}) => {
    await page.goto("https://www.fifa.com/en/home");

    await expect(page).toHaveTitle('FIFA | The Home of Football');
})