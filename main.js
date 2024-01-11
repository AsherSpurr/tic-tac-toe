/* 


*/
/* JavaScript */
var players = [
    {
        name: 'player1',
        icon: '🌿',
        isTurn: false,
        hasWon: false,
        id: Date.now(),
    },
    {
        name: 'player2',
        icon: '🐛',
        isTurn: true,
        hasWon: false,
        id: Date.now(),
    }
]

var gameplay = []

/* Changes isTurn to true or false each time it's called */
function changeTurn() {
    for(var i = 0; i < players.length; i++) {
        players[i].isTurn = !players[i].isTurn
        renderTurnIcon()
    }
}

function trackScore() {
    
}

/* HTML */
var turns = document.querySelector('.turns')
var gameBoard = document.querySelector('.gameboard-container')

gameBoard.addEventListener('click', (e) => {
    renderCellIcon(e)
});

function renderCellIcon(event) {
    var event = event.target.closest('div')
    for(var i = 0; i < players.length; i++) {
        if(players[i].isTurn === true) {
            event.innerText = `${players[i].icon}`
            // event.id = players[i].id
            }
        }
        changeTurn()
    }

function renderTurnIcon() {
    for(var i = 0; i < players.length; i++) {
        if(players[i].isTurn === true) {
         turns.innerText = `It's ${players[i].icon}'s turn`
        }
    }
}