const firstTaskCreateScreen = document.querySelector("#create-task-screen")
const kanbanBoardScreen = document.querySelector("#kanban-screen")


const firstTaskInputEl = document.querySelector(".first-task-input")
const addFirstTaskBtn = document.querySelector(".add-first-task")
const taskDescriptionEl = document.querySelector(".first-task-description")

const showTodoInputBtn = document.querySelector(".show-todo-input")
const todoTaskInput = document.querySelector(".todo-task-input")
const todoTaskDescription = document.querySelector(".todo-task-description")
const addNewTodoTaskContainer = document.querySelector(".add-new-todo-task")
const cancelCreateNewTask = document.querySelector(".cancel")
const addTodoTask = document.querySelector(".add-todo-task")

const searchTaskInput = document.querySelector(".search-task-input")

const deleteSVG = `<svg class= "delete-icon" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110.61 122.88"><title>trash</title><path d="M39.27,58.64a4.74,4.74,0,1,1,9.47,0V93.72a4.74,4.74,0,1,1-9.47,0V58.64Zm63.6-19.86L98,103a22.29,22.29,0,0,1-6.33,14.1,19.41,19.41,0,0,1-13.88,5.78h-45a19.4,19.4,0,0,1-13.86-5.78l0,0A22.31,22.31,0,0,1,12.59,103L7.74,38.78H0V25c0-3.32,1.63-4.58,4.84-4.58H27.58V10.79A10.82,10.82,0,0,1,38.37,0H72.24A10.82,10.82,0,0,1,83,10.79v9.62h23.35a6.19,6.19,0,0,1,1,.06A3.86,3.86,0,0,1,110.59,24c0,.2,0,.38,0,.57V38.78Zm-9.5.17H17.24L22,102.3a12.82,12.82,0,0,0,3.57,8.1l0,0a10,10,0,0,0,7.19,3h45a10.06,10.06,0,0,0,7.19-3,12.8,12.8,0,0,0,3.59-8.1L93.37,39ZM71,20.41V12.05H39.64v8.36ZM61.87,58.64a4.74,4.74,0,1,1,9.47,0V93.72a4.74,4.74,0,1,1-9.47,0V58.64Z"/></svg>
`
const editSVG = ` <?xml class="edit-icon" version="1.0" encoding="utf-8"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 121.48 122.88" style="enable-background:new 0 0 121.48 122.88" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path class="st0" d="M96.84,2.22l22.42,22.42c2.96,2.96,2.96,7.8,0,10.76l-12.4,12.4L73.68,14.62l12.4-12.4 C89.04-0.74,93.88-0.74,96.84,2.22L96.84,2.22z M70.18,52.19L70.18,52.19l0,0.01c0.92,0.92,1.38,2.14,1.38,3.34 c0,1.2-0.46,2.41-1.38,3.34v0.01l-0.01,0.01L40.09,88.99l0,0h-0.01c-0.26,0.26-0.55,0.48-0.84,0.67h-0.01 c-0.3,0.19-0.61,0.34-0.93,0.45c-1.66,0.58-3.59,0.2-4.91-1.12h-0.01l0,0v-0.01c-0.26-0.26-0.48-0.55-0.67-0.84v-0.01 c-0.19-0.3-0.34-0.61-0.45-0.93c-0.58-1.66-0.2-3.59,1.11-4.91v-0.01l30.09-30.09l0,0h0.01c0.92-0.92,2.14-1.38,3.34-1.38 c1.2,0,2.41,0.46,3.34,1.38L70.18,52.19L70.18,52.19L70.18,52.19z M45.48,109.11c-8.98,2.78-17.95,5.55-26.93,8.33 C-2.55,123.97-2.46,128.32,3.3,108l9.07-32v0l-0.03-0.03L67.4,20.9l33.18,33.18l-55.07,55.07L45.48,109.11L45.48,109.11z M18.03,81.66l21.79,21.79c-5.9,1.82-11.8,3.64-17.69,5.45c-13.86,4.27-13.8,7.13-10.03-6.22L18.03,81.66L18.03,81.66z"/></g></svg>`

let tasks = getSavedTasks()
let searchedTask = ""

let taskOnEdit = null

function showAppScreen() {
    if(tasks.length === 0) {
        firstTaskCreateScreen.classList.remove("hidden")
        kanbanBoardScreen.classList.add("hidden")
    } else {
        firstTaskCreateScreen.classList.add("hidden")
        kanbanBoardScreen.classList.remove("hidden")
        renderKanbanApp()
    }
    
}

