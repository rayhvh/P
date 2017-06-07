/// <reference path="../imageObject.ts" />

abstract class Rocket extends ImageObject implements Observer{
    protected speed:number;
    protected sideSpeed:number;

    constructor(x:number, y:number){
        super("images/rocket.png",x,y,40,60);
    }
    abstract notify(keyHit:Array<KeyBoard>):void;
    abstract goLeft():void;
    abstract goRight():void;
    
    abstract move():void;
}
