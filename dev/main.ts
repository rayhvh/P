class Game {
    public static instance:Game;
    public app:PIXI.Application;
    public timer:number


    private background:Background;

    private asteroid:Asteroid;

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
        this.timer = 0;
        // this.stage = new PIXI.Container();
        // this.renderer = PIXI.autoDetectRenderer(800, 600);
        document.body.appendChild(this.app.view);

        this.background = new Background(2,this.app.renderer.width,this.app.renderer.height);

        var carrotTex = PIXI.Texture.fromImage('images/astroid.png');
        
        // this.asteroid = new Falling(100,100,2);
        // // console.log(this.app.renderer.width);


        // this.rocket = new Flying(200,300, this.context);
        // this.asteroid = new Falling(20,20,2,this.context);

        // this.background = new Background("BLA",2, this.context);
        // this.background.load();

        // this.spawner = new Spawner();

        // this.keyHandling = new KeyHandling(this.rocket);

        requestAnimationFrame(() => this.gameLoop());
        }


    gameLoop(){
        // this.asteroid.x++;
        this.background.move();
        // this.asteroid.x += 2;
        // console.log(this.asteroid.x);

        this.app.renderer.render(this.app.stage);
        this.timer++;
        requestAnimationFrame(() => this.gameLoop());
    }
} 

// load
window.addEventListener("load", function() {
    Game.getInstance();
});