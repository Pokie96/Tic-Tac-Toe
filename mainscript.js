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
    const startBtn = document.querySelector("#player-input-start");
    const restartBtn = document.querySelector("#reset-btn");
    let players = [];
    let currentPlayerIndex;
    let gameOver;
    let emptySpaces = 9;
    let gameChoice;
    let usedNumbers = [];
    let alreadyWon;

    // Event listener for initial start button to allow us to play
    // the game
    startBtn.addEventListener('click', () => {
        start()
    }, {once: true});


    // Start function for our initial start button -

    const start = ()=> {
        // Creates our player objects dependent on 
        // what the user entered into the player inputs and assigns 
        // each of them a move marker (X or O). 
        players = [
        createPlayer(document.querySelector("#player-one-input").value, 'X'),
        createPlayer(document.querySelector("#player-two-input").value, 'O')]
        
        // Checks the selected game mode.
        checkGameMode();

        // Sets current player to first player and game over to 
        // false
        currentPlayerIndex = 0;
        gameOver = false;
        emptySpaces = 9;

        // Adds click event listener to each of the cells of the 
        // gameboard.
        if(gameChoice === 'player'){
            GameBoard.gameCells.forEach((cell) => {
                cell.addEventListener('click', handleClick, {once: true})
            });
        }

        if(gameChoice ==='easyai'){
            GameBoard.gameCells.forEach((cell) => {
                cell.addEventListener('click', handleClickEasyAi, {once: true})
            });
        }

        // Displays the players name's on the page or Player One/Two by
        // default.
        displayPlayerNames();

        // Switch the grid colour to black when the start button 
        // is clicked.
        switchColour('black');

        // Hides the form.
        toggleForm();

        restartBtn.addEventListener('click', () => {
            restart();
        }, {once: true});
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

    const handleClickEasyAi = function(event){
        let arrayIndex = event.target.id; 
        usedNumbers.push(parseInt(arrayIndex));
        GameBoard.addMove(arrayIndex, players[currentPlayerIndex].assignedMove)
        GameBoard.render()
        displayWinner();
        switchPlayer();
        easyaiMove(arrayIndex);
        switchPlayer();
    }

    const easyaiMove = function(arrayIndex){
        let randomIndex = Math.floor(Math.random()*9);
        while (randomIndex === arrayIndex || usedNumbers.includes(randomIndex)){
            randomIndex = Math.floor(Math.random()*9);
            if (usedNumbers.length === 9){
                break;
            }
        }
        if(usedNumbers.length < 9){
            usedNumbers.push(randomIndex);
        }
        console.log(usedNumbers);
        GameBoard.gameCells[randomIndex].removeEventListener('click', handleClickEasyAi)
        
        GameBoard.addMove(randomIndex, players[currentPlayerIndex].assignedMove)
        GameBoard.render()
        if (!alreadyWon){
            displayWinner()
        }
    };
    // Function to display the player's name on the page. If no name 
    // has been given it will display the default Player One or Player
    // Two.
    const displayPlayerNames = function(){

        const playerNameDisplay = document.querySelectorAll(".player-display")
        playerNameDisplay[0].textContent = document.querySelector("#player-one-input").value;
        playerNameDisplay[1].textContent = document.querySelector("#player-two-input").value;
        if (document.querySelector("#player-one-input").value === ""){
            playerNameDisplay[0].textContent = "Player One";
        };
        if (document.querySelector("#player-two-input").value === ""){
            playerNameDisplay[1].textContent = "Player Two";
        };
        if (gameChoice === "easyai" || gameChoice === "hardai"){
            playerNameDisplay[1].textContent = "Computer";
        };
    }

    // Function switches player using the currentPlayerIndex's 
    // value.
    const switchPlayer = function(){
        if (currentPlayerIndex === 0){
            currentPlayerIndex = 1;
        } else {
            currentPlayerIndex = 0;
        }
    };

    // Function restarts our game and allows the user to input any new
    // information to the game.
    const restart = function(){
        players = [];
        usedNumbers = [];
        alreadyWon = false;
        GameBoard.resetArray();
        GameBoard.render();
        if(gameChoice === 'player'){
            GameBoard.gameCells.forEach((cell) => {
                cell.removeEventListener('click', handleClick);
            });
        };
        if(gameChoice === 'easyai'){
            GameBoard.gameCells.forEach((cell) => {
                cell.removeEventListener('click', handleClickEasyAi);
            });
        };
        switchColour('rgb(173, 173, 173)')
        toggleForm();
        startBtn.addEventListener('click', () => {
            start()
        }, {once: true});
    }

    // Function checks for winning combinations and is called every time
    // a move is made in the game.
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

    // Function alerts who the winner is if the checkForWin() function 
    // returns true otherwise it checks if the board is full and returns
    // a draw instead. If neither parameters are met, the game continues.
    const displayWinner = function(){
        gameOver = checkForWin(GameBoard.getMovesArray())
        if (gameOver === true){
            let winner = players[currentPlayerIndex].playerName !== '' ? players[currentPlayerIndex].playerName : `Player ${currentPlayerIndex + 1}`;
            alert(`${winner} is the Winner!`)
            GameBoard.gameCells.forEach((cell) => {
                cell.removeEventListener('click', handleClick);
            });
            alreadyWon = true;
        } else if(checkBoardFull() === true){
            alert("It is a draw!");
            alreadyWon = true;
        }; 
    }

    // This function checks if there any empty spaces left in the grid
    // and if there isn't any then it will return as true.
    const checkBoardFull = function(){
        let movesArray = GameBoard.getMovesArray()
        for(let i = 0; i < movesArray.length; i++){
            if(movesArray[i] !== ''){
                emptySpaces -= 1;
            };

            if(emptySpaces === 0){
                return true;
            } else{
                return false;
            }
        }
    }

    // This function accepts a colour value and applies it to the 
    // grid elements.
    const switchColour = function(color){
        const gridCells = document.querySelectorAll(".child-cells");
        const gridContainer = document.querySelector(".game-board");
        for(let i = 0; i < gridCells.length; i++){
            gridCells[i].style.borderColor = color;
        };
        gridContainer.style.borderColor = color;
    }

    // This function toggles the visiblity of the form element from 
    // visible to hidden or vice-versa.
    const toggleForm = function(){
        let form = document.querySelector(".player-inputs")
        if(form.style.visibility === 'visible' || form.style.visibility === ''){
            form.style.visibility = 'hidden';
        }else if (form.style.visibility === 'hidden'){
            form.style.visibility = 'visible';
        }
    };

    // This function will check what game mode has been selected by 
    // the user depending on which radio button has been selected. It
    // returns a string corresponding to the game mode chosen.
    const checkGameMode = function(){
        let playerRadio = document.querySelector("#player-choice");
        let easyaiRadio = document.querySelector("#easy-ai-choice");
        let hardaiRadio = document.querySelector("#hard-ai-choice");

        if(playerRadio.checked){
            gameChoice = "player"
        } else if(easyaiRadio.checked){
            gameChoice = "easyai"
        } else if(hardaiRadio.checked){
            gameChoice = "hardai"
        };
    }

    return{toggleForm}
})();
