const todoInput = document.querySelector("#todoInput");
const addBtn = document.querySelector("#addBtn");
const todoList = document.querySelector("#todoList");

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
        const todoText = document.createElement('span')
        const actionBtn = document.createElement('div')
        todoText.textContent = todo.task + " ";
        todoText.className = 'todoText'
        li.className = 'todoItem'
        actionBtn.className = 'actionBtn'
        deleteBtn.textContent = 'Delete Task'
        deleteBtn.className = 'deleteBtn'
        deleteBtn.id = todo.id
        completeToggleBtn.textContent = todo.completed ? "DONE" : "NOT DONE"
        completeToggleBtn.className = todo.completed ? 'doneToggle' : 'toggleBtn'
        completeToggleBtn.id = todo.id
        todoText.className = todo.completed ? 'doneTodoText' : 'todoText'
        actionBtn.appendChild(deleteBtn)
        actionBtn.appendChild(completeToggleBtn)
        li.appendChild(todoText)
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
})

function saveTodo() {
    localStorage.setItem("savedTodos", JSON.stringify(todoTasks))
}

renderTodo();