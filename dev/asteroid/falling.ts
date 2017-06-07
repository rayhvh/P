/// <reference path="../asteroid.ts" />

class Falling extends Asteroid{
    public speed:number;
    
    constructor(x:number, y:number, speed:number){
        super(x,y,100,100);
        this.speed = speed;
        this.anchor.set(0.5);
        this.game.app.ticker.add((delta) => this.rotating(delta));
    }

            

    private rotating(delta:any){
        this.rotation += 0.1 * delta;
    }

    public move(){
        super.move();
        this.x++;
    }
}