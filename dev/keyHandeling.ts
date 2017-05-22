class KeyHandling{
    private goLeft:Function;
    private goRight:Function;

    constructor(goLeft:Function,goRight:Function){
        this.goLeft = goLeft;
        this.goRight = goRight;

        document.addEventListener("keydown", (e)=>{
            this.findKey(e);
        });
    }

    findKey(e:KeyboardEvent){
         switch(e.keyCode){
                case 37: 
                    this.goLeft();
                    break;
                case 65:
                    this.goLeft();
                    break;
                case 39:
                    this.goRight();
                    break;
                case 68:
                    this.goRight();
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