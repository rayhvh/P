


class Game {
    public static instance:Game;

    // private canvas:HTMLCanvasElement;
    // public context:CanvasRenderingContext2D;

    // private keyHandling:KeyHandling;

    // private rocket:Rocket;
    private background:Background;

    private asteroid:Asteroid;

    // public astroidList:Array<Asteroid> = new Array();

    // private spawner:Spawner;

    public app:PIXI.Application;

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
        
        console.log("AAA");
        this.asteroid = new Falling(100,100,2);
        console.log(this.app.renderer.width);


        // this.rocket = new Flying(200,300, this.context);
        // this.asteroid = new Falling(20,20,2,this.context);

        // this.background = new Background("BLA",2, this.context);
        // this.background.load();

        // this.spawner = new Spawner();

        // this.keyHandling = new KeyHandling(this.rocket);

        requestAnimationFrame(() => this.gameLoop());
    }


    gameLoop(){
        // this.background.move();
        // console.log("RANDOM: " + Util.random(5,5));
        // this.context.clearRect(0,0,400,400);
        // this.background.render();
        // this.asteroid.move();

        // this.rocket.render();
        // this.rocket.checkCollision(this.asteroid);
        // this.keyHandling.doAction();

        // this.spawner.update();


        // for(let astroid of this.astroidList){
        //     astroid.move();
        // }

        requestAnimationFrame(() => this.gameLoop());
    }
} 

// load
window.addEventListener("load", function() {
    Game.getInstance();
});