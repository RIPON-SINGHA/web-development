import Todocard from "./Todocard";
import Todoinput from "./Todoinput";
import { useState } from "react";
import { useEffect } from "react";

function loadTodos() {
    try {
        const saved = localStorage.getItem("savedTodos")
        if (saved === null) return []
        const parsedTodos = JSON.parse(saved)
        return Array.isArray(parsedTodos) ? parsedTodos : []
    } catch {
        return []
    }
}

function TodoApp() {

    const [todoTasks, setTodoTasks] = useState(loadTodos)
    useEffect(saveTodos, [todoTasks])

    function addTodoTasks(todoInput) {
        if(todoInput.length > 0) {

            const newTask = {
                id: Date.now(),
                title: todoInput,
                completed: false
            }

            let otherTasks = [...todoTasks, newTask]
            setTodoTasks(otherTasks)
        }
    }

    function deleteTodo(idOfDeleteingTodo) {
        const filteredTodo = todoTasks.filter(todo => todo.id !== idOfDeleteingTodo)
        setTodoTasks(filteredTodo)
    }

    function toggleCompleteTodo(idOfTodoToToggle) {

        const toggledTodoTasks = todoTasks.map(todo => (
            todo.id === idOfTodoToToggle ? { ...todo, completed : !todo.completed} : todo
        ))

        setTodoTasks(toggledTodoTasks)
    }

    function editTodo(idOfTodoToEdit, newTitle) {
        if(newTitle.length > 0) {

            const editedTasks = todoTasks.map(todo => (
                todo.id === idOfTodoToEdit ? {...todo, title: newTitle} : todo
            ))

            setTodoTasks(editedTasks)
        }
        
    }

    function saveTodos(){
        localStorage.setItem("savedTodos", JSON.stringify(todoTasks))
    }

    return (
        <>
            <Todoinput addTodo = {addTodoTasks}/>

            <div className="todo-container">
                {todoTasks.length > 0 ? 
                    <ul className="todo-lists">
                        {
                            todoTasks.map((todo)=> (
                                <Todocard key = {todo.id} todo = {todo} deleteTodo = {deleteTodo} toggleTodo = {toggleCompleteTodo} editTodo = {editTodo} />
                            ))
                        }
                    </ul>  : 
                    <h3>No todo added yet</h3>  }
                
            </div>
            
        </>
    )
}

export default TodoApp