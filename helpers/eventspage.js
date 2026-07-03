function getEventCards(page) {
    const cards = page.locator('[data-testid="event-card"]');
    return cards;
}
module.exports = { getEventCards };