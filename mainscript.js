// This factory function creates our players for the game.
const createPlayer = (playerName, assignedMove) => {
    return{playerName,  assignedMove};
}



const GameBoard = (function(){
    // The array is used to store the game moves for our render function to use.
    let movesArray = ['', '', '', '', '', '', '', '', '']
    // Initialise two variables to be used in a function to determine the current move.
    let currentPlayer;
    let currentMove ;

    const gameCells = document.querySelectorAll('.child-cells');

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
            let currentCell = gameCells[i];
            currentCell.innerHTML = movesArray[i];
        }
    };

    return{
    render,
    gameCells
    }
})();

const GameController = (function(){
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = ()=> {
        players = [
        createPlayer(document.querySelector("#player-one-input").value, 'X'),
        createPlayer(document.querySelector("#player-two-input").value, 'O')]
        currentPlayerIndex = 0;
        gameOver = false;
        GameBoard.render();
        
        GameBoard.gameCells.forEach((cell) => {
            cell.addEventListener('click', handleClick)
        });
    }

    const handleClick = function(event){
        let arrayIndex = event.target.id;  
        console.log(arrayIndex);
    }

    return{start, players: players}
})();

const initialStart = document.querySelector("#player-input-start");
initialStart.addEventListener('click', () => {
    GameController.start()
})