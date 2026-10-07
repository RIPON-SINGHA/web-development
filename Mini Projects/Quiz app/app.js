const selectScreen = document.querySelector("#select-screen")
const quizScreen = document.querySelector("#quiz-screen")
const resultScreen = document.querySelector("#result-screen")

const selectCategory = document.querySelector("#quiz-category")
const selectDifficulty = document.querySelector(".difficulty-options")

const startQuizBtn = document.querySelector(".start-quiz-button")

let currAppScreen = "select"

const selectScreenState = {
    difficulty: null,
    category : "9" 
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
}

function decode(text) {
    return new DOMParser().parseFromString(text, "text/html").documentElement.textContent
}

function shuffleAnswerOptions(options) {
    for (let i = questions.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }

    return questions;
}

function createQuizStateObject() {
    return {questions: [], userAnswers: [], timeLeft: 0, currIdx: 0, score: 0}
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

    let diff = selectScreenState.difficulty
    let cat = selectScreenState.category
    
    const quizQuestions = await getQuizQuestions(diff, cat)
    if(!quizQuestions) {
        console.log("something went wrong, please try again!")
        return
    };
    quizScreenState = createQuizStateObject()

    getRefinedQuestionsAndOptions(quizQuestions)
    console.log(quizQuestions)

    changeScreen("quiz")
})

showAppScreen()