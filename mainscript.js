const gameBoard = (function(){
    let movesArray = ['', '', '', '', '', '', '', '', '']
    const render = function(){
        for(let i = 0; i < movesArray.length; i++){
            let currentCell = document.querySelector(`#child-cell${i}`)
            currentCell.innerHTML = `${movesArray[i]}`;
        }
    }
    
    const addMove = function(){
        movesArray[3] = 'X';
        render();
    }

    return{
        render,
        addMove
    }
})();

gameBoard.render();
