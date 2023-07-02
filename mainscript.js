const gameBoard = (function(){
    let movesArray = ['', '', '', '', '', '', '', '', '']
    const render = function(){
        for(let i = 0; i < movesArray.length; i++){
            let currentCell = document.querySelector(`#child-cell${i}`)
            currentCell.innerHTML = `${movesArray[i]}`;
        }
    }
    
    const addMove = function(currentArrayPos){
        movesArray[currentArrayPos] = 'X';
        render();
    }

    const checkCell = function(currentCellID){
        if(currentCellID === "child-cell0"){
            let currentArrayPos = 0
            addMove(currentArrayPos);
        } else if(currentCellID === "child-cell1"){
            let currentArrayPos = 1
            addMove(currentArrayPos);
        } else if(currentCellID === "child-cell2"){
            let currentArrayPos = 2
            addMove(currentArrayPos);
        } else if(currentCellID === "child-cell3"){
            let currentArrayPos = 3
            addMove(currentArrayPos);
        } else if(currentCellID === "child-cell4"){
            let currentArrayPos = 4
            addMove(currentArrayPos);
        } else if(currentCellID === "child-cell5"){
            let currentArrayPos = 5
            addMove(currentArrayPos);
        } else if(currentCellID === "child-cell6"){
            let currentArrayPos = 6
            addMove(currentArrayPos);
        } else if(currentCellID === "child-cell7"){
            let currentArrayPos = 7
            addMove(currentArrayPos);
        } else if(currentCellID === "child-cell8"){
            let currentArrayPos = 8
            addMove(currentArrayPos);
        }
    }

    document.querySelector('.game-board').addEventListener('click', function(e){
        let currentCellID = e.target.id;
        checkCell(currentCellID);
    })

    return{
        render,
        addMove
    }
})();

