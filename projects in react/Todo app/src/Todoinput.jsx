import { useState } from "react"

function Todoinput({addTodo}) {

    const [todotitle, setTodoTitle] = useState("")
    return (
            <div className='input-container'>
                <input type="text" name="todoinput" id="todo-input" placeholder='Enter your todo title' value={todotitle} onChange={(e)=>setTodoTitle(e.target.value)}/>
                <button className='add-btn'  onClick={() => {addTodo(todotitle.trim()); setTodoTitle("")}}>Add task</button>
            </div>
    )
}

export default Todoinput