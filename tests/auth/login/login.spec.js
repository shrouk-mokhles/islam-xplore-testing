import { test } from "@playwright/test";
import {
  openLoginPage,
  fillLognin,
  clickSubmit,
  clickSubmitVerify,
  failedLogin,
  verifyUser,
  emptyFields,
} from "./login.js";
test("login successfully", async ({ page }) => {
  await openLoginPage(page);
  await fillLognin(page, "user@test.com", "12345678");

  // Get the OTP from network response
  const verificationCode = await clickSubmitVerify(page);

  // Use OTP to verify user
  await verifyUser(page, verificationCode);
});

test("failed Login", async ({ page }) => {
  (await openLoginPage(page),
    await fillLognin(page, "user@test.coma", "12345678"));
  await clickSubmit(page);
  await failedLogin(page);
});
test("empty fields", async ({ page }) => {
  (await openLoginPage(page), await clickSubmit(page), await emptyFields(page));
});
