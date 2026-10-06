const appState = {
    questions : [],
    currentIdx : 0,
    score : 0,
    userAns : [],
    timeLeft : 15,
    screen : "result"
}

function showScreen() {
    if (appState.screen.toLowerCase() === "select") {
        console.log("this is a select screen")
    } else if (appState.screen.toLowerCase() === "quiz") {
        console.log("this is a quiz screen")
    } else if (appState.screen.toLowerCase() === "result") {
        console.log("this is a result screen")
    }
}

showScreen()