class GameObject{
    public x:number;
    public y:number;
    public w:number;
    public h:number;
    public game:Game;

    constructor(x:number, y:number, w:number, h:number){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.game = Game.getInstance();
    }
}