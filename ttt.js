const fs = require('fs');

// 0 = empty
// 1 = X
// 2 = O
const gameBoard = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
]

function checkWin(board){
    // Check for draw or no moves
    let empties = 0;
    board.forEach(cell => {
        if(cell == 0)
            empties++;
    });

    // Not enough moves yet for a win
    if(empties > 6)
        return 0;
    // Horizontal wins
    if((board[0] == board[1] && board[1] == board[2]) && board[0] != 0)
        return board[0];
    if((board[3] == board[4] && board[4] == board[5]) && board[3] != 0)
        return board[3];
    if((board[6] == board[7] && board[7] == board[8]) && board[6] != 0)
        return board[6];
    // Vertical wins
    if((board[0] == board[3] && board[3] == board[6]) && board[0] != 0)
        return board[0];
    if((board[1] == board[4] && board[4] == board[7]) && board[1] != 0)
        return board[1];
    if((board[2] == board[5] && board[5] == board[8]) && board[2] != 0)
        return board[2];
    // Diagonal wins
    if((board[0] == board[4] && board[4] == board[8]) && board[0] != 0)
        return board[0];
    if((board[2] == board[4] && board[4] == board[6]) && board[2] != 0)
        return board[2];
    // Draw
    if(empties == 0)
        return 20;
    // No wins
    return 0;
}

function drawBoard(board){
    let buffer = "";
    let glyphs = [];
    board.forEach(cell => {
        if(cell == 0)
            glyphs.push(" ");
        else if(cell == 1)
            glyphs.push("X");
        else
            glyphs.push("O");
    });
    buffer += `${glyphs[0]}|${glyphs[1]}|${glyphs[2]}\r\n`;
    buffer += "-----\r\n";
    buffer += `${glyphs[3]}|${glyphs[4]}|${glyphs[5]}\r\n`;
    buffer += "-----\r\n";
    buffer += `${glyphs[6]}|${glyphs[7]}|${glyphs[8]}\r\n`;
    const win = checkWin(board);
    if(win != 0){
        if(win == 1)
            buffer += "X Wins!";
        else if(win == -1)
            buffer += "Draw";
        else
            buffer += "O Wins!";    
    }
    buffer += "\r\n"
    return buffer;;
}

function moveX(game, tree){
    for(let i = 0; i < game.length; i++) {
        if (game[i] == 0) {
            game[i] = 10;
            if (checkWin(game) != 0) {
                tree[i] = checkWin(game);
            } else {
                tree[i] = new Array(9);
                moveO(game, tree[i]);
            }
            game[i] = 0;
        } else {
            tree[i] = [];
        }
    }
}

function moveO(game, tree){
    for(let i = 0; i < game.length; i++){
        if (game[i] == 0){
            game[i] = 30;
            if (checkWin(game) != 0){
                tree[i] = checkWin(game);
            } else {
                tree[i] = new Array(9);
                moveX(game, tree[i]);
            }
            game[i] = 0;
        } else {
            tree[i] = [];
        }
    }
}

const tree = new Array(9);
moveX([0,0,0,0,0,0,0,0,0], tree);

fs.writeFileSync("./tictactoe.json", JSON.stringify(tree));