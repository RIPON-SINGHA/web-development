const navbar = document.querySelector(".main-nav")
// const clockBtn = document.querySelector("#clockBtn")
// const stopwatchBtn = document.querySelector("#stopwatchBtn")
// const timerBtn = document.querySelector("#timerBtn")

// const clockSection = document.querySelector("#clock-section")
// const stopwatchSection = document.querySelector("#stopwatch-section")
// const timerSection = document.querySelector("#timer-section")

// clockBtn.addEventListener("click", () => {
//     clockSection.classList.remove("hidden")
//     stopwatchSection.classList.add("hidden")
//     timerSection.classList.add("hidden")
// })

// stopwatchBtn.addEventListener("click", () => {
//     stopwatchSection.classList.remove("hidden")
//     clockSection.classList.add("hidden")
//     timerSection.classList.add("hidden")
// })

// timerBtn.addEventListener("click", () => {
//     timerSection.classList.remove("hidden")
//     clockSection.classList.add("hidden")
//     stopwatchSection.classList.add("hidden")
// })

const pageSections = document.querySelectorAll(".page-section")

navbar.addEventListener("click", (e) => {
    if(!e.target.classList.contains("nav-btn")){
        return;
    }

    pageSections.forEach(section => section.classList.add("hidden"))

    const targetId = e.target.dataset.target 
    document.getElementById(targetId).classList.remove("hidden")
})