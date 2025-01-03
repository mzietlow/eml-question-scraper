import * as fs from "fs";
import test, { Locator, type Page, expect } from "@playwright/test";
import { constants } from "../../constants";

export class QuestionsPage {
  private readonly mathjaxPlainSourceRegex =
    /<span class="MathJax_PlainSource".*?>(.*?)<\/span>/g;
  private readonly mathjaxPreviewRegex =
    /<span class="MathJax_Preview".*?>(.*?)<\/span>/g;
  private readonly mathjaxMjxp = /<span class="MJXp-.*?>(.*?)<\/span>/g;
  private readonly mathjaxScriptRegex =
    /<script type="math\/tex".*?>(.*?)<\/script>/g;

  private readonly emRegex = /<em>\s*(.*?)\s*<\/em>/g;

  private readonly htmlRegex = /<\/?[^>]+(>|$)/g;

  private readonly submittedTests: Locator;
  private readonly überprüfungBeenden: Locator;
  private readonly testAbgeben: Locator;
  private readonly antwortenAbsenden: Locator;
  private readonly testWiederholen: Locator;
  private readonly versuchFortsetzen: Locator;
  private readonly versuchAbschließen: Locator;

  constructor(public readonly page: Page) {
    test.slow(); // QuestionPage-Tests are inherently slow
    test.setTimeout(1000_000);

    this.page = page;
    this.submittedTests = this.page.getByRole("row", {
      name: "Beendet Abgegeben",
    });
    this.überprüfungBeenden = this.page.getByRole("link", {
      name: "Überprüfung beenden",
    });
    this.testAbgeben = this.page.getByRole("button", { name: "Abgeben" });
    this.testWiederholen = this.page.getByRole("button", {
      name: "Test wiederholen",
    });
    this.versuchFortsetzen = this.page.getByRole("button", {
      name: "Versuch fortsetzen",
    });
    this.versuchAbschließen = this.page.getByRole("link", {
      name: "Versuch abschließen",
    });
    this.antwortenAbsenden = this.page
      .getByLabel("Alle Antworten absenden und")
      .getByRole("button", { name: "Abgeben" });
  }

  async execute(baseUrl: string, outputFileName: string) {
    await this.page.goto(baseUrl);
    await this.createAllTests();
    const questions = await this.getUniqueQuestionsFromAllTests();
    this.writeQuestionsToFileSystem(outputFileName, questions);
  }

  async createAllTests() {
    let submittedTestCount = await this.submittedTests.count();
    while (submittedTestCount < constants.NUMBER_OF_TESTS_PER_CATEGORY) {
      await this.CreateOrOpenTest();
      await this.versuchAbschließen.click();
      await this.testAbgeben.click();

      await this.page.waitForLoadState("networkidle");
      if (await this.antwortenAbsenden.isVisible()) {
        await this.antwortenAbsenden.click();
      }
      await this.überprüfungBeenden.first().click();

      await this.page.waitForLoadState("load");
      submittedTestCount = await this.submittedTests.count();
      console.log(
        `Created ${submittedTestCount}/${constants.NUMBER_OF_TESTS_PER_CATEGORY} test sheets`
      );
    }
  }

  async CreateOrOpenTest() {
    await this.page.waitForLoadState("load");
    if (await this.testWiederholen.isVisible()) {
      await this.testWiederholen.click();
    } else if (await this.versuchFortsetzen.isVisible()) {
      await this.versuchFortsetzen.click();
    }
  }

  async getUniqueQuestionsFromAllTests() {
    const testSheetCount = await this.submittedTests.count();

    const allQuestions = [] as string[];
    for (const [i, submittedTest] of (
      await this.submittedTests.all()
    ).entries()) {
      // Open new test-page
      await submittedTest.getByRole("link").click();

      const questionsFromCurrentPage = await this.getQuestionsFromCurrentPage();
      allQuestions.push(...questionsFromCurrentPage);

      // Exit current test-page
      await this.überprüfungBeenden.first().click();
      console.log(`Parsed ${i + 1}/${testSheetCount} test sheets`);
    }

    const uniqueQuestions = [...new Set(allQuestions)];
    console.log(`Number of unique questions: ${uniqueQuestions.length}`);
    return uniqueQuestions;
  }

  async getQuestionsFromCurrentPage(): Promise<string[]> {
    const questionWrappers = this.page.locator(".que");
    await this.page.waitForLoadState("networkidle");
    await expect(questionWrappers.nth(1)).toBeVisible();

    const allQuestions = [] as string[];
    for (const questionWrapper of await questionWrappers.all()) {
      const questionText = await this.parseQuestionHtml(questionWrapper); // replace multiple blank spaces
      const answerText = await questionWrapper.locator(".feedback").innerText();

      allQuestions.push(
        constants.TO_ANKI_CLOZE
          ? `${questionText}\n{{c1::${answerText}::Ist die Aussage richtig oder falsch?}}`
          : `${questionText}\n${answerText}`
      );
    }

    return allQuestions;
  }

  private async parseQuestionHtml(questionWrapper: Locator) {
    const questionTextDiv = questionWrapper.locator(".qtext");
    const questionHtml = await questionTextDiv.innerHTML();

    let questionText = questionHtml.replaceAll("&nbsp;", " ");
    questionText = questionText.replaceAll(this.mathjaxScriptRegex, `\$$$1\$`);
    questionText = questionText.replaceAll(this.mathjaxPlainSourceRegex, "");
    questionText = questionText.replaceAll(this.mathjaxMjxp, "");
    questionText = questionText.replaceAll(this.mathjaxPreviewRegex, "");
    questionText = questionText.replaceAll(" $ ", "$ "); // LaTeX Umgebungen mit doppeltem Abstand (bisher nur am Ende)
    questionText = questionText.replaceAll(this.emRegex, "*$1* ");
    questionText = questionText.replaceAll(this.htmlRegex, "");
    questionText = questionText.replaceAll(/\s{2,}/g, " "); // replace multiple blank spaces

    return questionText;
  }

  writeQuestionsToFileSystem(fileName: string, questions: string[]) {
    fs.writeFileSync(fileName, questions.join("\n\n"));
  }
}
