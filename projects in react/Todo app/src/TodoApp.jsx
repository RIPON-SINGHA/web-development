import Todocard from "./Todocard";
import Todoinput from "./Todoinput";
import { useState } from "react";

function TodoApp() {

    const [todoTasks, setTodoTasks] = useState([])

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

    return (
        <>
            <Todoinput addTodo = {addTodoTasks}/>

            <div className="todo-container">
                <ul className="todo-lists">
                    {
                        todoTasks.map((todo)=> (
                            <Todocard key = {todo.id} todo = {todo} deleteTodo = {deleteTodo} toggleTodo = {toggleCompleteTodo} editTodo = {editTodo} />
                        ))
                    }
                </ul>
            </div>
            
        </>
    )
}

export default TodoApp