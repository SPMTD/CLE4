class Battleship {
    constructor() {
        this.directionX = 0;
        this.directionY = 0;
        this.x = 0;
        this.y = 0;
        this.speed = 0;
        this.currentFrame = 0;
        this.animationY = 0;
        this.animationSpeed = 0;
        this.frameWidth = 161;
        this.frameHeight = 161;
        this.timer = 0;
        this.createCanvasElement();
        this.directionX = 0;
        this.directionY = 0;
        this.speed = 3;
        this.animationSpeed = 10;
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup", (e) => this.onKeyUp(e));
    }
    createCanvasElement() {
        var canvas = document.getElementsByTagName("canvas")[0];
        this.context = canvas.getContext('2d');
        this.image = new Image();
        this.image.src = 'images/battleship.png';
    }
    onKeyDown(event) {
        switch (event.keyCode) {
            case 38:
                this.directionY = -1;
                this.animationY = 3;
                break;
            case 39:
                this.directionX = 1;
                this.animationY = 2;
                break;
            case 40:
                this.directionY = 1;
                this.animationY = 0;
                break;
            case 37:
                this.directionX = -1;
                this.animationY = 1;
                break;
        }
    }
    onKeyUp(event) {
        switch (event.keyCode) {
            case 38:
                this.directionY = 0;
                break;
            case 39:
                this.directionX = 0;
                break;
            case 40:
                this.directionY = 0;
                break;
            case 37:
                this.directionX = 0;
                break;
        }
    }
    move() {
        this.x = this.x + this.speed * this.directionX;
        this.y = this.y + this.speed * this.directionY;
    }
    draw() {
        this.timer++;
        if (this.timer % this.animationSpeed == 0) {
            this.currentFrame++;
        }
        if (this.currentFrame > 3) {
            this.currentFrame = 0;
        }
        this.context.drawImage(this.image, this.currentFrame * this.frameWidth, this.animationY * this.frameHeight, this.frameWidth, this.frameHeight, this.x, this.y, this.frameWidth, this.frameHeight);
    }
}
class Game {
    constructor() {
        this.canvas = document.getElementsByTagName("canvas")[0];
        this.context = this.canvas.getContext('2d');
        requestAnimationFrame(() => this.update());
    }
    update() {
        this.draw();
    }
    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        requestAnimationFrame(() => this.update());
    }
}
class knightsalot {
    constructor() {
        this.directionX = 0;
        this.directionY = 0;
        this.x = 0;
        this.y = 0;
        this.speed = 0;
        this.createCanvasElement();
        this.directionX = 0;
        this.directionY = 0;
        this.speed = 3;
        this.animationSpeed = 10;
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup", (e) => this.onKeyUp(e));
    }
}
window.addEventListener("load", function () {
    new Game();
});
class puss {
    constructor() {
        this.directionX = 0;
        this.directionY = 0;
        this.x = 0;
        this.y = 0;
        this.speed = 0;
        this.createCanvasElement();
        this.directionX = 0;
        this.directionY = 0;
        this.speed = 3;
        this.animationSpeed = 10;
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup", (e) => this.onKeyUp(e));
    }
}
//# sourceMappingURL=main.js.map