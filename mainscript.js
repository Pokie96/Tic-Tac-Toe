// This factory function creates our players for the game.
let createPlayer = (playerName, playerNumber, assignedMove) => {
    return{playerName, playerNumber, assignedMove};
}



const gameBoard = (function(){
    // The array is used to store the game moves for our render function to use.
    let movesArray = ['', '', '', '', '', '', '', '', '']
    // Initialise two variables to be used in a function to determine the current move.
    let currentPlayer;
    let currentMove ;

    

    // Function determines which player is currently active and switched the move symbol and the 
    // player.
    const determinePlayer = function(){
        if(currentPlayer === 'Player One'){
            currentPlayer = 'Player Two';
            currentMove = 'O';
        } else if(currentPlayer === 'Player Two' || !currentPlayer){
            currentPlayer = 'Player One'
            currentMove = 'X'
        }
        return currentMove;
    }

    // Function finds the relative index in our movesArray dependant on which cell on the grid 
    // was clicked.
    const findArrayPos = function(currentCellID){
        let currentArrayPos = parseInt(currentCellID)
        return currentArrayPos;
    }

    const checkArrayPos = function(currentArrayPos){
        if (movesArray[currentArrayPos] !== ''){
            return false;
        } else{
            return true
        }
    }

    // Function uses our array position from the previous function along with current move to add 
    // the current move to our movesArray at the correct index.
    const addMove = function(currentArrayPos, currentMove){
        movesArray[currentArrayPos] = currentMove;
        console.log(movesArray);
    }

    // Render function renders the items in our movesArray inside our Tic Tac Toe grid.
    const render = function(){
        for(let i = 0; i < movesArray.length; i++){
            let currentCell = document.getElementById(`${i}`)
            currentCell.innerHTML = `${movesArray[i]}`;
        }
    }



    // Our event listener for our grid.
    document.querySelector('.game-board').addEventListener('click', function(e){
        // Find the ID of the individual cell we clicked inside of the grid (0-8).
        let currentCellID = e.target.id;
        // Find the correct array position using the previous ID variable.
        let arrayPos = findArrayPos(currentCellID);
        if (checkArrayPos(arrayPos) === false){
            alert("You can't use the same cell twice!")
            return;
        };
        // Determine correct current move by determining which player is active.
        currentMove = determinePlayer();
        // Add the move to our array at the correct array index.
        addMove(arrayPos, currentMove);
        // Render the array into our grid.
        render();
    })
})();

