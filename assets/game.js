var question = document.querySelector("#question")
var choices = Array.from(document.querySelectorAll(".choice-text"));
var progressText = document.querySelector("#progressText");
var scoreText = document.querySelector("#score");
var progressBarFull = document.querySelector("#progressBarFull");
var countdownTimer = document.querySelector("#timerCount");

var currentQuestion = {};
var acceptingAnswers = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];

let questions = [
{
          question:  "What can you do with JavaScript?",
          choice1: "select any element",
          choice2: "select any attribute",
          choice3: "select text from an HTML page",
          choice4: "All of the above",
          answer: 4,
        },
      {
        question: "What expression strict not equal to?",
        choice1: "==",
        choice2: "!!",
        choice3: "==!",
        choice4: "!==" ,
        answer: 4,
      },
      {
        question: "What logical operator reverses the true or false state of the value?",
        choice1: "&&",
        choice2: "ll",
        choice3: "!",
        choice4: "reverse.elementById",
        answer: 3,
      },
      {
        question: "What do loops do?",
        choice1: "Check a condition",
        choice2: "If it returns true, a code block will run.",
        choice3: "Then the condition will be checked again.",
        choice4: "All of the above",
        answer: 4,
        },
        {
        question: "Inside which HTML element do we put the JavaScript?",
        choice1: "<javascript>",
        choice2: "<java>",
        choice3: "<javaplaceholder>",
        choice4: "<script>",
        answer: 4,
       },
  ];

  var timer = 60;
  var timerCount = 60;

  var SCORE_POINTS = 25;
  var MAX_QUESTIONS = 5;

  function timeLeft() {
  timer = setInterval(function () {
    timerCount--;
    countdownTimer.textContent = timerCount;

    if (timerCount <= 0) {
      clearInterval(timer);
      return window.location.assign("./end.html");
    }
  }, 1000);
}

  startGame =  () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    timeLeft();
 };

 getNewQuestion = () => {
   if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem ("mostRecentScore", score);

        return window.location.assign("./end.html")
   }

   questionCounter++;
   progressText.innerText = `Question ${questionCounter} of  ${MAX_QUESTIONS}`
   progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

   var questionsIndex = Math.floor(Math.random() * availableQuestions.length);
   currentQuestion = availableQuestions[questionsIndex];
   question.innerText = currentQuestion.question;

   choices.forEach((choice) => {
     const number = choice.dataset["number"];
     choice.innerText = currentQuestion ["choice" + number];
   });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true
  };

  choices.forEach(choice => {
    choice.addEventListener("click",  (e) => {
      if (!acceptingAnswers) return;

    acceptingAnswers = false;
    var selectedChoice = e.target;
    console.log(selectedChoice)
    var selectedAnswer = selectedChoice.dataset ["number"];
console.log(selectedAnswer)
          let classToApply =
          selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

      if(classToApply === "correct") {
          incrementScore(SCORE_POINTS);
      }

      if(classToApply === "incorrect") {
        timerCount -= 5;
      };

      selectedChoice.parentElement.classList.add(classToApply);

      setTimeout(()=>{
          selectedChoice.parentElement.classList.remove(classToApply);
          getNewQuestion()
          }, 1000);
    })
  })

  incrementScore = num => {
    score +=num
    scoreText.innerText = score
  };
startGame()


