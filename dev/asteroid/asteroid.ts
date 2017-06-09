/// <reference path="../gameObject.ts" />
/// <reference path="../imageObject.ts" />

abstract class Asteroid extends ImageObject{
    abstract speed:number;
    private rotate:number;
    //building bouding box
    public hitBox:GameObject;
    public r:number;
    public graphics:PIXI.Graphics;
    
    constructor(x:number, y:number,w:number,h:number){
        super("astroid",x,y,w,h);
        this.r = w / 2;
        let padding = 25;
        this.hitBox = new GameObject(this.x + padding /2, this.y + padding / 2, this.width - padding,this.height - padding)
        console.log("RADIUS : "+this.r);
        // this.boudingBox = new GameObject()
        // this.drawHitBox();
    }
    drawHitBox(){
        let padding:number = 25;
        this.graphics = new PIXI.Graphics();

        this.graphics.beginFill(0xFFFF00);

        // set the line style to have a width of 5 and set the color to red
        this.graphics.lineStyle(5, 0xFF0000);

        // draw a rectangle
        this.graphics.drawRect(this.x + padding / 2 , this.y + padding /2, this.width - padding, this.height - padding);

        this.game.app.stage.addChild(this.graphics);
    }
}