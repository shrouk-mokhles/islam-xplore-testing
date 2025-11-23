import {
    openPage,typeText,hasElement,clickBtn
} from "../../../utils/actions"
const loginUrl = "https://islam-xplore.vercel.app/en/login";
const emailInput = "input[name='email']";
const passwordInput = "input[name = 'password']";
const loginBtn = "button[type='submit']";
const verificationInput = "input[name= 'verification_code']";
const invalidPassword = "text=The credentials you entered are incorrect";


export async function openLoginPage(page) {
    await openPage(page, loginUrl);
}
export async function fillLognin(page) {
    await typeText(page, emailInput, passwordInput)
        await typeText(page, emailInput);
        await typeText(page, passwordInput)
    }
    

export async function clickSubmit(page) {
    await clickBtn(page, loginBtn);
}
export async function isVerifying(page){
    await hasElement(page, verificationInput);
}

