const selectScreen = document.querySelector("#select-screen")
const quizScreen = document.querySelector("#quiz-screen")
const resultScreen = document.querySelector("#result-screen")

const selectCategory = document.querySelector("#quiz-category")
const selectDifficulty = document.querySelector(".difficulty-options")

const startQuizBtn = document.querySelector(".start-quiz-button")

const quizOptionContainer = document.querySelector(".quiz-answer-options")
const questionNumberCount = document.querySelector(".attempts")
const showScore = document.querySelector(".show-current-score")
const timerBarFill = document.querySelector(".time-fill")
const secondsLeft = document.querySelector(".timer-text")

const showQuizCatergory = document.querySelector(".quiz-category")
const showQuizDifficulty = document.querySelector(".question-difficulty")

const quizQuestionsEl = document.querySelector(".quiz-question")
const sumbitAnswer = document.querySelector(".submit-answer")

const resultScreenPoints = document.querySelector(".points-got")
const totalPoints = document.querySelector(".total-points")
const appriciationText = document.querySelector(".appriciation-text")
const quizInfo = document.querySelector(".quiz-info-result-screen")
const correctAnsNumber = document.querySelector(".correct-number")
const wrongAnsNumber = document.querySelector(".wrong-number")
const timedOutNumber = document.querySelector(".timeout-number")

const wrongAnswersReviewContainer = document.querySelector(".review-wrong-answers")

const playAgainBtn = document.querySelector(".play-again-button")
const changeCategoryBtn = document.querySelector(".change-category-button")

const scoreboardList = document.querySelector(".scoreboard-list")

const viewScoreBoardFromResultScreen = document.querySelector(".view-scoreboard-result-button")
const viewScoreBoardFromSelectScreen = document.querySelector(".view-scoreboard-button")

const scoreboardBackBtn = document.querySelector(".scoreboard-back-button")
const deleteScoreboard = document.querySelector(".clear-scoreboard-button")

let timerId = null
let currAppScreen = "select"

const SCOREBOARD_KEY = "quizScoreboard"
const MAX_SCORE = 10

const selectScreenState = {
    difficulty: null,
    category : "11" 
}

let quizScreenState = createQuizStateObject()

function showAppScreen() {

    document.querySelectorAll(".app-screen").forEach(el => {
        el.classList.add("hidden")
    })

    document.getElementById(`${currAppScreen}-screen`).classList.remove("hidden")
}

function changeScreen(screen) {

    currAppScreen = screen
    showAppScreen()
    console.log(selectScreenState)
}

async function getQuizQuestions(diff, cat) {
    try{
        const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${cat}&difficulty=${diff}&type=multiple`)

        if(!response.ok){
            throw new Error(`Error: Server Couldn't Load Any Data || ${response.status}`)
        }
        
        const data = await response.json()

        if(data.response_code !== 0){
            throw new Error("Something went wrong, please try again!")
        } else {
            const questions = data.results
            return questions
        }
    } catch (error) {
        console.error(error.message)
    }
}

function getRefinedQuestionsAndOptions(questions) {

    questions.forEach(ques => {
        const question = decode(ques.question)
        const correctAns = decode(ques.correct_answer)
        const wrongAns = ques.incorrect_answers.map(item => decode(item))
        const options = shuffleAnswerOptions([correctAns, ...wrongAns])

        quizScreenState.questions.push({question, options, correctAns})
        
    })
    console.log(quizScreenState)
}

function decode(text) {
    return new DOMParser().parseFromString(text, "text/html").documentElement.textContent
}

