class Falling extends Asteroid{
    public speed:number;
    
    constructor(x:number, y:number){
        super(x,y,100,100);
        this.speed = Util.randomDecimal(0.5,1);
    }

    private rotating(delta:any){ 
        this.anchor.set(0.5);
        this.rotation += 0.1 * delta;
    }

    public move(){
        super.move();
        this.graphics.y += this.speed * this.game.gameSpeed;
        this.hitBox.y += this.speed * this.game.gameSpeed;
        // this.graphics.y += this.speed * this.game.gameSpeed;
        this.y += this.speed * this.game.gameSpeed;
    }
}