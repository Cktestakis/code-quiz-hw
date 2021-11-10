// List of all questions, multiple choices and correct answers

var questions = [
  {
    title: "Is JavaScript a case-sensitive language?",
    choices: ["True", "False"],
    answer: "True",
  },
  {
    title: "Which of the following code creates an object?",
    choices: [
      "var book = Object();",
      "var book = new Object();",
      "var book = new OBJECT();",
      "var book = new Book();",
    ],
    answer: "var book = new Object();",
  },
  {
    title:
      "Which of the following function of Number object returns a string value version of the current number?",
    choices: ["toString()", "toFixed()", "toLocaleString()", "toPrecision()"],
    answer: "toString()",
  },
  {
    title: "Inside which HTML element do we put the JavaScript?",
    choices: ["<script>", "<scripting>", "<javascript>", "<js>"],
    answer: "<script>",
  },
  {
    title: "How to write an IF statement in JavaScript?",
    choices: ["if i==5then", "if (i==5)", "if i=5 then", "if i=5"],
    answer: "if (i==5)",
  },
  {
    title: "Which event occurs when the user clicks on an HTML element?",
    choices: ["onmouseover", "onclick", "onmouseclick", "onchange"],
    answer: "onclick",
  },
];
