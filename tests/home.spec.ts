import { test, expect } from '@playwright/test';

test("Open home page and verify titile", async ({page}) => {
    await page.goto("https://www.fifa.com/en/home");

    await expect(page).toHaveTitle('FIFA | The Home of Football');
})

test("Logo is visible and has the alt title", async ({page}) => {
    await page.goto("https://www.fifa.com/en/home");

    const logo = page.locator('[src="https://digitalhub.fifa.com/transform/befe3a64-328b-453c-8b58-0faeb9103684/FIFA_Logo_White_Generic?&io=transform:fill,height:64&quality=75"]');

    await expect(logo).toBeVisible();

    await expect(logo).toHaveAttribute('title', 'FIFA');
})


test("Verify first pop-ups", async ({page}) => {
    await page.goto("https://www.fifa.com/en/home");

    await page.waitForTimeout(2000);

    await page.locator('#onetrust-reject-all-handler').click();

    await page.waitForTimeout(2000);

    await page.mouse.click(10, 10);

    expect(page.url()).toEqual('https://www.fifa.com/en/home');
})

test("Verify menu titles", async ({page}) => {
    const expectedLinks = [
           "TOURNAMENTS\nMATCH CENTRE\nNEWS\nRANKINGS\nWATCH ON FIFA+\nPLAY\nSHOP\nINSIDE FIFA",
    ];

    await page.goto("https://www.fifa.com/en/home");

    await page.waitForTimeout(2000);

    const menuLocator = page.locator('#mainLinksID');

    const menuItems = await menuLocator.allInnerTexts();

    expect(menuItems[0]).toEqual(expectedLinks[0]);
})

test("Verify menu links", async ({page}) => {
    await page.goto("https://www.fifa.com/en/home");

    await page.waitForTimeout(2000);
    await page.locator('#onetrust-reject-all-handler').click();

    await page.waitForTimeout(2000);
    await page.mouse.click(10, 10);

    await page.waitForTimeout(2000);
    await page.locator(':text("TOURNAMENTS")').click();

    await page.waitForTimeout(2000);
    await page.locator(':text("OVERVIEW")').nth(0).click();

    expect(page.url()).toEqual('https://www.fifa.com/en/tournaments');
})