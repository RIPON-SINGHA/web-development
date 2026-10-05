const createNotePage = document.querySelector(".app-container")
const noteAppPage = document.querySelector(".main-app-container")

const noteListContainer = document.querySelector(".note-list-container")

const noteEditorTopbar = document.querySelector(".editor-topbar")
const noteTitle = document.querySelector(".note-title")
const noteTextArea = document.querySelector(".editor-textarea")
const deleteNoteBtn = document.querySelector(".delete-note")

const searchNoteEl = document.querySelector(".search-note")

const characterCountEl = document.querySelector(".character-count")

const lastSavedTimeIndicator = document.querySelector(".last-saved-time-indicator")

const exportBtnEL = document.querySelector(".exportBtn")

const changeModeBtn = document.querySelector(".change-theme")

const formattingEl = document.querySelector(".formatting-area")

const hilightColorResetBtn = document.querySelector(".highlight-reset")
const textColorResetBtn = document.querySelector(".text-color-reset")

let savedNotes = JSON.parse(localStorage.getItem("savedNotes"))

let noteArray = savedNotes || []
let activeNoteIdToOpen = JSON.parse(localStorage.getItem("activeNoteIdToOpen"))
let activeNoteId = activeNoteIdToOpen || 0
let debounceTimer

function renderApp() {

    if (noteArray.length === 0) {
        createNotePage.classList.remove("hidden")
        noteAppPage.classList.add("hidden")
    } else {
        noteAppPage.classList.remove("hidden")
        createNotePage.classList.add("hidden")
    }

    if (activeNoteIdToOpen > 0) {
        renderNoteEditor(activeNoteIdToOpen)
    }
    
    renderNoteList(noteArray)
}

function createNewNote() {
    let newNote = {
        id: Date.now(),
        title: "",
        body: "",
        updatedAt: Date.now(),
        isPinned :false
    }

    noteArray.push(newNote)
    saveToLocalStorage()
    renderApp()
    renderNoteEditor(newNote.id) 
}

function renderNoteList(notes) {
    const pinnedNotes = notes.filter(item => item.isPinned)
    pinnedNotes.sort((a, b) => b.updatedAt - a.updatedAt)

    const unpinnedNotes = notes.filter(item => !item.isPinned)
    unpinnedNotes.sort((a, b) => b.updatedAt - a.updatedAt)

    notes = pinnedNotes.concat(unpinnedNotes)
    
    noteListContainer.innerHTML = ""

    const numberOfNotes = noteArray.length
    const numberOfNotesEl = document.createElement("div")
    numberOfNotesEl.classList.add("list-number")
    numberOfNotesEl.textContent = `${numberOfNotes} Notes`
    noteListContainer.append(numberOfNotesEl)

    notes.forEach(note => {
        const noteListEl = document.createElement("div")
        const noteListTitle = document.createElement("p")
        const pinned = document.createElement("span")
        noteListEl.classList.add("note-list")
        noteListEl.id = note.id
        noteListTitle.classList.add("note-indicator-title")
        noteListTitle.textContent = note.title || "Untitled"
        pinned.textContent = "📌"
        pinned.className = note.isPinned ? "pinned" : "un-pinned"

        noteListEl.append(noteListTitle, pinned)
        noteListContainer.append(noteListEl)

        pinned.addEventListener("click", () => {
            note.isPinned = !note.isPinned   
            saveToLocalStorage()
            renderNoteList(noteArray)
        })
    
    });
}


function renderNoteEditor(noteId) {
    const note = noteArray.find(item => item.id === noteId)

    activeNoteId = note.id
    noteTitle.value = note.title
    noteTextArea.innerHTML = note.body
    deleteNoteBtn.id = activeNoteId

    localStorage.setItem("activeNoteIdToOpen", activeNoteId)
    activeNoteIdToOpen = activeNoteId

    noteTitle.disabled = false
    showLastSavedTime()
    characterWordCount(noteTextArea.innerText)
}

function debounceSave() {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
        const currentActiveNote = noteArray.find(item => item.id === activeNoteId)
        currentActiveNote.updatedAt = Date.now()
        saveToLocalStorage()
        renderNoteList(noteArray)
        showLastSavedTime()
    }, 500);
    
}

