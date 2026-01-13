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
  await clickBtn(page, loginBtn);

  await page.waitForResponse((res) => {
    return res.url().includes("/initiate-login") && res.status() === 200;
  });

  await page.waitForSelector("input[name='verification_code']", {
    state: "visible",
  });
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

export async function verifyUser(page) {
  const response = await fetch(
    "https://be.islam-xplore.betazone.xyz/api/auth/initiate-login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        captcha: "",
        email: "user@test.com",
        password: "12345678",
      }),
    }
  );
  const data = await response.json();
  await typeText(page, verificationInput, data.data.code);
  await clickBtn(page, verifyBtn);
  await hasElement(page, homeTitle);
}

export async function emptyFields(page) {
  await hasElement(page, emptyFieldsMsg);
}