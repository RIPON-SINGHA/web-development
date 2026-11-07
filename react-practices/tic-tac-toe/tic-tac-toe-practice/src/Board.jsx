import './board.css'

function Square({value, onClick}) {
    return (
        <button className="square" onClick={onClick}>{value}</button>
    )
}

function Board({squares, onClick, status}) {
    const renderBoard = () => {
        const board = []

        for (let i = 0; i < 3; i++) {
            const row = []
            for( let j = 0; j < 3; j++) {
                row.push(
                    <Square
                    key={i * 3 + j}
                    value={squares[i * 3 + j]}
                    onClick={() => onClick(i * 3 + j)}
                    />
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
            <h3 className='status'>{status}</h3>
                {renderBoard()}
        </>
    )
}

 

export default Board