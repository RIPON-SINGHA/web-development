const hours = document.querySelector(".hour-time")
const minutes = document.querySelector(".minute-time")
const seconds = document.querySelector(".second-time")
const startBtn = document.querySelector(".startBtn")
const pauseBtn = document.querySelector(".pauseBtn")
const resetBtn = document.querySelector(".resetBtn")
const resumeBtn = document.querySelector(".resumeBtn")
const hourInput = document.querySelector("#hour")
const minuteInput = document.querySelector("#minute")
const secondInput = document.querySelector("#second")
const startTimerBtn = document.querySelector(".start-timer")
const timerInputArea = document.querySelector(".timer-input-container")

let remainingTime
let timerID
let elapsedTime = 0
let elapsedSoFar = 0
let timerBeginTime = 0
let hour = 0
let minute = 0
let second = 0
let totalDuration = 0

startBtn.disabled = true
resumeBtn.disabled = true
resetBtn.disabled = true
pauseBtn.disabled = true
startTimerBtn.disabled = true

function startTimer() {
    timerBeginTime = new Date()

    function checkDifference() {
        let currentTimeStamp = new Date()
        elapsedSoFar = elapsedTime + (currentTimeStamp - timerBeginTime) / 1000
        remainingTime = (totalDuration - elapsedSoFar)
        
        if (remainingTime <= 0) {
            clearInterval(timerID)
            console.log("Timer has finished...")

            hour = 0
            minute = 0
            second = 0
            showTimer()

            startBtn.disabled = false
            pauseBtn.disabled = true
            resetBtn.disabled = true

            setTimeout(() => {
                secondsToMinHour(totalDuration)
                showTimer()
            }, 800)
        } else {
            secondsToMinHour(Math.ceil(remainingTime))
        }
    }

    timerID = setInterval(()=> {
        checkDifference()
        showTimer()
    }, 1000)

    startBtn.disabled = true
    resumeBtn.disabled = true
    pauseBtn.disabled = false
    resetBtn.disabled = false
}

function pauseTimer() {
    elapsedTime = elapsedSoFar
    clearInterval(timerID)
    console.log("time Paused")
    resumeBtn.disabled = false
    startBtn.disabled = true
}

function resumeTimer() {
    startTimer(totalDuration)
    resumeBtn.disabled = true
}

function resetTimer() {
    clearInterval(timerID)
    elapsedSoFar = 0
    elapsedTime = 0
    timerID = null
    startBtn.disabled = false
    pauseBtn.disabled = true
    resetBtn.disabled = true
    resumeBtn.disabled = true
    getTimerInput()
}

function showTimer() {
    hours.textContent = String(hour).padStart(2, "0")
    minutes.textContent = String(minute).padStart(2, "0")
    seconds.textContent = String(second).padStart(2, "0")
}

function getTimerInput() {
    const inputHours = Number(hourInput.value * 3600)
    const inputMinutes = Number(minuteInput.value * 60)
    const inputSeconds = Number(secondInput.value)

    totalDuration = (inputHours + inputMinutes + inputSeconds)

    secondsToMinHour(totalDuration)

    hours.textContent = String(hour).padStart(2, "0")
    minutes.textContent = String(minute).padStart(2, "0")
    seconds.textContent = String(second).padStart(2, "0")

    startBtn.disabled = false
}

function secondsToMinHour(totalSeconds) {
    hour = Math.floor(totalSeconds / 3600)
    minute = Math.floor((totalSeconds % 3600) / 60)
    second = Math.floor(totalSeconds % 60) 
}

startBtn.addEventListener("click", startTimer)
pauseBtn.addEventListener("click", pauseTimer)
resumeBtn.addEventListener("click", resumeTimer)
resetBtn.addEventListener("click", resetTimer)
startTimerBtn.addEventListener("click", getTimerInput)
timerInputArea.addEventListener("input", (e)=> {
    if (!e.target.classList.contains("time-input")) {
        return;
    }

    let hours = Number(document.querySelector("#hour").value) || 0
    let minutes = Number(document.querySelector("#minute").value) || 0
    let seconds = Number(document.querySelector("#second").value) || 0

    let totaltime = hours + minutes + seconds
    let isNegative = hours < 0 || minutes < 0 || seconds < 0
    if (totaltime > 0 && !isNegative) {
        startTimerBtn.disabled = false
    } else {
        startBtn.disabled = true
        startTimerBtn.disabled = true
    } 
})