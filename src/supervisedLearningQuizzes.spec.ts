import { test } from "@playwright/test";
import { QuizzPage } from "./pages/QuizzPage";

test("Lineare Regression", async ({ page }) => {
  const quizzPage = new QuizzPage(page);

  await quizzPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=138436",
    "Wissensfragen - Lineare Regression.md"
  );
});

test("Logistische Regression", async ({ page }) => {
  const quizzPage = new QuizzPage(page);

  await quizzPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=138451",
    "Wissensfragen - Logistische Regression.md"
  );
});

test("Support Vector Machines", async ({ page }) => {
  const quizzPage = new QuizzPage(page);

  await quizzPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=138464",
    "Wissensfragen - Support Vector Machines.md"
  );
});

test("Nächste-Nachbarn-Klassifikation", async ({ page }) => {
  const quizzPage = new QuizzPage(page);

  await quizzPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=138477",
    "Wissensfragen - Nächste-Nachbarn-Klassifikation.md"
  );
});

test("Bayes-Klassifikator", async ({ page }) => {
  const quizzPage = new QuizzPage(page);

  await quizzPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=138492",
    "Wissensfragen - Bayes-Klassifikator.md"
  );
});

test("Entscheidungsbäume", async ({ page }) => {
  const quizzPage = new QuizzPage(page);

  await quizzPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=138507",
    "Wissensfragen - Entscheidungsbäume.md"
  );
});
