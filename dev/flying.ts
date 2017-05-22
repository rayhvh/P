/// <reference path="rocket.ts" />


class Flying extends Rocket{
    constructor(x:number,y:number, context:CanvasRenderingContext2D){
        super(x,y, context);
    }
    render(){
        super.render();
    }
    move(){}
}