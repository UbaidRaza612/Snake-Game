// Constants
const GRID_SIZE = 20;
const CANVAS_SIZE = 400;
const SNAKE_SPEED = 100; // in milliseconds
const DIRECTION = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 }
};

// Variables
let snake = [{ x: 10, y: 10 }];
let food = getRandomFoodPosition();
let score = 0;
let currentDirection = DIRECTION.RIGHT;
let gameLoop;

// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Start button setup
const startButton = document.getElementById('startButton');
startButton.addEventListener('click', startGame);

// Start game function
function startGame() {
    resetGame();
    gameLoop = setInterval(gameTick, SNAKE_SPEED);
    document.addEventListener('keydown', handleKeyPress);
    startButton.style.display = 'none';
}

// Reset game function
function resetGame() {
    snake = [{ x: 10, y: 10 }];
    food = getRandomFoodPosition();
    score = 0;
    currentDirection = DIRECTION.RIGHT;
    updateScore();
}

// Game tick function
function gameTick() {
    moveSnake();
    if (checkCollision()) {
        endGame();
    } else {
        drawGame();
    }
}

// Move snake function
function moveSnake() {
    const head = { x: snake[0].x + currentDirection.x, y: snake[0].y + currentDirection.y };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score++;
        updateScore();
        food = getRandomFoodPosition();
    } else {
        snake.pop();
    }
}

// Check collision function
function checkCollision() {
    const head = snake[0];
    return (
        head.x < 0 || head.x >= GRID_SIZE ||
        head.y < 0 || head.y >= GRID_SIZE ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    );
}

// End game function
function endGame() {
    clearInterval(gameLoop);
    document.removeEventListener('keydown', handleKeyPress);
    startButton.style.display = 'inline-block';
    startButton.textContent = 'Restart Game';
}

// Handle key press function
function handleKeyPress(event) {
    const keyPressed = event.key;
    switch (keyPressed) {
        case 'ArrowUp':
            if (currentDirection !== DIRECTION.DOWN) currentDirection = DIRECTION.UP;
            break;
        case 'ArrowDown':
            if (currentDirection !== DIRECTION.UP) currentDirection = DIRECTION.DOWN;
            break;
        case 'ArrowLeft':
            if (currentDirection !== DIRECTION.RIGHT) currentDirection = DIRECTION.LEFT;
            break;
        case 'ArrowRight':
            if (currentDirection !== DIRECTION.LEFT) currentDirection = DIRECTION.RIGHT;
            break;
    }
}

// Update score function
function updateScore() {
    document.getElementById('score').textContent = `Score: ${score}`;
}

// Draw game function
function drawGame() {
    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw snake
    ctx.fillStyle = '#4CAF50';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE - 1, GRID_SIZE - 1);
    });

    // Draw food
    ctx.fillStyle = '#f44336';
    ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE - 1, GRID_SIZE - 1);
}

// Get random food position function
function getRandomFoodPosition() {
    return {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
    };
}
