/// <reference path="../asteroid.ts" />

class Falling extends Asteroid{
    public speed:number;
    
    constructor(x:number, y:number,speed:number){
        super(x,y,20,20);
        this.speed = speed;
    }
    move(){
        
    }

    // move(){
    //     this.y += this.speed;
    //     this.drawImage();
    // }
}