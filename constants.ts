export const constants = {
  MOODLE_URL: "https://moodle.fernuni-hagen.de/", // relevant only for auth

  NUMBER_OF_TESTS_PER_QUIZ: 20, // How many tests to create per Quiz

  // Select specific format - otherwise it's simple markdown
  TO_ANKI_CLOZE: false, // Whether to convert the questions to Anki cloze format
  TO_OBSIDIAN_CLOZE: false, // Whether to convert the questions to my custom Obsidian cloze format
};

if (constants.TO_ANKI_CLOZE && constants.TO_OBSIDIAN_CLOZE) {
  throw new Error(
    "Don't set both `constants.TO_ANKI_CLOZE` and `constants.TO_OBSIDIAN_CLOZE` to true"
  );
}
