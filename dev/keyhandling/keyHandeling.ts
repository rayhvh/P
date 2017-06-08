class KeyHandling implements Observable{
    public observers:Array<Observer>;
    private keyHit:Array<KeyBoard>;

    constructor(){
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

    private checkKey(e:KeyboardEvent):KeyBoard{
        switch(e.keyCode){
                case KeyBoard.LEFT:
                    return KeyBoard.LEFT
                case KeyBoard.RIGHT:
                    return KeyBoard.RIGHT
                case KeyBoard.A:
                    return KeyBoard.A
                case KeyBoard.D:
                   return KeyBoard.D

                default:
                    console.log("OTHER KEY" + e.keyCode);
                    break;
            }
        return null;
    }

    private keyDown(e:KeyboardEvent){
        let keyBoard:KeyBoard = this.checkKey(e);
        this.addKey(keyBoard);
        this.hitFunction();
    }

    private keyUp(e:KeyboardEvent){
        let keyBoard:KeyBoard = this.checkKey(e);
        this.removeKey(keyBoard);
        this.hitFunction();
    }
}