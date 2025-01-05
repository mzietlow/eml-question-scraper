# 📚 EML-Question-Scraper

## 🚀 Install

To install, clone the repository and run `npm install`.

## ⚙️ Configure

Adjust settings in `constants.ts` to:

- Set the number of generated tests per quiz
- Change the output format per question (e.g., Anki-Cloze or simple markdown)

You can update quiz URLs and output-file names within the `<category>Quizzes.spec.ts` files.

## ▶️ Execute

To run the scraper:

```sh
npx playwright test
```

Don't forget to authenticate with your Moodle credentials on the first screen. The resulting cookies are persisted to `playwright/.auth/user.json`.

