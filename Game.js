// Game constants
const GRID_SIZE = 20;
const GRID_COUNT = 20;
const GAME_SPEED = 200;
const SNAKE_COLORS = ['#4CAF50', '#2196F3', '#F44336', '#9C27B0', '#FF9800', '#795548'];

// Game variables
let snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
    { x: 7, y: 10 },
    { x: 6, y: 10 }
];
let food = null;
let direction = 'right';
let score = 0;
let gameLoop = null;
let currentColorIndex = 0;

// Get canvas context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Initialize game
function init() {
    generateFood();
    document.addEventListener('keydown', handleKeyPress);
    gameLoop = setInterval(update, GAME_SPEED);
}

// Generate food at random position
function generateFood() {
    food = {
        x: Math.floor(Math.random() * GRID_COUNT),
        y: Math.floor(Math.random() * GRID_COUNT)
    };
    
    // Make sure food doesn't spawn on snake
    for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            generateFood();
            break;
        }
    }
}

// Handle keyboard input
function handleKeyPress(event) {
    switch(event.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
    }
}

// Update game state
function update() {
    const head = { ...snake[0] };
    
    // Move snake head
    switch(direction) {
        case 'up': head.y--; break;
        case 'down': head.y++; break;
        case 'left': head.x--; break;
        case 'right': head.x++; break;
    }
    
    // Check for collisions
    if (checkCollision(head)) {
        gameOver();
        return;
    }
    
    // Add new head
    snake.unshift(head);
    
    // Check if snake ate food
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById('score').textContent = `Score: ${score}`;
        generateFood();
        // Change snake color
        currentColorIndex = (currentColorIndex + 1) % SNAKE_COLORS.length;
    } else {
        snake.pop();
    }
    
    // Draw everything
    draw();
}

// Check for collisions with walls or self
function checkCollision(head) {
    // Wall collision
    if (head.x < 0 || head.x >= GRID_COUNT || head.y < 0 || head.y >= GRID_COUNT) {
        return true;
    }
    
    // Self collision
    for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
            return true;
        }
    }
    
    return false;
}

// Draw game state
function draw() {
    // Clear canvas
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw snake
    ctx.fillStyle = SNAKE_COLORS[currentColorIndex];
    for (let segment of snake) {
        ctx.fillRect(
            segment.x * GRID_SIZE,
            segment.y * GRID_SIZE,
            GRID_SIZE - 1,
            GRID_SIZE - 1
        );
    }
    
    // Draw food (flower)
    const centerX = food.x * GRID_SIZE + GRID_SIZE / 2;
    const centerY = food.y * GRID_SIZE + GRID_SIZE / 2;
    const petalSize = GRID_SIZE / 3;

    // Draw petals
    ctx.fillStyle = '#FF69B4';
    for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        const angle = (i / 6) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * petalSize;
        const y = centerY + Math.sin(angle) * petalSize;
        ctx.arc(x, y, petalSize, 0, Math.PI * 2);
        ctx.fill();
    }

    // Draw center
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(centerX, centerY, petalSize * 0.8, 0, Math.PI * 2);
    ctx.fill();
}

// Game over function
function gameOver() {
    clearInterval(gameLoop);
    document.getElementById('finalScore').textContent = score;
    document.getElementById('gameOver').style.display = 'block';
}

// Restart game function
function restartGame() {
    // Reset game variables
    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 },
        { x: 7, y: 10 },
        { x: 6, y: 10 }
    ];
    direction = 'right';
    score = 0;
    currentColorIndex = 0;
    document.getElementById('score').textContent = 'Score: 0';
    document.getElementById('gameOver').style.display = 'none';
    
    // Start new game
    generateFood();
    gameLoop = setInterval(update, GAME_SPEED);
}

// Start the game
init();