import {
  openPage,
  typeText,
  hasElement,
  clickBtn,
} from "../../../utils/actions";
const loginUrl = "https://islam-xplore.vercel.app/en/login";
const emailInput = "input[name='email']";
const passwordInput = "input[name = 'password']";
const loginBtn = "button[type='submit']";
const verificationInput = "input[name= 'verification_code']";
const invalidPassword = "text=The credentials you entered are incorrect";
const errorMsg = "text=The credentials you entered are incorrect";
const verifyBtn = "button[type='submit']"; 
const homeTitle = "h1";
const emptyFieldsMsg = "text= Email is required"; 

export async function openLoginPage(page) {
    await openPage(page, loginUrl);
}
export async function fillLognin(page,email,password) {
    await typeText(page, emailInput,email)
        await typeText(page, passwordInput,password);
    }
    

export async function clickSubmitVerify(page) {
  // Wait for response while clicking submit
  const responsePromise = page.waitForResponse(
    (res) => res.url().includes("/initiate-login") && res.status() === 200,
  );

  await clickBtn(page, loginBtn);

  // Get the verification code from backend response
  const response = await responsePromise;
  const body = await response.json();

  // Wait for verification input to appear
  await page.waitForSelector(verificationInput, { state: "visible" });

  return body.data.code; // return the OTP
}

export async function clickSubmit(page) {
  await clickBtn(page, loginBtn);
}

export async function isVerifying(page) {
  await hasElement(page, verificationInput);
}

export async function failedLogin(page) {
  await hasElement(page, errorMsg);
}

export async function verifyUser(page, verificationCode) {
  await typeText(page, verificationInput, verificationCode);
  await clickBtn(page, verifyBtn);
  await hasElement(page, homeTitle);
}

export async function emptyFields(page) {
  await hasElement(page, emptyFieldsMsg);
}