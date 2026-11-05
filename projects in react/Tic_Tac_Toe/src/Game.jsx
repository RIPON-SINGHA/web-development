import Board from './Board.jsx'
import './calculateWinner.js'
import { useState } from 'react'
import { calculateWinner } from './calculateWinner.js'

export default function Game() {

    const [history, setHistory] = useState([Array(9).fill(null)])
    const [currentMove, setCurrentMove] = useState(0)
    const currentSquares = history[currentMove]
    const turn = currentMove % 2 === 0 ? "X" : "O"
    const winner = calculateWinner(currentSquares)

    function handlePlay(nextSquare) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquare]
        setHistory(nextHistory)
        setCurrentMove(nextHistory.length - 1)

    }

    function jumpTo(move) {
        setCurrentMove(move)
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
                <button onClick={() => jumpTo(move)} disabled={winner !== null}>{description}</button>      
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

