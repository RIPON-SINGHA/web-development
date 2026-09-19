const createNotePage = document.querySelector(".app-container")
const noteAppPage = document.querySelector(".main-app-container")

let savedNotes = JSON.parse(localStorage.getItem("savedNotes"))

let noteArray = savedNotes || []


if (noteArray.length === 0) {
    noteAppPage.classList.add("hidden")
} else {
    createNotePage.classList.add("hidden")
}

localStorage.setItem("savedNotes", JSON.stringify(noteArray))