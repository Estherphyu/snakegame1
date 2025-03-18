class Snake {
    constructor() {
        this.segments = [
            { x: 200, y: 200 }, // Head
            { x: 180, y: 200 }, // Body
            { x: 160, y: 200 }  // Tail
        ];
        this.direction = 'right';
        this.nextDirection = 'right';
        this.colors = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFC107', '#FF9800', '#FF5722'];
        this.currentColorIndex = 0;
    }

    move() {
        this.direction = this.nextDirection;
        const head = { ...this.segments[0] };

        switch (this.direction) {
            case 'up':
                head.y -= 20;
                break;
            case 'down':
                head.y += 20;
                break;
            case 'left':
                head.x -= 20;
                break;
            case 'right':
                head.x += 20;
                break;
        }

        this.segments.unshift(head);
        this.segments.pop();
    }

    grow() {
        const tail = { ...this.segments[this.segments.length - 1] };
        this.segments.push(tail);
        // Change color when growing
        this.currentColorIndex = (this.currentColorIndex + 1) % this.colors.length;
    }

    setDirection(direction) {
        const opposites = {
            'up': 'down',
            'down': 'up',
            'left': 'right',
            'right': 'left'
        };

        if (opposites[this.direction] !== direction) {
            this.nextDirection = direction;
        }
    }

    checkCollision() {
        const head = this.segments[0];

        // Wall collision
        if (head.x < 0 || head.x >= 400 || head.y < 0 || head.y >= 400) {
            return true;
        }

        // Self collision
        for (let i = 1; i < this.segments.length; i++) {
            if (head.x === this.segments[i].x && head.y === this.segments[i].y) {
                return true;
            }
        }

        return false;
    }

    draw(ctx) {
        const currentColor = this.colors[this.currentColorIndex];
        this.segments.forEach((segment, index) => {
            if (index === 0) {
                // Draw head with a darker shade
                ctx.fillStyle = this.darkenColor(currentColor, 20);
            } else {
                ctx.fillStyle = currentColor;
            }
            ctx.fillRect(segment.x, segment.y, 18, 18);
        });
    }

    darkenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) - amt;
        const G = (num >> 8 & 0x00FF) - amt;
        const B = (num & 0x0000FF) - amt;
        return '#' + (
            0x1000000 +
            (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
            (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
            (B < 255 ? (B < 1 ? 0 : B) : 255)
        ).toString(16).slice(1);
    }
}