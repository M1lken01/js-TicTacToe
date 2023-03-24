const p1 = "x";
const p2 = "o";
const bot = false;

var ended = false;
var next = true;
var moves = 0;
var table = ["", "", "", "", "", "", "", "", "", ]
var moveLog = []

function botCalcEasy() {
    var botMove = (Math.random() * 8).toFixed(0);
    if (isValid(botMove)) {
        move(botMove);
    } else {
        botCalcEasy();
    }
}

function move(cell) {
    if (!ended) {
        if (isValid(cell)) {
            moveLog.push(parseInt(cell))
            document.querySelectorAll('td')[parseInt(cell)].innerHTML = whoNext();
            table[cell] = whoNext();
            next = !next;
            moves += 1;
            document.getElementById("player").innerHTML = "Next: " + whoNext();
            console.log(moveLog)
            check(cell);
        }
    }
}

function isValid(cell) {
    if (document.querySelectorAll('td')[parseInt(cell)].innerHTML == '') return true;
    else return false;
}

function whoNext() {
    if (next)
        return p1;
    else return p2;
}

function check(cell) {
    if (moves == 9) draw();
    if (moves >= 5) checkCase();
    if (bot && !ended && moves <= 9 && !next) botCalcEasy(cell);
}

function checkCase() {
    //brute force lol
    checkOne(p1);
    checkOne(p2);
}

function checkOne(s) {
    if (table[0] == s && table[3] == s && table[6] == s) win(s);
    if (table[0] == s && table[1] == s && table[2] == s) win(s);
    if (table[0] == s && table[4] == s && table[8] == s) win(s);
    if (table[1] == s && table[4] == s && table[7] == s) win(s);
    if (table[2] == s && table[5] == s && table[8] == s) win(s);
    if (table[2] == s && table[4] == s && table[6] == s) win(s);
    if (table[3] == s && table[4] == s && table[5] == s) win(s);
    if (table[6] == s && table[7] == s && table[8] == s) win(s);
}

function draw() {
    ended = true;
    document.getElementById("state").innerHTML = "Draw!";
}

function win(w) {
    ended = true;
    document.getElementById("state").innerHTML = "Winner is " + w + "!";
}

function restart() {
    window.location.reload();
}