async function loginpage(page) {
    await page.goto('/login');
    await page.locator('#email').fill('vishnum30894@gmail.com');
    await page.locator('#password').fill('Rahulshetty@12!');
    await page.locator('#login-btn').click();
}

module.exports = { loginpage };