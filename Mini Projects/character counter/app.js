const textArea = document.querySelector("#input-field")
const submitBtn = document.querySelector(".submitBtn")
const charCounterEl = document.querySelector(".character-counter")
const comfirmBtn = document.querySelector(".confirmBtn")
const popUpEL = document.querySelector(".popup")

let maxLength = 100
let currrentLen = 0

textArea.addEventListener("input", () => {
    currrentLen = textArea.value.length
    updateCounter()
    disableSubmitBtn()
    changeVisual()
})

submitBtn.addEventListener("click", () => {
    submitBtn.disabled = true
    showPopUp()
})

comfirmBtn.addEventListener("click", ()=> {
    removePopUp()
    submitBtn.disabled = false
    textArea.value = ""
    currrentLen = 0
    updateCounter()
    changeVisual()
})

function updateCounter() {
    charCounterEl.textContent = currrentLen + " characters"
}

function disableSubmitBtn() {
    if (currrentLen <= 0 || currrentLen > maxLength) {
        submitBtn.disabled = true
    } else {
        submitBtn.disabled = false
    }
}

function changeVisual() {
    if (currrentLen > maxLength) {
        textArea.className = "redShadow"
    } else if(currrentLen >= 75) {
        textArea.className = "greenShadow"
    } else if (currrentLen >= 60) {
         textArea.className = "yellowShadow"
    } else {
         textArea.className = ""
    }
}

function showPopUp () {
    popUpEL.classList.remove("hidden")
}

function removePopUp () {
    popUpEL.classList.add("hidden")
}

disableSubmitBtn() 