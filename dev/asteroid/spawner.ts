class Spawner{
    private timer:number;
    private game:Game;

    constructor(){
        this.timer = 0;
        this.game = Game.getInstance();
    }

    update(){
        this.timer++;
        // console.log(this.timer);
        if(this.timer % 60 == 0){
            console.log("SEC");
            this.spawnAsteroid();
            //do action every second
        }

        if(this.timer % 300 == 0){
            console.log("5 SEC");
        }
    }
    
    private spawnAsteroid(){
            let x = Util.random(20,400);
            let speed = Util.random(1,3);
            // this.game.astroidList.push(new Falling(x,-40,speed,this.game.context));
    }
}