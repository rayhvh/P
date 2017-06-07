class Util{

    public static random(min:number, max:number){
        return Math.round(Math.random()*(max-min))+min;
    }

    public static timer(timer:number,seconds:number):Boolean{
        if(timer % (60 * seconds) == 1){
            return true;
        }
        return false;
    }

    public static randomDecimal(min:number, max:number):number{
        // console.log((Math.random()*0.5).toFixed(1));

        return this.round(((Math.random()*(max-min))+min),1);
    }

    public static hitBottom(y:number, bottom:number){
        if(y >= bottom){
            return true
        }
        return false;
    }

    public static round(value:number, precision:number) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }

    public static collidingRects (g:PIXI.Container,g2:PIXI.Container){
        if (g.x < g2.x + g2.width &&
            g.x + g.width > g2.x &&
            g.y < g2.y + g2.height &&
            g.height + g.y > g2.y) {
                // collision detected!
                return true;
            }

    //     if (g.x + g.width > g2.x){        
    //         if (g.x < g2.x + g2.width){            
    //             if (g.y + g.height > g2.y){                
    //                 if (g.y < g2.y + g2.height){                    
    //                     return true; 
    //                 }
    //             }
    //         }   
    //  }   
        return false;
    }

    public static  RectCircleColliding(gameObject1:PIXI.Container,gameObject2:PIXI.Container){
        var distX = Math.abs(gameObject1.x - gameObject2.x-gameObject2.width/2);
        var distY = Math.abs(gameObject1.y - gameObject2.y-gameObject2.height/2);

        if (distX > (gameObject2.width/2 + gameObject1.width)) { return false; }
        if (distY > (gameObject2.height/2 + gameObject1.width)) { return false; }

        if (distX <= (gameObject2.width/2)) { return true; } 
        if (distY <= (gameObject2.height/2)) { return true; }

        var dx=distX-gameObject2.width/2;
        var dy=distY-gameObject2.height/2;
        
        return (dx*dx+dy*dy<=(gameObject1.width*gameObject1.width));
    }

    public static squareNumber(number:number):number{
        return number * number;
    }
}