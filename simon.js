let gameseq = [];
let userseq = [];
let btns = ["yellow", "green", "red", "blue"];
let started = false;
let level = 0;
let highest = 0;

const h4 = document.querySelector("h4");

// Start game on keypress
document.addEventListener("keypress", () => {
    if (!started) {
        started = true;
        levelUp();
    }
});

// Flash functions
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
    btn.classList.add("uflash");
    setTimeout(() => btn.classList.remove("uflash"), 250);
}

// Increase level and show new sequence
function levelUp() {
    userseq = [];
    level++;
    h4.innerText = `Level ${level}`;
    const randidx = Math.floor(Math.random() * 4); 
    const randColor = btns[randidx];
    const randBtn = document.getElementById(randColor);
    gameFlash(randBtn);
    gameseq.push(randColor);
}

// Check user's sequence
function checkAnswer(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        if (level - 1 > highest) highest = level - 1;
        h4.innerHTML = `Game Over<br> Highest Score: <b>${highest}</b><br> Your Score: <b>${level - 1}</b><br> Press any key to start!`;
        document.body.style.backgroundColor = "red";
        setTimeout(() => document.body.style.backgroundColor = "white", 150);
        resetGame();
    }
}

// Button click handler
function btnPress() {
    const btn = this;
    userFlash(btn);
    const userColor = btn.id;
    userseq.push(userColor);
    checkAnswer(userseq.length - 1);
}

// Add event listeners to buttons
document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", btnPress);
});

// Reset game
function resetGame() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}
