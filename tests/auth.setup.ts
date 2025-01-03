import {
  test as setup,
  expect,
  webkit,
  BrowserContext,
  Page,
} from "@playwright/test";
import path from "path";
import { constants } from "../constants";

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

setup("authenticate", async () => {
  const browser = await webkit.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await authenticateManually(page);
  addMathjaxPlainSourceCookie(context);

  await page.context().storageState({ path: authFile });
});

async function authenticateManually(page: Page) {
  await page.goto(constants.MOODLE_URL);
  console.log("Log yourself in!");

  // Wait until the page reaches a state where all cookies are set.
  await expect(
    page.getByRole("heading", { name: `Hallo, ${constants.FULL_NAME}! 👋` })
  ).toBeVisible({ timeout: 100000 });
}

function addMathjaxPlainSourceCookie(context: BrowserContext) {
  context.addCookies([
    {
      name: "mjx.menu",
      value: "renderer%3APlainSource",
      domain: "moodle.fernuni-hagen.de",
      path: "/",
      expires: new Date("9999-01-01T00:00:00Z").getTime(), // i.e. don't expire
      httpOnly: false,
      secure: false,
      sameSite: "Lax",
    },
  ]);
}
