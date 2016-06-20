var E_SCENES;
(function (E_SCENES) {
    E_SCENES[E_SCENES["SPLASH_SCREEN"] = 0] = "SPLASH_SCREEN";
    E_SCENES[E_SCENES["MENU_SCREEN"] = 1] = "MENU_SCREEN";
})(E_SCENES || (E_SCENES = {}));
var TILED_LAYERS;
(function (TILED_LAYERS) {
    TILED_LAYERS[TILED_LAYERS["TILE_LAYER"] = 0] = "TILE_LAYER";
    TILED_LAYERS[TILED_LAYERS["COLLISION_LAYER"] = 1] = "COLLISION_LAYER";
})(TILED_LAYERS || (TILED_LAYERS = {}));
var E_COLLIDER_TYPES;
(function (E_COLLIDER_TYPES) {
    E_COLLIDER_TYPES[E_COLLIDER_TYPES["GROUND"] = 0] = "GROUND";
    E_COLLIDER_TYPES[E_COLLIDER_TYPES["PLAYER"] = 1] = "PLAYER";
    E_COLLIDER_TYPES[E_COLLIDER_TYPES["PROP"] = 2] = "PROP";
})(E_COLLIDER_TYPES || (E_COLLIDER_TYPES = {}));
var ColliderDirection;
(function (ColliderDirection) {
    ColliderDirection[ColliderDirection["NONE"] = 0] = "NONE";
    ColliderDirection[ColliderDirection["TOP"] = 1] = "TOP";
    ColliderDirection[ColliderDirection["BOTTOM"] = 2] = "BOTTOM";
    ColliderDirection[ColliderDirection["LEFT"] = 3] = "LEFT";
    ColliderDirection[ColliderDirection["RIGHT"] = 4] = "RIGHT";
})(ColliderDirection || (ColliderDirection = {}));
class Game {
    constructor() {
        this.elapsedTime = 0;
        this.updateLag = 0;
        this.fpsTimer = 0;
        this.renderFPS = 0;
        this.persistentGOs = [];
        this.canvas = document.getElementsByTagName("canvas")[0];
        this.canvas.width = Game.width;
        this.canvas.height = Game.height;
        this.date = new Date();
        this.audio = document.getElementsByTagName("audio")[0];
        this.context = this.canvas.getContext('2d');
        this.activateScene(E_SCENES.SPLASH_SCREEN);
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup", (e) => this.onKeyUp(e));
        this.currentTime = this.date.getTime();
        this.previousTime = this.currentTime;
        console.log(this.currentTime);
        this.persistentGOs.push(new TextObject(new Vector2(10, 20), 50, 50, "FPS: ", 14, 100, 0, 0));
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
        this.renderFPS++;
        this.currentTime = (new Date).getTime();
        this.elapsedTime = this.currentTime - this.previousTime;
        this.updateLag += this.elapsedTime;
        if ((this.currentTime - this.fpsTimer) >= 1000) {
            this.fpsTimer = this.currentTime;
            (this.persistentGOs[0]).text = "FPS: " + this.renderFPS;
            this.renderFPS = 0;
        }
        while (this.updateLag >= Game.MS_UPDATE_LAG) {
            this.activeScene.update();
            for (let g of this.persistentGOs)
                g.update();
            this.updateLag -= Game.MS_UPDATE_LAG;
        }
        this.draw();
        this.previousTime = this.currentTime;
        requestAnimationFrame(() => this.update());
    }
    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.activeScene.draw(this.context);
        for (let g of this.persistentGOs)
            g.draw(this.context);
    }
    onKeyDown(event) {
        this.activeScene.onKeyDown(event);
    }
    onKeyUp(event) {
        this.activeScene.onKeyUp(event);
    }
    static colliderStringToType(str) {
        let type = E_COLLIDER_TYPES.PROP;
        switch (str) {
            case "character":
                type = E_COLLIDER_TYPES.PLAYER;
                break;
            case "ground":
                type = E_COLLIDER_TYPES.GROUND;
                break;
            case "prop":
                type = E_COLLIDER_TYPES.PROP;
                break;
        }
        return type;
    }
}
Game.width = 960;
Game.height = 540;
Game.gravity = 5;
Game.MS_UPDATE_LAG = 33;
Game.DEBUG = false;
window.addEventListener("load", function () {
    new Game();
});
class BoxCollider {
    constructor(x, y, w, h, type, offset = Vector2.zero) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.type = type;
        this.offset = offset;
    }
    hitsPoint(posx, posy) {
        var differencex = this.x - posx;
        var differencey = this.y - posy;
        return Math.abs(differencex) < this.width / 2 && Math.abs(differencey) < this.height / 2;
    }
    hitsOtherCollider(rec) {
        let rtn = { collided: false, direction: ColliderDirection.NONE };
        let w = 0.5 * (this.width + rec.width);
        let h = 0.5 * (this.height + rec.height);
        let dx = ((this.x + (this.width / 2)) - (rec.x + (rec.width / 2)));
        let dy = ((this.y + (this.height / 2)) - (rec.y + (rec.height / 2)));
        if (Math.abs(dx) <= w && Math.abs(dy) <= h) {
            let wy = w * dy;
            let hx = h * dx;
            if (wy > hx) {
                if (wy > -hx)
                    rtn = { collided: true, direction: ColliderDirection.TOP };
                else
                    rtn = { collided: true, direction: ColliderDirection.RIGHT };
            }
            else {
                if (wy > -hx)
                    rtn = { collided: true, direction: ColliderDirection.LEFT };
                else
                    rtn = { collided: true, direction: ColliderDirection.BOTTOM };
            }
        }
        return rtn;
    }
    draw(ctx) {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    updatePosition(pos) {
        this.x = pos.x + this.offset.x;
        this.y = pos.y + this.offset.y;
    }
}
class GameObject {
    constructor(position, width, height, needsInput = false, collider = false, hasGravity = false, canMove = false, type = E_COLLIDER_TYPES.PROP) {
        this.maxHorSpeed = 5;
        this.maxVertSpeed = 7.5;
        this.drag = 0.25;
        this.speed = 0;
        this.gravity = false;
        this.grounded = false;
        this.canMove = false;
        this.width = width;
        this.height = height;
        this.position = position;
        this.oldPosition = position;
        this.hasGravity = hasGravity;
        this.canMove = canMove;
        this.rnd = Math.random();
        this.needsInput = needsInput;
        this.hasCollider = collider;
        this.direction = new Vector2(0, 0);
        this.velocity = new Vector2(0, 0);
        this.acceleration = new Vector2(0, 0);
        this.hasCollided = false;
        if (this.hasCollider) {
            this.collider = new BoxCollider(position.x, position.y, width, height, type);
        }
        if (this.hasGravity)
            this.gravity = true;
    }
    isColliding(r) {
        return this.collider.hitsOtherCollider(r.collider);
    }
    update() {
        if (this.canMove) {
            let vl = this.velocity.sqrMagnitude();
            this.velocity = Vector2.add(this.velocity, Vector2.multiply(this.direction, this.speed));
            if (vl > 0) {
                this.velocity = Vector2.add(this.velocity, Vector2.multiply(Vector2.inverse(this.velocity), this.drag));
            }
            if ((this.hasGravity && this.gravity) && !this.grounded) {
                this.velocity.y += Game.gravity;
            }
            let nv = Vector2.add(this.position, this.velocity);
            let angle = Math.atan2(nv.x - this.position.x, nv.y - this.position.y) * cMath.rad2deg;
            if (angle < 0)
                angle *= -1;
            if (vl > this.maxHorSpeed && angle > 75)
                this.velocity = Vector2.clamp(this.velocity, this.maxHorSpeed);
            else if (vl > this.maxVertSpeed)
                this.velocity = Vector2.clamp(this.velocity, this.maxVertSpeed);
            if (vl > 0 && vl < 0.1) {
                this.velocity = Vector2.zero;
            }
            this.position = Vector2.add(this.position, this.velocity);
            if (this.hasGravity) {
                this.grounded = false;
                this.gravity = true;
            }
            if (this.hasCollider) {
                this.collider.updatePosition(this.position);
            }
        }
    }
    collided(co) {
    }
    colliderType() {
        return this.collider.type;
    }
    draw(ctx) {
        if (Game.DEBUG)
            this.collider.draw(ctx);
    }
    onKeyDown(event) { }
    onKeyUp(event) { }
}
class Level {
    constructor() {
    }
}
class LevelLoader {
    constructor() {
        this.path = 'levels/';
        this.level = Array();
        this.rowLength = 0;
        this.levelToDraw = false;
    }
    load(name, cb) {
        console.log("Loading: " + name);
        let goList = [];
        $.getJSON(this.path + name + ".json", (data, textStatus, jqXHR) => {
            let layer = TILED_LAYERS.TILE_LAYER;
            this.level = data.layers[layer].data;
            this.rowLength = data.layers[layer].width;
            this.tileWidth = data.tilesets[layer].tilewidth;
            this.tileHeight = data.tilesets[layer].tileheight;
            this.tilesetColomns = data.tilesets[layer].columns + 1;
            this.tilesetWidth = data.tilesets[layer].imagewidth;
            this.tileSet = new Image(data.tilesets[layer].imageWidth, data.tilesets[layer].imageHeight);
            this.tileSet.src = 'images/tileset.png';
            this.levelToDraw = true;
            for (let i = 0; i < this.level.length; i++) {
                if (this.level[i] != 0) {
                    let indice = this.level[i] - 1;
                    goList.push(new Tile(new Vector2((i % this.tilesetColomns) * this.tileWidth, Math.floor(i / this.tilesetColomns) * this.tileHeight), this.tileWidth, this.tileHeight, this.tileSet, (indice % (this.tilesetWidth / this.tileWidth)) * this.tileWidth, Math.floor(indice / (this.tilesetWidth / this.tileHeight)) * this.tileHeight));
                }
            }
            layer = TILED_LAYERS.COLLISION_LAYER;
            let collisionData = data.layers[layer].objects;
            for (let i = 0; i < collisionData.length; i++) {
                goList.push(new GameObject(new Vector2(collisionData[i].x, collisionData[i].y), collisionData[i].width, collisionData[i].height, false, true, false, false, Game.colliderStringToType(collisionData[i].type)));
            }
            console.log(name + " loaded");
            cb(goList);
        });
    }
}
class Scene {
    constructor() {
        this.gameObjects = [];
        this.goNeedInput = [];
        this.goHasCollider = [];
        this.init();
    }
    init() {
    }
    destroy() {
    }
    handleCollisions() {
        for (let i = 0; i < this.goHasCollider.length; i++) {
            for (let j = 0; j < this.goHasCollider.length; j++) {
                if (i == j)
                    continue;
                let col = this.goHasCollider[i].isColliding(this.goHasCollider[j]);
                if (col.collided) {
                    this.goHasCollider[i].collided({ object: this.goHasCollider[j], direction: col.direction });
                }
            }
        }
    }
    update() {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].update();
        }
        this.handleCollisions();
    }
    draw(ctx) {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].draw(ctx);
        }
    }
    onKeyDown(event) {
        for (let i = 0; i < this.goNeedInput.length; i++) {
            this.goNeedInput[i].onKeyDown(event);
        }
    }
    onKeyUp(event) {
        for (let i = 0; i < this.goNeedInput.length; i++) {
            this.goNeedInput[i].onKeyUp(event);
        }
    }
    processGameObjects() {
        for (let i = 0; i < this.gameObjects.length; i++) {
            if (this.gameObjects[i].needsInput) {
                this.goNeedInput.push(this.gameObjects[i]);
            }
            if (this.gameObjects[i].hasCollider) {
                this.goHasCollider.push(this.gameObjects[i]);
            }
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
    constructor(position, width, height, frameWidth, frameHeight, img, needsInput = false, collider = false, hasGravity = false, canMove = false, type = E_COLLIDER_TYPES.PROP) {
        super(position, width, height, needsInput, collider, hasGravity, canMove, type);
        this.currentFrame = 0;
        this.animationY = 0;
        this.animationSpeed = 0;
        this.frameWidth = 0;
        this.frameHeight = 0;
        this.timer = 0;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.sprite = new Image(this.width, this.height);
        this.sprite.src = 'images/' + img + '.png';
    }
    update() {
        super.update();
    }
    draw(ctx) {
        this.timer++;
        if (this.direction.sqrMagnitude() > 0) {
            if (this.timer % this.animationSpeed == 0)
                this.currentFrame++;
            if (this.currentFrame > 3) {
                this.currentFrame = 0;
            }
        }
        ctx.drawImage(this.sprite, this.currentFrame * this.frameWidth, this.animationY * this.frameHeight, this.frameWidth, this.frameHeight, this.position.x, this.position.y, this.width, this.height);
        if (Game.DEBUG)
            this.collider.draw(ctx);
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
class Tile extends GameObject {
    constructor(position, width, height, tileSet, offsetX, offsetY, needsInput = false, collider = false) {
        super(position, width, height, needsInput, collider);
        this.tileSet = tileSet;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
    }
    update() {
        super.update();
    }
    draw(ctx) {
        ctx.drawImage(this.tileSet, this.offsetX, this.offsetY, this.width, this.height, this.position.x, this.position.y, this.width, this.height);
    }
}
class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    rnd() {
        return this.r;
    }
    static multiply(v1, scalar) {
        return new Vector2(v1.x * scalar, v1.y * scalar);
    }
    static add(v1, v2) {
        return new Vector2(v1.x + v2.x, v1.y + v2.y);
    }
    static substract(v1, v2) {
        return new Vector2(v1.x - v2.x, v1.y - v2.y);
    }
    magnitude() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }
    sqrMagnitude() {
        return (this.x * this.x) + (this.y * this.y);
    }
    static inverse(v1) {
        return new Vector2(-v1.x, -v1.y);
    }
    static isZero(v1) {
        return ((v1.x == Vector2.zero.x && v1.y == Vector2.zero.y) ? true : false);
    }
    static clamp(v1, n) {
        return new Vector2(cMath.clamp(v1.x, -n, n), cMath.clamp(v1.y, -n, n));
    }
}
Vector2.zero = new Vector2(0, 0);
class Knightsalot extends SpriteObject {
    constructor(position, width, height, speed) {
        super(position, width, height, 57, 57, 'spriteTest', true, true, true, true, E_COLLIDER_TYPES.PLAYER);
        this.jumping = false;
        this.jumpCount = 0;
        this.jumpSpeed = 0;
        this.maxJumpHeight = 75;
        this.jumpHeight = 0;
        this.speed = 0.70;
        this.maxHorSpeed = 4;
        this.drag = 0.2;
        this.animationSpeed = 10;
        this.collider.width = 30;
        this.collider.height = 43;
        this.collider.offset = new Vector2(10, 0);
        this.jumpSpeed = 0.75;
    }
    update() {
        if (this.direction.y == -1 && this.grounded) {
            this.jumping = true;
            this.jumpCount = 0;
            this.jumpHeight = 0;
            this.direction.y = 0;
            this.jumpSpeed = 8;
            this.grounded = false;
        }
        if (this.jumping) {
            if (this.jumpHeight <= this.maxJumpHeight) {
                let vel = (Game.gravity + this.jumpSpeed);
                this.velocity.y = -vel;
                this.jumpHeight += vel;
                this.jumpSpeed -= 0.01;
            }
            else {
                this.velocity.y = 0;
                this.jumping = false;
            }
        }
        if (this.position.x > Game.width - this.width)
            this.position.x = Game.width - this.width;
        if (this.position.x < 0)
            this.position.x = 0;
        super.update();
    }
    collided(co) {
        switch (co.object.colliderType()) {
            case E_COLLIDER_TYPES.GROUND:
            case E_COLLIDER_TYPES.PROP:
                switch (co.direction) {
                    case ColliderDirection.BOTTOM:
                        this.grounded = true;
                        this.position.y = co.object.position.y - this.collider.height;
                        break;
                    case ColliderDirection.TOP:
                        this.position.y = co.object.position.y + co.object.collider.height;
                        break;
                    case ColliderDirection.RIGHT:
                        this.position.x = co.object.position.x - (this.collider.width + 10);
                        break;
                    case ColliderDirection.LEFT:
                        this.position.x = co.object.position.x + (co.object.collider.width - 10);
                        break;
                }
                break;
            case E_COLLIDER_TYPES.PLAYER:
                if (ColliderDirection.BOTTOM) {
                }
        }
        super.collided(co);
    }
    onKeyDown(event) {
        switch (event.keyCode) {
            case 87:
                if (this.grounded) {
                    this.direction.y = -1;
                }
                break;
            case 68:
                this.direction.x = 1;
                this.animationY = 2;
                break;
            case 65:
                this.direction.x = -1;
                this.animationY = 1;
                break;
        }
    }
    onKeyUp(event) {
        switch (event.keyCode) {
            case 87:
                this.direction.y = 0;
                break;
            case 68:
                if (this.direction.x == 1) {
                    this.direction.x = 0;
                    this.animationY = 0;
                }
                break;
            case 65:
                if (this.direction.x == -1) {
                    this.direction.x = 0;
                    this.animationY = 0;
                }
                break;
        }
    }
}
class Puss extends SpriteObject {
    constructor(position, width, height, speed) {
        super(position, width, height, 57, 57, 'spriteTest', true, true, true, true, E_COLLIDER_TYPES.PLAYER);
        this.jumping = false;
        this.jumpCount = 0;
        this.jumpSpeed = 0;
        this.maxJumpHeight = 12;
        this.jumpHeight = 0;
        this.speed = 0.75;
        this.maxHorSpeed = 7;
        this.drag = 0.15;
        this.animationSpeed = 10;
        this.collider.width = 30;
        this.collider.height = 43;
        this.collider.offset = new Vector2(10, 0);
        this.jumpSpeed = 0.75;
    }
    update() {
        if (this.direction.y == -1 && this.grounded) {
            this.jumping = true;
            this.jumpCount = 0;
            this.jumpHeight = 0;
            this.direction.y = 0;
            this.jumpSpeed = 10;
            this.grounded = false;
        }
        if (this.jumping) {
            if (this.jumpHeight <= this.maxJumpHeight) {
                let vel = (Game.gravity + this.jumpSpeed);
                this.velocity.y = -vel;
                this.jumpHeight++;
                this.jumpSpeed -= 0.3;
            }
            else {
                this.velocity.y = 0;
                this.jumping = false;
            }
        }
        if (this.position.x > Game.width - this.width)
            this.position.x = Game.width - this.width;
        if (this.position.x < 0)
            this.position.x = 0;
        super.update();
    }
    collided(co) {
        switch (co.object.colliderType()) {
            case E_COLLIDER_TYPES.GROUND:
            case E_COLLIDER_TYPES.PROP:
                switch (co.direction) {
                    case ColliderDirection.BOTTOM:
                        this.grounded = true;
                        this.position.y = co.object.position.y - this.collider.height;
                        break;
                    case ColliderDirection.TOP:
                        this.position.y = co.object.position.y + co.object.collider.height;
                        break;
                    case ColliderDirection.RIGHT:
                        this.position.x = co.object.position.x - (this.collider.width + 10);
                        break;
                    case ColliderDirection.LEFT:
                        this.position.x = co.object.position.x + (co.object.collider.width - 10);
                        break;
                }
                break;
            case E_COLLIDER_TYPES.PLAYER:
                if (ColliderDirection.BOTTOM) {
                }
        }
        super.collided(co);
    }
    onKeyDown(event) {
        switch (event.keyCode) {
            case 38:
                if (this.grounded) {
                    this.direction.y = -1;
                }
                break;
            case 39:
                this.direction.x = 1;
                this.animationY = 2;
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
                break;
            case 39:
                if (this.direction.x == 1) {
                    this.direction.x = 0;
                    this.animationY = 0;
                }
                break;
            case 37:
                if (this.direction.x == -1) {
                    this.direction.x = 0;
                    this.animationY = 0;
                }
                break;
        }
    }
}
class SplashScene extends Scene {
    init() {
        super.init();
        this.gameObjects.push(new FadeText(new Vector2(Game.width / 2 - 50, Game.height / 2), 100, 50, "Welkom!", 24, 0, 100, 0, 0.25, 1.0, 0.5));
        this.gameObjects.push(new Puss(new Vector2(0, 0), 50, 50, 0.75));
        this.gameObjects.push(new Knightsalot(new Vector2(0, 0), 50, 50, 0.75));
        this.level = new LevelLoader();
        this.level.load("test3", (arr) => {
            for (let i = 0; i < arr.length; i++) {
                this.gameObjects.push(arr[i]);
            }
            super.processGameObjects();
        });
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
                this.color[3] -= this.duration / Game.MS_UPDATE_LAG;
            else
                this.revert = true;
        }
        else {
            if (this.color[3] <= this.highAlpha)
                this.color[3] += this.duration / Game.MS_UPDATE_LAG;
            else
                this.revert = false;
        }
        this.cacheColorString();
        super.draw(ctx);
    }
}
class cMath {
    static clamp(n, min, max) {
        return Math.min(Math.max(n, min), max);
    }
    ;
}
cMath.deg2rad = Math.PI / 180;
cMath.rad2deg = 180 / Math.PI;
//# sourceMappingURL=main.js.map