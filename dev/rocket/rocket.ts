/// <reference path="../imageObject.ts" />

abstract class Rocket extends ImageObject implements Observer{
    public hitBox:GameObject;
    public graphics:PIXI.Graphics;
    

    constructor(x:number, y:number){
        super("images/rocket.png",x,y,40,60);
        // this.drawHitBox();
        let padding = this.width / 2;
        this.hitBox = new GameObject(this.x + padding / 2 , this.y, this.width - padding, this.height);
    }

    drawHitBox(){
        // let paddingW:number = 25;
        // let paddingH:number = 25;
        
        this.graphics = new PIXI.Graphics();

        this.graphics.beginFill(0xFFFF00);
        let padding = this.width / 2;
        // set the line style to have a width of 5 and set the color to red
        this.graphics.lineStyle(5, 0xFF0000);

        // draw a rectangle
        this.graphics.drawRect(this.x + padding / 2 , this.y, this.width - padding, this.height);

        this.game.app.stage.addChild(this.graphics);
    }
    abstract notify(keyHit:Array<KeyBoard>):void;
    abstract goLeft():void;
    abstract goRight():void;
    
    abstract move():void;
}
