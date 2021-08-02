let word = window.location.href.split('?')[1]
let currentLetter = 0
let gameRunning = false

let timer

let startContainer = document.querySelector("#start")
let wordContainer = document.querySelector("#word")
let timerContainer = document.querySelector("#timer")

document.addEventListener('keydown', handleKeys)

function showWord() { 
  let w = word.split("")
  
  wordContainer.innerHTML = ""
  
  w.forEach(function(letter, index) {
    if (index < currentLetter) {
      wordContainer.innerHTML += "<span class='correct'>" + letter + "</span>"
    } else {
      wordContainer.innerHTML += "<span>" + letter + "</span>"
    }
  })
}

function handleKeys(e) {
  let key = ""
  
  key = e.key
  
  if (key == " ") {
    if (!gameRunning) {
      startGame()
    }
  } else {
    if (gameRunning) {
      paintWord(key)
    }
  }
}

function paintWord(key){
  let w = word.split("")
  
  if (key.toLowerCase() == w[currentLetter]) {
    if (currentLetter >= w.length - 1) {
      clearTimeout(timer)
      gameOver()
    } 
    currentLetter++
    
    showWord()
  }
}

function textifyTime(t) {
  return new Date(t).toISOString().slice(14, -1);
}

function startGame() {
  currentLetter = 0
  
  let start = new Date().getTime();

  timer = setInterval(function() {
    let now = new Date().getTime();
    let time = now - start;

    timerContainer.innerHTML = textifyTime(time)
    time++
  }, 1)
  
  startContainer.hidden = true;
  
  showWord()
  
  gameRunning = true
}

function gameOver() {
  gameRunning = false
  
  startContainer.innerHTML = "Press Spacebar to restart"
  startContainer.hidden = false;
}