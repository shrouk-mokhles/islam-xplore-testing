import {
  openPage,
  clickBtn,
  typeText,
  getText,
  hasElement,
} from "../../../utils/actions";

const resrtPasswordUrl = "https://islam-xplore.vercel.app/en/reset-password";
const emailField = "[placeholder='Email']";
const confirmBtn = "button[type='submit']";
const verificationInput = "input[name='verification_code']";
const newPasswordPage = "https://islam-xplore.vercel.app/en/reset-password";
const newPasswordInput = "input[name='password']";
const confirmNewPasswordInput = "input[name='password_confirmation']";

export async function openResetPasswordPage(page) {
    await openPage(page,resrtPasswordUrl)
}
 
export async function fillEmailField(page) {
    await typeText (page,emailField,"shrouk.mokhles@creiden.com")
    
}

export async function clickSubmit(page) {
    await clickBtn(page,confirmBtn)
}

export async function verifyUser(page) {
  const response = await page.waitForResponse(
    (res) =>
      res.url().includes("/request-reset-password") && res.status() === 200
  );
  const data = await response.json();
  await typeText(page, verificationInput, data.data.code);
  await clickBtn(page, confirmBtn);
  await page.waitForResponse(
    (res) =>
      res.url().includes("/check-reset-password-code") && res.status() === 200
  );
}

export async function createNewPassword(page) {
  await typeText(page, newPasswordInput, "Welcome2creiden2*");
  await typeText(page, confirmNewPasswordInput, "Welcome2creiden2*");
  await clickBtn(page, confirmBtn);
}

