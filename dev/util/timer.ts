namespace Util{
    export class Timer{
         public static timer(timer:number,seconds:number):Boolean{
            if(timer % (60 * seconds) == 0){
                return true;
            }
            return false;
        }
        // public static timer
        // }
    }
}