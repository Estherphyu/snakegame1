class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.scoreElement = document.getElementById('score');
        this.gameOverElement = document.getElementById('game-over');
        
        this.snake = new Snake();
        this.food = new Food();
        this.score = 0;
        this.gameLoop = null;
        this.gameSpeed = 300;

        this.setupControls();
        this.start();
    }

    setupControls() {
        document.addEventListener('keydown', (event) => {
            switch(event.key) {
                case 'ArrowUp':
                    this.snake.setDirection('up');
                    break;
                case 'ArrowDown':
                    this.snake.setDirection('down');
                    break;
                case 'ArrowLeft':
                    this.snake.setDirection('left');
                    break;
                case 'ArrowRight':
                    this.snake.setDirection('right');
                    break;
            }
        });
    }

    start() {
        if (this.gameLoop) return;
        
        this.gameLoop = setInterval(() => {
            this.update();
            this.draw();
        }, this.gameSpeed);
    }

    update() {
        this.snake.move();

        // Check for collisions
        if (this.snake.checkCollision()) {
            this.gameOver();
            return;
        }

        // Check if snake ate the food
        const head = this.snake.segments[0];
        if (head.x === this.food.position.x && head.y === this.food.position.y) {
            this.snake.grow();
            this.food.respawn();
            this.score += 10;
            this.updateScore();
        }
    }

    draw() {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw the game elements
        this.snake.draw(this.ctx);
        this.food.draw(this.ctx);
    }

    gameOver() {
        clearInterval(this.gameLoop);
        this.gameLoop = null;
        this.gameOverElement.style.display = 'block';
    }
}

// Start the game when the page loads
function startGame() {
    const playerName = document.getElementById('player-name').value.trim();
    if (!playerName) {
        alert('Please enter your name!');
        return;
    }
    document.getElementById('player-form').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    new Game(playerName);
}

class Game {
    constructor(playerName) {
        this.playerName = playerName;
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.scoreElement = document.getElementById('score');
        this.gameOverElement = document.getElementById('game-over');
        
        this.snake = new Snake();
        this.food = new Food();
        this.score = 0;
        this.gameLoop = null;
        this.gameSpeed = 300;

        this.setupControls();
        this.start();
        this.updateScore();
    }

    updateScore() {
        this.scoreElement.textContent = `${this.playerName}'s Score: ${this.score}`;
    }