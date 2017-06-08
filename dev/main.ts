/// <reference path="keyhandling/keyboard.ts" />

class Game {
    public static instance:Game;
    public app:PIXI.Application;
    public timer:number = 1;

    private background:Background;

    public asteroids:Array<Asteroid>;

    private rocket:Rocket;
    private spawner:Spawner;

    private keyHandling:KeyHandling;

    public gameSpeed:number = 1;

    public static getInstance(){
        if(!Game.instance){
            Game.instance = new Game();
            Game.instance.loader();
        }
        return Game.instance;
    }
    

    //loader
    public loader(){
        this.app = new PIXI.Application(800, 600, {backgroundColor : 0x000000});
        document.body.appendChild(this.app.view);

        this.background = new Background(2,this.app.renderer.width,this.app.renderer.height);

        // this.asteroid = new Falling(50,50,2);
        this.asteroids = new Array<Asteroid>();
        console.log(this.app.screen.width);
        for(let i = 0; i<10;i++){
            this.asteroids.push(new Falling(Util.random(0, this.app.screen.width),-50));
        }
        this.rocket = new Flying(300,300);

        this.keyHandling = new KeyHandling();
        this.keyHandling.subscribe(this.rocket);

        this.spawner = new Spawner();

        requestAnimationFrame(() => this.gameLoop());
    }


    gameLoop(){
        for(let astroid of this.asteroids){
            if(Util.collidingRects(astroid.hitBox,this.rocket.hitBox)){
                console.log("Hitting");
            }
        }

        this.background.move();
        this.rocket.reRender();
        this.rocket.move();
        this.spawner.spawn();
        for(let asteroid of this.asteroids){
            asteroid.move();
        }
        

        this.app.renderer.render(this.app.stage);
        this.timer++;
        requestAnimationFrame(() => this.gameLoop());
    }
} 

// load
window.addEventListener("load", function() {
    Game.getInstance();
});
