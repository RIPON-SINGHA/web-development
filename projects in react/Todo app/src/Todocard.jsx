import './todocard.css'
import { useState } from 'react'

function Todocard({todo, deleteTodo, toggleTodo, editTodo}) {

    const [newTitle, setNewTitle] = useState(todo.title)
    const [isEditing, changeIsEditing] = useState(false)

    return (
            <li className='todo-card'>
                {isEditing ? <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} autoFocus/> : 
                <span className={`todo-title ${(todo.completed) ? 'completed' : ''}`} onClick={() => toggleTodo(todo.id)}>{todo.title}</span>}
                
                {isEditing ? <button className='save-btn' onClick={() => {editTodo(todo.id, newTitle.trim()); changeIsEditing(false)}}>Save</button> : <button className='edit-btn' onClick={() => {changeIsEditing(true); setNewTitle(todo.title)}}>Edit</button>}

                {isEditing ? <button className='cancel-edit-btn' onClick={() => {changeIsEditing(false);}}>Cancel</button> : <button className='delete-btn' onClick={() => deleteTodo(todo.id)}>Delete</button>}

            </li>
    )
}

export default Todocard