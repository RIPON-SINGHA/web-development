import { useState } from "react"
import './board.css'

function Square({value, onSquareClick}) {
    return (
        <button className="square" onClick={onSquareClick}>{value}</button>
    )
}

function Board () {

    const [squares, setSquares] = useState(Array(9).fill(null))
    const [turn, setTurn] = useState("X")

    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) {
            return
        }

        const newSquare = squares.slice()

        if(turn === "X" ) {
            newSquare[i] = "X"
            setTurn("O")
        } else {
            newSquare[i] = "O"
            setTurn("X")
        }

        setSquares(newSquare)
    }

    const winner = calculateWinner(squares)
    let status

    if(winner) {
        status = `WINNER: ${winner}`
    } else {
        status = `Next Turn: ${turn}`
    }


    return (
        <>
        <h3 className="game-status">{status}</h3>
        <div className="board-row">
            <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
            <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
            <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
        </div>

        <div className="board-row">
            <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
            <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
            <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
        </div>

        <div className="board-row">
            <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
            <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
            <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
        </div>
        </>
    )
}

export default Board


function calculateWinner(squares) {
    const winCond = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    for (let i = 0; i < winCond.length; i++) {
        const [a, b, c] = winCond[i]

        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[i]
        }
    }

    return null
    
}