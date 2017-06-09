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
            
        return false;
    }

    public static squareNumber(number:number):number{
        return number * number;
    }
}