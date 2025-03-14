import { useState } from "react";

const X = "X";
const O = "O";
const EMPTY = "";

function initialState() {
    return [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY];
}

function player(board: string[]) {
    let countX = 0;
    let countO = 0;

    board.forEach((cell) => {
        if (cell == X) {
            countX += 1;
        } else if (cell == O) {
            countO += 1;
        }
    });

    if (countX > countO) {
        return O;
    } else {
        return X;
    }
}

function actions(board: string[]) {
    const possibleActions: number[] = [];

    board.map((cell, index) => {
        if (cell == EMPTY) {
            possibleActions.push(index);
        }
    });

    return possibleActions;
}

function result(board: string[], index: number) {
    const current_player: string = player(board);

    const boardAction: string[] = [...board];

    boardAction[index] = current_player;

    return boardAction;
}

function winner(board: string[]) {
    // Horizontal
    if (board[0] !== EMPTY && board[0] === board[1] && board[1] === board[2]) {
        return board[0];
    } else if (
        board[3] !== EMPTY &&
        board[3] === board[4] &&
        board[4] === board[5]
    ) {
        return board[3];
    } else if (
        board[6] !== EMPTY &&
        board[6] === board[7] &&
        board[7] === board[8]
    ) {
        return board[6];
    }

    // Vertical
    if (board[0] !== EMPTY && board[0] === board[3] && board[3] === board[6]) {
        return board[0];
    } else if (
        board[1] !== EMPTY &&
        board[1] === board[4] &&
        board[4] === board[7]
    ) {
        return board[1];
    } else if (
        board[2] !== EMPTY &&
        board[2] === board[5] &&
        board[5] === board[8]
    ) {
        return board[2];
    }

    // Diagonal
    if (board[0] !== EMPTY && board[0] === board[4] && board[4] === board[8]) {
        return board[0];
    } else if (
        board[2] !== EMPTY &&
        board[2] === board[4] &&
        board[4] === board[6]
    ) {
        return board[2];
    }

    return null;
}

function terminal(board: string[]) {
    const game_winner = winner(board);
    const is_tie = board.every((cell) => cell != EMPTY) && game_winner == null;

    if (game_winner != null || is_tie) {
        return true;
    } else {
        return false;
    }
}

function utility(board: string[]) {
    const game_winner = winner(board);

    if (game_winner == X) {
        return 1;
    } else if (game_winner == O) {
        return -1;
    } else {
        return 0;
    }
}

function minimax(board: string[]) {
    if (terminal(board)) {
        return null;
    }

    const current_player = player(board);
    let bestMove: number = undefined!;

    if (current_player == X) {
        let highestValue = -Infinity;

        actions(board).map((index) => {
            const currentActionValue = maxValue(result(board, index));

            if (currentActionValue > highestValue) {
                highestValue = currentActionValue;
                bestMove = index;
            }
        });
    } else if (current_player == O) {
        let lowestValue = Infinity;

        actions(board).map((index) => {
            const currentActionValue = minValue(result(board, index));

            if (currentActionValue > lowestValue) {
                lowestValue = currentActionValue;
                bestMove = index;
            }
        });
    }

    return bestMove;
}

function minValue(board: string[]) {
    if (terminal(board)) {
        return utility(board);
    }

    let v = Infinity;

    actions(board).map((action) => {
        v = Math.min(v, maxValue(result(board, action)));
    });

    return v;
}

function maxValue(board: string[]) {
    if (terminal(board)) {
        return utility(board);
    }

    let v = -Infinity;

    actions(board).map((action) => {
        v = Math.min(v, minValue(result(board, action)));
    });

    return v;
}

export function Cell({
    value,
    className,
    onCellClick,
}: {
    value: string;
    className: string;
    onCellClick: (event: React.MouseEvent<HTMLElement>) => void;
}) {
    return (
        <button className={className} onClick={onCellClick}>
            {value}
        </button>
    );
}

export function Board({
    cells,
    handleCellClick,
}: {
    cells: string[];
    handleCellClick: (index: number) => void;
}) {
    return (
        <div className="grid grid-cols-3 gap-2">
            {cells.map((cell, index) => (
                <Cell
                    key={index}
                    value={cell}
                    className="h-40 w-40 border-4 flex items-center justify-center text-4xl"
                    onCellClick={() => handleCellClick(index)}
                />
            ))}
        </div>
    );
}

export function TicTacToe() {
    const [cells, setCells] = useState(initialState());

    function handleClick(index: number) {
        if (cells[index] != EMPTY) return;
        setCells((previousCells) => result(previousCells, index));

        // Verify if game ended
    }

    return (
        <>
            <h1 className="text-4xl mb-4">
                Player <span className="font-bold"></span> turn
            </h1>
            <Board cells={cells} handleCellClick={handleClick} />
        </>
    );
}
