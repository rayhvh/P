/// <reference path="vector.ts" />

class GameObject extends Vector{
    public w:number;
    public h:number;
    public game:Game;

    constructor(x:number, y:number, w:number, h:number){
        super(x,y);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.game = Game.getInstance();
    }
}