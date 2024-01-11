
/* JavaScript */


var players = [
    {
        name: 'player1',
        icon: '🌿',
        isTurn: false,
        hasWon: false,
        plays: [],
        wins: 0
    },
    {
        name: 'player2',
        icon: '🐛',
        isTurn: true,
        hasWon: false,
        plays: [],
        wins: 0
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

/* HTML */
var turns = document.querySelector('.turns')
var gameBoard = document.querySelector('.gameboard-container')

gameBoard.addEventListener('click', (event) => {
    renderCellIcon(event)
});

function renderCellIcon(event) {
    var event = event.target.closest('div')
    for (var i = 0; i < players.length; i++) {
        if (players[0].hasWon === true || players[1].hasWon === true) {
            break
        } //break; //call on declare winner function then break inside that functio call on the reload gameboard
        if (players[i].isTurn === true && event.innerText === '') {
            event.innerText = `${players[i].icon}`
            players[i].plays.push(event.id)
            changeTurn()
            trackScore(players[i])
            
        }
    }
}

function changeTurn() {
    for (var i = 0; i < players.length; i++) {
        players[i].isTurn = !players[i].isTurn
        renderTurnIcon()
    }
}

function renderTurnIcon() {
    for (var i = 0; i < players.length; i++) {
        if (players[i].isTurn === true) {
            turns.innerText = `It's ${players[i].icon}'s turn`
        }
    }
}

function trackScore(player) {
    for (var i = 0; i < winningCombos.length; i++) {
        counter = 0;
        for(var j = 0; j < player.plays.length; j++) {
            if (winningCombos[i].includes(player.plays[j])) {
                counter++
            }
            if(counter === 3) {
                player.hasWon = true
                player.wins++
                renderWinner(player)
                // reloadGameboard()
            }
            if(player.hasWon === true) break;
        }
    }
}

function renderWinner(player) {
            turns.innerText = `${player.icon} won!`
}

setTimeout(reloadGameboard, 4000)

function reloadGameboard() {
    for(var i = 0; i < players.length; i++) {
        if(players[i].hasWon === true) {
            for(var child of gameBoard.children) {
                child.innerText = ""
            }
        }
    }
}
