class Util{

    public static random(min:number, max:number){
        return Math.round(Math.random()*(max-min))+min;
    }

    public static timer(timer:number,seconds:number):Boolean{
        if(timer % (60 * seconds) == 0){
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

    public static collidingRects (g:GameObject,g2:GameObject){
        if (g.x < g2.x + g2.w &&
            g.x + g.w > g2.x &&
            g.y < g2.y + g2.h &&
            g.h + g.y > g2.y) {
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

    // public static  RectCircleColliding(gameObject1:PIXI.Container,circleObject:PIXI.Container){
    //     var distX = Math.abs(gameObject1.x - circleObject.x-circleObject.width/2);
    //     var distY = Math.abs(gameObject1.y - circleObject.y-circleObject.height/2);

    //     if (distX > (circleObject.width/2 + gameObject1.width)) { return false; }
    //     if (distY > (circleObject.height/2 + gameObject1.width)) { return false; }

    //     if (distX <= (circleObject.width/2)) { return true; } 
    //     if (distY <= (circleObject.height/2)) { return true; }

    //     var dx=distX-circleObject.width/2;
    //     var dy=distY-circleObject.height/2;
        
    //     return (dx*dx+dy*dy<=(gameObject1.width*gameObject1.width));
    // }
//     public static AstroidHitRect(astroid:GameObject,rect:GameObject){
//         var distX = Math.abs(astroid.x - rect.x-rect.w/2);
//         var distY = Math.abs(astroid.y - rect.y-rect.h/2);

//         if (distX > (rect.w/2 + astroid.r)) { return false; }
//         if (distY > (rect.h/2 + astroid.r)) { return false; }

//         if (distX <= (rect.width/2)) { return true; } 
//         if (distY <= (rect.height/2)) { return true; }

//         var dx=distX-rect.width/2;
//         var dy=distY-rect.height/2;
//     return (dx*dx+dy*dy<=(astroid.r*astroid.r));
// }

    public static squareNumber(number:number):number{
        return number * number;
    }
}