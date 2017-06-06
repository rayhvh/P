class Test extends PIXI.Sprite{
    public sprite:PIXI.Sprite;
    private game:Game;
    // public x:number;
    // public y:number;

    constructor(){
        super(PIXI.Texture.fromImage("images/astroid.png"));
        this.game = Game.getInstance();
        this.x = 10;
        this.y = 10;
        this.init();
      
    }
    private init(){
        
        // this.sprite = PIXI.Sprite.fromImage("images/astroid.png");
        // this.sprite.x = this.x;
        // this.sprite.y = this.y;
        this.game.app.stage.addChild(this);
    }
    public updateX(){
        this.x += 2;
        this.y += 2;
    }
}