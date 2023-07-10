// This factory function creates our players for the game.
const createPlayer = (playerName, assignedMove) => {
    return{playerName,  assignedMove};
}



const GameBoard = (function(){
    // The array is used to store the game moves for our render function to use.
    let movesArray = ['', '', '', '', '', '', '', '', ''];

    const gameCells = document.querySelectorAll('.child-cells');


    // Function uses our array position from the previous function along with current move to add 
    // the current move to our movesArray at the correct index.
    const addMove = function(index, assignedMove){
        movesArray[index] = assignedMove;
    };

    // Render function renders the items in our movesArray inside our Tic Tac Toe grid.
    const render = function(){
        for(let i = 0; i < movesArray.length; i++){
            let currentCell = gameCells[i];
            currentCell.innerHTML = movesArray[i];
        };
    };

    // This function resets our array to its inital values.
    const resetArray = function(){
        movesArray = ['', '', '', '', '', '', '', '', ''];
    };

    const getMovesArray = function(){
        return movesArray;
    }


    return{
    render,
    addMove,
    resetArray,
    getMovesArray,
    gameCells
    };
})();

const GameController = (function(){
    const initialStartBtn = document.querySelector("#player-input-start");
    const restartBtn = document.querySelector("#reset-btn");
    let players = [];
    let currentPlayerIndex;
    let gameOver;
    let emptySpaces = 9;

    // Event listener for initial start button to allow us to play
    // the game
    initialStartBtn.addEventListener('click', () => {
        start()
    });

    restartBtn.addEventListener('click', () => {
        restart();
    });

    // Start function for our initial start button -

    const start = ()=> {
        // Creates our player objects dependent on 
        // what the user entered into the player inputs and assigns 
        // each of them a move marker (X or O). 
        players = [
        createPlayer(document.querySelector("#player-one-input").value, 'X'),
        createPlayer(document.querySelector("#player-two-input").value, 'O')]
        
        // Sets current player to first player and game over to 
        // false
        currentPlayerIndex = 0;
        gameOver = false;
        emptySpaces = 9;

        // Adds click event listener to each of the cells of the 
        // gameboard.
        GameBoard.gameCells.forEach((cell) => {
            cell.addEventListener('click', handleClick, {once: true})
        });

        // Switch the grid colour to black when the start button 
        // is clicked.
        switchColour('black');

        const playerNameDisplay = document.querySelectorAll(".player-display")
        playerNameDisplay[0].textContent = document.querySelector("#player-one-input").value;
        playerNameDisplay[1].textContent = document.querySelector("#player-two-input").value;
    };

    // Function finds the ID of the cell, finds the correct move 
    // marker, renders the marker into the cell and switches player.
    const handleClick = function(event){
        let arrayIndex = event.target.id; 
        GameBoard.addMove(arrayIndex, players[currentPlayerIndex].assignedMove)
        GameBoard.render()
        displayWinner();
        switchPlayer();
    };

    // Function switches player using the currentPlayerIndex's 
    // value.

    const switchPlayer = function(){
        if (currentPlayerIndex === 0){
            currentPlayerIndex = 1;
        } else {
            currentPlayerIndex = 0;
        }
    };

    const restart = function(){
        players = [];
        GameBoard.resetArray();
        GameBoard.render();
        GameBoard.gameCells.forEach((cell) => {
            cell.removeEventListener('click', handleClick);
        });
        switchColour('rgb(173, 173, 173)')
    }

    const checkForWin = function(board){
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for(let i = 0; i < winningCombinations.length; i++){
            const[a, b, c] = winningCombinations[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]){
                return true;
            }
        };
        return false;
    };

    const displayWinner = function(){
        gameOver = checkForWin(GameBoard.getMovesArray())
        if (gameOver === true){
            let winner = players[currentPlayerIndex].playerName !== '' ? players[currentPlayerIndex].playerName : `Player ${currentPlayerIndex + 1}`;
            alert(`${winner} is the Winner!`)
            GameBoard.gameCells.forEach((cell) => {
                cell.removeEventListener('click', handleClick);
            });
        } else if(checkBoardFull() === true){
            alert("It is a draw!");
        }; 
    }

    const checkBoardFull = function(){
        let movesArray = GameBoard.getMovesArray()
        console.log(movesArray);
        for(let i = 0; i < movesArray.length; i++){
            if(movesArray[i] !== ''){
                emptySpaces -= 1;
            };
            console.log(emptySpaces);

            if(emptySpaces === 0){
                return true;
            } else{
                return false;
            }
        }
    }

    const switchColour = function(color){
        const gridCells = document.querySelectorAll(".child-cells");
        const gridContainer = document.querySelector(".game-board");
        for(let i = 0; i < gridCells.length; i++){
            gridCells[i].style.borderColor = color;
        };
        gridContainer.style.borderColor = color;
            
    }

    return{switchColour}
})();
