let colorSample = null; 
let answers = [];
let correctColorCode = null;
let score = 0;
let total = 0;
let correctAnswer = null;
let colorCode = null;
let flipflop = false;
let hexes = [];
let gamemode = "standard";

window.onload = function () {
    colorSample = document.getElementById("colorSample");
    document.getElementById("score").innerHTML = "0/10";
}

function changedifficulty() {
    if(document.getElementById("switch").checked == false){
        gamemode = "standard";
    }else{
        gamemode = "flipped";
    }
}//changedifficulty



function startGame(diff){
    document.getElementById("easy").style.display = "none";
    document.getElementById("medium").style.display = "none";
    document.getElementById("hard").style.display = "none";
    document.getElementById("gamemodechooser").style.display = "none";
    document.getElementById("scoreboard").style.display = "block";
    document.getElementById("colorSample").style.display = "block";
    
    answers.push(document.getElementById("0"));
    answers.push(document.getElementById("1"));
    if(diff == "medium"){
    answers.push(document.getElementById("2"));
    answers.push(document.getElementById("3"));
    }
    if(diff == "hard"){
    answers.push(document.getElementById("2"));
    answers.push(document.getElementById("3"));
    answers.push(document.getElementById("4"));
    answers.push(document.getElementById("5"));
    answers.push(document.getElementById("6"));
    answers.push(document.getElementById("7"));
    }
    for (let i = 0; i < answers.length; i++){
        answers[i].style.display = "inline-block";
    }
    
    loadNewQuestion();
}//startgame

function loadNewQuestion(){
    colorCode = getRandomHexCode();
    colorSample.innerHTML = "";
    if(gamemode == "standard"){
        colorSample.style.backgroundColor = colorCode;
        document.getElementById("title").innerHTML = "Guess the hex code for this colour!";
    }else if(gamemode == "flipped"){
        colorSample.innerHTML = colorCode;
        document.getElementById("title").innerHTML = "Guess the colour for this hex code!";
        document.getElementById("colorSample").style.height = "50px";
        for (let i = 0; i < answers.length; i++){
            answers[i].innerHTML = "‎ ";
        }
    }
    
    correctColorCode = colorCode;
    for (let x = 0; x < answers.length; x++){
        hexes.unshift(getRandomHexCode())
        if(gamemode == "standard"){
        answers[x].innerHTML = hexes[0];
        }else if(gamemode == "flipped"){
            answers[x].style.backgroundColor = hexes[0];
        }
    }
    correctAnswer = Math.floor(Math.random() * (answers.length))
    if(gamemode == "standard"){
        answers[correctAnswer].innerHTML = colorCode;
    }else if(gamemode == "flipped"){
        answers[correctAnswer].style.backgroundColor = colorCode;
    }
    hexes[correctAnswer] = colorCode;
}//loadnewquestion

function getRandomHexCode(){
    let result = [];
    let hexRef = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
    result.push("#");
    for (let n = 0; n < 6; n++){
        result.push(hexRef[Math.floor(Math.random() * 16)]);
    }
    return result.join('');
}//getrandomhexcode

function pop(button){
    if(flipflop == false){
    document.getElementById(button).style.animation = "pulse .5s ease-out";
    flipflop = true;
    setTimeout(recolour, 250, button);
    }
}//pop
function recolour(button){
    if(gamemode == "standard"){
        if(document.getElementById(button).innerHTML == colorCode){
            document.getElementById(button).style.backgroundColor = "#00FF00";
            document.getElementById(button).innerHTML = "CORRECT";
            score++;
        }
        else{
            document.getElementById(button).style.backgroundColor = "#FF0000";
            document.getElementById(button).innerHTML = "INCORRECT";
        };
    }else if(gamemode == "flipped"){
        if(hexes[button] == colorCode){
            document.getElementById(button).style.backgroundColor = "#00FF00";
            document.getElementById(button).innerHTML = "CORRECT";
            score++;
        }else{
            document.getElementById(button).style.backgroundColor = "#FF0000";
            document.getElementById(button).innerHTML = "INCORRECT";
        }
    }
    setTimeout(disappear, 250, button);
}//recolour
function disappear(button) {
    document.getElementById(button).style.animation = "none";
    setTimeout(anotherquestion, 500, button);
    
}//disappear
function anotherquestion(button) {
    document.getElementById("score").innerHTML = score + "/10";
    document.getElementById(button).style.backgroundColor = "#CFCCD6";
    flipflop = false;
    total++;
    if(total == 10){
        endGame();
    }else{
    loadNewQuestion();
    }
}//anotherquestion
function endGame(){
    for (let i = 0; i < answers.length; i++){
        answers[i].style.display = "none";
        colorSample.style.display = "none";
        document.getElementById("title").innerHTML = "Final Score:";
        document.getElementById("replay").style.display = "block";
    }
}//endgame

// load the service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('sw.js').then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
      }, function(error) {
        console.log('Service Worker registration failed:', error);
      });
    });
  }  

  // handle install prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const installButton = document.getElementById('installButton');
  installButton.style.display = 'block';

  installButton.addEventListener('click', () => {
    installButton.style.display = 'none';
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  });
}); 
function yarr(){
    window.location.reload();
}