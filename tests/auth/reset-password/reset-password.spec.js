import { test, expect } from "@playwright/test";
import {
    openResetPasswordPage,
    fillEmailField,
    clickBtn,
    clickSubmit,
    verifyUser,
    createNewPassword,
    unregisteredemail,
    emptyEmailError,
    unregisteredEmailError,
} from "./reset-password.js";


test("reset Password", async ({ page }) => {
    await openResetPasswordPage(page);
    await fillEmailField(page);
    await clickSubmit(page);
    await verifyUser(page);
    await createNewPassword(page);
})


test("empty Email", async ({ page }) => {
    await openResetPasswordPage(page);
    await clickSubmit(page);
    await emptyEmailError(page)

})

test("unregistered Email error",async ({ page }) => {
    await openResetPasswordPage(page);
    await unregisteredemail(page);
    await clickSubmit(page);
    await unregisteredEmailError(page);
})



