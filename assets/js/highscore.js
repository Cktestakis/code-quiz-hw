//HIGHSCORE
const HIGHSCORE_TABLE = document.getElementById("highscores-table");
const CLEAR_HIGHSCORE_BTN = document.getElementById("clear-highscores");

//EVENT LISTENER
CLEAR_HIGHSCORE_BTN.addEventListener('click', clearHighscores);

//LOADS TABLE WHEN PAGE IS LOADED
generateHighSoreTable();

function generateHighscoresTable() {
    let highscores = localStorage.getItem("scoreList");
    if (highscores) {
        addHighscoreTableRows(highscores);
    }
}

//HIGHSCORE TABLE GENERATION
function addHighscoreTablesRows(highscores) {
    highscores = JSON.parse(highscores);

    highscores.forEach(function(scoreItem, index) {
        const rankCell = createRankCell(index + 1);
        const scoreCell = createScoreCell(scoreItem.score);
        const initialsCell = createInitialsCell(scoreItem.initials);
        const highscoreTableRow =createHighscoreTableRow(rankCell, scoreCell, initialsCell);
        HIGHSCORE_TABLE.appendChild(highscoreTableRow);
    });
}

function createRankCell(rank) {
    const rankCell = document.createElement('td');
    rankCell.textContent = '#${rank}';
    return rankCell;
}

function createInitialsCell (initials) {
    const initialsCell = document.createElement('td');
    initialsCell.textContent = initials;
    return initialsCell;
}

function createHighscoreTableRow(rankCell, scoreCell, initialsCell) {
    const tableRow = document.createElement('tr');
    tableRow.appendChild(rankCell);
    tableRow.appendChild(scoreCell);
    tableRow.appendChild(initialsCell);
    return tableRow;
}

//TABLE CLEAR
function clearHighscores() {
    localStorage.setItem('scoreList', []);
    while (HIGHSCORE_TABLE.children.length > 1) {
        HIGHSCORE_TABLE.removeChild(HIGHSCORE_TABLE.lastChild);
    }
}