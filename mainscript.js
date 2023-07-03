// This factory function creates our players for the game.
const createPlayer = (playerName, assignedMove) => {
    return{playerName,  assignedMove};
}



const GameBoard = (function(){
    // The array is used to store the game moves for our render function to use.
    let movesArray = ['', '', '', '', '', '', '', '', ''];
    // Initialise two variables to be used in a function to determine the current move.
    let currentPlayer;
    let currentMove ;

    const gameCells = document.querySelectorAll('.child-cells');

    const checkArrayPos = function(currentArrayPos){
        if (movesArray[currentArrayPos] !== ''){
            return false;
        } else{
            return true
        };
    };

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

    return{
    render,
    addMove,
    gameCells
    };
})();

const GameController = (function(){
    const initialStart = document.querySelector("#player-input-start");
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    // Event listener for initial start button to allow us to play
    // the game
    initialStart.addEventListener('click', () => {
        start()
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

        // Adds click event listener to each of the cells of the 
        // gameboard.
        GameBoard.gameCells.forEach((cell) => {
            cell.addEventListener('click', handleClick)
        });
    };

    // Function finds the ID of the cell, finds the correct move 
    // marker, renders the marker into the cell and switches player.
    const handleClick = function(event){
        let arrayIndex = event.target.id;  
        GameBoard.addMove(arrayIndex, players[currentPlayerIndex].assignedMove)
        GameBoard.render()
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
    }

    return{}
})();
