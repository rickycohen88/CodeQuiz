let score = 0;
let timeleft =0;
var clock;
let highScoreCard = document.getElementById("highScoreCard");
let mainText = document.getElementById("main");
let startbutton = document.getElementById("timeStart");
let stopwatch = document.getElementById("timer");
let ans1 = document.getElementById("ans1");
let ans2 = document.getElementById("ans2");
let ans3 = document.getElementById("ans3");
let ans4 = document.getElementById("ans4");

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
       gameOver();
   }
})


startbutton.addEventListener("click", startClock);


function startClock(){
    clock = setInterval(clockTick, 1000);
}

function clockTick(){
    timeleft--;
    stopwatch.textContent =timeleft;
    if(timeleft === 0){
        gameOver();
        console.log("should have stoped");
    }
    console.log(timeleft);
}

function gameOver(){
    clearInterval(clock);
    console.log("gameOver function called");
}