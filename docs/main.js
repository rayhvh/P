var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameObject = (function () {
    function GameObject(x, y, w, h, context) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.context = context;
    }
    return GameObject;
}());
var Background = (function (_super) {
    __extends(Background, _super);
    function Background(image, speed, context) {
        _super.call(this, 0, 0, 400, 400, context);
        this.imageLink = image;
        this.speed = speed;
    }
    Background.prototype.load = function () {
        var _this = this;
        this.image = new Image();
        this.image.src = 'images/backgroundStar.png';
        this.image.onload = function () {
            _this.render();
        };
    };
    Background.prototype.move = function () {
        if (this.y >= 400) {
            this.y = 0;
        }
        else {
            this.y += this.speed;
        }
    };
    Background.prototype.render = function () {
        this.move();
        this.context.drawImage(this.image, 0, this.y);
        this.context.drawImage(this.image, 0, this.y - 400);
    };
    Background.prototype.setSpeed = function (newSpeed) {
        this.speed = newSpeed;
    };
    return Background;
}(GameObject));
var Rocket = (function (_super) {
    __extends(Rocket, _super);
    function Rocket(x, y, context) {
        _super.call(this, x, y, 10, 50, context);
        this.context = context;
    }
    Rocket.prototype.draw = function () {
        this.context.fillRect(this.x, this.y, this.w, this.h);
        this.context.fillStyle = 'yellow';
        this.context.fill();
    };
    Rocket.prototype.render = function () {
        this.draw();
    };
    return Rocket;
}(GameObject));
var Flying = (function (_super) {
    __extends(Flying, _super);
    function Flying(x, y, context) {
        _super.call(this, x, y, context);
    }
    Flying.prototype.render = function () {
        _super.prototype.render.call(this);
    };
    Flying.prototype.goLeft = function () { };
    ;
    Flying.prototype.goRight = function () { };
    ;
    Flying.prototype.actionKey = function () { };
    ;
    Flying.prototype.move = function () { };
    return Flying;
}(Rocket));
var KeyHandling = (function () {
    function KeyHandling(goLeft, goRight) {
        var _this = this;
        this.goLeft = goLeft;
        this.goRight = goRight;
        document.addEventListener("keydown", function (e) {
            _this.findKey(e);
        });
    }
    KeyHandling.prototype.findKey = function (e) {
        switch (e.keyCode) {
            case 37:
                this.goLeft();
                break;
            case 65:
                this.goLeft();
                break;
            case 39:
                this.goRight();
                break;
            case 68:
                this.goRight();
                break;
            default:
                console.log("OTHER KEY" + e.keyCode);
                break;
        }
    };
    return KeyHandling;
}());
var Game = (function () {
    function Game() {
    }
    Game.prototype.loader = function () {
        var _this = this;
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.rocket = new Standing(200, 300, this.context);
        this.background = new Background("BLA", 2, this.context);
        this.background.load();
        this.keyHandling = new KeyHandling(this.rocket.goLeft, this.rocket.goRight);
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
            Game.instance.loader();
        }
        return Game.instance;
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.context.clearRect(0, 0, 400, 400);
        this.background.render();
        this.rocket.render();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
var Standing = (function (_super) {
    __extends(Standing, _super);
    function Standing(x, y, context) {
        _super.call(this, x, y, context);
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
var Util = (function () {
    function Util() {
    }
    Util.squareNumber = function (number) {
        return number * number;
    };
    return Util;
}());
//# sourceMappingURL=main.js.map