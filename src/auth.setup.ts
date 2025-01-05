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

  await expect(page.getByRole("link", { name: "Login" })).toHaveCount(0, {
    timeout: 100000,
  });
}

function addMathjaxPlainSourceCookie(context: BrowserContext) {
  // Without the PlanSource-Cookie, mathjax parsing is more unreliable.
  context.addCookies([
    {
      name: "mjx.menu",
      value: "renderer%3APlainSource",
      domain: "moodle.fernuni-hagen.de",
      path: "/",
      httpOnly: false,
      secure: false,
      sameSite: "Lax",
    },
  ]);
}
