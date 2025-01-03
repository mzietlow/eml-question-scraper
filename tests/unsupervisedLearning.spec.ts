import { test } from "@playwright/test";
import { QuestionsPage } from "./pages/QuestionsPage";

test("K-Means Clustering", async ({ page }) => {
  const questionsPage = new QuestionsPage(page);

  await questionsPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79713",
    "Wissensfragen - K-Means Clustering.txt"
  );
});

test("Hierarchisches Clustering", async ({ page }) => {
  const questionsPage = new QuestionsPage(page);

  await questionsPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79726",
    "Wissensfragen - Hierarchisches Clustering.txt"
  );
});

test("Assoziationsregellernen", async ({ page }) => {
  const questionsPage = new QuestionsPage(page);

  await questionsPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79737",
    "Wissensfragen - Assoziationsregellernen.txt"
  );
});

test("Anomalieerkennung", async ({ page }) => {
  const questionsPage = new QuestionsPage(page);

  await questionsPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79743",
    "Wissensfragen - Anomalieerkennung.txt"
  );
});

test("Hauptkomponentenanalyse", async ({ page }) => {
  const questionsPage = new QuestionsPage(page);

  await questionsPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79758",
    "Wissensfragen - Hauptkomponentenanalyse.txt"
  );
});
