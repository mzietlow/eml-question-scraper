import { test } from "@playwright/test";
import { QuizzPage } from "./pages/QuizzPage";

test("Markov Entscheidungsprozesse", async ({ page }) => {
  const quizzPage = new QuizzPage(page);

  await quizzPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=138578",
    "Wissensfragen - Markov Entscheidungsprozesse.md"
  );
});

test("Passives Reinforcement Learning", async ({ page }) => {
  const quizzPage = new QuizzPage(page);

  await quizzPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=138588",
    "Wissensfragen - Passives Reinforcement Learning.md"
  );
});

test("Aktives Reinforcement Learning", async ({ page }) => {
  const quizzPage = new QuizzPage(page);

  await quizzPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=138598",
    "Wissensfragen - Aktives Reinforcement Learning.md"
  );
});
