import { test,expect } from "@playwright/test";
import {
  openSignUp,
  fillSignupForm,
  clickSubmit,
  clickSubmitVerify,
  isVerifying,
  registrationFailed,
  emailInvalid,
  invalidPassword,
  invalidEmail,
  verifyUser,
  userData,
} from "./sign-up.js";

test.describe("signUp", () => {
  test("signup Successflly", async ({ page }) => {
    await openSignUp(page);
    await fillSignupForm(
      page,
      userData.name,
      userData.email,
      userData.password,
      userData.password_confirmation
    );
    await clickSubmitVerify(page);
    await verifyUser(page, userData);

  });

  test("signup with registered email", async ({ page }) => {
    await openSignUp(page);
    await fillSignupForm(
      page,
      "shrouk",
      "user@test.com",
      "Welcome2creiden*",
      "Welcome2creiden*"
    );
    await clickSubmit(page);
    await registrationFailed(page);
  });

  test("signup with weak password", async ({ page }) => {
    await openSignUp(page);
    await invalidPassword(page);
  });

  test("signup with invalid email", async ({ page }) => {
    await openSignUp(page);
    await invalidEmail(page);
  });
});
