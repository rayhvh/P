/// <reference path="../imageObject.ts" />

class Background{
    private speed:number;
    private stars:Array<Star> = [];
    private game:Game;
    private timer:number;

    constructor(speed:number, appWidth:number, appHeight:number){
        // super(0,0,appWidth,appHeight);
        //spawn 20 stars
        this.game = Game.getInstance();

        for(let i = 0; i < 30; i ++){
            this.addStars(
                Util.random(10,this.game.app.renderer.width -10),
                Util.random(10,this.game.app.renderer.height -10)
            );
        }
        console.log("loaded");
    }

    private addStars(x:number, y:number){
        let z = Util.randomDecimal(0.1,0.6);
        let r = 5;
        this.stars.push(new Star(x,y,z,r));
    }

    move(){
        this.starSpawner();
        for(let star of this.stars){
            star.move();
        }
    }

    starSpawner(){
        // console.log(this.game.timer)
        if(Util.timer(this.game.timer,0.2)){
            this.addStars( Util.random(10,this.game.app.renderer.width -10),
            0);
        }
    }

    setSpeed(newSpeed:number){
        this.speed = newSpeed;
    }

}
