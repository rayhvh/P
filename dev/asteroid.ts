/// <reference path="gameObject.ts" />
/// <reference path="imageObject.ts" />

abstract class Asteroid extends ImageObject{
    abstract speed:number;
    private rotate:number;
    
    constructor(x:number, y:number,w:number,h:number){
        super("images/astroid.png",x,y,w,h);
    }
}