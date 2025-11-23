import { test, expect } from "@playwright/test";
import {
    openLoginPage,fillLognin,clickSubmit,isVerifying
} from "./login.js"
test("login successfully", async ({ page }) => {
    await openLoginPage(page)
    await fillLognin(page,
        "user@test.com",
        "12345678");
    await clickSubmit(page);
    await isVerifying(page);
}
) 