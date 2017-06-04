class Partical extends GameObject{

    private graphics:PIXI.Graphics;
    private color:number;

    constructor(x:number, y:number, w:number, h:number, color:number){
        super(x,y,w,h);
        this.graphics = new PIXI.Graphics();
        this.color = color;
        this.draw();
    }

    draw(){
        this.graphics.lineStyle(0);
        this.graphics.beginFill(this.color,0.5);
        this.graphics.drawCircle(this.x, this.y,this.w);
        this.graphics.endFill();
        this.game.app.stage.addChild(this.graphics);
    }
}