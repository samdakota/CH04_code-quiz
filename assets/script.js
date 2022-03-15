// HTML AND CSS
// 3 sections: intro with start button, <div> for objects , end screen

// JAVASCRIPT
// array of objects
const questions = [
  {
    question: "?",
    choices: ["1", "2"],
    answer: "2",
  },
];
var indexCount = 0;
questions[indexCount].choices.forEach((choice) => {
  var choiceBtn = document.createElement("button");
  choiceBtn.setAttribute("value", choice);
  choiceBtn.setAttribute("class", "btn");
  choiceBtn.onclick = questionClick;
});

function questionClick() {
  if (this.value !== questions[indexCount].answer) {
    time -= 15;
  }
  indexCount++;
}
// setup a countdown clock that refreshes to score page when reaches 0

// "submit" switches to next div
