// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score

// hide all elements except for start elements
// when Begin button is clicked begin countdown clock, hide start elements, first question displayed
// when answer is clicked, check whether correct, generate points, add to saved score, move to next question
// when time runs out hide all elements except for result elements
// fill in span number and form score
// when Save Score button is clicked save initials with score

// question objects?
const questions = [
  {
    question: "How do you create a flexbox?",
    choices: ["display: flex", "display: flexbox", "display: box", "flex: display"],
    answer: "display: flex",
  },
  {
    question: "Which method saves data to localStorage?",
    choices: ["getItem()", "saveItem", "pushItem", "setItem"],
    answer: "setItem",
  },
  {
    question: "Which command is used to change the git branch?",
    choices: ["git add .", "git checkout", "git checkout -b", "git change"],
    answer: "git checkout -b",
  },
  {
    question: "What JavaScript feature would you use to execute a block of code a certain number of times?",
    choices: ["a for loop", "an object", "an array", "a console.log"],
    answer: "a for loop",
  },
  {
    question: "What is the index value of the first object in an array?",
    choices: ["0", "1", "-1", "undefined"],
    answer: "0",
  }
];

var indexCount = 0;
var time = 30;
var timer;
var score = 0;

var questionContainer = document.getElementById("question");
var startContainer = document.getElementById("start");
var endContainer = document.getElementById("results");
var timerContainer = document.getElementById("timer");

var startButton = document.getElementById("btn-start");
var endButton = document.getElementById("btn-end");
var timeLeft = document.getElementById("time-left");

var savedScores = [];
var savedScoresIdCounter = 0;


var startClock = function () {
  timer = setInterval(function () {
    time--;
    if (time > 0) {
      timeLeft.innerHTML = time;
    } else {
      endQuiz();
    }
  }, 1000);
};

var startQuiz = function () {
  startContainer.classList.add("hide");
  questionContainer.classList.remove("hide");
  timerContainer.classList.remove("hide");
  startClock();
  showQuestion();
};

startButton.addEventListener("click", startQuiz);

var showQuestion = function () {
  const currentQuestion = questions[indexCount];
  const title = document.createElement("h4");
  title.textContent = currentQuestion.question;
  const questionList = document.createElement("ol");
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    const choice = currentQuestion.choices[i];
    var choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("value", choice);
    choiceBtn.setAttribute("class", "btn");
    choiceBtn.textContent = choice;
    choiceBtn.onclick = questionClick;
    const li = document.createElement("li");
    li.appendChild(choiceBtn);
    questionList.appendChild(li);
  }
  questionContainer.innerHTML = "";
  questionContainer.appendChild(title);
  questionContainer.appendChild(questionList);
};

function questionClick() {
  if (this.value !== questions[indexCount].answer) {
    console.log("wrong!!");
    time -= 5;
  } else {
    score += 10;
    console.log(score);
    console.log("correct!");
  }
  if (indexCount <= questions.length - 2) {
    indexCount++;
    showQuestion();
  } else {
    endQuiz();
  }
}

var endQuiz = function () {
  clearInterval(timer);
  alert("quiz done!");
  endContainer.classList.remove("hide");
  questionContainer.classList.add("hide");
  timerContainer.classList.add("hide");
  var finalScoreDisplay = document.getElementById("score-display");
  finalScoreDisplay.innerHTML = score;
  console.log(score);
};

var saveScore = function () {
  var nameInput = document.querySelector("input[name='initials']").value;
  var savedScoreList = document.getElementById("saved-scores");
  var newScore = document.createElement("li");
  newScore.textContent = nameInput + "   :   " + score;
  savedScoreList.appendChild(newScore);
  var savedScoreObj = {
    name: nameInput,
    value: score,
    id: savedScoresIdCounter++,
  }
  savedScores.push(savedScoreObj);
};

endButton.addEventListener("click", saveScore);
