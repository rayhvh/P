/// <reference path="../imageObject.ts" />


class Background{
    private speed:number;
    private stars:Array<Star> = [];
    private game:Game;

    constructor(speed:number, appWidth:number, appHeight:number){
        // super(0,0,appWidth,appHeight);
        //spawn 20 stars
        this.game = Game.getInstance();
        for(let i = 0; i < 10; i ++){
            let x = Util.random(10,this.game.app.renderer.width -10);
            let y = Util.random(10,this.game.app.renderer.height -10);
            let z = Util.randomDecimal(0.1,0.6);
            let r = 5;
            console.log(z);
            this.stars.push(new Star(x,y,z,r));
        }
    }

    // move(){
    //     //reset 
    //     console.log("MOVING");
    //     if(this.y >= 400){
    //         this.y = 0;
    //     }else{
    //         this.y += this.speed;
    //     }
    // }

    setSpeed(newSpeed:number){
        this.speed = newSpeed;
    }

}