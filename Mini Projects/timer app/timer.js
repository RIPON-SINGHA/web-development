const hours = document.querySelector(".hour-time")
const minutes = document.querySelector(".minute-time")
const seconds = document.querySelector(".second-time")
const startBtn = document.querySelector(".startBtn")
const pauseBtn = document.querySelector(".pauseBtn")
const resetBtn = document.querySelector(".resetBtn")
const resumeBtn = document.querySelector(".resumeBtn")

let remainingTime
let timerID
let elapsedTime = 0
let elapsedSoFar = 0
let timerBeginTime = 0
let hour
let minute
let second
let totalDuration = 170

resumeBtn.disabled = true
resetBtn.disabled = true
pauseBtn.disabled = true

function startTimer(totalDuration) {
    timerBeginTime = new Date()

    function checkDifference() {
        let currentTimeStamp = new Date()
        elapsedSoFar = elapsedTime + (currentTimeStamp - timerBeginTime) / 1000
        remainingTime = (totalDuration - elapsedSoFar)
        
        if (remainingTime <= 0) {
            console.log("0")
            clearInterval(timerID)
            console.log("Timer has finished...")
        } else {
            hour = Math.floor(remainingTime / 3600)
            minute = Math.floor((remainingTime % 3600) / 60)
            second = Math.floor(remainingTime % 60) 
        }
    }

    timerID = setInterval(()=> {
        checkDifference()
        showTimer()
    })
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
    //totalDuration = 0
    elapsedSoFar = 0
    elapsedTime = 0
    timerID = null
    startBtn.disabled = false
    pauseBtn.disabled = true
    resetBtn.disabled = true
    resumeBtn.disabled = true
    hours.textContent = "00"
    minutes.textContent = "00"
    seconds.textContent = "00"
}

function showTimer() {
    hours.textContent = String(hour).padStart(2, "0")
    minutes.textContent = String(minute).padStart(2, "0")
    seconds.textContent = String(second).padStart(2, "0")
}

startBtn.addEventListener("click", () => {startTimer(totalDuration)})
pauseBtn.addEventListener("click", pauseTimer)
resumeBtn.addEventListener("click", resumeTimer)
resetBtn.addEventListener("click", resetTimer)


