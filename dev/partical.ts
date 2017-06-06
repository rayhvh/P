class Partical extends GameObject{

    private graphics:PIXI.Graphics;
    private color:number;
    private opacity:number;

    constructor(x:number, y:number, w:number, h:number, color:number,opacity:number){
        super(x,y,w,h);
        this.graphics = new PIXI.Graphics();
        this.color = color;
        this.opacity = opacity;
        this.draw();
    }

    draw(){
        this.graphics.lineStyle(0);
        this.graphics.beginFill(this.color,this.opacity);
        this.graphics.drawCircle(this.x, this.y,this.w);
        this.graphics.endFill();
        this.game.app.stage.addChild(this.graphics);
    }
}