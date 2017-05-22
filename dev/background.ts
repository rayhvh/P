/// <reference path="gameObject.ts" />


class Background extends GameObject{
    private imageLink:String;
    private image:any;

    constructor(image:String, context:CanvasRenderingContext2D){
        super(0,0,400,400, context);
        this.imageLink = image;
    }

    load(){
        this.image = <any> new Image();
        this.image.src = 'images/backgroundStar.png';
        this.image.onload = ()=> {
            // this.context.drawImage(this.image,69,40); 
            this.render();
        };
        
    }
    move(){
        if(this.y >= 400){
            this.y = 0;
        }else{
            this.y++;
        }
    }

    render(){
        this.move();
        this.context.drawImage(this.image,0,this.y);
        this.context.drawImage(this.image,0,this.y - 400);
    }

}