import { test } from "@playwright/test";
import { QuizzPage } from "./pages/QuizzPage";

test("Künstliche Neuronale Netzwerke", async ({ page }) => {
  const quizzPage = new QuizzPage(page);

  await quizzPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=138613",
    "Wissensfragen - Künstliche Neuronale Netzwerke.md"
  );
});

test("Convolutional Neural Networks", async ({ page }) => {
  const quizzPage = new QuizzPage(page);

  await quizzPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=138625",
    "Wissensfragen - Convolutional Neural Networks.md"
  );
});

test("Rekurrente Neuronale Netzwerke", async ({ page }) => {
  const quizzPage = new QuizzPage(page);

  await quizzPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=138635",
    "Wissensfragen - Rekurrente Neuronale Netzwerke.md"
  );
});

test("Lernen von Repräsentationen", async ({ page }) => {
  const quizzPage = new QuizzPage(page);

  await quizzPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=138643",
    "Wissensfragen - Lernen von Repräsentationen.md"
  );
});
