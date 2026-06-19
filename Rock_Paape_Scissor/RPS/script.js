const stoneEl = document.querySelector(".stone");
const paperEl = document.querySelector(".paper");
const scissorEl = document.querySelector(".scissor");
const resetEl = document.querySelector(".reset")
const resultEl = document.querySelector(".result")
const movesEl = document.querySelector(".moves")
const scoreEl = document.querySelector(".score")

let score = JSON.parse(localStorage.getItem("savedScore")) || {
    win: 0,
    lose: 0,
    tie: 0
}
showScore( )

// take user's input
stoneEl.addEventListener("click", () => {
  gameplay("rock");
});

paperEl.addEventListener("click", () => {
  gameplay("paper");
});

scissorEl.addEventListener("click", () => {
  gameplay("scissor");
});

resetEl.addEventListener("click", () => {
    resetState();
});

//check and show the result if user won or lose or tie
function gameplay(playerMove) {
    let compMove = computerMove()
    let result = ""
  if (playerMove === compMove) {
    result = "TIE";
    score.tie += 1
  } else if (
    (playerMove === "rock" && compMove === "paper") ||
    (playerMove === "paper" && compMove === "scissor") ||
    (playerMove === "scissor" && compMove === "rock")
  ) {
    result = "LOSE"
    score.lose += 1
  } else {
    result = "WIN"
    score.win += 1
  }

  saveScore()
  showResult(result)
  showMoves(playerMove, compMove)
  showScore()
}

function computerMove() {
    let compMove = ""
    let randNum = Math.random()

    if (randNum >= 0 && randNum < 1/3) {
        compMove = "rock"
    } else if (randNum >= 1/3 && randNum < 2/3) {
        compMove = "paper"
    } else if (randNum >= 2/3 && randNum < 1) {
        compMove = "scissor"
    }

    return compMove
}

function showResult(result) {
    resultEl.innerHTML = result
}

function showMoves(playerMove, compMove) {
    movesEl.innerHTML = `YOUR MOVE: ${playerMove.toUpperCase()}, COMPUTER MOVE: ${compMove.toUpperCase()}`
}
//show the score win:0, lose:0, tie:0
function showScore() {
    scoreEl.innerHTML = `WIN: ${score.win}, LOSE: ${score.lose}, TIE: ${score.tie}`
}

function saveScore() {
    localStorage.setItem("savedScore", JSON.stringify(score))
}

//reset the score
function resetState() {
    score = {
        win: 0,
        lose: 0,
        tie: 0
    }
    saveScore()
    movesEl.innerHTML = ""
    resultEl.innerHTML = ""
    showScore()
}

