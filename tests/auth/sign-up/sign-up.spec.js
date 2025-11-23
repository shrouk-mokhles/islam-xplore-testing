import { test,expect } from "@playwright/test";
import {
  openSignUp,
  fillSignupForm,
  clickSubmit,
  isVerifying,
  registrationFailed,
  emailInvalid,
  invalidPassword,
  invalidEmail,
} from "./sign-up.js";


test.describe.serial("signUp", () => {

  test("signup Successflly", async ({ page }) => {
    await openSignUp(page);
    await fillSignupForm(
      page,
      "shrouk",
      "shroukmokhles@creiden.com",
      "Welcome2creiden*",
      "Welcome2creiden*"
    );
    await clickSubmit(page);
    await isVerifying(page);
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
})