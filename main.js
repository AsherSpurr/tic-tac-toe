/* 


*/
/* JavaScript */
var players = [
    {
        name: 'player1',
        icon: '🌿',
        isTurn: false,
        hasWon: false,
        plays: [],
    },
    {
        name: 'player2',
        icon: '🐛',
        isTurn: true,
        hasWon: false,
        plays: [],
    }
]

var winningCombos = [
    ['cell1', 'cell2', 'cell3'],
    ['cell4', 'cell5', 'cell6'],
    ['cell7', 'cell8', 'cell9'],
    ['cell1', 'cell4', 'cell7'],
    ['cell2', 'cell5', 'cell8'],
    ['cell3', 'cell6', 'cell9'],
    ['cell1', 'cell5', 'cell9'],
    ['cell3', 'cell5', 'cell7'],
]

function playTurn() {

}

/* HTML */
var turns = document.querySelector('.turns')
var gameBoard = document.querySelector('.gameboard-container')

gameBoard.addEventListener('click', (event) => {
    renderCellIcon(event)
});

function renderCellIcon(event) {
    var event = event.target.closest('div')
    for(var i = 0; i < players.length; i++) {
        if(players[i].isTurn === true && event.innerText === '') {
            event.innerText = `${players[i].icon}`
            players[i].plays.push(event.id)
            console.log(players[i].plays)
            // trackScore()
            changeTurn()
            }
        }
    }

function changeTurn() {
    for(var i = 0; i < players.length; i++) {
            players[i].isTurn = !players[i].isTurn
            renderTurnIcon()
    }
}

function renderTurnIcon() {
    for(var i = 0; i < players.length; i++) {
        if(players[i].isTurn === true) {
         turns.innerText = `It's ${players[i].icon}'s turn`
        }
    }
}

// function trackScore() {
//     for(var i = 0; i < players.length; i++) {
//         for(var i = 0; i < winningCombos.length; i++) {
//             if(players[i].plays === winningCombos[i]) {
//                 players[i].hasWon = true
//                 console.log('you won')
//             }
//         }
//     }
// }