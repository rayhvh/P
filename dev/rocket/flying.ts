/// <reference path="rocket.ts" />
/// <reference path="../keyhandling/keyboard.ts" />

class Flying extends Rocket{
    private movingLeft:boolean = false;
    private movingRight:boolean = false;

    private sideSpeed:number;

    constructor(x:number,y:number){
        super(x,y);
        this.sideSpeed = 3.5;
    }
    notify(keyHit:Array<KeyBoard>):void{
        console.log(keyHit);
        //for multiple key action we need to build another if statement 
        //but that is for later.
        //if the Array is bigger then 1 
        if(keyHit.length <= 1){
            //look for the key the hits.
            if(keyHit[0] == KeyBoard.LEFT || keyHit[0] == KeyBoard.A){
                this.movingLeft = true;
                this.movingRight = false;
            }else if(keyHit[0] == KeyBoard.RIGHT || keyHit[0] == KeyBoard.D){
                this.movingRight = true;
                this.movingLeft = false;
            }else{
                this.movingLeft = false;
                this.movingRight = false;
            }
        }
    }
    
    goLeft(){
        this.x -= this.sideSpeed;
    }
    goRight(){
        this.x += this.sideSpeed;
    }

    move(){
        if(this.movingLeft){
            this.goLeft();
        }else if(this.movingRight){
            this.goRight();
        }
    }
}
