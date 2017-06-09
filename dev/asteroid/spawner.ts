class Spawner{
    private game:Game;
    private multiplier:number;
    private startSpeed:number;
    private MAXMULTIPLIER:number = 2.5;

    constructor(){
        this.game = Game.getInstance();
        this.multiplier = 1;
        this.startSpeed = this.game.gameSpeed;
    }

    public spawn(){
        if(Util.timer(this.game.timer,1)){
            let rate = Util.random(0,this.multiplier + 1);
            for(let i = 0; i < rate; i++){
                this.addAsteroid();
            }
            
        }

        if(Util.timer(this.game.timer,1)){

            console.log("GROTER " + this.multiplier +" - " + this.MAXMULTIPLIER);
            if(this.multiplier <= this.MAXMULTIPLIER - 0.1){
                console.log("GROTER" );
                 this.multiplier = Number((this.multiplier += 0.1).toFixed(2));
            }
            
            console.log(this.multiplier);
            // if(this.multiplier <= 2){
            //     console.log("NOW");
            // }
            this.game.gameSpeed = this.startSpeed * this.multiplier;
        }
    }

    private addAsteroid(){
        this.game.asteroids.push(new Falling(Util.random(0,this.game.app.screen.width), -200));
    }
}