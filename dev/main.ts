/// <reference path="keyhandling/keyboard.ts" />

class Game {
    public static instance:Game;
    public app:PIXI.Application;
    public timer:number

    private background:Background;

    private asteroid:Asteroid;
    private asteroids:Array<Asteroid>;

    private rocket:Rocket;

    private keyHandling:KeyHandling;

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

        
        this.timer = 0;
        

        this.background = new Background(2,this.app.renderer.width,this.app.renderer.height);

        // this.asteroid = new Falling(50,50,2);
        this.asteroids = new Array<Asteroid>();
        for(let i = 0; i<10;i++){
            this.asteroids.push(new Falling(100,50,2));
        }
        this.asteroid = new Falling(200,50,2);
        this.rocket = new Flying(300,300);

        this.keyHandling = new KeyHandling();
        this.keyHandling.subscribe(this.rocket);

        requestAnimationFrame(() => this.gameLoop());
    }


    gameLoop(){
        this.background.move();
        this.asteroid.move();
        this.rocket.reRender();
        this.rocket.move();
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
