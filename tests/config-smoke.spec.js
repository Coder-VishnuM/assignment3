const { test, expect } = require('@playwright/test');
const { loginpage } = require('../helpers/loginpage');
const { parseSeatCount } = require('../helpers/parseseatcount');
const { getEventCards } = require('../helpers/eventspage');

test('testing events page', async ({ page }) => {
    await loginpage(page);
    await page.getByRole('link', { name: /browse events/i }).nth(0).click();
    await expect(page.getByRole('heading', { name: /Upcoming Events/i })).toBeVisible();

    await page.getByPlaceholder('Search events, venues…').fill('World');
    await page.getByRole('combobox').first().selectOption('Conference');
    await page.getByRole('combobox').nth(1).selectOption('Hyderabad');

    await expect(page.getByPlaceholder('Search events, venues…')).toHaveValue('World');
    await expect(page.getByRole('combobox').first()).toHaveValue('Conference');
    await expect(page.getByRole('combobox').nth(1)).toHaveValue('Hyderabad');

    const cards = await getEventCards(page);
    // await expect(cards).not.toHaveCount(0);
    await page.waitForLoadState('networkidle');
    await expect(cards.first()).toBeVisible();

    expect(await cards.count()).toBeGreaterThanOrEqual(1);

    const world_tech_summit_card = await cards.filter({ hasText: 'World Tech Summit' });
    await expect(world_tech_summit_card).toHaveCount(1);
    await expect(world_tech_summit_card).toBeVisible();

    const eventTitle = await world_tech_summit_card.locator('h3').innerText();
    const eventPriceText = await world_tech_summit_card.locator('p.text-indigo-700').innerText();
    const eventSeatsText = await world_tech_summit_card.locator('span.text-amber-600').innerText();
    // await console.log(eventTitle);
    // await console.log(eventPriceText);
    // await console.log(eventSeatsText);

    await expect(eventTitle).toEqual("World Tech Summit");
    await expect(eventPriceText).toContain("$");
    const SeatCount = parseSeatCount(eventSeatsText);
    // await console.log(SeatCount);
    expect(SeatCount).toBeGreaterThan(0);

    await world_tech_summit_card.locator("[data-testid='book-now-btn']").click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/events\//);

    await expect(page.getByRole('heading', { name: eventTitle })).toBeVisible();
    await expect(page.getByText('$').nth(1)).toContainText(eventPriceText);
});

test.only('practice nth last and first', async ({ page }) => {

    await loginpage(page);
    await page.getByRole('link', { name: /browse events/i }).nth(0).click();

    await page.getByPlaceholder('Search events, venues…').clear();
    await page.getByRole('combobox').first().selectOption('');
    await page.getByRole('combobox').nth(1).selectOption('');

    const cards = await getEventCards(page);

    await page.waitForLoadState('networkidle');
    expect(await cards.count()).toBeGreaterThanOrEqual(3);
    const first_card_title = await cards.first().locator('h3').innerText();
    const last_card_title = await cards.last().locator('h3').innerText();
    const second_card_title = await cards.nth(1).locator('h3').innerText();

    expect(first_card_title).toBeTruthy();
    expect(last_card_title).toBeTruthy();
    expect(second_card_title).toBeTruthy();

    expect(first_card_title).not.toBe(last_card_title);

});