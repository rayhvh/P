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

    public static  RectCircleColliding(gameObject1:GameObject,gameObject2:GameObject){
        var distX = Math.abs(gameObject1.x - gameObject2.x-gameObject2.w/2);
        var distY = Math.abs(gameObject1.y - gameObject2.y-gameObject2.h/2);

        if (distX > (gameObject2.w/2 + gameObject1.w)) { return false; }
        if (distY > (gameObject2.h/2 + gameObject1.w)) { return false; }

        if (distX <= (gameObject2.w/2)) { return true; } 
        if (distY <= (gameObject2.h/2)) { return true; }

        var dx=distX-gameObject2.w/2;
        var dy=distY-gameObject2.h/2;
        
        return (dx*dx+dy*dy<=(gameObject1.w*gameObject1.w));
    }

    public static squareNumber(number:number):number{
        return number * number;
    }
}