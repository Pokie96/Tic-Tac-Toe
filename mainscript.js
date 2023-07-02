const gameBoard = (function(){
    let movesArray = ['', '', '', '', '', '', '', '', '']
    let currentPlayer;
    let currentMove ;

    const render = function(){
        for(let i = 0; i < movesArray.length; i++){
            let currentCell = document.getElementById(`${i}`)
            currentCell.innerHTML = `${movesArray[i]}`;
        }
    }

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
    
    const addMove = function(currentArrayPos, currentMove){
        movesArray[currentArrayPos] = currentMove;
        console.log(movesArray);
    }

    const findArrayPos = function(currentCellID){
        let currentArrayPos = parseInt(currentCellID)
        return currentArrayPos;
    }

    document.querySelector('.game-board').addEventListener('click', function(e){
        let currentCellID = e.target.id;
        let arrayPos = findArrayPos(currentCellID);
        console.log(arrayPos)
        currentMove = determinePlayer();
        addMove(arrayPos, currentMove);
        render();
    })
})();

