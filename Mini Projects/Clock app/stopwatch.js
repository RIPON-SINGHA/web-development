(function () {
    const stopwatchSectionEl = document.querySelector("#stopwatch-section")
    const hours = stopwatchSectionEl.querySelector(".hour-time")
    const minutes = stopwatchSectionEl.querySelector(".minute-time")
    const seconds = stopwatchSectionEl.querySelector(".second-time")
    const startBtn = stopwatchSectionEl.querySelector(".startBtn")
    const pauseBtn = stopwatchSectionEl.querySelector(".pauseBtn")
    const resetBtn = stopwatchSectionEl.querySelector(".resetBtn")
    const resumeBtn = stopwatchSectionEl.querySelector(".resumeBtn")

    let timerId
    let elapsedTime = 0
    let hour = 0
    let minute = 0
    let second = 0

    function startStopWatch() {

        startTimeStamp(elapsedTime)
    }    

    function pauseStopWatch() {
        clearInterval(timerId)
    }

    function resumeStopWatch() {
        
        startTimeStamp(elapsedTime)

    }

    function resetStopWatch() {
        elapsedTime = 0
        clearInterval(timerId)
        hours.textContent = "00"
        minutes.textContent = "00"
        seconds.textContent = "00"
    }

    function startTimeStamp(basetime) {
        let startTimeStamp = new Date()

        function checkDifference() {
            let currentTimeStamp = new Date()
            elapsedTime = (basetime + ((currentTimeStamp - startTimeStamp) / 1000))
            console.log(elapsedTime.toFixed(0))

            hour = Math.floor(elapsedTime / 3600)
            minute = Math.floor((elapsedTime % 3600) / 60)
            second = Math.floor(elapsedTime % 60)
        }

        timerId = setInterval(() => {
            checkDifference();
            showStopWatch();
        }, 1000)
    }

    function showStopWatch() {
        hours.textContent = String(hour).padStart(2, "0")
        minutes.textContent = String(minute).padStart(2, "0")
        seconds.textContent = String(second).padStart(2, "0")
    }

    startBtn.addEventListener("click", startStopWatch)
    pauseBtn.addEventListener("click", pauseStopWatch)
    resumeBtn.addEventListener("click", resumeStopWatch)
    resetBtn.addEventListener("click", resetStopWatch)
}) ();


// const hours = document.querySelector(".hour-time")
// const minutes = document.querySelector(".minute-time")
// const seconds = document.querySelector(".second-time")
// const startBtn = document.querySelector(".startBtn")
// const pauseBtn = document.querySelector(".pauseBtn")
// const resetBtn = document.querySelector(".resetBtn")
// const resumeBtn = document.querySelector(".resumeBtn")

// let timerId
// let elapsedTime = 0
// let hour = 0
// let minute = 0
// let second = 0

// function startStopWatch() {

//     startTimeStamp(elapsedTime)
// }    

// function pauseStopWatch() {
//     clearInterval(timerId)
// }

// function resumeStopWatch() {
    
//     startTimeStamp(elapsedTime)

// }

// function resetStopWatch() {
//     elapsedTime = 0
//     clearInterval(timerId)
//     hours.textContent = "00"
//     minutes.textContent = "00"
//     seconds.textContent = "00"
// }

// function startTimeStamp(basetime) {
//     let startTimeStamp = new Date()

//     function checkDifference() {
//         let currentTimeStamp = new Date()
//         elapsedTime = (basetime + ((currentTimeStamp - startTimeStamp) / 1000))
//         console.log(elapsedTime.toFixed(0))

//         hour = Math.floor(elapsedTime / 3600)
//         minute = Math.floor((elapsedTime % 3600) / 60)
//         second = Math.floor(elapsedTime % 60)
//     }

//     timerId = setInterval(() => {
//         checkDifference();
//         showStopWatch();
//     }, 1000)
// }

// function showStopWatch() {
//     hours.textContent = String(hour).padStart(2, "0")
//     minutes.textContent = String(minute).padStart(2, "0")
//     seconds.textContent = String(second).padStart(2, "0")
// }

// startBtn.addEventListener("click", startStopWatch)
// pauseBtn.addEventListener("click", pauseStopWatch)
// resumeBtn.addEventListener("click", resumeStopWatch)
// resetBtn.addEventListener("click", resetStopWatch)

