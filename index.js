let status = true;
let playing = true;
let matrixCell = [...Array(20)].map(e => Array(20));
let clickCell = [...Array(20)].map(e => Array(20));

function cal(i, j, text, dx, dy) {
    if (i < 0 || i > 19 || j < 0 || j > 19) return 0;
    if (matrixCell[i][j].innerText != text) return 0;
    return x = cal(i + dx, j + dy, text, dx, dy) + 1;
}
function tracking(i, j, text, dx, dy) {
    if (i < 0 || i > 19 || j < 0 || j > 19) return;
    if (matrixCell[i][j].innerText != text) return;
    matrixCell[i][j].style.background = "red";
    tracking(i + dx, j + dy, text, dx, dy)
}
function checkWin(i, j) {
    var text = matrixCell[i][j].innerText;
    var dx = [-1,1,0,0,-1,1,-1,1];
    var dy = [0,0,-1,1,-1,1,1,-1];
    for(var k = 0;k<7;k+=2){
        if (cal(i, j, text, dx[k], dy[k]) + cal(i, j, text, dx[k+1], dy[k+1]) - 1 >= 5) {
            tracking(i, j, text, dx[k], dy[k]);
            tracking(i, j, text, dx[k+1], dy[k+1]);
            return true;
        }
    }
    return false;
}
function resetBoard() {
    status = true;
    playing = true;
    document.getElementById("player").innerText = 'X';
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
            matrixCell[i][j].innerText = '';
            clickCell[i][j] = false;
            matrixCell[i][j].style.background = 'wheat';
        }
    }
}
function initCell() {
    var cells = document.getElementsByClassName("cell");
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
            matrixCell[i][j] = cells[i * 20 + j];
            matrixCell[i][j].innerText = "";
            matrixCell[i][j].addEventListener('click', (e) => {
                if (e.toElement.innerText != '') return;
                if(playing==false) return;
                clickCell[i][j] = true;
                e.toElement.innerText = status ? "X" : "O";
                if (checkWin(i, j)) {
                    alert(status ? "X" : "O"+"'s wins");
                    playing = false;
                }
                status = !status;
                document.getElementById("player").innerText = status ? "X" : "O";

            });
        }
    }
    
}
function startGame(){
    initCell();
    document.getElementById("restart").addEventListener('click',function(){
        resetBoard();
    })
}
startGame();