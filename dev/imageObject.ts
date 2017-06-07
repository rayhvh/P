/// <reference path="gameObject.ts" />

abstract class ImageObject extends PIXI.Sprite{

    protected game:Game;

    constructor(image:string, x:number, y:number, w:number, h:number){
        super(PIXI.Texture.fromImage(image));

        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;

        this.game = Game.getInstance();

        this.create();
    }

    private create(){
        this.game.app.stage.addChild(this);
    }

    private remove(){
        this.game.app.stage.removeChild(this);
    }

    public reRender(){
        this.remove();
        this.create();
    }

    //FIND A GOOD WAY TO DO THIS.
    public move(){
        this.reRender();

    }
}