const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('scoreEl');
const gameOverEl = document.getElementById('gameOver');

let score = 0;
let balloons = [];
let gameActive = false;

function Balloon() {
    this.x = 60 + Math.random() * 480;
    this.y = 420;
    this.r = 25;
    this.color = `hsl(${360 * Math.random()}, 70%, 60%)`;
}

Balloon.prototype.move = function() {
    this.y -= 3;
};

Balloon.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + this.r);
    ctx.lineTo(this.x, this.y + 35);
    ctx.strokeStyle = '#333';
    ctx.stroke();
};

function gameLoop() {
    ctx.clearRect(0, 0, 600, 400);
    
    for(let i = balloons.length - 1; i >= 0; i--) {
        balloons[i].move();
        balloons[i].draw();
        
        if(balloons[i].y < -30) {
            gameOver();
            return;
        }
    }
    
    if(Math.random() < 0.04 && balloons.length < 7) {
        balloons.push(new Balloon());
    }
    
    scoreEl.textContent = score;
    
    if(gameActive) {
        setTimeout(gameLoop, 50);
    }
}

function startGame() {
    gameActive = true;
    score = 0;
    balloons = [];
    gameOverEl.style.display = 'none';
    gameLoop();
}

function gameOver() {
    gameActive = false;
    document.getElementById('finalScore').textContent = score;
    gameOverEl.style.display = 'block';
}

canvas.onclick = function(e) {
    if(!gameActive) return;
    
    let x = e.offsetX;
    let y = e.offsetY;
    
    for(let i = balloons.length - 1; i >= 0; i--) {
        let dx = x - balloons[i].x;
        let dy = y - balloons[i].y;
        if(dx*dx + dy*dy < 625) {
            balloons.splice(i, 1);
            score++;
            break;
        }
    }
};
