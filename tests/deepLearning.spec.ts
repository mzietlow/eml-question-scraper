import { test } from "@playwright/test";
import { QuestionsPage } from "./pages/QuestionsPage";

test("Künstliche Neuronale Netzwerke", async ({ page }) => {
  const questionsPage = new QuestionsPage(page);

  await questionsPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79805",
    "Wissensfragen - Künstliche Neuronale Netzwerke.txt"
  );
});

test("Convolutional Neural Networks", async ({ page }) => {
  const questionsPage = new QuestionsPage(page);

  await questionsPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79817",
    "Wissensfragen - Convolutional Neural Networks.txt"
  );
});

test("Rekurrente Neuronale Netzwerke", async ({ page }) => {
  const questionsPage = new QuestionsPage(page);

  await questionsPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79827",
    "Wissensfragen - Rekurrente Neuronale Netzwerke.txt"
  );
});

test("Lernen von Repräsentationen", async ({ page }) => {
  const questionsPage = new QuestionsPage(page);

  await questionsPage.execute(
    "https://moodle.fernuni-hagen.de/mod/quiz/view.php?id=79835",
    "Wissensfragen - Lernen von Repräsentationen.txt"
  );
});
