class Util{
    // public static collisionCircle(circle1:GameObject, circle2:GameObject){
    //     var dx = circle1.x - circle2.x;
    //     var dy = circle1.y - circle2.y;

    //     var distance = Math.sqrt(dx * dx + dy * dy);

    //     if (distance < circle1.radius + circle2.radius) {
    //         return true;
    //     }
    //     return false;
    // }

    // public static test(circle1:CircleObject, point:GameObject){
    //     let dist = Math.sqrt((circle1.x - point.x + circle1.radius) * (circle1.x - point.x + + circle1.radius)
    //      + (circle1.y - point.y) * (circle1.y - point.y));
    //     return dist <= circle1.radius;
    // }

    // public static collisionCircleAndPoint(circle1:CircleObject, point:GameObject){
    //     // console.log(point.x);
    //     // console.log(circle1.x);
    //     let distancesquared = (circle1.x - point.x) * (circle1.x - point.x) + (circle1.y - point.y) * (circle1.y - point.y) + circle1.radius;
    //     return distancesquared <= circle1.radius * circle1.radius;
    // }

    // public static pointInsideCircleCollision(circle1:CircleObject, point:GameObject){
    //     return (Util.squareNumber(circle1.x + circle1.radius - point.x) + 
    //             Util.squareNumber(circle1.y + circle1.radius - point.y) <= 
    //             Util.squareNumber(circle1.radius));
    // }

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