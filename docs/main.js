var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameObject = (function () {
    function GameObject(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.game = Game.getInstance();
    }
    return GameObject;
}());
var ImageObject = (function (_super) {
    __extends(ImageObject, _super);
    function ImageObject(image, x, y, w, h) {
        _super.call(this, PIXI.Texture.fromImage(image));
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.game = Game.getInstance();
        this.create();
    }
    ImageObject.prototype.create = function () {
        this.game.app.stage.addChild(this);
    };
    ImageObject.prototype.remove = function () {
        this.game.app.stage.removeChild(this);
    };
    ImageObject.prototype.reRender = function () {
        this.remove();
        this.create();
    };
    ImageObject.prototype.move = function () {
        this.reRender();
    };
    return ImageObject;
}(PIXI.Sprite));
var KeyBoard;
(function (KeyBoard) {
    KeyBoard[KeyBoard["LEFT"] = 37] = "LEFT";
    KeyBoard[KeyBoard["RIGHT"] = 39] = "RIGHT";
    KeyBoard[KeyBoard["A"] = 65] = "A";
    KeyBoard[KeyBoard["D"] = 68] = "D";
})(KeyBoard || (KeyBoard = {}));
var Game = (function () {
    function Game() {
    }
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
            Game.instance.loader();
        }
        return Game.instance;
    };
    Game.prototype.loader = function () {
        var _this = this;
        this.app = new PIXI.Application(800, 600, { backgroundColor: 0x000000 });
        document.body.appendChild(this.app.view);
        this.timer = 0;
        this.background = new Background(2, this.app.renderer.width, this.app.renderer.height);
        this.asteroids = new Array();
        console.log(this.app.screen.width);
        for (var i = 0; i < 10; i++) {
            this.asteroids.push(new Falling(Util.random(0, this.app.screen.width), 50));
        }
        this.asteroid = new Falling(Util.random(0, this.app.screen.width), 50);
        this.rocket = new Flying(300, 300);
        this.keyHandling = new KeyHandling();
        this.keyHandling.subscribe(this.rocket);
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        for (var _i = 0, _a = this.asteroids; _i < _a.length; _i++) {
            var astroid = _a[_i];
            if (Util.collidingRects(astroid, this.rocket)) {
                console.log("Hitting");
            }
        }
        this.background.move();
        this.asteroid.move();
        this.rocket.reRender();
        this.rocket.move();
        for (var _b = 0, _c = this.asteroids; _b < _c.length; _b++) {
            var asteroid = _c[_b];
            asteroid.move();
        }
        this.app.renderer.render(this.app.stage);
        this.timer++;
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
var Partical = (function (_super) {
    __extends(Partical, _super);
    function Partical(x, y, r, color, opacity) {
        _super.call(this);
        this.game = Game.getInstance();
        this.x = x;
        this.y = y;
        this.radius = r;
        this.color = color;
        this.opacity = opacity;
        this.draw();
    }
    Partical.prototype.draw = function () {
        this.lineStyle(0);
        this.beginFill(this.color, this.opacity);
        this.drawCircle(this.x, this.y, this.radius);
        this.endFill();
        this.game.app.stage.addChild(this);
    };
    return Partical;
}(PIXI.Graphics));
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.call(this, PIXI.Texture.fromImage("images/astroid.png"));
        this.game = Game.getInstance();
        this.x = 10;
        this.y = 10;
        this.init();
    }
    Test.prototype.init = function () {
        this.game.app.stage.addChild(this);
    };
    Test.prototype.updateX = function () {
        this.x += 2;
        this.y += 2;
    };
    return Test;
}(PIXI.Sprite));
var Util = (function () {
    function Util() {
    }
    Util.random = function (min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    };
    Util.timer = function (timer, seconds) {
        if (timer % (60 * seconds) == 1) {
            return true;
        }
        return false;
    };
    Util.randomDecimal = function (min, max) {
        return this.round(((Math.random() * (max - min)) + min), 1);
    };
    Util.hitBottom = function (y, bottom) {
        if (y >= bottom) {
            return true;
        }
        return false;
    };
    Util.round = function (value, precision) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    };
    Util.collidingRects = function (g, g2) {
        if (g.x < g2.x + g2.width &&
            g.x + g.width > g2.x &&
            g.y < g2.y + g2.height &&
            g.height + g.y > g2.y) {
            return true;
        }
        return false;
    };
    Util.RectCircleColliding = function (gameObject1, gameObject2) {
        var distX = Math.abs(gameObject1.x - gameObject2.x - gameObject2.width / 2);
        var distY = Math.abs(gameObject1.y - gameObject2.y - gameObject2.height / 2);
        if (distX > (gameObject2.width / 2 + gameObject1.width)) {
            return false;
        }
        if (distY > (gameObject2.height / 2 + gameObject1.width)) {
            return false;
        }
        if (distX <= (gameObject2.width / 2)) {
            return true;
        }
        if (distY <= (gameObject2.height / 2)) {
            return true;
        }
        var dx = distX - gameObject2.width / 2;
        var dy = distY - gameObject2.height / 2;
        return (dx * dx + dy * dy <= (gameObject1.width * gameObject1.width));
    };
    Util.squareNumber = function (number) {
        return number * number;
    };
    return Util;
}());
var Asteroid = (function (_super) {
    __extends(Asteroid, _super);
    function Asteroid(x, y, w, h) {
        _super.call(this, "images/astroid.png", x, y, w, h);
    }
    return Asteroid;
}(ImageObject));
var Falling = (function (_super) {
    __extends(Falling, _super);
    function Falling(x, y) {
        _super.call(this, x, y, 100, 100);
        this.speed = Util.randomDecimal(0.5, 1);
    }
    Falling.prototype.rotating = function (delta) {
        this.anchor.set(0.5);
        this.rotation += 0.1 * delta;
    };
    Falling.prototype.move = function () {
        _super.prototype.move.call(this);
        this.y += this.speed;
    };
    return Falling;
}(Asteroid));
var Spawner = (function () {
    function Spawner() {
        this.timer = 0;
        this.game = Game.getInstance();
    }
    Spawner.prototype.update = function () {
        this.timer++;
        if (this.timer % 60 == 0) {
            console.log("SEC");
            this.spawnAsteroid();
        }
        if (this.timer % 300 == 0) {
            console.log("5 SEC");
        }
    };
    Spawner.prototype.spawnAsteroid = function () {
        var x = Util.random(20, 400);
        var speed = Util.random(1, 3);
    };
    return Spawner;
}());
var Background = (function () {
    function Background(speed, appWidth, appHeight) {
        this.stars = [];
        this.game = Game.getInstance();
        for (var i = 0; i < 40; i++) {
            this.addStars(Util.random(10, this.game.app.renderer.width), Util.random(10, this.game.app.renderer.height - 10));
        }
        console.log("loaded");
    }
    Background.prototype.addStars = function (x, y) {
        var z = Util.randomDecimal(0.1, 0.6);
        var r = 5;
        this.stars.push(new Star(x, y, z, r));
    };
    Background.prototype.starSpawner = function () {
        if (Util.timer(this.game.timer, 0.2)) {
            this.addStars(Util.random(10, this.game.app.screen.width), 0);
        }
    };
    Background.prototype.starRemover = function () {
    };
    Background.prototype.move = function () {
        this.starSpawner();
        for (var i = 0; i < this.stars.length; i++) {
            var star = this.stars[i];
            if (Util.hitBottom(star.y, this.game.app.renderer.height)) {
                this.stars.splice(i, 1);
            }
            star.move();
        }
    };
    return Background;
}());
var Star = (function (_super) {
    __extends(Star, _super);
    function Star(x, y, z, r) {
        _super.call(this, x, y, r, 0xFFFFFF, z);
        this.z = z;
    }
    Star.prototype.move = function () {
        this.y += this.z;
    };
    return Star;
}(Partical));
var KeyHandling = (function () {
    function KeyHandling() {
        var _this = this;
        window.addEventListener("keydown", function (e) { return _this.keyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.keyUp(e); });
        this.keyHit = new Array();
        this.observers = new Array();
    }
    KeyHandling.prototype.subscribe = function (o) {
        this.observers.push(o);
    };
    KeyHandling.prototype.unsubscribe = function (o) {
        for (var i = 0; i < this.observers.length; i++) {
            if (this.observers[i] == o) {
                this.observers.splice(i, 1);
            }
        }
    };
    KeyHandling.prototype.hitFunction = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var o = _a[_i];
            o.notify(this.keyHit);
        }
    };
    KeyHandling.prototype.addKey = function (key) {
        for (var _i = 0, _a = this.keyHit; _i < _a.length; _i++) {
            var k = _a[_i];
            if (k == key) {
                return true;
            }
        }
        this.keyHit.push(key);
        return true;
    };
    KeyHandling.prototype.removeKey = function (key) {
        for (var i = 0; i < this.keyHit.length; i++) {
            if (this.keyHit[i] == key) {
                this.keyHit.splice(i, 1);
            }
        }
    };
    KeyHandling.prototype.keyDown = function (e) {
        switch (e.keyCode) {
            case KeyBoard.LEFT:
                this.addKey(KeyBoard.LEFT);
                this.hitFunction();
                break;
            case KeyBoard.A:
                this.left = true;
                this.addKey(KeyBoard.A);
                this.hitFunction();
                break;
            case KeyBoard.RIGHT:
                this.addKey(KeyBoard.RIGHT);
                this.hitFunction();
                break;
            case KeyBoard.D:
                this.addKey(KeyBoard.D);
                this.hitFunction();
                break;
            default:
                console.log("OTHER KEY" + e.keyCode);
                break;
        }
    };
    KeyHandling.prototype.keyUp = function (e) {
        switch (e.keyCode) {
            case KeyBoard.LEFT:
                this.removeKey(KeyBoard.LEFT);
                this.hitFunction();
                break;
            case KeyBoard.RIGHT:
                this.removeKey(KeyBoard.RIGHT);
                this.hitFunction();
                break;
            case KeyBoard.A:
                this.removeKey(KeyBoard.A);
                this.hitFunction();
                break;
            case KeyBoard.D:
                this.removeKey(KeyBoard.D);
                this.hitFunction();
                break;
            default:
                console.log("OTHER KEY" + e.keyCode);
                break;
        }
    };
    return KeyHandling;
}());
var Rocket = (function (_super) {
    __extends(Rocket, _super);
    function Rocket(x, y) {
        _super.call(this, "images/rocket.png", x, y, 40, 60);
    }
    return Rocket;
}(ImageObject));
var Flying = (function (_super) {
    __extends(Flying, _super);
    function Flying(x, y) {
        _super.call(this, x, y);
        this.movingLeft = false;
        this.movingRight = false;
        this.sideSpeed = 3.5;
    }
    Flying.prototype.notify = function (keyHit) {
        console.log(keyHit);
        if (keyHit.length <= 1) {
            if (keyHit[0] == KeyBoard.LEFT || keyHit[0] == KeyBoard.A) {
                this.movingLeft = true;
                this.movingRight = false;
            }
            else if (keyHit[0] == KeyBoard.RIGHT || keyHit[0] == KeyBoard.D) {
                this.movingRight = true;
                this.movingLeft = false;
            }
            else {
                this.movingLeft = false;
                this.movingRight = false;
            }
        }
    };
    Flying.prototype.goLeft = function () {
        this.x -= this.sideSpeed;
    };
    Flying.prototype.goRight = function () {
        this.x += this.sideSpeed;
    };
    Flying.prototype.move = function () {
        if (this.movingLeft) {
            this.goLeft();
        }
        else if (this.movingRight) {
            this.goRight();
        }
    };
    return Flying;
}(Rocket));
var Standing = (function (_super) {
    __extends(Standing, _super);
    function Standing(x, y, context) {
        _super.call(this, x, y, context);
        this.sideSpeed = 0;
        this.speed = 0;
    }
    Standing.prototype.goLeft = function () { console.log("GO LEFT"); };
    ;
    Standing.prototype.goRight = function () { console.log("GO RIGHT"); };
    ;
    Standing.prototype.actionKey = function () { };
    ;
    Standing.prototype.render = function () {
        _super.prototype.render.call(this);
    };
    Standing.prototype.move = function () { };
    return Standing;
}(Rocket));
//# sourceMappingURL=main.js.map