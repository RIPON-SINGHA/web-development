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

let tasks = []

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
        const filertedTasks = tasks.filter(item => item.status === columnStatus)
        const taskContainer = column.querySelector(".task-container")
        const taskCount = column.querySelector(".task-count")
        taskContainer.innerHTML = ""
        taskCount.textContent = filertedTasks.length
        
        if(filertedTasks.length === 0) {
            const emptyMsg = document.createElement("p")
            emptyMsg.classList.add("empty-msg")
            emptyMsg.textContent = "No tasks added yet"
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

            taskCard.append(taskTitle, taskDesc, taskCreationTime)
            taskContainer.appendChild(taskCard)
        })
    }

    })
}

function createNewTask(title, desc) {
    if(title.value.trim().length !== 0) {
        const date = new Date()
        const formattedDate = date.toLocaleString('en-US', { month: 'short', day: 'numeric' });
        tasks.push({id: Date.now(), name: title.value, description: desc.value.trim(), creationDate: formattedDate, status: "todo"})
        title.value = ""
        desc.value = ""
    }
}

showAppScreen()

addFirstTaskBtn.addEventListener("click", () => {
    createNewTask(firstTaskInputEl, taskDescriptionEl)

    showAppScreen()
})

showTodoInputBtn.addEventListener("click", () => {
    addNewTodoTaskContainer.classList.remove("hidden")
})

cancelCreateNewTask.addEventListener("click", () => {
    addNewTodoTaskContainer.classList.add("hidden")
    todoTaskInput.value = ""
    todoTaskDescription.value = ""
})

addTodoTask.addEventListener("click", () => {
    createNewTask(todoTaskInput, todoTaskDescription)
    addNewTodoTaskContainer.classList.add("hidden")

    showAppScreen()
})



