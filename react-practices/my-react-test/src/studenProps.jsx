function Student(props) {
    return (
        <>  
            <p>Id: {props.id} </p>
            <p>Name: {props.name} </p>
            <p>Age: {props.age} </p>
            <p> is this a student : {props.isStudent ? "Yes": "No"} </p>
            <button onClick={() => props.onDelete(props.id)}> Delete</button>
            <br />
        </>
    )
}

export default Student