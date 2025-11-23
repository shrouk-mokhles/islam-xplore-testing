import { expect } from "@playwright/test";

export async function openPage(page, url) {
  await page.goto(url);
}

export async function clickBtn(page, selector) {
  await page.waitForSelector(selector, { state: "visible" });
  await page.click(selector);
}

export async function typeText(page, selector, text) {
  await page.waitForSelector(selector, { state: "visible" });
  await page.fill(selector, text);
}

export async function getText(page, selector) {
  await page.waitForSelector(selector, { state: "visible" });
  return page.textcontent(selector);
}

export async function hasElement(page, selector){
await expect(page.locator(selector)).toBeVisible();
}