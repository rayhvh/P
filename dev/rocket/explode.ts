/// <reference path="rocket.ts" />

class Explode extends Rocket{
    constructor(x:number,y:number){
        //Build a small hack for showing animation
        //the Texture is empty and will show nothing
        super(x,y,null);
        //instead we load the animation
        this.init();

    }

    init(){
        var explosionTextures = [],i;

        for (i = 0; i < 6; i++) {
            console.log(i);
            var texture = PIXI.Texture.fromFrame('sprites_0' + (i + 1 ) + '.png');
            explosionTextures.push(texture);
        }

        var explosion = new PIXI.extras.AnimatedSprite(explosionTextures);
        explosion.loop = false;
        // explosion.;
        explosion.animationSpeed = 0.3;
        explosion.x = this.x + 15;
        explosion.y = this.y + 15;
        explosion.anchor.set(0.5);
        explosion.scale.set(2);
        explosion.gotoAndPlay(0);
        explosion.onComplete = ()=>{
            this.game.app.stage.removeChild(explosion);
        }
        // explosion.re
        this.game.app.stage.addChild(explosion);

    }

    // goLeft(){

    // }

    // goRight(){

    // }

    move(){

    }

    notify(){

    }
}