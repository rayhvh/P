class KeyHandling implements Observable{
    // private goLeft:Function;
    // private goRight:Function; 
    private rocket:Rocket;
    // private holdingKeys
    private left:Boolean;
    private right:Boolean;

    public observers:Array<Observer>;
    private keyHit:Array<KeyBoard>;

    constructor(){
        // this.rocket = rocket;

        window.addEventListener("keydown", (e)=>this.keyDown(e));
        window.addEventListener("keyup", (e)=>this.keyUp(e));
        this.keyHit = new Array<KeyBoard>();
        this.observers = new Array<Observer>();
    }

    public subscribe(o:Observer){
        this.observers.push(o);
    }

    public unsubscribe(o:Observer){
        for(let i = 0; i<this.observers.length; i++){
            if(this.observers[i] == o){
                this.observers.splice(i,1);
            }
        }
    }

    // doAction(){
    //     if(this.left){
    //         this.rocket.goLeft();
    //     }

    //     if(this.right){
    //         this.rocket.goRight();
    //     }
    // }

    public hitFunction(){
        for(let o of this.observers){
            o.notify(this.keyHit);
        }
        // return this.keyHit;
    }
    //checking if the key exists
    addKey(key:KeyBoard){
        for(let k of this.keyHit){
            if(k == key){
                //do nothing
                return true;
            }
        }
        this.keyHit.push(key);
        return true;
    }

    removeKey(key:KeyBoard){
        for(let i = 0; i < this.keyHit.length; i++){
            if(this.keyHit[i] == key){
                this.keyHit.splice(i,1);
            }
        }
    }

    private keyDown(e:KeyboardEvent){

         switch(e.keyCode){
                case KeyBoard.LEFT: 
                    console.log("DOWN");
                    // this.left = true;
                    this.addKey(KeyBoard.LEFT);
                    this.hitFunction();
                    break;
                // case KeyBoard.A:
                //     this.left = true;
                //     break;
                case KeyBoard.RIGHT:
                    // this.right = true;
                    this.addKey(KeyBoard.RIGHT);
                    this.hitFunction();
                    break;
                // case KeyBoard.D:
                //     this.right = true;
                //     break;

                default:
                    console.log("OTHER KEY" + e.keyCode);
                    break;
            }
    }

    private keyUp(e:KeyboardEvent){
         switch(e.keyCode){
                case KeyBoard.LEFT:
                    this.removeKey(KeyBoard.LEFT); 
                    this.hitFunction();
                    // this.left = false;
                    break;
                case KeyBoard.RIGHT:
                    this.removeKey(KeyBoard.RIGHT);
                    this.hitFunction();
                    // this.right = false;
                    break;

                default:
                    console.log("OTHER KEY" + e.keyCode);
                    break;
            }
    }

    // goLeft(goLeftFunction){
    //     goLeftFunction();
    // }
}