class GameOverHandler implements Observer{
    private game:Game;


    public notify(keyHit:Array<KeyBoard>){
        console.log(keyHit);
        this.game = Game.getInstance();
        if(this.findKey(keyHit,KeyBoard.R)){
            //reset all the stuff
            console.log("HITTING R");
            this.game.setup();
        }
    }

     private findKey(keyHit:Array<KeyBoard>,key1:KeyBoard, key2?:KeyBoard):Boolean{
         for(let key of keyHit){
             if(key2){
                    if(key == key1|| key == key2){
                        return true;
                    }
                }else{
                    if(key == key1){
                        return true;
                    }
                }
            }
        return false;
    }
}