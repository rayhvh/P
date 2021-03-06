var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Vector = (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    return Vector;
}());
var GameObject = (function (_super) {
    __extends(GameObject, _super);
    function GameObject(x, y, w, h) {
        _super.call(this, x, y);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.game = Game.getInstance();
    }
    return GameObject;
}(Vector));
var GameOverHandler = (function () {
    function GameOverHandler() {
    }
    GameOverHandler.prototype.notify = function (keyHit) {
        console.log(keyHit);
        this.game = Game.getInstance();
        if (this.findKey(keyHit, KeyBoard.R)) {
            console.log("HITTING R");
            this.game.setup();
        }
    };
    GameOverHandler.prototype.findKey = function (keyHit, key1, key2) {
        for (var _i = 0, keyHit_1 = keyHit; _i < keyHit_1.length; _i++) {
            var key = keyHit_1[_i];
            if (key2) {
                if (key == key1 || key == key2) {
                    return true;
                }
            }
            else {
                if (key == key1) {
                    return true;
                }
            }
        }
        return false;
    };
    return GameOverHandler;
}());
var ImageObject = (function (_super) {
    __extends(ImageObject, _super);
    function ImageObject(image, x, y, w, h) {
        _super.call(this, image);
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
    };
    return ImageObject;
}(PIXI.Sprite));
var KeyBoard;
(function (KeyBoard) {
    KeyBoard[KeyBoard["LEFT"] = 37] = "LEFT";
    KeyBoard[KeyBoard["RIGHT"] = 39] = "RIGHT";
    KeyBoard[KeyBoard["UP"] = 38] = "UP";
    KeyBoard[KeyBoard["A"] = 65] = "A";
    KeyBoard[KeyBoard["D"] = 68] = "D";
    KeyBoard[KeyBoard["W"] = 87] = "W";
    KeyBoard[KeyBoard["R"] = 82] = "R";
})(KeyBoard || (KeyBoard = {}));
var Game = (function () {
    function Game() {
        this.timer = 1;
        this.gameSpeed = 4;
        this.score = 0;
        this.gameOver = false;
    }
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
            Game.instance.preloader();
        }
        return Game.instance;
    };
    Game.prototype.preloader = function () {
        var _this = this;
        PIXI.loader.add('astroid', 'images/astroid.png')
            .add('rocket', 'images/rocket.png')
            .add('rocketexplode', 'images/explosion.png')
            .add('explode', 'images/sprites.json');
        PIXI.loader.load(function () { return _this.loader(); });
    };
    Game.prototype.loader = function () {
        var _this = this;
        this.app = new PIXI.Application(800, 600, { backgroundColor: 0x000000 });
        document.body.appendChild(this.app.view);
        this.app.stage.interactive = true;
        this.setup();
        this.spawner = new Spawner();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.setup = function () {
        if (this.gameOver) {
            for (var i = this.app.stage.children.length - 1; i >= 0; i--) {
                this.app.stage.removeChild(this.app.stage.children[i]);
            }
            ;
            this.gameOver = false;
            this.keyHandling.unsubscribe(this.gameOverHandler);
        }
        this.multiplier = 1;
        this.score = 0;
        this.background = new Background(2, this.app.screen.width, this.app.screen.height);
        this.asteroids = new Array();
        for (var i_1 = 0; i_1 < 3; i_1++) {
            this.asteroids.push(new Falling(Util.Random.random(0, this.app.screen.width), -50));
        }
        this.rocket = new Flying(this.app.screen.width / 2, this.app.screen.height - 100);
        this.keyHandling = new KeyHandling();
        this.keyHandling.subscribe(this.rocket);
        this.scoreText = new TextHandler("Score : 1", 20, "#000000", this.app.screen.width / 2, 20);
    };
    Game.prototype.scoreHandler = function () {
        if (Util.Timer.timer(this.timer, 1)) {
            this.score += this.multiplier;
        }
        this.scoreText.setText("Score : " + Number(this.score).toFixed(0));
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        if (!this.gameOver) {
            console.log("LOOPING");
            this.background.move();
            this.spawner.spawn();
            for (var _i = 0, _a = this.asteroids; _i < _a.length; _i++) {
                var asteroid = _a[_i];
                if (Util.Collision.collidingRects(asteroid.hitBox, this.rocket.hitBox)) {
                    this.loadGameOver();
                }
                asteroid.move();
            }
            this.rocket.move();
            this.scoreHandler();
            this.scoreText.reRender();
            this.app.renderer.render(this.app.stage);
            this.timer++;
        }
        else {
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.loadGameOver = function () {
        console.log("HIT!");
        this.gameSpeed = 0;
        this.rocket.remove();
        this.keyHandling.unsubscribe(this.rocket);
        this.gameOverHandler = new GameOverHandler();
        this.keyHandling.subscribe(this.gameOverHandler);
        this.rocket = new Explode(this.rocket.x, this.rocket.y);
        this.gameOver = true;
        this.gameOverText = new TextHandler("GAME OVER", 40, "#000000", this.app.screen.width / 2, this.app.screen.height / 2);
        this.extraInfo = new TextHandler("Press R to restart", 20, "#000000", this.app.screen.width / 2, this.app.screen.height / 2 + 50);
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
    Partical.prototype.remove = function () {
        this.game.app.stage.removeChild(this);
    };
    Partical.prototype.draw = function () {
        this.lineStyle(0);
        this.beginFill(this.color, this.opacity);
        this.drawCircle(this.x, this.y, this.radius);
        this.endFill();
        this.game.app.stage.addChild(this);
    };
    return Partical;
}(PIXI.Graphics));
var TextHandler = (function (_super) {
    __extends(TextHandler, _super);
    function TextHandler(text, fontSize, color, x, y) {
        _super.call(this, x, y);
        this.color = color;
        this.fontSize = fontSize;
        this.textString = text;
        this.init();
        this.game = Game.getInstance();
        this.render();
    }
    TextHandler.prototype.init = function () {
        this.text = new PIXI.Text(this.textString, {
            fontWeight: 'bold',
            fontSize: this.fontSize,
            fontFamily: 'Arial',
            fill: '#FFFFFF',
            align: 'center',
        });
        this.text.anchor.set(0.5);
        this.text.x = this.x;
        this.text.y = this.y;
    };
    TextHandler.prototype.reRender = function () {
        this.remove();
        this.render();
    };
    TextHandler.prototype.remove = function () {
        this.game.app.stage.removeChild(this.text);
    };
    TextHandler.prototype.render = function () {
        this.game.app.stage.addChild(this.text);
    };
    TextHandler.prototype.setText = function (text) {
        this.text.text = text;
    };
    return TextHandler;
}(Vector));
var Asteroid = (function (_super) {
    __extends(Asteroid, _super);
    function Asteroid(x, y, w, h) {
        _super.call(this, PIXI.loader.resources.astroid.texture, x, y, w, h);
        this.r = w / 2;
        var padding = 25;
        this.hitBox = new GameObject(this.x + padding / 2, this.y + padding / 2, this.width - padding, this.height - padding);
    }
    Asteroid.prototype.drawHitBox = function () {
        var padding = 25;
        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(0xFFFF00);
        this.graphics.lineStyle(5, 0xFF0000);
        this.graphics.drawRect(this.x + padding / 2, this.y + padding / 2, this.width - padding, this.height - padding);
        this.game.app.stage.addChild(this.graphics);
    };
    return Asteroid;
}(ImageObject));
var Falling = (function (_super) {
    __extends(Falling, _super);
    function Falling(x, y) {
        _super.call(this, x, y, 100, 100);
        this.speed = Util.Random.randomDecimal(0.5, 1);
    }
    Falling.prototype.rotating = function (delta) {
        this.anchor.set(0.5);
        this.rotation += 0.1 * delta;
    };
    Falling.prototype.move = function () {
        _super.prototype.move.call(this);
        this.hitBox.y += this.speed * this.game.gameSpeed;
        this.y += this.speed * this.game.gameSpeed;
    };
    return Falling;
}(Asteroid));
var Spawner = (function () {
    function Spawner() {
        this.MAXMULTIPLIER = 3;
        this.game = Game.getInstance();
        this.startSpeed = this.game.gameSpeed;
    }
    Spawner.prototype.spawn = function () {
        var spawnRateTimer = 1 / this.game.multiplier;
        console.log(spawnRateTimer);
        if (Util.Timer.timer(this.game.timer, 0.5)) {
            var rate = Util.Random.random(0, this.game.multiplier);
            for (var i = 0; i < rate; i++) {
                this.addAsteroid();
            }
        }
        if (Util.Timer.timer(this.game.timer, 1)) {
            if (this.game.multiplier <= this.MAXMULTIPLIER - 0.1) {
                this.game.multiplier = Number((this.game.multiplier += 0.1).toFixed(2));
            }
            this.game.gameSpeed = this.startSpeed * this.game.multiplier;
        }
    };
    Spawner.prototype.addAsteroid = function () {
        this.game.asteroids.push(new Falling(Util.Random.random(0, this.game.app.screen.width), -200));
    };
    return Spawner;
}());
var Background = (function () {
    function Background(speed, appWidth, appHeight) {
        this.stars = [];
        this.game = Game.getInstance();
        for (var i = 0; i < 40; i++) {
            this.addStars(Util.Random.random(10, this.game.app.renderer.width), Util.Random.random(10, this.game.app.renderer.height - 10));
        }
        console.log("loaded");
    }
    Background.prototype.addStars = function (x, y) {
        var z = Util.Random.randomDecimal(0.1, 0.6);
        var r = 5;
        this.stars.push(new Star(x, y, z, r));
    };
    Background.prototype.starSpawner = function () {
        if (Util.Timer.timer(this.game.timer, 0.2)) {
            this.addStars(Util.Random.random(-10, this.game.app.screen.width), 0);
        }
    };
    Background.prototype.starRemover = function () {
    };
    Background.prototype.move = function () {
        this.starSpawner();
        for (var i = 0; i < this.stars.length; i++) {
            var star = this.stars[i];
            if (Util.Collision.hitBottom(star.y, this.game.app.renderer.height)) {
                this.stars[i].remove();
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
        this.y += this.z * this.game.gameSpeed;
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
    KeyHandling.prototype.checkKey = function (e) {
        switch (e.keyCode) {
            case KeyBoard.LEFT:
                return KeyBoard.LEFT;
            case KeyBoard.RIGHT:
                return KeyBoard.RIGHT;
            case KeyBoard.A:
                return KeyBoard.A;
            case KeyBoard.D:
                return KeyBoard.D;
            case KeyBoard.UP:
                return KeyBoard.UP;
            case KeyBoard.W:
                return KeyBoard.W;
            case KeyBoard.R:
                return KeyBoard.R;
            default:
                console.log("OTHER KEY" + e.keyCode);
                break;
        }
        return null;
    };
    KeyHandling.prototype.keyDown = function (e) {
        var keyBoard = this.checkKey(e);
        this.addKey(keyBoard);
        this.hitFunction();
    };
    KeyHandling.prototype.keyUp = function (e) {
        var keyBoard = this.checkKey(e);
        this.removeKey(keyBoard);
        this.hitFunction();
    };
    return KeyHandling;
}());
var Rocket = (function (_super) {
    __extends(Rocket, _super);
    function Rocket(x, y, sprite) {
        _super.call(this, sprite, x, y, 40, 60);
        var padding = this.width / 2;
        this.hitBox = new GameObject(this.x + padding / 2, this.y, this.width - padding, this.height);
    }
    Rocket.prototype.drawHitBox = function () {
        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(0xFFFF00);
        var padding = this.width / 2;
        this.graphics.lineStyle(5, 0xFF0000);
        this.graphics.drawRect(this.x + padding / 2, this.y, this.width - padding, this.height);
        this.game.app.stage.addChild(this.graphics);
    };
    return Rocket;
}(ImageObject));
var Explode = (function (_super) {
    __extends(Explode, _super);
    function Explode(x, y) {
        _super.call(this, x, y, null);
        this.init();
    }
    Explode.prototype.init = function () {
        var _this = this;
        var explosionTextures = [], i;
        for (i = 0; i < 6; i++) {
            console.log(i);
            var texture = PIXI.Texture.fromFrame('sprites_0' + (i + 1) + '.png');
            explosionTextures.push(texture);
        }
        var explosion = new PIXI.extras.AnimatedSprite(explosionTextures);
        explosion.loop = false;
        explosion.animationSpeed = 0.3;
        explosion.x = this.x + 15;
        explosion.y = this.y + 15;
        explosion.anchor.set(0.5);
        explosion.scale.set(2);
        explosion.gotoAndPlay(0);
        explosion.onComplete = function () {
            _this.game.app.stage.removeChild(explosion);
        };
        this.game.app.stage.addChild(explosion);
    };
    Explode.prototype.move = function () {
    };
    Explode.prototype.notify = function () {
    };
    return Explode;
}(Rocket));
var Flying = (function (_super) {
    __extends(Flying, _super);
    function Flying(x, y) {
        _super.call(this, x, y, PIXI.loader.resources.rocket.texture);
        this.movingLeft = false;
        this.movingRight = false;
        this.turbo = false;
        this.maxTurbo = 5;
        this.turboSpeed = 1;
        this.sideSpeed = 5;
        this.keyHit = new Array();
    }
    Flying.prototype.notify = function (keyHit) {
        this.keyHit = keyHit;
        if (keyHit.length >= 1) {
            this.checkLeftOrRight(keyHit);
            this.checkTurbo(keyHit);
        }
        else {
            this.movingLeft = false;
            this.movingRight = false;
        }
    };
    Flying.prototype.checkLeftOrRight = function (keyHit) {
        if (this.findKey(keyHit, KeyBoard.A, KeyBoard.LEFT)) {
            this.movingLeft = true;
            this.movingRight = false;
        }
        else if (this.findKey(keyHit, KeyBoard.D, KeyBoard.RIGHT)) {
            this.movingRight = true;
            this.movingLeft = false;
        }
        else {
            this.movingLeft = false;
            this.movingRight = false;
        }
    };
    Flying.prototype.checkTurbo = function (keyHit) {
        if (this.findKey(keyHit, KeyBoard.UP, KeyBoard.W)) {
            if (this.turboSpeed < this.maxTurbo) {
                this.turboSpeed = Number((this.turboSpeed += 0.05).toFixed(2));
            }
        }
        else {
            if (this.turboSpeed > 1) {
                this.turboSpeed = Number((this.turboSpeed -= 0.05).toFixed(2));
            }
        }
    };
    Flying.prototype.findKey = function (keyHit, key1, key2) {
        for (var _i = 0, keyHit_2 = keyHit; _i < keyHit_2.length; _i++) {
            var key = keyHit_2[_i];
            if (key == key1 || key == key2) {
                return true;
            }
        }
        return false;
    };
    Flying.prototype.goLeft = function () {
        this.x -= this.sideSpeed;
        this.hitBox.x -= this.sideSpeed;
    };
    Flying.prototype.goRight = function () {
        this.x += this.sideSpeed;
        this.hitBox.x += this.sideSpeed;
    };
    Flying.prototype.move = function () {
        if (this.keyHit.length == 0) {
            if (this.turboSpeed > 1) {
                this.turboSpeed = Number((this.turboSpeed -= 0.05).toFixed(2));
                this.game.gameSpeed + this.turboSpeed;
            }
            else {
                this.game.gameSpeed + this.turboSpeed;
            }
        }
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
var Util;
(function (Util) {
    var Collision = (function () {
        function Collision() {
        }
        Collision.collidingRects = function (g, g2) {
            if (g.x < g2.x + g2.w &&
                g.x + g.w > g2.x &&
                g.y < g2.y + g2.h &&
                g.h + g.y > g2.y) {
                return true;
            }
            return false;
        };
        Collision.hitBottom = function (y, bottom) {
            if (y >= bottom) {
                return true;
            }
            return false;
        };
        return Collision;
    }());
    Util.Collision = Collision;
})(Util || (Util = {}));
var Util;
(function (Util) {
    var Random = (function () {
        function Random() {
        }
        Random.random = function (min, max) {
            return Math.round(Math.random() * (max - min)) + min;
        };
        Random.randomDecimal = function (min, max) {
            return this.round(((Math.random() * (max - min)) + min), 1);
        };
        Random.round = function (value, precision) {
            var multiplier = Math.pow(10, precision || 0);
            return Math.round(value * multiplier) / multiplier;
        };
        return Random;
    }());
    Util.Random = Random;
})(Util || (Util = {}));
var Util;
(function (Util) {
    var Timer = (function () {
        function Timer() {
        }
        Timer.timer = function (timer, seconds) {
            if (timer % (60 * seconds) == 0) {
                return true;
            }
            return false;
        };
        return Timer;
    }());
    Util.Timer = Timer;
})(Util || (Util = {}));
//# sourceMappingURL=main.js.map