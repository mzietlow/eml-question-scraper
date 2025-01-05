import { test } from "@playwright/test";
import { QuestionsPage } from "./pages/QuestionsPage";

test("Lineare Regression", async ({ page }) => {
  const questionsPage = new QuestionsPage(page);

  await questionsPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79628",
    "Wissensfragen - Lineare Regression.md"
  );
});

test("Logistische Regression", async ({ page }) => {
  const questionsPage = new QuestionsPage(page);

  await questionsPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79643",
    "Wissensfragen - Logistische Regression.md"
  );
});

test("Support Vector Machines", async ({ page }) => {
  const questionsPage = new QuestionsPage(page);

  await questionsPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79656",
    "Wissensfragen - Support Vector Machines.md"
  );
});

test("Nächste-Nachbarn-Klassifikation", async ({ page }) => {
  const questionsPage = new QuestionsPage(page);

  await questionsPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79669",
    "Wissensfragen - Nächste-Nachbarn-Klassifikation.md"
  );
});

test("Bayes-Klassifikator", async ({ page }) => {
  const questionsPage = new QuestionsPage(page);

  await questionsPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79684",
    "Wissensfragen - Bayes-Klassifikator.md"
  );
});

test("Entscheidungsbäume", async ({ page }) => {
  const questionsPage = new QuestionsPage(page);

  await questionsPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79699",
    "Wissensfragen - Entscheidungsbäume.md"
  );
});
