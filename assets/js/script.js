//SECTION LIST
const QUIZ_SECTION = document.querySelectorAll(".quiz-section")

//START
const START_SECTION = document.getElementById("start");
const START_BTN = document.getElementById("start-button");

//THE QUESTIONS
const QUIZ_SECTION = document.getElementById("quiz-questions");
const TIME_REMAINING = document.getElementById("time-remaining");
const QUESTION = document.getElementById("question");
const CHOICES = document.getElementById("choices");
const CHOICE_STATUS = document.getElementById("choice-status");
const CORRECT = document.getElementById("correct");
const WRONG = document.getElementById("wrong");

//THE END
const END_SECTION = document.getElementById("end");
const END_TITLE = document.getElementById("end-title");
const SCORE = document.getElementById("score");
const INITIALS_INPUT = document.getElementById("initials");
const SUBMIT_SCORE = document.getElementById("submit-score");
const ERROR_MESSAGE = document.getElementById("error-message");

//THE QUESTION SECTION
class Question {
    constructor(question, choices, indexOfCorrectChoice) {
        this.question = question;
        this.choices = choices;
        this.indexOfCorrectChoice = indexOfCorrectChoice;
    }
}
const QUESTION_1 = new Question("Which of the following is not a valid JavaScript variable name? ",
["2names", "_first_and_last_names", "FirstAndLast", "None of the Above"], 1);
const QUESTION_2 = new Question("____ tag is an extension to HTML that can enclose any number of JavaScript",
["<SCRIPT>", "<BODY>", "<HEAD>", "<TITLE>"], 1);
const QUESTION_3 = new Question("The _________ method of an Array object adds and/or removes elements from an array", 
["Reverse", "Shift", "Slice", "Splice"], 3);
const QUESTION_4 = new Question("Which of the following is not considered a JavaScript operator", 
["new", "this", "delete", "typeof"], 1);
const QUESTION_5 = new Question("In JavaScript, _______ is an object of the target language data type that encloses an object of the source language.", 
["a Wrapper", "a link", "a cursor", "a form"], 0);
const QUESTION_LIST = [QUESTION_1, QUESTION_2, QUESTION_3, QUESTION_4, QUESTION_5];

let currentQuestion = 0;

let totalTime = 0;
let totalTimeInterval;
let choiceStatusTimeout;

/*EVENT LISTENERS*/
START_BTN.addEventListener('click', startGame);
CHOICES.addEventListener('click', processChoice);
SUBMIT_SCORE.addEventListener('submit', processInput);

/*START GAME*/
function startGame() {
    SVGFEDropShadowElement(QUIZ_SECTIONS, QUIZ_SECTION);

    displayTime();
    displayQuestion();

    startTimer();
}