class Game {
    private canvas:HTMLCanvasElement;
    private context:CanvasRenderingContext2D;
    public static instance:Game;
    private rocket:Rocket;
    private background:Background;
    private keyHandling:KeyHandling;

    //loader
    public loader(){
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.context = <any>this.canvas.getContext('2d');
        this.rocket = new Standing(200,300, this.context);
        this.background = new Background("BLA",2, this.context);
        this.background.load();
        this.keyHandling = new KeyHandling(this.rocket.goLeft,this.rocket.goRight);

        
        requestAnimationFrame(() => this.gameLoop());
    }

    public static getInstance(){
        if(!Game.instance){
            Game.instance = new Game();
            Game.instance.loader();
        }
        return Game.instance;
    }

    gameLoop(){
        this.context.clearRect(0,0,400,400);
        this.background.render();

        this.rocket.render();
        requestAnimationFrame(() => this.gameLoop());
    }
} 

// load
window.addEventListener("load", function() {
    Game.getInstance();
});