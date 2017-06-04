class Star extends Partical{
    //z is for the background
    private z:number;

    constructor(x:number,y:number,z:number, r:number){
        super(x,y,r,r,0xFFFFFF);
        this.z = z;
    }

}