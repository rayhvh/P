namespace Util{
    export class Random{
        public static random(min:number, max:number){
            return Math.round(Math.random()*(max-min))+min;
        }

        public static randomDecimal(min:number, max:number):number{
            return this.round(((Math.random()*(max-min))+min),1);
        }

        public static round(value:number, precision:number) {
            var multiplier = Math.pow(10, precision || 0);
            return Math.round(value * multiplier) / multiplier;
        }
    }
}