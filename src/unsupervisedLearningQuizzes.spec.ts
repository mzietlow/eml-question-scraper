import { test } from "@playwright/test";
import { QuizzPage } from "./pages/QuizzPage";

test("K-Means Clustering", async ({ page }) => {
  const quizzPage = new QuizzPage(page);

  await quizzPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=138521",
    "Wissensfragen - K-Means Clustering.md"
  );
});

test("Hierarchisches Clustering", async ({ page }) => {
  const quizzPage = new QuizzPage(page);

  await quizzPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=138534",
    "Wissensfragen - Hierarchisches Clustering.md"
  );
});

test("Assoziationsregellernen", async ({ page }) => {
  const quizzPage = new QuizzPage(page);

  await quizzPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=138545",
    "Wissensfragen - Assoziationsregellernen.md"
  );
});

test("Anomalieerkennung", async ({ page }) => {
  const quizzPage = new QuizzPage(page);

  await quizzPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=138551",
    "Wissensfragen - Anomalieerkennung.md"
  );
});

test("Hauptkomponentenanalyse", async ({ page }) => {
  const quizzPage = new QuizzPage(page);

  await quizzPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=138566",
    "Wissensfragen - Hauptkomponentenanalyse.md"
  );
});
