import * as fs from "fs";
import test, { Locator, type Page, expect } from "@playwright/test";
import { constants } from "../../constants";

export class QuizzPage {
  private readonly mathjaxRegex = /<span class="MathJax.*?>(.*?)<\/span>/g;
  private readonly mathjaxMjxp = /<span class="MJXp-.*?>(.*?)<\/span>/g;
  private readonly mathjaxScriptRegex =
    /<script type="math\/tex".*?>(.*?)<\/script>/g;

  private readonly emRegex = /<em>\s*(.*?)\s*<\/em>/g;

  private readonly htmlRegex = /<\/?[^>]+(>|$)/g;

  private readonly submittedTestLinks: Locator;
  private readonly überprüfungBeenden: Locator;
  private readonly testAbgeben: Locator;
  private readonly antwortenAbsenden: Locator;
  private readonly testWiederholen: Locator;
  private readonly versuchFortsetzen: Locator;
  private readonly testVersuchen: Locator;
  private readonly versuchAbschließen: Locator;

  constructor(public readonly page: Page) {
    test.slow(); // QuestionPage-Tests are inherently slow
    test.setTimeout(1000_000);

    this.page = page;
    this.submittedTestLinks = this.page.getByRole("link", {
      name: "Überprüfung",
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
    this.testVersuchen = this.page.getByRole("button", {
      name: "Test versuchen",
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

  private async createAllTests() {
    let submittedTestCount = await this.submittedTestLinks.count();
    while (submittedTestCount < constants.NUMBER_OF_TESTS_PER_QUIZ) {
      await this.CreateOrOpenTest();
      await this.versuchAbschließen.click();
      await this.testAbgeben.click();

      await this.page.waitForLoadState("networkidle");
      if (await this.antwortenAbsenden.isVisible()) {
        await this.antwortenAbsenden.click();
      }
      await this.überprüfungBeenden.first().click();

      await this.page.waitForLoadState("load");
      submittedTestCount = await this.submittedTestLinks.count();
      console.log(
        `Created ${submittedTestCount}/${constants.NUMBER_OF_TESTS_PER_QUIZ} test sheets`
      );
    }
  }

  private async CreateOrOpenTest() {
    await this.page.waitForLoadState("load");
    if (await this.testWiederholen.isVisible()) {
      await this.testWiederholen.click();
    } else if (await this.versuchFortsetzen.isVisible()) {
      await this.versuchFortsetzen.click();
    } else if (await this.testVersuchen.isVisible()) {
      await this.testVersuchen.click();
    }
  }

  private async getUniqueQuestionsFromAllTests() {
    const testSheetCount = await this.submittedTestLinks.count();

    const allQuestions = [] as string[];
    for (const [i, submittedTestLink] of (
      await this.submittedTestLinks.all()
    ).entries()) {
      // Open new test-page
      await submittedTestLink.click();

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

  private async getQuestionsFromCurrentPage(): Promise<string[]> {
    const questionWrappers = this.page.locator(".que");
    await this.page.waitForLoadState("networkidle");
    await expect(questionWrappers.nth(1)).toBeVisible();

    const allQuestions = [] as string[];
    for (const questionWrapper of await questionWrappers.all()) {
      const questionText = await this.parseQuestionHtml(questionWrapper); // replace multiple blank spaces
      const answerText = await questionWrapper.locator(".feedback").innerText();

      allQuestions.push(this.postprocessQuestion(questionText, answerText));
    }

    return allQuestions;
  }

  private async parseQuestionHtml(questionWrapper: Locator) {
    const questionTextDiv = questionWrapper.locator(".qtext");
    const questionHtml = await questionTextDiv.innerHTML();

    let questionText = questionHtml.replaceAll("&nbsp;", " ");
    questionText = questionText.replaceAll(this.mathjaxScriptRegex, `\$$$1\$`);

    // remove all other mathjax elements
    questionText = questionText.replaceAll(this.mathjaxRegex, "");
    questionText = questionText.replaceAll(this.mathjaxMjxp, "");

    // Fix italics
    questionText = questionText.replaceAll(this.emRegex, "*$1*");
    questionText = questionText.replaceAll(/\textit\{(.*?)\}/g, "*$1*"); // replace latex \textit with markdown italics
    questionText = questionText.replaceAll(/\* \./g, " "); // fix italics at the end of a sentence

    // Drop all other html tags
    questionText = questionText.replaceAll(this.htmlRegex, "");

    // Replace multiple blank spaces with single blank spaces
    questionText = questionText.replaceAll(/\s{2,}/g, " ");

    // Repair faulty mathjax environments
    questionText = questionText.replaceAll(/\s\$\s([\w])/g, "$ $$1"); // e.g. "[...] ist gegeben durch $ (I * K)$ [...]"
    questionText = questionText.replaceAll(/[\w]\s\$\s/g, "$$1 $"); // e.g. "[...] ist gegeben durch $(I * K) $ [...]"
    questionText = questionText.replaceAll(/[.]\s\$/g, "$."); // e.g. $x^2. $ -> $x^2$.
    questionText = questionText.replaceAll(/\s\$[.]/g, "$."); // e.g. $x^2 $. -> $x^2$.
    questionText = questionText.replaceAll("\\Tilde", "\\tilde"); // \Tilde does not exist in MathJax

    questionText = questionText.replaceAll(/\\glqq /g, '"'); // e.g. $x^2. $ -> $x^2$.
    questionText = questionText.replaceAll(/\\grqq\\\s/g, '" '); // e.g. $x^2. $ -> $x^2$.

    return questionText;
  }

  private postprocessQuestion(
    questionText: string,
    answerText: string
  ): string {
    if (constants.TO_ANKI_CLOZE) {
      return `${questionText}\n{{c1::${answerText}::Ist die Aussage richtig oder falsch?}}`;
    }

    if (constants.TO_OBSIDIAN_CLOZE) {
      return `<!-- clozeblock-start -->\n${questionText}\n{{c1::${answerText}::Ist die Aussage richtig oder falsch?}}\n<!-- clozeblock-end -->`;
    }

    // else
    return `${questionText}\n${answerText}`;
  }

  private writeQuestionsToFileSystem(fileName: string, questions: string[]) {
    fs.writeFileSync(fileName, questions.join("\n\n"));
  }
}
