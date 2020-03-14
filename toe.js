var canvas = document.getElementById("board");
var context = canvas.getContext("2d");
canvas.height = 300;
canvas.width = 300;
var sectionSize = canvas.width / 3;
var player;
var count;
var track = new Array(3);
for (var i = 0; i < track.length; i++) {
    track[i] = new Array(3);
}
init();

function init() {
    resetGame();
}

function resetGame() {
    player = 1;
    count = 0;
    resetArray();
    setBoard();
}

function resetArray() {
    for (var i = 0; i < track.length; i++) {
        for (var j = 0; j < track[i].length; j++) {
            track[i][j] = 0;
        }
    }
}

function setBoard() {
    context.clearRect(0, 0, 300, 300);
    context.strokeStyle = "#d3d3d3";
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(100, 0);
    context.lineTo(100, 300);
    context.stroke();
    context.beginPath();
    context.moveTo(200, 0);
    context.lineTo(200, 300);
    context.stroke();
    context.beginPath();
    context.moveTo(0, 100);
    context.lineTo(300, 100);
    context.stroke();
    context.beginPath();
    context.moveTo(0, 200);
    context.lineTo(300, 200);
    context.stroke();
}

function checkWinner() {
    var winner = 0;
    for (var i = 1; i <= 2; i++) {
        if (track[0][0] == i && track[0][1] == i && track[0][2] == i ||
            track[1][0] == i && track[1][1] == i && track[1][2] == i ||
            track[2][0] == i && track[2][1] == i && track[2][2] == i ||
            track[0][0] == i && track[1][0] == i && track[2][0] == i ||
            track[0][1] == i && track[1][1] == i && track[2][1] == i ||
            track[0][2] == i && track[1][2] == i && track[2][2] == i ||
            track[0][0] == i && track[1][1] == i && track[2][2] == i ||
            track[0][2] == i && track[1][1] == i && track[2][0] == i) {
            if (i == 1) { winner = 1; } else { winner = 2; }
        }
    }
    return winner;
}


canvas.addEventListener("click", function(event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    addPlayingPiece(x, y);
});


function addPlayingPiece(x, y) {
    var xCordinate;
    var yCordinate;
    var winners;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            xCordinate = i * sectionSize;
            yCordinate = j * sectionSize;
            if (
                x >= xCordinate && x <= xCordinate + sectionSize &&
                y >= yCordinate && y <= yCordinate + sectionSize && track[i][j] === 0
            ) {
                if (player === 1) {
                    drawX(xCordinate, yCordinate);
                    track[i][j] = 1;
                    player = 2;
                } else {
                    drawO(xCordinate, yCordinate);
                    track[i][j] = 2;
                    player = 1;
                }
                count++;
            }
        }
    }
    setTimeout(function() {
        winners = checkWinner();
        if (count <= 9 && winners !== 0) {
            if (winners == 1) {
                alert("Player 1 Won!");
            } else if (winners == 2) {
                alert("Player 2 won!");
            }
            resetGame();
        } else if (count === 9) {
            alert("Match Draw!");
            resetGame();
        }
    }, 100);
}

function drawO(xCordinate, yCordinate) {
    var halfSectionSize = (0.5 * sectionSize);
    var centerX = xCordinate + halfSectionSize;
    var centerY = yCordinate + halfSectionSize;
    var radius = (sectionSize - 50) / 2;
    var startAngle = 0 * Math.PI;
    var endAngle = 2 * Math.PI;

    context.lineWidth = 10;
    context.strokeStyle = "#01bBC2";
    context.beginPath();
    context.arc(centerX, centerY, radius, startAngle, endAngle);
    context.stroke();
}

function drawX(xCordinate, yCordinate) {
    context.strokeStyle = "#f1be32";
    context.lineWidth = 10;
    context.beginPath();

    var offset = 25;
    context.moveTo(xCordinate + offset, yCordinate + offset);
    context.lineTo(xCordinate + sectionSize - offset, yCordinate + sectionSize - offset);

    context.moveTo(xCordinate + offset, yCordinate + sectionSize - offset);
    context.lineTo(xCordinate + sectionSize - offset, yCordinate + offset);

    context.stroke();
}