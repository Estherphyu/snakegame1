class Food {
    constructor() {
        this.position = this.getRandomPosition();
    }

    getRandomPosition() {
        return {
            x: Math.floor(Math.random() * 20) * 20,
            y: Math.floor(Math.random() * 20) * 20
        };
    }

    draw(ctx) {
        const centerX = this.position.x + 9;
        const centerY = this.position.y + 9;
        const petalSize = 6;

        // Draw petals
        ctx.fillStyle = '#FF69B4';
        for (let i = 0; i < 6; i++) {
            ctx.beginPath();
            const angle = (i * Math.PI) / 3;
            const x = centerX + Math.cos(angle) * petalSize;
            const y = centerY + Math.sin(angle) * petalSize;
            ctx.arc(x, y, petalSize, 0, Math.PI * 2);
            ctx.fill();
        }

        // Draw center
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
        ctx.fill();
    }

    respawn() {
        this.position = this.getRandomPosition();
    }
}