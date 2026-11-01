// import Card from './Card.jsx'
import Student from './studenProps.jsx'
import { useState } from 'react'

function App() {

    const [nameInput, setName] = useState("")
    const [ageInput, setAge] = useState("")
    const [isStudenInput, setIsStundet] = useState("")

    const [studentData, setStudentData] = useState([])

    function handleStudentData() {

        const newStudent = {
            id: Date.now(),
            name: nameInput,
            age: ageInput,
            isStudent: isStudenInput.toLocaleLowerCase() === "yes" 
        }
        setStudentData([...studentData, newStudent])
        setName("")
        setAge("")
        setIsStundet("")
    }

    function deleteStudent(studentIdToDelete) {
        const filteredStudentArray = studentData.filter(student => student.id !== studentIdToDelete)
        setStudentData(filteredStudentArray)
    }

    return (
        <>
            <input type="text" className="input" placeholder='Name' value={nameInput} onChange={(e) => setName(e.target.value)}/>
            <input type="text" className="input" placeholder='Age' value={ageInput} onChange={(e) => setAge(e.target.value)}/>
            <input type="text" className="input" placeholder='is a student? (yes / no)' value={isStudenInput} onChange={(e) => setIsStundet(e.target.value)}/>
            <button onClick={handleStudentData}>Add Students</button>


            <div className='student-container'>
                {
                    studentData.map((student) => (
                        <Student 
                            key = {student.id}
                            id = {student.id}
                            name = {student.name}
                            age = {student.age} 
                            isStudent = {student.isStudent} 
                            onDelete = {deleteStudent} />
                    ))
                }

            </div>
        </>
    )
}

export default App