function showLastSavedTime() {
    if(!activeNoteId) return
    const activeNote = noteArray.find(item => item.id === activeNoteId)

    if(!activeNote) return
    const date = new Date(activeNote.updatedAt)

    const hour = date.getHours()
    const minute = date.getMinutes()

    lastSavedTimeIndicator.textContent = `${hour}:${minute < 10 ? '0' + minute : minute}`
}

function characterWordCount(noteBody) {
    const characterCount = noteBody.length
    const wordCount = noteBody.split(" ").filter(word => word !== "").length

    characterCountEl.textContent = `${characterCount} Characters , ${wordCount} Words`
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
    debounceSave()
})

noteTextArea.addEventListener("input", () => {
    if(!activeNoteId) return
    const currentNoteInEditor = noteArray.find(item => item.id === activeNoteId)

    currentNoteInEditor.body = noteTextArea.innerHTML
    debounceSave()
    characterWordCount(noteTextArea.innerText)
})

deleteNoteBtn.addEventListener("click", () => {
    if(!activeNoteId) return
    const deleteIndex = noteArray.findIndex(item => item.id === activeNoteId)
    noteArray = noteArray.filter(item => item.id != activeNoteId)
    activeNoteId = 0
    activeNoteIdToOpen = 0
    localStorage.removeItem("activeNoteIdToOpen")
    saveToLocalStorage()
    renderApp()

    if(noteArray.length > 0) {
        renderNoteEditor(noteArray[deleteIndex - 1]?.id || noteArray[0].id)
    }
})

document.addEventListener("keydown", (e) => {
    const isCtrlKey = (e.ctrlKey) && (e.altKey) && !e.shiftKey
    if ((isCtrlKey && e.key.toLocaleLowerCase() === 'n')) {
        e.preventDefault()
        createNewNote()
        noteTitle.focus()
    }
})

searchNoteEl.addEventListener('input', () => {
    if(!searchNoteEl) return 
    const filteredArray = noteArray.filter(item => item.title.toLowerCase().includes(searchNoteEl.value.toLowerCase()))

    renderNoteList(filteredArray)
})

exportBtnEL.addEventListener("click", () => {
    const noteToExport = noteArray.find(item => item.id === activeNoteId)
    const blob = new Blob([noteToExport.body], {type : "text/html"})
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")

    link.href = url
    link.download = `${noteToExport.title || "Untitled"}.html`
    link.click()

    URL.revokeObjectURL(url)
})

changeModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode")
    const isDark = document.body.classList.contains("dark-mode")
    changeModeBtn.textContent = isDark ? "🌙" : "☀️"

    localStorage.setItem("theme", isDark ? "dark" : "light")
})

formattingEl.addEventListener("click", (e) => {    
    const element = e.target.closest(".format-icon")
    if (!element) return

    const command = element.dataset.command
    const value = element.dataset.value

    if (command === "formatBlock"){
        const currentType = document.queryCommandValue("formatBlock")
        document.execCommand("formatBlock", false, currentType === value ? "p" : value)
    } else {
        document.execCommand(command, false, value)
    }
})

formattingEl.addEventListener("mousedown", (e) => {
    e.preventDefault()
})

hilightColorResetBtn.addEventListener("click", () => {
    const bg = "#292e36"
    if(document.body.classList.contains("dark-mode")) {
        document.execCommand("hiliteColor", false, bg)
    } else {
        document.execCommand("hiliteColor", false, "white")
    }
})

textColorResetBtn.addEventListener("click", () => {
    if(document.body.classList.contains("dark-mode")) {
        document.execCommand("foreColor", false, "white")
    } else {
        document.execCommand("foreColor", false, "black")
    }
})

function saveToLocalStorage() {
    localStorage.setItem("savedNotes", JSON.stringify(noteArray))   
}

function checkAppThemeMode() {
    if(localStorage.getItem("theme") === "dark") {
        document.body.className = "dark-mode"
        changeModeBtn.textContent = "🌙"
    }
}

renderApp()
checkAppThemeMode()

function clearLocal() {
    localStorage.clear()
    window.location.reload()
}

