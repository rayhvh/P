/// <reference path="../imageObject.ts" />


class Background{
    private speed:number;
    private stars:Array<Star> = [];
    private game:Game;

    constructor(speed:number, appWidth:number, appHeight:number){
        // super(0,0,appWidth,appHeight);
        //spawn 20 stars
        this.game = Game.getInstance();
        for(let i = 0; i < 30; i ++){
            let x = Util.random(10,this.game.app.renderer.width -10);
            let y = Util.random(10,this.game.app.renderer.height -10);
            let z = Util.randomDecimal(0.1,0.6);
            let r = 5;
            console.log(z);
            this.stars.push(new Star(x,y,z,r));
        }
    }

    move(){
        // for(){
            
        // }
    }

    setSpeed(newSpeed:number){
        this.speed = newSpeed;
    }

}