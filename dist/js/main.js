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
    constructor(position, width, height, needsInput = false, collider = false) {
        this.speed = 0;
        this.width = width;
        this.height = height;
        position.x = (position.x - (this.width / 2));
        position.y = (position.y - (this.height / 2));
        this.position = position;
        this.needsInput = needsInput;
        this.hasCollider = collider;
        this.direction = Vector2.zero;
        if (this.hasCollider)
            this.rect = new Rectangle(position.x, position.y, width, height);
    }
    isColliding(r) {
        return this.rect.hitsOtherRectangle(r.rect);
    }
    update() {
        this.rect = new Rectangle(this.position.x, this.position.y, this.width, this.height);
        this.position = Vector2.add(this.position, Vector2.multiply(this.direction, this.speed));
    }
    draw(ctx) { }
    onKeyDown(event) { }
    onKeyUp(event) { }
}
class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    hitsPoint(posx, posy) {
        var differencex = this.x - posx;
        var differencey = this.y - posy;
        return Math.abs(differencex) < this.width / 2 && Math.abs(differencey) < this.height / 2;
    }
    hitsOtherRectangle(rec) {
        return !(rec.x > this.x + this.width ||
            rec.x + rec.width < this.x ||
            rec.y > this.y + this.height ||
            rec.y + rec.height < this.y);
    }
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
        this.checkCollisions();
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].update();
        }
    }
    draw(ctx) {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].draw(ctx);
        }
    }
    checkCollisions() {
        for (let i = 0; i < this.gameObjects.length; i++) {
            for (let j = 0; j < this.gameObjects.length; j++) {
                if (i == j)
                    continue;
                if (!this.gameObjects[i].hasCollider || !this.gameObjects[j].hasCollider)
                    continue;
                if (this.gameObjects[i].isColliding(this.gameObjects[j])) {
                    console.log("Hitting nigga");
                }
            }
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
class Wall extends GameObject {
    constructor(position, width, height, needsInput = false, collider = false) {
        super(position, width, height, needsInput, collider);
        this.sprite = new Image(this.width, this.height);
        this.sprite.src = 'images/wall.png';
    }
    update() {
        super.update();
    }
    draw(ctx) {
        ctx.drawImage(this.sprite, this.position.x, this.position.y, this.width, this.height);
    }
}
class SpriteObject extends GameObject {
    constructor(position, width, height, img, needsInput = false, collider = false) {
        super(position, width, height, needsInput, collider);
        this.currentFrame = 0;
        this.animationY = 0;
        this.animationSpeed = 0;
        this.frameWidth = 57;
        this.frameHeight = 55;
        this.timer = 0;
        this.sprite = new Image(this.width, this.height);
        this.sprite.src = 'images/' + img + '.png';
    }
    update() {
        super.update();
    }
    draw(ctx) {
        this.timer++;
        if (Vector2.length(this.direction) > 0) {
            if (this.timer % this.animationSpeed == 0)
                this.currentFrame++;
            if (this.currentFrame > 3) {
                this.currentFrame = 0;
            }
        }
        ctx.drawImage(this.sprite, this.currentFrame * this.frameWidth, this.animationY * this.frameHeight, this.frameHeight, this.frameWidth, this.position.x, this.position.y, this.frameWidth, this.frameHeight);
    }
    onKeyDown(event) {
    }
    onKeyUp(event) {
    }
}
class TextObject extends GameObject {
    constructor(position, width, height, text, size, r, g, b, a = 1) {
        super(position, width, height, false, false);
        this.color = [4];
        this.text = text;
        this.size = size;
        this.color[0] = r;
        this.color[1] = g;
        this.color[2] = b;
        this.color[3] = a;
        this.cacheColorString();
    }
    update() {
    }
    draw(ctx) {
        ctx.fillStyle = this.textColor;
        ctx.font = this.size + "px Arial";
        ctx.fillText(this.text, this.position.x, this.position.y, this.width);
    }
    cacheColorString() {
        this.textColor = "rgba(" + this.color[0] + "," + this.color[1] + "," + this.color[2] + "," + this.color[3] + ")";
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
    static length(v1) {
        return Math.sqrt((v1.x * v1.x) + (v1.y * v1.y));
    }
    static isZero(v1) {
        return ((v1.x == Vector2.zero.x && v1.y == Vector2.zero.y) ? true : false);
    }
}
Vector2.zero = new Vector2(0, 0);
class Knightsalot extends GameObject {
}
class Puss extends SpriteObject {
    constructor(position, width, height, speed) {
        super(position, width, height, 'spriteTest', true, true);
        this.speed = speed;
        this.animationSpeed = 10;
    }
    update() {
        super.update();
    }
    onKeyDown(event) {
        switch (event.keyCode) {
            case 38:
                this.direction.y = -1;
                this.animationY = 3;
                break;
            case 39:
                this.direction.x = 1;
                this.animationY = 2;
                break;
            case 40:
                this.direction.y = 1;
                this.animationY = 0;
                break;
            case 37:
                this.direction.x = -1;
                this.animationY = 1;
                break;
        }
    }
    onKeyUp(event) {
        switch (event.keyCode) {
            case 38:
                this.direction.y = 0;
                this.animationY = 0;
                break;
            case 39:
                this.direction.x = 0;
                this.animationY = 0;
                break;
            case 40:
                this.direction.y = 0;
                this.animationY = 0;
                break;
            case 37:
                this.direction.x = 0;
                this.animationY = 0;
                break;
        }
    }
}
class SplashScene extends Scene {
    init() {
        super.init();
        this.gameObjects.push(new TextObject(new Vector2(window.innerWidth / 2, 100), 400, 50, "Welcome to zha jungle, ya!", 36, 100, 0, 0));
        this.gameObjects.push(new FadeText(new Vector2(window.innerWidth / 2, window.innerHeight - 200), 600, 50, "Druk op een toets om door te gaan!", 36, 0, 100, 0, 0.25, 1.0, 5));
        this.gameObjects.push(new Puss(new Vector2(0, 0), 57, 55, 3));
        this.gameObjects.push(new Wall(new Vector2(600, window.innerHeight / 2), 64, 256, false, true));
    }
    update() {
        super.update();
    }
    draw(ctx) {
        super.draw(ctx);
    }
}
class FadeText extends TextObject {
    constructor(position, width, height, text, size, r, g, b, low, high, duration) {
        super(position, width, height, text, size, r, g, b);
        this.lowAlpha = low;
        this.highAlpha = high;
        this.duration = duration;
        this.revert = false;
    }
    update() {
    }
    draw(ctx) {
        if (!this.revert) {
            if (this.color[3] > this.lowAlpha)
                this.color[3] -= .005;
            else
                this.revert = true;
        }
        else {
            if (this.color[3] <= this.highAlpha)
                this.color[3] += .01;
            else
                this.revert = false;
        }
        this.cacheColorString();
        super.draw(ctx);
    }
}
//# sourceMappingURL=main.js.map