function renderKanbanApp() {
    document.querySelectorAll(".task-column").forEach(column => {
        const columnStatus = column.dataset.status
        const filertedTasks = tasks.filter(item => item.status === columnStatus && (item.name.toLowerCase().includes(searchedTask) || item.description.includes(searchedTask)))
        const taskContainer = column.querySelector(".task-container")
        const taskCount = column.querySelector(".task-count")
        taskContainer.innerHTML = ""
        taskCount.textContent = filertedTasks.length
        
        if(filertedTasks.length === 0) {
            const emptyMsg = document.createElement("p")
            emptyMsg.classList.add("empty-msg")
            emptyMsg.textContent = "No tasks added yet" 
            if(searchedTask) {
                emptyMsg.textContent = "No matching tasks found"
            }
            taskContainer.appendChild(emptyMsg)
            
        } else {
        filertedTasks.forEach(task => {
            const taskCard = document.createElement("div")
            taskCard.classList.add("task-card")
            taskCard.draggable = true
            taskCard.dataset.id = task.id

            const taskTitle = document.createElement("span")
            taskTitle.classList.add("task-title")
            taskTitle.textContent = task.name

            const taskDesc = document.createElement("p")
            taskDesc.classList.add("task-description")
            taskDesc.textContent = task.description

            const taskCreationTime = document.createElement("span")
            taskCreationTime.classList.add("creation-time")
            taskCreationTime.textContent = task.creationDate

            const taskDeleteBtn = document.createElement("button")
            taskDeleteBtn.classList.add("delete-btn")
            taskDeleteBtn.innerHTML = deleteSVG

            const taskEditBtn = document.createElement("button")
            taskEditBtn.classList.add("edit-btn")
            taskEditBtn.innerHTML = editSVG

            const taskActionBtnHolder = document.createElement("div")
            taskActionBtnHolder.classList.add("action-btn")

            const taskInfoContainer = document.createElement("div")
            taskInfoContainer.classList.add("task-info")

            const taskTimeActionBtnCOntainer = document.createElement("div")
            taskTimeActionBtnCOntainer.classList.add("task-time-action-btn")

            taskInfoContainer.append(taskTitle, taskDesc)
            taskActionBtnHolder.append(taskEditBtn, taskDeleteBtn)
            taskTimeActionBtnCOntainer.append(taskActionBtnHolder, taskCreationTime)

            taskCard.append(taskInfoContainer, taskTimeActionBtnCOntainer)
            taskContainer.appendChild(taskCard)

            taskCard.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("text/plain", task.id)
                e.dataTransfer.effectAllowed = "move"
                taskCard.classList.add("dragging")
            })

            taskCard.addEventListener("dragend", (e) => {
                taskCard.classList.remove("dragging")

            })

            taskDeleteBtn.addEventListener("click", (e) => {
                tasks = tasks.filter(item => item.id !== task.id)

                saveTasksToLocalStorage()
                showAppScreen()
            })

            taskEditBtn.addEventListener("click", (e) => { 
                taskOnEdit = task.id
                addNewTodoTaskContainer.classList.remove("hidden")
                todoTaskInput.value = task.name
                todoTaskDescription.value = task.description
                addTodoTask.textContent = "Save changes"
               
            })
        })
    }

    })
}

function createNewTask(title, desc) {
    if(title.value.trim().length === 0) {
        alert("Task must have proper name and description (optional) in it.")
        return
    }
    const date = new Date()
    const formattedDate = date.toLocaleString('en-US', { month: 'short', day: 'numeric' });
    tasks.push({id: Date.now(), name: title.value.trim(), description: desc.value.trim(), creationDate: formattedDate, status: "todo"})
    title.value = ""
    desc.value = ""
    addNewTodoTaskContainer.classList.add("hidden")
}

function editTask() {
    if(!taskOnEdit) return 
    const taskToEdit = tasks.find(item => item.id === taskOnEdit)

    if(todoTaskInput.value.trim().length === 0) {
        alert(" Change must have proper name and description in it.")
        return
    }
    taskToEdit.name = todoTaskInput.value.trim()
    taskToEdit.description = todoTaskDescription.value.trim()

    todoTaskInput.value = ""
    todoTaskDescription.value = ""
    taskOnEdit = null
    addNewTodoTaskContainer.classList.add("hidden")
}

function saveTasksToLocalStorage() {
    try{
        localStorage.setItem("savedTasks", JSON.stringify(tasks))
    } catch (error) {
        console.log("Data couldn't save to localStorage...", error.message)
    }
    
}

function getSavedTasks() {
    try{
        const savedTasks = JSON.parse(localStorage.getItem("savedTasks"))
        return Array.isArray(savedTasks) ? savedTasks : []
    } catch (error) {
        console.log("Data couldn't load into Tasks Array...", error.message)
        return []
    }
}

showAppScreen()

addFirstTaskBtn.addEventListener("click", () => {
    createNewTask(firstTaskInputEl, taskDescriptionEl)
    saveTasksToLocalStorage()
    showAppScreen()
})

showTodoInputBtn.addEventListener("click", () => {
    addNewTodoTaskContainer.classList.remove("hidden")
    todoTaskInput.focus()
    addTodoTask.textContent = "Add task"
})

cancelCreateNewTask.addEventListener("click", () => {
    taskOnEdit = null
    addNewTodoTaskContainer.classList.add("hidden")
    todoTaskInput.value = ""
    todoTaskDescription.value = ""
})

addTodoTask.addEventListener("click", () => {
    if(!taskOnEdit) {
        createNewTask(todoTaskInput, todoTaskDescription)
    } else {
        editTask()
        
    }
    
    saveTasksToLocalStorage()
    showAppScreen()
})

document.querySelectorAll(".task-column").forEach(column => {
    column.addEventListener("dragover", (e) => {
        e.preventDefault()
    })

    column.addEventListener("drop", (e) => {
        e.preventDefault()
        const taskId = e.dataTransfer.getData("text/plain")

        const task = tasks.find(item => String(item.id) === taskId)
        if(!task) return

        task.status = column.dataset.status

        saveTasksToLocalStorage()
        renderKanbanApp()
    })
})

searchTaskInput.addEventListener("input", (e) => {
    searchedTask = e.target.value.toLowerCase().trim() 
    renderKanbanApp()
})