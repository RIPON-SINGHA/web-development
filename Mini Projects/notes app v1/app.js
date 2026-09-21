const createNotePage = document.querySelector(".app-container")
const noteAppPage = document.querySelector(".main-app-container")

const noteListContainer = document.querySelector(".note-list-container")

const noteEditorTopbar = document.querySelector(".editor-topbar")
const noteTitle = document.querySelector(".note-title")
const noteTextArea = document.querySelector(".editor-textarea")
const deleteNoteBtn = document.querySelector(".delete-note")

let savedNotes = JSON.parse(localStorage.getItem("savedNotes"))

let noteArray = savedNotes || []
let activeNoteId = 0

function renderApp() {

    if (noteArray.length === 0) {
        createNotePage.classList.remove("hidden")
        noteAppPage.classList.add("hidden")
    } else {
        noteAppPage.classList.remove("hidden")
        createNotePage.classList.add("hidden")
    }

    defaultEditorAppearance()
    renderNoteList()
}

function createNewNote() {
    let newNote = {
        id: Date.now(),
        title: "",
        body: "" 
    }

    noteArray.push(newNote)
    saveToLocalStorage()
    renderApp()
    renderNoteList()
    renderNoteEditor(newNote.id) 
}

function renderNoteList() {
    noteListContainer.innerHTML = ""

    const numberOfNotes = noteArray.length
    const numberOfNotesEl = document.createElement("div")
    numberOfNotesEl.classList.add("list-number")
    numberOfNotesEl.textContent = `${numberOfNotes} Notes`
    noteListContainer.append(numberOfNotesEl)

    noteArray.forEach(note => {
        const noteListEl = document.createElement("div")
        const noteListTitle = document.createElement("p")
        noteListEl.classList.add("note-list")
        noteListEl.id = note.id
        noteListTitle.classList.add("note-indicator-title")
        noteListTitle.textContent = note.title || "Untitled"

        noteListEl.append(noteListTitle)
        noteListContainer.append(noteListEl)
        
    });
}

function renderNoteEditor(noteId) {
    const note = noteArray.find(item => item.id === noteId)

    activeNoteId = note.id
    noteTitle.value = note.title
    noteTextArea.value = note.body
    deleteNoteBtn.id = activeNoteId

    noteTitle.disabled = false
    noteTextArea.disabled = false
}

function defaultEditorAppearance() {
    noteTitle.value = "No note selected"
    noteTextArea.value = "Select a note first"
    noteTitle.disabled = true
    noteTextArea.disabled = true
}

document.addEventListener("click", (e) => {
    if(e.target.classList.contains("create-note-button")) {
        createNewNote()
        noteTitle.focus()
    }
})

noteListContainer.addEventListener("click", (e) => {
    const noteEl = e.target.closest(".note-list")
    if(noteEl) {
        const noteId = Number(noteEl.id)
        renderNoteEditor(noteId)
    }
})

noteTitle.addEventListener("input", () => {
    if(!activeNoteId) return
    const currentNoteInList = noteArray.find(item => item.id === activeNoteId)

    currentNoteInList.title = noteTitle.value
    saveToLocalStorage()
    renderNoteList()
})

noteTextArea.addEventListener("input", () => {
    if(!activeNoteId) return
    const currentNoteInEditor = noteArray.find(item => item.id === activeNoteId)

    currentNoteInEditor.body = noteTextArea.value
    saveToLocalStorage()
})

deleteNoteBtn.addEventListener("click", (e) => {
    if(!activeNoteId) return
    noteArray = noteArray.filter(item => item.id != activeNoteId)
    activeNoteId = 0

    saveToLocalStorage()
    renderApp()

    if(noteArray.length > 0) {
        renderNoteEditor(noteArray[0].id)
    }
})

function saveToLocalStorage() {
    localStorage.setItem("savedNotes", JSON.stringify(noteArray))   
}

renderApp()


function clearLocal() {
    localStorage.clear()
    window.location.reload()
}

