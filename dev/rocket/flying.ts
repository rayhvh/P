/// <reference path="rocket.ts" />
/// <reference path="../keyhandling/keyboard.ts" />

class Flying extends Rocket{
    private movingLeft:boolean = false;
    private movingRight:boolean = false;

    private sideSpeed:number;
    private turbo:Boolean = false;

    private maxTurbo:number = 5;
    private turboSpeed:number = 1;
    private keyHit:Array<KeyBoard>;

    constructor(x:number,y:number){
        super(x,y);
        this.sideSpeed = 3.5;
        this.keyHit = new Array();
    }
    notify(keyHit:Array<KeyBoard>):void{
        //If empty resset values
        this.keyHit = keyHit;
        if(keyHit.length >= 1){
            //Check left or right and handle this.
           this.checkLeftOrRight(keyHit);
           //Check for up key and handle the turbo.
           this.checkTurbo(keyHit);
           
        }else{
            //THERE ARE NO KEYS SO STOP NOW!
            this.movingLeft = false;
            this.movingRight = false;
        }
    }
    //check if Left Or Right is hit.
    private checkLeftOrRight(keyHit:Array<KeyBoard>){
            if(this.findKey(keyHit,KeyBoard.A,KeyBoard.LEFT)){
                this.movingLeft = true;
                this.movingRight = false;
            }else if(this.findKey(keyHit,KeyBoard.D,KeyBoard.RIGHT)){
                this.movingRight = true;
                this.movingLeft = false;
            }else{
                this.movingLeft = false;
                this.movingRight = false;
            }
    }

    private checkTurbo(keyHit:Array<KeyBoard>){
        //TODO Tween when speed up and down
        // let maxTurbo = 2;
        if(this.findKey(keyHit, KeyBoard.UP, KeyBoard.W)){
            if(this.turboSpeed < this.maxTurbo){
                // this.turboSpeed += 0.05;
               this.turboSpeed =  Number((this.turboSpeed += 0.05).toFixed(2));
                
            }
        }else{
            if(this.turboSpeed > 1){
                // this.turboSpeed -= 0.05;
                this.turboSpeed =  Number((this.turboSpeed -= 0.05).toFixed(2));
            }
        }
        
    }

    private findKey(keyHit:Array<KeyBoard>,key1:KeyBoard, key2:KeyBoard):Boolean{
         for(let key of keyHit){
                if(key == key1|| key == key2){
                    return true;
                }
            }
        return false;
    }
    
    goLeft(){
        this.x -= this.sideSpeed;
        this.graphics.x -= this.sideSpeed;
        this.hitBox.x -= this.sideSpeed;
    }
    goRight(){
        this.x += this.sideSpeed;
        this.graphics.x += this.sideSpeed;
        this.hitBox.x += this.sideSpeed;
    }

    move(){
        // console.log(this.game.gameSpeed + " - " + this.turboSpeed);
        this.reRender();

        //if the key isn't hit then we need to slowdown.
        if(this.keyHit.length == 0){
            if(this.turboSpeed > 1){
                    // this.turboSpeed -= 0.05;
                    this.turboSpeed =  Number((this.turboSpeed -= 0.05).toFixed(2));
                    this.game.gameSpeed + this.turboSpeed;
             }else{
                 this.game.gameSpeed + this.turboSpeed;
             }
        }
        
        // console.log(this.game.gameSpeed);
        if(this.movingLeft){
            this.goLeft();
        }else if(this.movingRight){
            this.goRight();
        }
    }
}
