/// <reference path="gameObject.ts" />


class Background extends GameObject{
    private imageLink:String;
    private image:any;
    private speed:number;
    private acceleration:number;

    constructor(image:String, speed:number, context:CanvasRenderingContext2D){
        super(0,0,400,400, context);
        this.imageLink = image;
        this.speed = speed;
        // let seconden = 5;
        // this.acceleration = this.calcSpeed(seconden);
    }

    load(){
        this.image = <any> new Image();
        this.image.src = 'images/backgroundStar.png';
        this.image.onload = ()=> {
            // this.context.drawImage(this.image,69,40); 
            this.render();
        };
        
    }
    // calcSpeed(seconden):number{
    //     return this.speed / (seconden * 60);
    // }

    move(){
        //Set new Speed
        // if(this.speed <= 0){
        //    this.speed = 0;
        //    //game over
        // }else{
        //     this.speed -= this.acceleration;
        // }

        //reset 
        if(this.y >= 400){
            this.y = 0;
        }else{
            this.y += this.speed;
        }
    }

    render(){
        this.move();
        this.context.drawImage(this.image,0,this.y);
        this.context.drawImage(this.image,0,this.y - 400);
    }

    setSpeed(newSpeed:number){
        this.speed = newSpeed;
    }

}