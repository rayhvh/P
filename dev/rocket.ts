/// <reference path="gameObject.ts" />


abstract class Rocket extends GameObject{
    protected speed:number;

    constructor(x:number, y:number, context:CanvasRenderingContext2D){
        super(x,y,10,50, context);
        this.context = context;
    }

    private draw():void{
        this.context.fillRect(this.x,this.y,this.w,this.h);
        this.context.fillStyle = 'yellow';
        this.context.fill();
    }

    public render():void{
        this.draw();
    }
    abstract move():void;
}