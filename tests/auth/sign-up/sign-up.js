import {
  openPage,
  clickBtn,
  typeText,
  getText,
  hasElement,
} from "../../../utils/actions";

const signupUrl = "https://islam-xplore.vercel.app/en/register";
const nameInput = "input[name='name']";
const emailInput = "input[name='email']";
const passwordInput = "input[name='password']";
const confirmPasswordInput = "input[name='password_confirmation']";
const signupBtn = "button[type='submit']";
const registrationFailedMsg = "text=Registration Failed";
const emailInvalidMsg = "text=Email is invalid";
const randomEmail = `user_${Date.now()}@test.com`;
const verificationInput = "input[name='verification_code']";
const verifyBtn = "button[type='submit']";
const homeTitle = "h1"
export const userData = {
  name: "shrouk",
  email: `user_${Date.now()}@test.com`,
  password: "Welcome2creiden*",
  password_confirmation: "Welcome2creiden*",
};

const invalidPasswordCases = [
  {
    pwd: "WELCOME2CREIDEN",
    errorSelector: "text=Password must contain at least one lowercase letter",
  },
  {
    pwd: "welcome2creiden",
    errorSelector: "text=Password must contain at least one uppercase letter",
  },
  {
    pwd: "Welcomecreiden*",
    errorSelector: "text=Password must contain at least one digit",
  },
  {
    pwd: "Welcome2creiden",
    errorSelector:
      "text=Password must contain at least one special character (e.g., !, @, #, $, %, ^, &, *, ?)",
  },
];

const invalidEmailCases = [
  {
    email: "shroukmokhes@creiden",
    emailErrorSelector: emailInvalidMsg,
  },
  {
    email: "shroukmokhlescreiden.com",
    emailErrorSelector: emailInvalidMsg,
  },
  {
    email: "@creiden.com",
    emailErrorSelector: emailInvalidMsg,
  },
];

export async function openSignUp(page) {
  await openPage(page, signupUrl);
}

export async function fillSignupForm(
  page,
  name,
  email,
  password,
  confirmPassword
) {
  await typeText(page, nameInput, name);
  await typeText(page, emailInput, email);
  await typeText(page, passwordInput, password);
  await typeText(page, confirmPasswordInput, confirmPassword);
}

export async function clickSubmit(page) {
  await clickBtn(page, signupBtn);
}

export async function isVerifying(page) {
  await hasElement(page, verificationInput);
}

export async function registrationFailed(page) {
  await hasElement(page, registrationFailedMsg);
}

export async function emailInvalid(page) {
  await hasElement(page, emailInvalidMsg);
}

export async function invalidPassword(page) {
  for (const testCase of invalidPasswordCases) {
    await fillSignupForm(
      page,
      "shrouk",
      randomEmail,
      testCase.pwd,
      testCase.pwd
    );
    await clickBtn(page, signupBtn);
    await hasElement(page, testCase.errorSelector);
    await page.reload();
  }
}

export async function invalidEmail(page) {
  for (const testCase of invalidEmailCases) {
    await fillSignupForm(
      page,
      "shrouk",
      testCase.email,
      "Welcome2creiden*",
      "Welcome2creiden*"
    );
    await clickBtn(page, signupBtn);
    await hasElement(page, testCase.emailErrorSelector);
    await page.reload();
  }
}

export async function verifyUser(page, userData) {
  const response = await fetch(
    "https://be.islam-xplore.betazone.xyz/api/auth/register",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        captcha: "",
        email: userData.email,
        name: userData.name,
        password: userData.password,
        password_confirmation: userData.password_confirmation,
      }),
    }
  );
  const data = await response.json();
  console.log(data.data.code);
  await typeText(page, verificationInput, data.data.code);
await clickBtn(page,verifyBtn)
  await hasElement(page, homeTitle);  
  
}
 

