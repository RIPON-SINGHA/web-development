import Board from "./Board.jsx"
import {useState } from "react"
import calcutateWinner from "./calculateWinner.js" 

function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)])
    const [currentMove, setCurrentMove] = useState(0)
    const currentSquare = history[currentMove]
    const turn = currentMove % 2 === 0 ? "X" : "O"
    const winner = calcutateWinner(currentSquare)
    const isDraw = !winner && currentSquare.every(square => square !== null)

    function handleClick(i) {
        if (currentSquare[i] || winner){
            return
        }   

        const nextSquare = currentSquare.slice()

        nextSquare[i] = turn

        onPlay(nextSquare)
    }

    function onPlay(nextSquare) {
        const newHistory = [...history.slice(0, currentMove + 1), nextSquare]
        setHistory(newHistory)
        setCurrentMove(newHistory.length - 1)
    }

    function jumpTo(move) {
        setCurrentMove(move)
    }

    const moves = history.map((squares, move) => {
        let desc

        if(move > 0) {
            desc = `Go to move #${move}`
        } else {
            desc = `Go to game start`
        }

        return (
            <li
            key={move}>
                <button className="history-info" onClick={() => jumpTo(move)} disabled={Boolean(winner) || Boolean(isDraw)}>
                    {desc}
                </button>
            </li>
        )
    })


    let status
    if(winner) {
        status = `WINNER: ${winner}`
    } else if(isDraw){
        status = `Game Draw`
    } else {
        status = `Next turn: ${turn}`
    }

    return (
        <>
            <Board squares={currentSquare} onClick={handleClick} status={status}/>
            <ol>{moves}</ol>
        </>
    )
}

export default Game