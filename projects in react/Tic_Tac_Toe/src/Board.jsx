import './board.css'
import './calculateWinner.js'
import { calculateWinner } from './calculateWinner.js'

function Square({value, onSquareClick}) {
    return (
        <button className="square" onClick={onSquareClick}>{value}</button>
    )
}

function Board ({turn, squares, onPlay}) {

    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) {
            return
        }

        const nextSquare = squares.slice()

        if(turn === "X" ) {
            nextSquare[i] = "X"
        } else {
            nextSquare[i] = "O"
        }

        onPlay(nextSquare)
    }

    const winner = calculateWinner(squares)
    let status

    if(winner) {
        status = `WINNER: ${winner}`
    } else {
        status = `Next Turn: ${turn}`
    }

    const renderBoard = () => {
        const board = []

        for (let i = 0; i < 3; i++) {
            const row = []
            for (let j = 0; j < 3; j++) {
                row.push(
                    <Square
                    key = {`${i}-${j}`}
                    value={squares[i * 3 + j]}
                    onSquareClick={() => handleClick(i * 3 + j)}/>
                )
            }
            board.push(
                <div className="board-row" key={`key-${i}`}>
                    {row}
                </div>
            )
        }

        return board
    }

    return (
        <>
            <h3 className='game-status'>{status}</h3>
            {renderBoard()}
        </>
    )
}

export default Board