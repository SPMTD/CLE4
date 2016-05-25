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
var E_SCENES;
(function (E_SCENES) {
    E_SCENES[E_SCENES["SPLASH_SCREEN"] = 0] = "SPLASH_SCREEN";
    E_SCENES[E_SCENES["MENU_SCREEN"] = 1] = "MENU_SCREEN";
})(E_SCENES || (E_SCENES = {}));
class Game {
    constructor() {
        this.canvas = document.getElementsByTagName("canvas")[0];
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext('2d');
        this.activateScene(E_SCENES.SPLASH_SCREEN);
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup", (e) => this.onKeyUp(e));
        requestAnimationFrame(() => this.update());
    }
    activateScene(scene) {
        switch (scene) {
            case E_SCENES.SPLASH_SCREEN:
                this.activeScene = new SplashScene();
                break;
            case E_SCENES.MENU_SCREEN:
                this.activeScene = new SplashScene();
                break;
        }
    }
    update() {
        this.activeScene.update();
        this.draw();
        requestAnimationFrame(() => this.update());
    }
    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.activeScene.draw(this.context);
    }
    onKeyDown(event) {
        this.activeScene.onKeyDown(event);
    }
    onKeyUp(event) {
        this.activeScene.onKeyUp(event);
    }
}
window.addEventListener("load", function () {
    new Game();
});
class GameObject {
    constructor(position, width, height, needsInput = false) {
        this.width = width;
        this.height = height;
        position.x = (position.x - (this.width / 2));
        position.y = (position.y - (this.height / 2));
        this.position = position;
        this.needsInput = needsInput;
        this.direction = Vector2.zero;
    }
    update() {
        this.position = Vector2.add(this.position, Vector2.multiply(this.direction, this.speed));
    }
    draw(ctx) { }
    onKeyDown(event) { }
    onKeyUp(event) { }
}
class Scene {
    constructor() {
        this.gameObjects = [];
        this.init();
    }
    init() {
    }
    destroy() {
    }
    update() {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].update();
        }
    }
    draw(ctx) {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].draw(ctx);
        }
    }
    onKeyDown(event) {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].onKeyDown(event);
        }
    }
    onKeyUp(event) {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].onKeyUp(event);
        }
    }
}
class SpriteObject extends GameObject {
    constructor(position, width, height, img, needsInput = false) {
        super(position, width, height, needsInput);
        this.sprite = new Image(this.width, this.height);
        this.sprite.src = 'images/' + img + '.png';
    }
    update() {
        super.update();
    }
    draw(ctx) {
        ctx.drawImage(this.sprite, this.position.x, this.position.y, this.width, this.height);
    }
    onKeyDown(event) {
    }
    onKeyUp(event) {
    }
}
class TextObject extends GameObject {
    constructor(position, width, height, text, size) {
        super(position, width, height);
        this.text = text;
        this.size = size;
    }
    update() {
    }
    draw(ctx) {
        ctx.fillStyle = "rgba(0, 0, 0, 100)";
        ctx.font = this.size + "px Arial";
        ctx.fillText(this.text, this.position.x, this.position.y, this.width);
    }
}
class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static multiply(v1, scalar) {
        return new Vector2(v1.x * scalar, v1.y * scalar);
    }
    static add(v1, v2) {
        return new Vector2(v1.x + v2.x, v1.y + v2.y);
    }
    static substract(v1, v2) {
        return new Vector2(v1.x + v2.x, v1.y + v2.y);
    }
}
Vector2.zero = new Vector2(0, 0);
class Knightsalot extends GameObject {
}
class Puss extends SpriteObject {
    constructor(position, width, height, speed) {
        super(position, width, height, 'cat', true);
        this.speed = speed;
    }
    update() {
        super.update();
    }
    onKeyDown(event) {
        switch (event.keyCode) {
            case 38:
                this.direction.y = -1;
                break;
            case 39:
                this.direction.x = 1;
                break;
            case 40:
                this.direction.y = 1;
                break;
            case 37:
                this.direction.x = -1;
                break;
        }
    }
    onKeyUp(event) {
        switch (event.keyCode) {
            case 38:
                this.direction.y = 0;
                break;
            case 39:
                this.direction.x = 0;
                break;
            case 40:
                this.direction.y = 0;
                break;
            case 37:
                this.direction.x = 0;
                break;
        }
    }
}
class SplashScene extends Scene {
    init() {
        super.init();
        this.gameObjects.push(new TextObject(new Vector2(window.innerWidth / 2, 100), 400, 50, "Welcome to zha jungle, ya!", 36));
        this.gameObjects.push(new FadeText(new Vector2(window.innerWidth / 2, window.innerHeight - 200), 600, 50, "Druk op een toets om door te gaan!", 36, 0.25, 1.0, 5));
        this.gameObjects.push(new Puss(new Vector2(window.innerWidth / 2, window.innerHeight / 2 + 100), 100, 250, 5));
    }
    update() {
        super.update();
    }
    draw(ctx) {
        super.draw(ctx);
    }
}
class FadeText extends TextObject {
    constructor(position, width, height, text, size, low, high, duration) {
        super(position, width, height, text, size);
        this.lowAlpha = low;
        this.highAlpha = high;
        this.duration = duration;
        this.alpha = 1.0;
        this.revert = false;
    }
    update() {
    }
    draw(ctx) {
        if (!this.revert) {
            if (this.alpha > this.lowAlpha)
                this.alpha -= .005;
            else
                this.revert = true;
        }
        else {
            if (this.alpha <= this.highAlpha)
                this.alpha += .01;
            else
                this.revert = false;
        }
        ctx.fillStyle = "rgba(0, 0, 0, " + this.alpha + ")";
        ctx.font = this.size + "px Arial";
        ctx.fillText(this.text, this.position.x, this.position.y, this.width);
    }
}
//# sourceMappingURL=main.js.map