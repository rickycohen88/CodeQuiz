let score = 0;
let timeleft =0;
let clock;
let answeredRight = 0;
let answeredWrong = 0;
currentQuestionIndex = 0;
let player ="";
let completed = 0;
let highScoreCard = document.getElementById("highScoreCard");
let mainText = document.getElementById("main");
let startbutton = document.getElementById("timeStart");
let stopwatch = document.getElementById("timer");
let ans1 = document.getElementById("ans1");
let ans2 = document.getElementById("ans2");
let ans3 = document.getElementById("ans3");
let ans4 = document.getElementById("ans4");
let asked = document.getElementById("quizCardBody");

let sfxRight = new Audio("sounds/go-tim.mp3");
let sfxWrong = new Audio("sounds/ahahah.mp3");
let sfxRight2 = new Audio("sounds/clever.mp3");
let sfxWrong2 = new Audio("sounds/alarmed.mp3");
let sfxlose = new Audio("sounds/yeah-thats-nice.mp3");
let sfxwin = new Audio("sounds/dodgson.mp3");
let sfxwin2 = new Audio("sounds/see-nobody-cares.mp3");

//take quiz button open and closes quiz div
$("#something").on("click",function (){
   let x = document.getElementById("quiz-container");
   if(x.style.display === "none"){
       x.style.display = "block";
       mainText.style.display = "none";
       highScoreCard.style.display ="none";
       document.getElementById("something").style.backgroundColor = "red";
       document.getElementById("something").textContent = "End Quiz";
       timeleft = 60;
       document.getElementById("timer").textContent = "60";
   }else{
       x.style.display = "none";
       mainText.style.display ="block";
       highScoreCard.style.display="block";
       document.getElementById("something").style.backgroundColor = "green";
       document.getElementById("something").textContent = "Take Quiz";
       clearInterval(clock);
       asked.innerHTML = "";
       currentQuestionIndex = 0;
       displayHS();

   }
})


startbutton.addEventListener("click", startClock);


function startClock(){
    clock = setInterval(clockTick, 1000);
    setQandA();
}
// manage intval time keeping, game timer.
function clockTick(){
    timeleft--;
    stopwatch.textContent =timeleft;
    if(timeleft <11){
      stopwatch.style.color ="red";
    }
    if(timeleft === 0){
        gameOver();
        //console.log("should have stoped");
    }
    console.log(timeleft);
}
function setQandA() {
    // get current question object from array
    let currentQuestion = questions[currentQuestionIndex];
  
    // update title with current question
    
    let questionDisplay = document.createElement("div");
    questionDisplay.textContent = currentQuestion.question;
    asked.appendChild(questionDisplay);
  
    // loop over choices
    currentQuestion.choices.forEach(function(choice, itsIndex) {
      // create new button for each choice
      let choiceBtn = document.createElement("button");
      choiceBtn.setAttribute("class", "btn btn-light btn-lg btn-block");
      choiceBtn.setAttribute("value", choice);
  
      choiceBtn.textContent = itsIndex + 1 + ". " + choice;
  
      // attach click event listener to each choice
      choiceBtn.onclick = questionClick;
  
      // display on the page

      asked.appendChild(choiceBtn);
      window.scrollTo(0,document.body.scrollHeight);
    });
  }
  function questionClick() {
    completed++;

    // check if user guessed wrong
    if (this.value !== questions[currentQuestionIndex].answer) {
      answeredWrong++;
      if(answeredWrong<3 ){
      sfxWrong.play();
      score--;
      }
      else{
        sfxWrong2.play();
       answeredWrong = 0;
       score--;
      }
    } else {
      //
      answeredRight++;
      if(answeredRight<3){
      sfxRight.play();
      score++;
  
      }
      else{
        sfxRight2.play();
        score++;
        answeredRight = 0;
      }
    }

    // move to next question
    currentQuestionIndex++;
  
    // check if we've run out of questions
    if (currentQuestionIndex === questions.length) {
      gameOver();
    } else {
      setQandA();
    }
  }
// end the game
function gameOver(){
    clearInterval(clock);
    console.log("gameOver function called");
    
    if(completed>9){
      player = prompt("plaese enter your name");
      saveHighscore();
      if(answeredRight>answeredWrong){
        sfxwin.play();
          setTimeout(function(){
          sfxwin2.play();
          },5000)
        }
    else{
      sfxlose.play();
    }
  }
    asked.innerHTML="";
    
}
function saveHighscore() {
  // get value of input box
  var pname = player.trim();

  // make sure value wasn't empty
  if (pname !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format new score object for current user
    var newScore = {
      score: score,
      name: pname,
      timeLeft: timeleft
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    
  }
}

function displayHS() {
  var hScb = document.getElementById("highScoreCardBody");
  hScb.firstChild.textContent = "name-score-timeleft";
  // either get scores from localstorage or set to empty array
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

  // sort highscores by score property in descending order
  highscores.sort(function(a, b) {
    return b.score - a.score;
  });

  highscores.forEach(function(score) {
    // create li tag for each high score
    var trTag = document.createElement("tr");
    trTag.textContent = score.name + " - " + score.score + "-" + score.timeLeft;

    // display on page
    
    hScb.appendChild(trTag);
  });
}

function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}

document.getElementById("clear").onclick = clearHighscores;

// run function when page loads
displayHS();












var questions = [
    {
      question: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      question: "who lives in a pineapple under the sea?",
      choices: ["the little mermaid","Aqua Man","The Snorks","Sponge Bob"],
      answer: "Sponge Bob"
    },
    {
      question: "the name of the computer systems architec from jarassic park?",
      choices: ["ned", "mike", "john", "dodgson"],
      answer: "ned"
    },
    {
      question: "theorized to be a decendant of dinosaurs",
      choices: ["monkeys", "cats", "birds", "gasoline"],
      answer: "birds"
    },
    {
      question: "pick 1",
      choices: ["2", "3", "4", "5"],
      answer: "2"
    },
    {
      question: "purple is to sky as mice is to",
      choices: ["traps", "holes", "fur", "tails"],
      answer: "traps"
    },
    {
      question: "question",
      choices: ["answer", "answer", "answer", "not answer"],
      answer: "answer"
    },
    {
      question: "what comes first",
      choices: ["chicken", "egg",],
      answer: "egg"
    },
    {
      question: "a zebra is a tpe of horse",
      choices: ["false", "true",],
      answer: "true"
    },
    {
      question: "achoo",
      choices: ["kazoontight", "a sneeze", "a name", "bless you"],
      answer: "a name"
    },
]