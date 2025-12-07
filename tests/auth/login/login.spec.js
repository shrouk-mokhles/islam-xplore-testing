import { test, expect } from "@playwright/test";
import {
    openLoginPage,
    fillLognin,
    clickSubmit,
    isVerifying,
    failedLogin,
    verifyUser
} from "./login.js"
test("login successfully", async ({ page }) => {
    await openLoginPage(page)
    await fillLognin(page,
        "user@test.com",
        "12345678");
    await clickSubmit(page);
    await isVerifying(page);
    await verifyUser(page);
}); 
test("failed Login", async ({ page }) => {
    await openLoginPage(page),
        await fillLognin(page,
            "user@test.coma",
            "12345678");
    await clickSubmit(page);
    await failedLogin(page);
    
});
