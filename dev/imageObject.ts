/// <reference path="gameObject.ts" />

class ImageObject extends GameObject{
    public image:string;
    public sprite:PIXI.Sprite;

    constructor(image:string,x:number, y:number, w:number, h:number){
        super(x,y,w,h);
        this.image = image;
        this.create();
    }

    private create(){
        this.sprite = PIXI.Sprite.fromImage(this.image);
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.game.app.stage.addChild(this.sprite);
    }
}