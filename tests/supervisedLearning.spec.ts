import { test } from "@playwright/test";
import { QuestionsPage } from "./pages/QuestionsPage";

test("Lineare Regression", async ({ page }) => {
  const questionsPage = new QuestionsPage(page);

  await questionsPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79628",
    "Wissensfragen - Lineare Regression.txt"
  );
});

test("Logistische Regression", async ({ page }) => {
  const questionsPage = new QuestionsPage(page);

  await questionsPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79643",
    "Wissensfragen - Logistische Regression.txt"
  );
});

test("Support Vector Machines", async ({ page }) => {
  const questionsPage = new QuestionsPage(page);

  await questionsPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79656",
    "Wissensfragen - Support Vector Machines.txt"
  );
});

test("Nächste-Nachbarn-Klassifikation", async ({ page }) => {
  const questionsPage = new QuestionsPage(page);

  await questionsPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79669",
    "Wissensfragen - Nächste-Nachbarn-Klassifikation.txt"
  );
});

test("Bayes-Klassifikator", async ({ page }) => {
  const questionsPage = new QuestionsPage(page);

  await questionsPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79684",
    "Wissensfragen - Bayes-Klassifikator.txt"
  );
});

test("Entscheidungsbäume", async ({ page }) => {
  const questionsPage = new QuestionsPage(page);

  await questionsPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79699",
    "Wissensfragen - Entscheidungsbäume.txt"
  );
});
