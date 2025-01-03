import { test } from "@playwright/test";
import { QuestionsPage } from "./pages/QuestionsPage";

test("Markov Entscheidungsprozesse", async ({ page }) => {
  const questionsPage = new QuestionsPage(page);

  await questionsPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79770",
    "Wissensfragen - Markov Entscheidungsprozesse.txt"
  );
});

test("Passives Reinforcement Learning", async ({ page }) => {
  const questionsPage = new QuestionsPage(page);

  await questionsPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79780",
    "Wissensfragen - Passives Reinforcement Learning.txt"
  );
});

test("Aktives Reinforcement Learning", async ({ page }) => {
  const questionsPage = new QuestionsPage(page);

  await questionsPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79790",
    "Wissensfragen - Aktives Reinforcement Learning.txt"
  );
});
