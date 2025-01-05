import { test } from "@playwright/test";
import { QuizzPage } from "./pages/QuizzPage";

test("Markov Entscheidungsprozesse", async ({ page }) => {
  const QuizzPage = new QuizzPage(page);

  await QuizzPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79770",
    "Wissensfragen - Markov Entscheidungsprozesse.md"
  );
});

test("Passives Reinforcement Learning", async ({ page }) => {
  const QuizzPage = new QuizzPage(page);

  await QuizzPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79780",
    "Wissensfragen - Passives Reinforcement Learning.md"
  );
});

test("Aktives Reinforcement Learning", async ({ page }) => {
  const QuizzPage = new QuizzPage(page);

  await QuizzPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79790",
    "Wissensfragen - Aktives Reinforcement Learning.md"
  );
});
