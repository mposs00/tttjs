let humanTurn = false;
let moves = [];

board = [0,0,0,0,0,0,0,0,0]

let gameTree;
let gameOver = false;

function onLoad() {
    var request = new XMLHttpRequest();
    request.open("GET", "tree.json", false);
    request.send(null)
    gameTree = JSON.parse(request.responseText);
    humanTurn = true;
}

function score(){
    console.log("score checked");
    if(checkWin(board) != 0){
        let winner = "Nobody";
        if(checkWin(board) == 1)
            winner = "Player";
        else if(checkWin(board) == -1)
            winner = "Computer";
        document.getElementById("result").innerHTML = `${winner} wins!!`;
        gameOver = true;
    }
}

function topLeft() {
    if (humanTurn && !gameOver) {
        if (document.getElementById("tl").innerHTML == " ") {
            document.getElementById("tl").innerHTML = "X";
            humanTurn = false;
            moves.push(0);
            board[0] = 1;
            score();
            takeTurn();
        }
    }
}

function topMid() {
    if (humanTurn && !gameOver) {
        if (document.getElementById("tm").innerHTML == " ") {
            document.getElementById("tm").innerHTML = "X";
            humanTurn = false;
            moves.push(1);
            board[1] = 1;
            score();
            takeTurn();
        }
    }
}

function topRight() {
    if (humanTurn && !gameOver) {
        if (document.getElementById("tr").innerHTML == " ") {
            document.getElementById("tr").innerHTML = "X";
            humanTurn = false;
            moves.push(2);
            board[2] = 1;
            score();
            takeTurn();
        }
    }
}

function midLeft() {
    if (humanTurn && !gameOver) {
        if (document.getElementById("ml").innerHTML == " ") {
            document.getElementById("ml").innerHTML = "X";
            humanTurn = false;
            moves.push(3);
            board[3] = 1;
            score();
            takeTurn();
        }
    }
}

function midMid() {
    if (humanTurn && !gameOver) {
        if (document.getElementById("mm").innerHTML == " ") {
            document.getElementById("mm").innerHTML = "X";
            humanTurn = false;
            moves.push(4);
            board[4] = 1;
            score();
            takeTurn();
        }
    }
}

function midRight() {
    if (humanTurn && !gameOver) {
        if (document.getElementById("mr").innerHTML == " ") {
            document.getElementById("mr").innerHTML = "X";
            humanTurn = false;
            moves.push(5);
            board[5] = 1;
            score();
            takeTurn();
        }
    }
}

function bottomLeft() {
    if (humanTurn && !gameOver) {
        if (document.getElementById("bl").innerHTML == " ") {
            document.getElementById("bl").innerHTML = "X";
            humanTurn = false;
            moves.push(6);
            board[6] = 1;
            score();
            takeTurn();
        }
    }
}

function bottomMid() {
    if (humanTurn && !gameOver) {
        if (document.getElementById("bm").innerHTML == " ") {
            document.getElementById("bm").innerHTML = "X";
            humanTurn = false;
            moves.push(7);
            board[7] = 1;
            score();
            takeTurn();
        }
    }
}

function bottomRight() {
    if (humanTurn && !gameOver) {
        if (document.getElementById("br").innerHTML == " ") {
            document.getElementById("br").innerHTML = "X";
            humanTurn = false;
            moves.push(8);
            board[8] = 1;
            score();
            takeTurn();
        }
    }
}

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

function takeTurn() {
    if(gameOver)
        return;
    
    let subTree = gameTree;
    for(let i = 0; i < moves.length; i++){
        subTree = subTree[moves[i]];
    }
    const nextMove = minimax(subTree, true)[1];
    moves.push(nextMove);
    document.getElementById("info").innerHTML = `next move: ${nextMove}<br>move list: ${moves.toString()}`;
    switch(nextMove){
        case 0:
            document.getElementById("tl").innerHTML = "O";
            break;
        case 1:
            document.getElementById("tm").innerHTML = "O";
            break;
        case 2:
            document.getElementById("tr").innerHTML = "O";
            break;
        case 3:
            document.getElementById("ml").innerHTML = "O";
            break;
        case 4:
            document.getElementById("mm").innerHTML = "O";
            break;
        case 5:
            document.getElementById("mr").innerHTML = "O";
            break;
        case 6:
            document.getElementById("bl").innerHTML = "O";
            break;
        case 7:
            document.getElementById("bm").innerHTML = "O";
            break;
        case 8:
            document.getElementById("br").innerHTML = "O";
            break;
    }
    board[nextMove] = -1;
    humanTurn = true;
    score();
}

function minimax(node, maxing) {
    let bestValue;
    let bestMove;
    if (node === 10 || node === 20 || node === 30) {
        // Leaf hit. 10 = first player (human) wins. 20 = draw. 30 = second player (computer) wins.
        bestValue = node;
    } else if (maxing) { // Maximizing
        bestValue = -100000; // Arbitrarily low, lower than 10 
        for (let i = 0; i < node.length; i++) {
            if(node[i].length != 0){ // If the sub-node is an empty array, it is not a valid move
                let childValue = minimax(node[i], false)[0];
                if(childValue > bestValue){
                    bestValue = childValue;
                    bestMove = i;
                }
            }
        }
    } else { // Minimizing
        bestValue = 100000; // Arbitrarily high, higher than 30
        for (let i = 0; i < node.length; i++) {
            if(node[i].length != 0){ // If the sub-node is an empty array, it is not a valid move
                let childValue = minimax(node[i], true)[0];
                if(childValue < bestValue){
                    bestValue = childValue;
                    bestMove = i;
                }
            }
        }
    }
    return [bestValue, bestMove];
}