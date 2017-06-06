/// <reference path="gameObject.ts" />
/// <reference path="imageObject.ts" />

abstract class Asteroid extends ImageObject{
    abstract speed:number;
    private rotate:number;
    
    constructor(x:number, y:number,w:number,h:number){
        super("images/astroid.png",x,y,w,h);
        //keep the astroid rotating.
        //Put point to Center
        // this.sprite.anchor.set(0.5);
        // this.game.app.ticker.add((delta) => this.rotating(delta));

    }

    private rotating(delta:any){
        
        this.sprite.rotation += 0.1 * delta;
    }

    // abstract move();

    //needed for rotating
    private incrementAngle() {
        this.rotate++;
        if(this.rotate > 360) {
            this.rotate = 0;
        }
    }

    //needed for rotating 
    // defrees to radians
    private convertToRadians(degree:number) {
            return degree*(Math.PI/180);
    }

}