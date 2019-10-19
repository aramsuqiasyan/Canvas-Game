var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var isPaused = false;
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height;
var dx = 5;
var dy = -5;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColCount = 4;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 36;


function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


var bricks = [];
for (var c = 0; c < brickColCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {
            x: 0,
            y: 0,
            color: getRandomColor(),
            status: 1
        }
    }
}



function drawBricks() {
    for (var c = 0; c < brickColCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    context.beginPath();
                    context.fillStyle = bricks[c][r].color;
                    context.rect(brickX, brickY, brickWidth, brickHeight);
                    context.fill();
                    context.closePath();
            }
        }
    }
}


function cloision() {
    for (var c = 0; c < brickColCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status == 1) {
                if (y < b.y + brickHeight + ballRadius && y - ballRadius > b.y && x > b.x && x < b.x + brickWidth) {
                    dy = -dy;
                    b.status = 0;
                }
            }

        }
    }
}

var request = setInterval(draw, 10);



document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

function gameOver() {
    context.font = '60px Times New Roman';
    context.fillStyle = '#f24343';
    context.strokeStyle = '#d63969';
    context.fillText('GAME OVER', canvas.width / 14, canvas.height / 2);
    context.strokeText('GAME OVER', canvas.width / 14, canvas.height / 2);
    clearInterval(request);
}

function drawBall() {
    y--;
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI * 2);
    context.fillStyle = 'red';
    context.fill();
}

function drawPaddle() {
    context.beginPath();
    context.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    context.fillStyle = 'blue';
    context.fill();
    context.closePath();
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    cloision();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    if (y + dy < ballRadius + paddleHeight) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            gameOver();
        }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;

}