function shuffleAnswerOptions(options) {
    for (let i = options.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    return options
}

function createQuizStateObject() {
    return {questions: [], userAnswers: [], timeLeft: 0, currIdx: 0, score: 0, selectedAnswer: null}
}

function renderQuizScreen() {
    questionNumberCount.textContent = `${quizScreenState.currIdx + 1} / ${quizScreenState.questions.length}`
    showScore.textContent = `Score ${quizScreenState.score}`
    showQuizCatergory.textContent = selectCategory.options[selectCategory.selectedIndex].text
    showQuizDifficulty.textContent = selectScreenState.difficulty
    sumbitAnswer.disabled = true


    const q = quizScreenState.questions[quizScreenState.currIdx]
    quizQuestionsEl.textContent = q.question
    const quizAnswerOptions = document.querySelectorAll(".answer-option-button")
    quizAnswerOptions.forEach((btn, i) => {
        btn.textContent = q.options[i]
        btn.classList.remove("selected")
    })
}

function advanceGame(answer) {
    sumbitAnswer.disabled = false
    document.querySelectorAll(".answer-option-button").forEach(el => {
        el.disabled = false
        el.classList.remove("user-ans-color")
        el.classList.remove("correct-ans-color")
    })
    stopTimer()
    quizScreenState.userAnswers.push(answer)
    const currentQuestion =  quizScreenState.questions[quizScreenState.currIdx]
    if(quizScreenState.userAnswers[quizScreenState.currIdx] === currentQuestion.correctAns) {
        quizScreenState.score += 1
    }
    quizScreenState.selectedAnswer = null
    quizScreenState.currIdx += 1
    if(quizScreenState.currIdx === quizScreenState.questions.length) {
        const gameResult = buildResultData()
        buildResultUi(gameResult)
        saveScore(gameResult)
        changeScreen("result")
    } else {
        renderQuizScreen()
        startTimer()
    }
}

function updateTimerUi() {
    secondsLeft.textContent = quizScreenState.timeLeft < 10 ? `0${quizScreenState.timeLeft}s` : `${quizScreenState.timeLeft}s`
    timerBarFill.style.width = (quizScreenState.timeLeft / 15) * 100 + "%"
}

function stopTimer() {
    clearInterval(timerId)
}

function startTimer() {
    stopTimer()
    quizScreenState.timeLeft = 15
    timerBarFill.style.transition = "none"
    timerBarFill.style.width = "100%"        
    timerBarFill.offsetWidth                 
    timerBarFill.style.transition = ""      
    updateTimerUi()
    let time = Date.now()
    timerId = setInterval(() => {
        quizScreenState.timeLeft -= 1
        updateTimerUi()
        if(quizScreenState.timeLeft === 0) {
            console.log(Date.now()-time)
            showFeedback(null)
        }
    }, 1000)
}

function buildResultData() {
    const result = {correct: 0, wrong: 0, timedOut: 0, totalQuestions: quizScreenState.questions.length, wrongList: []}

    quizScreenState.questions.forEach((q, i) => {
        const ans = quizScreenState.userAnswers[i]

        if(ans === null) {
            result.timedOut += 1
            result.wrongList.push({question: q.question, yourAns: ans, correctAnswer: q.correctAns})
        } else if(ans === q.correctAns) {
            result.correct += 1
        } else {
            result.wrong += 1
            result.wrongList.push({question: q.question, yourAns: ans, correctAnswer: q.correctAns})
        }
    })

    return result
}

function buildResultUi(result) {
    const quizResult = result
    resultScreenPoints.textContent = quizResult.correct
    totalPoints.textContent = `out of ${quizResult.totalQuestions}`

    if(quizResult.correct === 0) {
        appriciationText.textContent = "Go Study"
    } else if(quizResult.correct <= 3) {
        appriciationText.textContent = "Nice Work"
    } else if (quizResult.correct <= 7){
        appriciationText.textContent = "Great Job"
    } else {
        appriciationText.textContent = "Absolute Banger"
    }

    quizInfo.innerHTML = `<span>${selectScreenState.difficulty}</span><span>.</span><span>${selectCategory.options[selectCategory.selectedIndex].text}</span>`
    correctAnsNumber.textContent = quizResult.correct
    wrongAnsNumber.textContent = quizResult.wrong
    timedOutNumber.textContent = quizResult.timedOut

    wrongAnswersReviewContainer.innerHTML = ""

    quizResult.wrongList.forEach(item => {
        const wrongAnswerEl = document.createElement("div")
        wrongAnswerEl.classList.add("wrong-answers")
        const reviewQuestion = document.createElement("div")
        reviewQuestion.classList.add("review-question")
        const reviewAnswerEl = document.createElement("div")
        reviewAnswerEl.classList.add("review-your-answer")
        const yourAnsEl = document.createElement("div")
        yourAnsEl.classList.add("your-answer")
        const correctAnsEl = document.createElement("div")
        correctAnsEl.classList.add("correct-answer")
        const label = document.createElement("span")
        label.textContent = "Your answer"
        const value = document.createElement("span")
        value.textContent = item.yourAns ?? "No answer"
        const correctAnsLabel = document.createElement("span")
        correctAnsLabel.textContent = "Correct answer"
        const correctAnsvalue = document.createElement("span")
        correctAnsvalue.textContent = item.correctAnswer
        reviewQuestion.textContent = item.question
        yourAnsEl.append(label, ": ", value)
        correctAnsEl.append(correctAnsLabel, ": ", correctAnsvalue)
        reviewAnswerEl.append(yourAnsEl, correctAnsEl)
        wrongAnswerEl.append(reviewQuestion, reviewAnswerEl)
        wrongAnswersReviewContainer.appendChild(wrongAnswerEl)
    })

}

async function startGame() { 
    const quizQuestions = await getQuizQuestions(selectScreenState.difficulty, selectScreenState.category)
    if(!quizQuestions) return;

    quizScreenState = createQuizStateObject()
    getRefinedQuestionsAndOptions(quizQuestions)
    renderQuizScreen()
    changeScreen("quiz")
    startTimer()
}   

function showFeedback(answer) {
    stopTimer()
    sumbitAnswer.disabled = true
    document.querySelectorAll(".answer-option-button").forEach(el => {
        el.disabled = true
    })
    const userAnsEl = [...document.querySelectorAll(".answer-option-button")].find(el => el.textContent === answer)
    const correctAnsEl = [...document.querySelectorAll(".answer-option-button")].find(el => el.textContent === quizScreenState.questions[quizScreenState.currIdx].correctAns)
    if(userAnsEl) {
        userAnsEl.classList.add("user-ans-color")
    }
    correctAnsEl.classList.add("correct-ans-color")
    setTimeout(() => {
        advanceGame(answer)
    }, 500);
}

function saveScore(gameResult) {
    const savedEntry = {
        score: gameResult.correct,
        total: gameResult.totalQuestions,
        category: selectCategory.options[selectCategory.selectedIndex].text,
        difficulty: selectScreenState.difficulty,
        date: new Date().toISOString()
    }

    const savedScore = getSavedScore()
    savedScore.push(savedEntry)

    savedScore.sort((a, b) => b.score - a.score || new Date(b.date) - new Date(a.date))

    const topScores = savedScore.slice(0, MAX_SCORE)

    try {
        localStorage.setItem(SCOREBOARD_KEY, JSON.stringify(topScores))
    } catch (error) {
        console.log("Data couldn't save to scoreboard...", error.message)
    }
}

function getSavedScore() {
    try {
        const saved = JSON.parse(localStorage.getItem(SCOREBOARD_KEY))
        return Array.isArray(saved) ? saved : []
    } catch (error) {
        console.log("Couldn't read the score board data...", error.message)
        return []
    }
}

function renderScoreBoard() {
    const scores = getSavedScore()
    scoreboardList.innerHTML = ""

    if(scores.length === 0) {
        const emptyEl = document.createElement("div")
        emptyEl.classList.add("scoreboard-empty")
        emptyEl.textContent = "No scores yet. Play a quiz to get on the board!"
        scoreboardList.appendChild(emptyEl)
        return
    }

    scores.forEach((score, i) => {
        const rowEL = document.createElement("div")
        rowEL.classList.add("scoreboard-row")

        const rankEl = document.createElement("span")
        rankEl.classList.add("scoreboard-rank")
        rankEl.textContent = `#${i + 1}`

        const scoreEl = document.createElement("span")
        scoreEl.classList.add("scoreboard-score")
        scoreEl.textContent = `${score.score} / ${score.total}`

        const infoEl = document.createElement("span")
        infoEl.classList.add("scoreboard-info")
        infoEl.textContent = `${score.difficulty} . ${score.category}`

        const dateEl = document.createElement("span")
        dateEl.classList.add("scoreboard-date")
        dateEl.textContent = new Date(score.date).toLocaleDateString()

        rowEL.append(rankEl, scoreEl, infoEl, dateEl)
        scoreboardList.appendChild(rowEL)
    })
}

function showScoreboard() {
    renderScoreBoard()
    changeScreen("scoreboard")
}

selectCategory.addEventListener("change", (e) => {
    selectScreenState.category = e.target.value
})

selectDifficulty.addEventListener("click", (e) => {
    const diffBtn = e.target.closest(".difficulty-btn")
    if(!diffBtn) return
    selectScreenState.difficulty = diffBtn.dataset.difficulty
    
    document.querySelectorAll(".difficulty-btn").forEach(el => {
        el.classList.remove("active")
    })

    diffBtn.classList.add("active")

})

startQuizBtn.addEventListener("click", async () => {

    if(!selectScreenState.difficulty) {
        alert("You have to select difficulty to continue....")
        return
    }

    startGame()
})

quizOptionContainer.addEventListener("click", (e) => {
    const optionBtn = e.target.closest(".answer-option-button")
    if(!optionBtn) return 

    document.querySelectorAll(".answer-option-button").forEach(el => {
        el.classList.remove("selected")
    })

    optionBtn.classList.add("selected")

    quizScreenState.selectedAnswer = optionBtn.textContent
    sumbitAnswer.disabled = false
})

sumbitAnswer.addEventListener("click", (e)=> {
    const answer = quizScreenState.selectedAnswer
    showFeedback(answer)
    console.log(quizScreenState.userAnswers)
})

playAgainBtn.addEventListener("click", startGame)

changeCategoryBtn.addEventListener("click", () => {
    changeScreen("select")
})

viewScoreBoardFromResultScreen.addEventListener("click", showScoreboard)
viewScoreBoardFromSelectScreen.addEventListener("click", showScoreboard)

scoreboardBackBtn.addEventListener("click", () => {
    changeScreen("select")
})

deleteScoreboard.addEventListener("click", () => {
    if(!confirm("Do you want to delete all scores from scoreboard?")) return
    try{
        localStorage.removeItem(SCOREBOARD_KEY)
    } catch (error) {
        console.log("Couldn't finish the job.", error.message)
    }

    renderScoreBoard()
})



showAppScreen()