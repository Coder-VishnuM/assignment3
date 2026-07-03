
import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    reporter: 'html',
    retries: 1,
    use: {
        baseURL: "https://eventhub.rahulshettyacademy.com",
    },
    projects: [
        {
            name: 'chromium',
            use: {
                browserName: 'chromium',
                headless: true,
            },
            timeout: 10 * 1000,
            expect: {
                timeout: 10 * 1000,
            }
        },
        // {
        //     name: 'firefox',
        //     use: {
        //         browserName: 'firefox',
        //         headless: true,
        //     }
        // }
    ]
});

