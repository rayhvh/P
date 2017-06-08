class Falling extends Asteroid{
    public speed:number;
    
    constructor(x:number, y:number){
        super(x,y,100,100);
        this.speed = Util.randomDecimal(0.5,1);
        //this is for rotating
    //    this.anchor.set(0.5);
        // this.game.app.ticker.add((delta) => this.rotating(delta));
    }

    private rotating(delta:any){ 
        this.anchor.set(0.5);
        this.rotation += 0.1 * delta;
    }

    public move(){
        super.move();
        this.y += this.speed * this.game.gameSpeed;
    }
}