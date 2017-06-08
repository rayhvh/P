class Spawner{
    private game:Game;
    private multiplier:number;

    constructor(){
        this.game = Game.getInstance();
        this.multiplier = 0;
    }

    public spawn(){
        if(Util.timer(this.game.timer,1)){
            let rate = Util.random(0,this.multiplier + 1);
            for(let i = 0; i < rate; i++){
                this.addAsteroid();
            }
            
        }

        if(Util.timer(this.game.timer,1)){
            this.multiplier += 0.01;
            this.game.gameSpeed += this.multiplier;
        }
    }

    private addAsteroid(){
        this.game.asteroids.push(new Falling(Util.random(0,this.game.app.screen.width), -200));
    }
}