import { test } from "@playwright/test";
import { QuizzPage } from "./pages/QuizzPage";

test("Künstliche Neuronale Netzwerke", async ({ page }) => {
  const QuizzPage = new QuizzPage(page);

  await QuizzPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79805",
    "Wissensfragen - Künstliche Neuronale Netzwerke.md"
  );
});

test("Convolutional Neural Networks", async ({ page }) => {
  const QuizzPage = new QuizzPage(page);

  await QuizzPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79817",
    "Wissensfragen - Convolutional Neural Networks.md"
  );
});

test("Rekurrente Neuronale Netzwerke", async ({ page }) => {
  const QuizzPage = new QuizzPage(page);

  await QuizzPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79827",
    "Wissensfragen - Rekurrente Neuronale Netzwerke.md"
  );
});

test("Lernen von Repräsentationen", async ({ page }) => {
  const QuizzPage = new QuizzPage(page);

  await QuizzPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79835",
    "Wissensfragen - Lernen von Repräsentationen.md"
  );
});
