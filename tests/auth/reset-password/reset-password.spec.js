import { test, expect } from "@playwright/test";
import {
    openResetPasswordPage,
    fillEmailField,
    clickBtn,
    clickSubmit,
    verifyUser,
    createNewPassword,
} from "./reset-password.js";


test("reset Password", async ({ page }) => {
    await openResetPasswordPage(page);
    await fillEmailField(page);
    await clickSubmit(page);
    await verifyUser(page);
    await createNewPassword(page);
})