let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let lastPantTime = 0;
let speed = 5;
let score = 0;
let snakeArr = [
    { x: 7, y: 10 }
];
let food = { x: 13, y: 15 }
const board = document.getElementById("board")
const Score = document.getElementById("score")
const Hiscore = document.getElementById("Hiscore")

function main(ctime) {
    window.requestAnimationFrame(main)
    // console.log(ctime)
    if ((ctime - lastPantTime) / 1000 < 1 / speed) {
        return
    }
    lastPantTime = ctime;
    gameEngine();
}

function isCollied(snake) {
    //crash your self
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}

function gameEngine() {
    // 2nd part update snake here 
    if (isCollied(snakeArr)) {
        gameOverSound.play();
        // musicSound.pause();
        inputDir = { x: 0, y: 0 };
        // alert('Game Over: please press any key to play again!');
         Swal.fire('Game Over!')

        snakeArr = [{ x: 7, y: 10 }];
        // musicSound.play();
        score = 0;
        Score.innerHTML = "Score: 0"
    }

    // update food and score again 
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        foodSound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval=score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            Hiscore.innerHTML = "High Score:" + hiscoreval;

        }
        Score.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    //move snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // 1st part full snake display here 
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head')
        }
        else {
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement)
    })
    // snake food display here 
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement)
}

// High score 
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
   var hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
    hiscoreval = (JSON.parse(hiscore))
    Hiscore.innerHTML = "High Score:" + hiscore;
}

// main logic here 
window.requestAnimationFrame(main)
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };
    moveSound.play();
    // musicSound.play();
    switch (e.key) {
        case 'ArrowUp':
            inputDir.x = 0;
            inputDir.y = -1;
            console.log("ArrowUp")
            break;
        case 'ArrowDown':
            inputDir.x = 0;
            inputDir.y = 1;
            console.log("ArrowDown")
            break;
        case 'ArrowLeft':
            inputDir.x = -1;
            inputDir.y = 0;
            console.log("ArrowLeft")
            break;
        case 'ArrowRight':
            inputDir.x = 1;
            inputDir.y = 0;
            console.log("ArrowRight")
            break;
        default:
            break;
    }
})