import Board from './Board.jsx'
import { useState } from 'react'

export default function Game() {

    const [turn, setTurn] = useState("X")
    const [history, setHistory] = useState([Array(9).fill(null)])
    const currentSquares = history[history.length - 1]
    const [currentMove, setCurrentMove] = useState(0)

    function handlePlay(nextSquare) {
        setHistory([...history, nextSquare])

        if(turn === "X") {
            setTurn("O")
        } else {
            setTurn("X")
        }
    }

    function jumpTo(move) {
        setCurrentMove(move)

        if(currentMove === 0) {
            setTurn("X")
        } else if (currentMove % 2 === 0){
            setTurn("O")
        } else {
            setTurn("X")
        }
    }

    const moves = history.map((square, move) => {
        let description;

        if(move > 0) {
            description = `Go to move #${move}`
        } else {
            description = `Go to game start`
        }

        return (
            
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>      
            </li>
        )
    })
    return (
        <>
            <div className="game">
                <div className="game-board">
                    <Board turn={turn} squares={currentSquares} onPlay={handlePlay} />
                </div>

                <div className="game-info">
                    <ol>{moves}</ol>
                </div>
            </div>
        </>
    )
}

