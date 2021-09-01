//HIGHSCORES

var HIGHSCORE_TABLE = document.getElementById("highscores-table");
var CLEAR_HIGHSCORE_BTN = document.getElementById("clear-highscores");

CLEAR_HIGHSCORE_BTN.addEventListener('click', clearHighscores);

generateHighscoresTable();

function generateHighscoresTable() {
    let highscores = localStorage.getItem("scoreList");
    if (highscores) {
        addHighscoreTableRows(highscores);
    }
}

//score table generation//
function addHighscoreTableRows(highscores) {
    highscores = JSON.parse(highscores);

    highscores.forEach(function(scoreItem, index) {
        var rankCell = createRankCell (index + 1);
        var scoreCell = createScoreCell(scoreItem.score);
        var initialsCell = createInitialsCell(scoreItem.initials);
        var highscoreTableRow = createHighScoreTableRow(rankCell, scoreCell, initialsCell);
        HIGHSCORE_TABLE.appendChild(highscoreTableRow);
    });
}

function createRankCell(rank) {
    var rankCell = document.createElement('td');
    rankCell.textContent = '#${rank}';
    return rankCell;
}

function createScoreCell(score) {
    var scoreCell = document.createElement('td');
    scoreCell.textContent = score;
    return scoreCell;
}

function createInitialsCell(initials) {
    var initialsCell = document.createElement('td');
    initialsCell.textContent = initials;
    return initialsCell;
}

function createHighScoreTableRow(rankCell, scoreCell, initialsCell) {
    var tableRow = document.createElement('tr');
    tableRow.appendChild(rankCell);
    tableRow.appendChild(scoreCell);
    tableRow.appendChild(initialsCell);
    return tableRow;
}

//Table Clear//
function clearHighscores() {
    localStorage.setItem('scoreList', []);
    while (HIGHSCORE_TABLE.children.length > 1) {
        HIGHSCORE_TABLE.removeChild(HIGHSCORE_TABLE.lastChild);
    }
}