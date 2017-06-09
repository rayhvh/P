/// <reference path="keyhandling/keyboard.ts" />

class Game {
    public static instance:Game;
    public app:PIXI.Application;
    public timer:number = 1;

    private background:Background;

    private rocket:Rocket;
    private spawner:Spawner;
    public asteroids:Array<Asteroid>;

    private keyHandling:KeyHandling;

    public gameSpeed:number = 4;
    private scoreText:TextHandler;

    public static getInstance(){
        if(!Game.instance){
            Game.instance = new Game();
            Game.instance.preloader();
        }
        return Game.instance;
    }
    //preloading the images
    //after that load the game.
    //TODO: Maybe we need to make an load screen?
    private preloader():void{
        PIXI.loader.add('astroid', 'images/astroid.png')
                    .add('rocket', 'images/rocket.png')
                    .add('rocketexplode', 'images/explosion.png');
        PIXI.loader.load(() => this.loader());
    }

    //loader - load the other stuff.
    public loader(){
        this.app = new PIXI.Application(800, 600, {backgroundColor : 0x000000});
        document.body.appendChild(this.app.view);

        this.background = new Background(2,this.app.renderer.width,this.app.renderer.height);
        // We need some Astroids to fall at the beginning.
        this.asteroids = new Array<Asteroid>();
        //spawn the astroids.
        for(let i = 0; i<3;i++){
            this.asteroids.push(new Falling(Util.random(0, this.app.screen.width),-50));
        }
        //This is th player
        this.rocket = new Flying(this.app.screen.width / 2,this.app.screen.height - 100);
   
        //The Player needs keyhandeling so we subscibe to it!
        this.keyHandling = new KeyHandling();
        this.keyHandling.subscribe(<Flying>this.rocket);

        //Show Score
        this.scoreText = new TextHandler("Score : 1",20,"#000000",this.app.screen.width/2,20);

        //load the spawner this will spawn the astroids
        this.spawner = new Spawner();

        requestAnimationFrame(() => this.gameLoop());
    }

    gameLoop(){
        this.background.move();
       
        this.spawner.spawn();

        for(let asteroid of this.asteroids){
            if(Util.collidingRects(asteroid.hitBox, this.rocket.hitBox)){
                console.log("HIT!");
                this.gameSpeed = 0;
                this.rocket.remove();
                this.rocket = new Explode(this.rocket.x, this.rocket.y);
            }
            asteroid.move();
        }
        this.rocket.move();
        
        this.app.renderer.render(this.app.stage);
        this.timer++;

        requestAnimationFrame(() => this.gameLoop());
    }
} 

// load
window.addEventListener("load", function() {
    Game.getInstance();
});
