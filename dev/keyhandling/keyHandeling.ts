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

    public hitFunction(){
        for(let o of this.observers){
            o.notify(this.keyHit);
        }
        // return this.keyHit;
    }

    //add a key but first check if the key is already in the array
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

    //remove a key.
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
                    this.addKey(KeyBoard.LEFT);
                    this.hitFunction();
                    break;
                case KeyBoard.A:
                    this.left = true;
                    this.addKey(KeyBoard.A);
                    this.hitFunction();
                    break;
                case KeyBoard.RIGHT:
                    this.addKey(KeyBoard.RIGHT);
                    this.hitFunction();
                    break;
                case KeyBoard.D:
                    this.addKey(KeyBoard.D);
                    this.hitFunction();
                    break;

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
                    break;
                case KeyBoard.RIGHT:
                    this.removeKey(KeyBoard.RIGHT);
                    this.hitFunction();
                    break;
                case KeyBoard.A:
                    this.removeKey(KeyBoard.A);
                    this.hitFunction();
                    break;
                case KeyBoard.D:
                    this.removeKey(KeyBoard.D);
                    this.hitFunction();
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