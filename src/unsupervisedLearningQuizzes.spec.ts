import { test } from "@playwright/test";
import { QuestionsPage } from "./pages/QuestionsPage";

test("K-Means Clustering", async ({ page }) => {
  const questionsPage = new QuestionsPage(page);

  await questionsPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79713",
    "Wissensfragen - K-Means Clustering.md"
  );
});

test("Hierarchisches Clustering", async ({ page }) => {
  const questionsPage = new QuestionsPage(page);

  await questionsPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79726",
    "Wissensfragen - Hierarchisches Clustering.md"
  );
});

test("Assoziationsregellernen", async ({ page }) => {
  const questionsPage = new QuestionsPage(page);

  await questionsPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79737",
    "Wissensfragen - Assoziationsregellernen.md"
  );
});

test("Anomalieerkennung", async ({ page }) => {
  const questionsPage = new QuestionsPage(page);

  await questionsPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79743",
    "Wissensfragen - Anomalieerkennung.md"
  );
});

test("Hauptkomponentenanalyse", async ({ page }) => {
  const questionsPage = new QuestionsPage(page);

  await questionsPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79758",
    "Wissensfragen - Hauptkomponentenanalyse.md"
  );
});
