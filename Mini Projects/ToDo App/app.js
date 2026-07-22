const todoInput = document.querySelector("#todoInput");
const addBtn = document.querySelector("#addBtn");
const todoList = document.querySelector("#todoList");
let editTodoId = null

let savedTodos = JSON.parse(localStorage.getItem("savedTodos"))

let todoTasks = Array.isArray(savedTodos) ? savedTodos : [
  {id: 101, task: "study DSA", completed: false},
  {id: 102, task: "make notes", completed: true},
  {id: 103, task: "make project", completed: false},
  {id: 104, task: "watch a movie", completed: true}
];

let nextTodoId = todoTasks.length > 0 ? Math.max(...todoIds = todoTasks.map(item => item.id)) + 1 : 101 ;

function renderTodo() {
    todoList.innerHTML = '';

    todoTasks.forEach(todo => {
        const li = document.createElement('li');
        const deleteBtn = document.createElement('button')
        const completeToggleBtn = document.createElement('button')
        const actionBtn = document.createElement('div')
        const editTodoBtn = document.createElement('button')
        li.className = 'todoItem'
        actionBtn.className = 'actionBtn'
        deleteBtn.textContent = 'Delete Task'
        deleteBtn.className = 'deleteBtn'
        deleteBtn.id = todo.id
        completeToggleBtn.textContent = todo.completed ? "DONE" : "NOT DONE"
        completeToggleBtn.className = todo.completed ? 'doneToggle' : 'toggleBtn'
        completeToggleBtn.id = todo.id
        editTodoBtn.className = 'editBtn'
        editTodoBtn.id = todo.id
        editTodoBtn.textContent = 'Edit'
        actionBtn.appendChild(editTodoBtn)
        actionBtn.appendChild(deleteBtn)
        actionBtn.appendChild(completeToggleBtn)
        if (editTodoId === todo.id) {
            const editTodoInput = document.createElement('input')
            editTodoInput.type = 'text'
            editTodoInput.className = 'editTodoInput'
            editTodoInput.value = todo.task
            editTodoInput.focus()
            li.appendChild(editTodoInput)
            editTodoBtn.textContent = 'Save'
            editTodoBtn.className = 'saveChangeBtn'
        } else {
            const todoText = document.createElement('span')
            todoText.textContent = todo.task + " ";
            todoText.className = 'todoText'
            todoText.className = todo.completed ? 'doneTodoText' : 'todoText'
            li.appendChild(todoText)
        }
        li.appendChild(actionBtn)
        todoList.appendChild(li);
    });
}

function addTodo(text) {
    todoTasks.push({id: nextTodoId++, task: text, completed: false})
    saveTodo()
    renderTodo()
}

addBtn.addEventListener("click", ()=> {
    addTodo(todoInput.value);
    todoInput.value = '';
    disableAddBtn()
});

function deleteTodo(btnId) {
    todoTasks = todoTasks.filter(item => item.id !== Number(btnId))
    saveTodo()
    renderTodo()
}

function toggleCompleteBtn(btnId) {
    const todo = todoTasks.find(item => item.id === Number(btnId))

    if (todo) {
        todo.completed = !todo.completed
    }
    saveTodo()
    renderTodo()
}

function disableAddBtn() {
    addBtn.disabled = todoInput.value.trim().length === 0
}

todoInput.addEventListener("input", disableAddBtn)


todoList.addEventListener("click", (e)=> {
    if (e.target.classList.contains("deleteBtn")) {
        deleteTodo(e.target.id)
    }

    if (e.target.classList.contains("toggleBtn")) {
        toggleCompleteBtn(e.target.id)
    }

    if (e.target.classList.contains("doneToggle")) {
        toggleCompleteBtn(e.target.id)
    }

    if (e.target.classList.contains("editBtn")) {
        editTodoId = Number(e.target.id)
        renderTodo()

        
        const input = todoList.querySelector(".editTodoInput")
        if (input) {
            input.focus()
        }
    }

    if (e.target.classList.contains("saveChangeBtn")) {
        
        executeSaveChange(e.target)
    }
})

todoList.addEventListener("keydown", (e) => {
    if (e.key === 'Enter' && e.target.classList.contains("editTodoInput")) {

        const li = e.target.closest('li')
        const saveBtn = li.querySelector(".saveChangeBtn")
        
        if (saveBtn) {
            executeSaveChange(saveBtn)
        }
    }
})

todoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTodo(todoInput.value)
        todoInput.value = ""
        disableAddBtn()
    }
})


function executeSaveChange(saveBtn) {
    const todo = todoTasks.find(item => item.id === Number(saveBtn.id))

    const li = saveBtn.closest('li')
    const input = li.querySelector(".editTodoInput")

    if (todo && input) {
        todo.task = input.value.trim()
        editTodoId = null
        saveTodo()
        renderTodo()
    }
}

function saveTodo() {
    localStorage.setItem("savedTodos", JSON.stringify(todoTasks))
}

renderTodo();
disableAddBtn();