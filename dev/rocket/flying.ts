/// <reference path="rocket.ts" />
/// <reference path="../keyboard.ts" />

class Flying extends Rocket{
    movingLeft:boolean = false;
    movingRight:boolean = false;

    constructor(x:number,y:number){
        super(x,y);

        this.speed = 2;
        this.sideSpeed = 3;
    }
    notify(keyHit:Array<KeyBoard>):void{
        console.log(keyHit);
        //for multiple key action we need to build another if statement 
        //but that is for later.
        //if the Array is bigger then 1 
        if(keyHit.length <= 1){
            //look for the key the hits.
            if(keyHit[0] == KeyBoard.LEFT){
                this.movingLeft = true;
                this.movingRight = false;
            }else if(keyHit[0] == KeyBoard.RIGHT){
                this.movingRight = true;
                this.movingLeft = false;
            }else{
                console.log("RELEASE");
                this.movingLeft = false;
                this.movingRight = false;
            }
        }
    }
    
    goLeft(){
        console.log("HIT LEFT");
        this.x -= this.sideSpeed;
    }
    goRight(){
        console.log("HIT RIGHT");
        this.x += this.sideSpeed;
    }
    actionKey(){}

    move(){
        if(this.movingLeft){
            this.goLeft();
        }else if(this.movingRight){
            this.goRight();
        }
    }
}
