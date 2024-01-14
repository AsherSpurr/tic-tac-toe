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

var welcomeMessage = document.querySelector('.welcome-message')
var turns = document.querySelector('.turns')
var gameBoard = document.querySelector('.gameboard-container')
var winsPlayer1 = document.getElementById('player1-wins')
var winsPlayer2 = document.getElementById('player2-wins')

window.addEventListener('load', storeWinsLocally)

gameBoard.addEventListener('click', (event) => {
    checkforPlay(event)
});

// renderZeroWins()
// function renderZeroWins() {
//     winsPlayer1.innerText = `${players[0].wins} wins`
//     winsPlayer2.innerText = `${players[1].wins} wins`
// }

setTimeout(replaceDisplayMessage, 1500)

function replaceDisplayMessage() {
    turns.classList.remove('hidden')
    welcomeMessage.classList.add('hidden')
}

function checkforPlay(event) {
    var event = event.target.closest('div')
    for (var i = 0; i < players.length; i++) {
        if (players[0].hasWon === true || players[1].hasWon === true) {
            break
        }
        if (players[i].isTurn === true && event.innerText === '') {
            renderCellIcon(event, players[i])
            trackPlay(event, players[i])
            changeTurn()
            trackWins(players[i])
        }
    }
}

function renderCellIcon(event, player) {
    event.innerText = `${player.icon}`
}

function trackPlay(event, player) {
    player.plays.push(event.id)
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

function trackWins(player) {
    for (var i = 0; i < winningCombos.length; i++) {
        counter = 0;
        for (var j = 0; j < player.plays.length; j++) {
            if (winningCombos[i].includes(player.plays[j])) {
                counter++
            }
            if (counter === 3) {
                player.hasWon = true
                console.log(`line 102: ${player.wins}`)
                player.wins++
                // storeWinsLocally(player)
                renderWinner(player)
                renderWins(player)
                setTimeout(reloadGameboard, 1500)
            }
        }
    }
    isDraw(player)
}

function storeWinsLocally() {
    for(var i = 0; i < players.length; i++) {
    if(player[i].name === 'player1') {
        localStorage.setItem('win0', players[i].wins)
    }
    else {
        localStorage.setItem('wins1', player.wins)
    }
    refreshWins()
    }  
}   

function refreshWins() {
    var wins0 = parseInt(localStorage.getItem('wins0'))
    var wins1 = parseInt(localStorage.getItem('wins1'))
    for(var i = 0; i < players.length; i++) {
            if(wins0 != NaN || wins1 != NaN){
                players[0].wins = wins0
                players[1].wins = wins1
                renderWins(players[i])
        }
    }
}

function isDraw(player) {
    if (player.plays.length === 5 && !player.hasWon) {
        declareDraw()
        setTimeout(reloadGameboard, 1500)
    }
}

function renderWinner(player) {
    turns.innerText = `${player.icon} won!`
}

function declareDraw() {
    turns.innerText = `Draw!`
}

function reloadGameboard() {
    for (var i = 0; i < players.length; i++) {
        if (players[i].hasWon === true || players[i].plays.length === 5) {
            for (var child of gameBoard.children) {
                child.innerText = ""
            }
            resetInitialValues()
            renderTurnIcon()
        }

    }
}

function resetInitialValues() {
    for (var i = 0; i < players.length; i++) {
        players[i].hasWon = false
        players[i].plays.splice(0, players[i].plays.length)
    }
}

function renderWins(player) {
    var win = player.wins
    if (player.name === 'player1') {
        winsPlayer1.innerText = `${win} wins`
    }
    else {
        winsPlayer2.innerText = `${win} wins`
    }
}
